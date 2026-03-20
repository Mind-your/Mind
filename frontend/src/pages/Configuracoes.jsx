import "../assets/styles/configuracoes/configuracoes.css"

import ConfiguracoesViewPage from "../components/configuracoes/ConfiguracoesViewPage";
import { toast } from 'react-toastify';
import { getImageUrl, getDefaultAvatar } from "../utils/imageHelper";
import { getDefaultWallpaper } from "../utils/imageHelper";

import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { atualizar, deletar, uploadImagem } from "../services/pacienteService";
import { atualizar as atualizarPsicologo, deletar as deletarPsicologo, uploadImagem as uploadImagemPsicologo } from "../services/psicologoService";
import { usePsicologos } from "../context/Psicologos"; // Novo import

export default function Configuracoes() {
    const navigate = useNavigate();
    const { recarregar: recarregarPsicologos } = usePsicologos(); // Novo
    const { user, loading, updateUser, logout } = useAuth();

    const [imgPerfil, setImgPerfil] = useState(getDefaultAvatar());
    const [erroImgPerfil, setErroImgPerfil] = useState(false);
    const [erroImage, setErroImage] = useState(false);
    const [novaImagem, setNovaImagem] = useState(null); // Armazena o arquivo selecionado
    const [isOpen, setIsOpen] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [deletando, setDeletando] = useState(false);
    const [imgWallpaper, setImgWallpaper] = useState(getDefaultWallpaper()); // Para wallpaper do perfil
    const [novaWallpaper, setNovaWallpaper] = useState(null);
    const { tipo, id } = useParams();

    const [formData, setFormData] = useState({
        // Informações Gerais
        nome: '',
        sobrenome: '',
        dtNascimento: '',
        telefone: '',
        endereco: '',
        genero: '',
        // Informações Gerais
        login: '',
        email: '',
        senha: '',
        // Perfil
        sobreMim: '',
        medicamentos: '',
        preferencias: '',
        especializacoes: []
        
    });

    useEffect(() => {
        if (user) {
            setFormData({
                // Informações Gerais
                nome: user.nome || '',
                sobrenome: user.sobrenome || '',
                dtNascimento: user.dtNascimento || '',
                telefone: user.telefone || '',
                endereco: user.endereco || '',
                genero: user.genero || '',
                // Informações Gerais
                login: user.login || '',
                email: user.email || '',
                senha: '',
                // Perfil
                sobreMim: user.sobreMim || '',
                medicamentos: user.medicamentos || '',
                preferencias: user.preferencias || '',
                especializacoes: user.especializacoes || []
            });
        }
    }, [user]);

    useEffect(() => {
        if (user?.imgPerfil) {
            setImgPerfil(getImageUrl(user.imgPerfil));
        } else {
            setImgPerfil(getImageUrl(null));
        }

        if (user?.imgWallpaper) {
            setImgWallpaper(getImageUrl(user.imgWallpaper));
        }
    }, [user]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Tags de especializações - apenas para psicólogos
    const adicionarEspecializacao = (value) => {
        if (!value) return;

        setFormData((prev) => {
            if (prev.especializacoes.includes(value)) return prev;

            return {
                ...prev,
                especializacoes: [...prev.especializacoes, value]
            };
        });
    };

    const removerEspecializacao = (value) => {
        setFormData((prev) => ({
            ...prev,
            especializacoes: prev.especializacoes.filter(e => e !== value)
        }));
    };

    // Imagem de perfil
    const chooseImgPerfil = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('A imagem deve ter no máximo 5MB');
            return;
        }

        // Validar tipo
        if (!file.type.startsWith('image/')) {
            toast.error('Selecione uma imagem válida');
            return;
        }

        setNovaImagem(file);  // Armazenar o arquivo para upload posterior
        setImgPerfil(URL.createObjectURL(file)); // Criar preview local da nova imagem
    }

    // Imagem de wallpaper
    const chooseWallpaper = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setNovaWallpaper(file);
        setImgWallpaper(URL.createObjectURL(file));
    };

    const uploadWallpaper = async () => {
        if (!novaWallpaper) return user.imgWallpaper;

        try {
            let response;

            if (user.tipo === 'psicologo') {
                response = await uploadImagemPsicologo(user.id, novaWallpaper);
            }

            return response?.imgWallpaper || user.imgWallpaper;

        } catch {
            toast.error('Erro ao fazer upload do wallpaper');
            return user.imgWallpaper;
        }
    };

    const uploadNovaImagem = async () => {
        if (!novaImagem) return user.imgPerfil;

        try {
            let response;

            if (user.tipo === 'psicologo') {
                response = await uploadImagemPsicologo(user.id, novaImagem);
            } else {
                response = await uploadImagem(user.id, novaImagem);
            }

            return response?.imgPerfil || user.imgPerfil;

        } catch (error) {
            toast.error('Erro ao fazer upload da imagem');
            return user.imgPerfil;
        }
    };

    // Uso e gerenciamento dos dados
    const getDadosAtualizados = (imgPerfil, imgWallpaper) => {
        const dados = {
            ...formData,
            imgPerfil,
            imgWallpaper
        };

        if (!formData.senha.trim()) {
            delete dados.senha;
        }

        return dados;
    };

    const handleAtualizarPerfil = async (e) => {
        e.preventDefault();
        setSalvando(true);

        try {
            const imgAtualizada = await uploadNovaImagem();
            const wallpaperAtualizado = await uploadWallpaper();
            const dadosAtualizados = getDadosAtualizados(imgAtualizada, wallpaperAtualizado);

            let usuarioAtualizado;

            if (user.tipo === 'psicologo') {
                usuarioAtualizado = await atualizarPsicologo(user.id, dadosAtualizados);
                await recarregarPsicologos();
            } else {
                usuarioAtualizado = await atualizar(user.id, dadosAtualizados);
            }

            updateUser({ ...usuarioAtualizado, tipo: user.tipo });

            toast.success('Configurações atualizadas com sucesso!');

        } catch (error) {
            toast.error('Erro ao atualizar');
        } finally {
            setSalvando(false);
        }
    };

    const handleDeletarConta = async () => {
        setDeletando(true);

        try {
            if (user.tipo === 'psicologo') {
                await deletarPsicologo(user.id);
            } else {
                await deletar(user.id);
            }

            toast.success('Conta deletada com sucesso!');
            logout();
            setTimeout(() => navigate('/'), 1500);

        } catch (error) {
            toast.error('Erro ao deletar conta');
            setDeletando(false);
            setIsOpen(false);
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (!user) return <Navigate to="/login" replace />;

    if (user.id !== id || user.tipo !== tipo) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h2>Acesso Negado</h2>
                <p>Você só pode editar suas próprias configurações.</p>
            </div>
        );
    }

    return (
    <>
        <ConfiguracoesViewPage 
            user={user}

            imgPerfil={imgPerfil}
            novaImagem={novaImagem}
            chooseImgPerfil={chooseImgPerfil}

            imgWallpaper={imgWallpaper}         
            novaWallpaper={novaWallpaper}        
            chooseWallpaper={chooseWallpaper} 

            handleAtualizarPerfil={handleAtualizarPerfil}
            handleDeletarConta={handleDeletarConta}
            salvando={salvando}
            deletando={deletando}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            formData={formData}
            handleChange={handleChange} 

            especializacoes={formData.especializacoes}
            adicionarEspecializacao={adicionarEspecializacao}
            removerEspecializacao={removerEspecializacao}/>
            
    </>
  )
}