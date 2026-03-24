import InfosGerais from "./InfosGerais"
import AtualizacaoCredenciais from "./AtualizacaoCredenciais"
import InfosPerfilPsicologo from "./InfosPerfilPsicologo"
import InfosPerfilPaciente from "./InfosPerfilPaciente"
import Deletar from "../pop-ups/Deletar"
import Horarios from "./Horarios";
import { getImageUrl, getDefaultAvatar } from "../../utils/imageHelper";

export default function ConfiguracoesViewPage({
    user,

    imgPerfil,
    novaImagem,
    chooseImgPerfil,

    imgWallpaper,
    novaWallpaper,
    chooseWallpaper,

    handleAtualizarPerfil,
    handleDeletarConta,
    salvando,
    deletando,
    isOpen,
    setIsOpen,
    formData,
    handleChange,
    handleCepBlur,
    handleEnderecoBlur,

    especializacoes,
    novaEspecializacao,
    setNovaEspecializacao,
    adicionarEspecializacao,
    removerEspecializacao
}) {
  return (
    <>
        <section className="config">
            <div className="container-section">
                <div className="container-img">
                    <div className="img-options">
                        <img 
                            id="imagePreview" 
                            src={imgPerfil || getDefaultAvatar()}
                            alt="Foto de perfil" 
                            className="imgEdit"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = getDefaultAvatar();
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
                        <InfosGerais 
                            formData={formData}
                            handleChange={handleChange}
                            handleCepBlur={handleCepBlur}
                            handleEnderecoBlur={handleEnderecoBlur} />
                        <AtualizacaoCredenciais 
                            formData={formData}
                            handleChange={handleChange} />

                        {user?.tipo === "psicologo" ? (
                            <InfosPerfilPsicologo
                                imgWallpaper={imgWallpaper}
                                novaWallpaper={novaWallpaper}
                                chooseWallpaper={chooseWallpaper}

                                especializacoes={especializacoes}
                                novaEspecializacao={novaEspecializacao}
                                setNovaEspecializacao={setNovaEspecializacao}
                                adicionarEspecializacao={adicionarEspecializacao}
                                removerEspecializacao={removerEspecializacao}

                                formData={formData}
                                handleChange={handleChange}/>
                        ) : (
                            <InfosPerfilPaciente
                                formData={formData}
                                handleChange={handleChange}
                            />
                        )}
                        
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
