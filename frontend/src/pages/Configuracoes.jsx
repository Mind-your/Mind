import "../assets/styles/configuracoes/configuracoes.css"

import InfosGerais from "../components/configuracoes/InfosGerais"
import AtualizacaoCredenciais from "../components/configuracoes/AtualizacaoCredenciais"
import InfosPerfil from "../components/configuracoes/InfosPerfil"
import Deletar from "../components/pop-ups/Deletar"
import Horarios from "../components/configuracoes/Horarios";
import { toast } from 'react-toastify';
import { getImageUrl, getDefaultAvatar } from "../utils/imageHelper";

import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext";
import { atualizar, deletar, uploadImagem } from "../services/pacienteService";
import { atualizar as atualizarPsicologo, deletar as deletarPsicologo, uploadImagem as uploadImagemPsicologo } from "../services/psicologoService";
import { usePsicologos } from "../context/psicologos"; // Novo import


export default function Configuracoes() {
    const navigate = useNavigate();
    const { recarregar: recarregarPsicologos } = usePsicologos(); // Novo
    const { user, loading, updateUser, logout } = useAuth();
    const [imgPerfil, setImgPerfil] = useState('');
    const [novaImagem, setNovaImagem] = useState(null); // Armazena o arquivo selecionado
    const [imageError, setImageError] = useState(false); // Controla se houve erro ao carregar imagem
    const [isOpen, setIsOpen] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [deletando, setDeletando] = useState(false);
    const { tipo, id } = useParams();

    // Carregar imagem do servidor quando o componente montar ou user mudar
    useEffect(() => {
        setImageError(false); // Resetar erro ao mudar de usuário
        if (user?.imgPerfil) {
            setImgPerfil(getImageUrl(user.imgPerfil));
        } else {
            setImgPerfil(getImageUrl(null));
        }
    }, [user]);

    const chooseImgPerfil = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        console.log('Imagem selecionada:', file.name);

        // Validar tamanho (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('A imagem deve ter no máximo 5MB');
            return;
        }

        // Validar tipo
        if (!file.type.startsWith('image/')) {
            toast.error('Por favor, selecione uma imagem válida');
            return;
        }

        // Armazenar o arquivo para upload posterior
        setNovaImagem(file);

        // Criar preview local da nova imagem
        const imageUrl = URL.createObjectURL(file);
        setImgPerfil(imageUrl);
        setImageError(false); // Resetar erro ao selecionar nova imagem

        console.log('Preview criado. Arquivo será enviado ao clicar em "Atualizar perfil"');
    }

    const handleAtualizarPerfil = async (e) => {
        e.preventDefault();
        setSalvando(true);

        try {
            // PRIMEIRO: Upload da imagem se houver uma nova
            let nomeImagemAtualizada = user.imgPerfil; // Mantém a imagem atual por padrão
            
            if (novaImagem) {
                console.log('Fazendo upload da nova imagem...');
                
                try {
                    let uploadResponse;
                    if (user.tipo === 'psicologo') {
                        uploadResponse = await uploadImagemPsicologo(user.id, novaImagem);
                    } else {
                        uploadResponse = await uploadImagem(user.id, novaImagem);
                    }
                    
                    console.log('Upload concluído:', uploadResponse);
                    
                    if (uploadResponse && uploadResponse.imgPerfil) {
                        nomeImagemAtualizada = uploadResponse.imgPerfil;
                        console.log('Nova imagem salva:', nomeImagemAtualizada);
                    }
                } catch (uploadError) {
                    console.error('Erro no upload da imagem:', uploadError);
                    toast.error('Erro ao fazer upload da imagem: ' + uploadError.message);
                    // Continua para salvar os outros dados mesmo se a imagem falhar
                }
                
                // Limpar o arquivo temporário
                setNovaImagem(null);
            }

            // SEGUNDO: Atualizar os outros dados do perfil
            console.log('Atualizando dados do perfil...');
            
            const dadosAtualizados = {
                // Informações Gerais
                nome: document.getElementById('nomeEdit')?.value || user.nome,
                sobrenome: document.getElementById('sobrenomeEdit')?.value || user.sobrenome,
                dtNascimento: document.getElementById('nascimentoEdit')?.value || user.dtNascimento,
                telefone: document.getElementById('telefoneEdit')?.value || user.telefone,
                endereco: document.getElementById('localEdit')?.value || user.endereco,
                genero: document.getElementById('generoEdit')?.value || user.genero,
                
                // Credenciais
                login: document.getElementById('loginEdit')?.value || user.login,
                email: document.getElementById('emailEdit')?.value || user.email,
                
                // Perfil
                sobreMim: document.getElementById('sobreMimEdit')?.value || user.sobreMim,
                medicamentos: document.getElementById('medicamentosEdit')?.value || user.medicamentos,
                preferencias: document.getElementById('preferenciasEdit')?.value || user.preferencias,
                
                // Manter a imagem atualizada (ou a atual se não houve upload)
                imgPerfil: nomeImagemAtualizada
            };

            // Só adicionar senha se foi preenchida
            const novaSenha = document.getElementById('senhaEdit')?.value;
            if (novaSenha && novaSenha.trim() !== '') {
                dadosAtualizados.senha = novaSenha;
            }

            // Escolher a função de atualização correta baseada no tipo
            let usuarioAtualizado;
            if (user.tipo === 'psicologo') {
                usuarioAtualizado = await atualizarPsicologo(user.id, dadosAtualizados);
            } else {
                usuarioAtualizado = await atualizar(user.id, dadosAtualizados);
            }
            
            console.log('Dados atualizados:', usuarioAtualizado);
            
            // Atualizar contexto local
            if (updateUser) {
                updateUser({ ...usuarioAtualizado, tipo: user.tipo });
            }

            // Recarregar lista de psicólogos para pacientes verem alterações
            if (user.tipo === 'psicologo') { 
                try {
                    await recarregarPsicologos();
                    console.log('✅ Lista de psicólogos recarregada com sucesso');
                } catch (err) {
                    console.warn('⚠️ Erro ao recarregar psicólogos (não crítico):', err);
                }
            }

            toast.success('Configurações atualizadas com sucesso!');
            
            // Limpar campo de senha
            const senhaInput = document.getElementById('senhaEdit');
            if (senhaInput) senhaInput.value = '';
            
            // Atualizar a imagem do preview com a URL do servidor
            if (nomeImagemAtualizada) {
                setImgPerfil(getImageUrl(nomeImagemAtualizada));
                setImageError(false); // Resetar erro após upload bem-sucedido
            }

        } catch (error) {
            console.error('Erro ao atualizar:', error);
            toast.error(error.message || 'Erro ao atualizar configurações');
        } finally {
            setSalvando(false);
        }
    };

    const handleDeletarConta = async () => {
        setDeletando(true);

        try {
            // Escolher a função de deletar correta baseada no tipo
            if (user.tipo === 'psicologo') {
                await deletarPsicologo(user.id);
            } else {
                await deletar(user.id);
            }

            toast.success('Conta deletada com sucesso!');
            
            // Fazer logout e redirecionar
            if (logout) {
                logout();
            }
            
            // Aguardar um pouco para o usuário ver a mensagem
            setTimeout(() => {
                navigate('/');
            }, 1500);

        } catch (error) {
            console.error('Erro ao deletar conta:', error);
            toast.error(error.message || 'Erro ao deletar conta');
            setDeletando(false);
            setIsOpen(false);
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.id !== id || user.tipo !== tipo) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h2>Acesso Negado</h2>
                <p>Você só pode editar suas próprias configurações.</p>
                <a href={`/${user.tipo}/perfil/${user.id}/configuracoes`}>
                    Ir para minhas configurações
                </a>
            </div>
        );
    }

    return (
    <>
        <section className="config">
            <div className="container-section">
                <div className="container-img">
                    <div className="img-options">
                        <img 
                            id="imagePreview" 
                            src={imageError ? getDefaultAvatar() : imgPerfil} 
                            alt="Foto de perfil" 
                            className="imgEdit"
                            onError={(e) => {
                                if (!imageError) {
                                    console.warn('Imagem não encontrada:', imgPerfil);
                                    console.warn('Carregando imagem padrão (base64)');
                                    setImageError(true);
                                }
                            }}
                        />
                        <div>
                            <input 
                                id="file-image" 
                                type="file" 
                                accept="image/*" 
                                onChange={chooseImgPerfil}
                            />
                            <label className="btns button-confirm" htmlFor="file-image">
                                {novaImagem ? 'Foto Selecionada' : 'Mudar Foto'}
                            </label>
                        </div>
                        {novaImagem && (
                            <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                                Clique em "Atualizar perfil" para salvar
                            </small>
                        )}
                    </div>
                    <div className="atalhos">
                        <a href="#formAtualizar" id="Geral">Geral</a>
                        <a href="#container-perfil" id="Perfil">Perfil</a>
                        {user?.tipo === "psicologo" && (
                            <a href="#container-horario-atendimento" id="Horarios">Horarios de atendimentos</a>
                        )}
                        <a href="#deletar-conta" id="Deletar">Deletar conta</a>
                    </div>
                </div>

                <div className="container-inputs container-perfil" id="formAtualizar">
                    <h1>Geral</h1>

                    <div>
                        <InfosGerais user={user} />
                        <AtualizacaoCredenciais user={user} />
                        <InfosPerfil user={user} />
                        
                        {user?.tipo === "psicologo" && (
                            <Horarios />
                        )}

                        <div className="container-atualizar">
                            <button 
                                id="btnAtualizarPerfil" 
                                className="button-confirm"
                                onClick={handleAtualizarPerfil}
                                disabled={salvando}
                                style={{ 
                                    opacity: salvando ? 0.6 : 1,
                                    cursor: salvando ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {salvando ? 'Salvando...' : 'Atualizar perfil'}
                            </button>
                        </div> 
                    </div>

                </div>
            </div>

            <div className="container-deletar" id="deletar-conta">
                <span>Uma vez deletada sua conta, não será possível recupera-la. Tenha certeza!</span>
                <button 
                    className="btn-deletar button-attention" 
                    id="btn-abrir-pop-up"
                    onClick={() => setIsOpen(true)}
                    disabled={deletando}
                >
                    Deletar conta
                </button>
            </div>

            <Deletar 
                open={isOpen} 
                close={() => setIsOpen(false)}
                onConfirm={handleDeletarConta}
                loading={deletando}
            />
        </section>
    </>
  )
}