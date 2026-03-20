import { getDefaultWallpaper } from "../../utils/imageHelper";

import { HiOutlineX } from "react-icons/hi";

export default function InfosPerfilPsicologo({ 
    formData, 
    handleChange,
    imgWallpaper,
    novaWallpaper,
    chooseWallpaper,
    especializacoes,
    adicionarEspecializacao,
    removerEspecializacao,
}) {

    const tagsEspecializacoes = [
        "Ansiedade",
        "Depressão",
        "Relacionamentos",
        "Autoestima",
        "Estresse",
    ];

  return (
    <>
        <div className="container-perfil" id="container-perfil">
            <h1>Perfil</h1>
            <div className="img-wallpaper">
                <img 
                    src={imgWallpaper || getDefaultWallpaper()}
                    alt="Wallpaper do perfil"
                    className="img-edit-wallpaper"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getDefaultAvatar();
                    }}
                />

                <div>
                    <input 
                    id="file-wallpaper" 
                    type="file" 
                    accept="image/*" 
                    onChange={chooseWallpaper}
                    />
                    <label className="btns button-confirm" htmlFor="file-wallpaper">
                    {novaWallpaper ? 'Wallpaper selecionado' : 'Mudar Wallpaper'}
                    </label>
                </div>
            </div>

            <div className="container-sobre-mim">
                <h3 id="sobreMim">Sobre mim</h3>
                <span>Escreva sobre você, formações, histórico de estudos recentes, artigos publicados em portais de periodicos ou revistas cientificas</span>
                <textarea 
                    id="sobreMimEdit" 
                    type="text" 
                    name="sobreMim"
                    value={formData.sobreMim}
                    onChange={handleChange}
                    rows="4"
                ></textarea>
            </div>

            <div className="container-especializacoes">
                <h3 id="especializacoes">Especializações</h3>
                <span>Escolha as especializações que mais combinam com o seu perfil profissional.</span>
                <select
                    className="tags-especializacoes-input"
                    onChange={(e) => {
                        adicionarEspecializacao(e.target.value);
                        e.target.value = ""; // reseta
                    }}
                    defaultValue="">
                    <option value="" disabled>
                        Selecione uma especialização
                    </option>

                    {tagsEspecializacoes.map((esp) => (
                        <option key={esp} value={esp}>
                            {esp}
                        </option>
                    ))}
                </select>

                <div className="tags-list">
                    {especializacoes.map((esp) => (
                        <div key={esp} className="tag-item">
                            <span>{esp}</span>
                            <button
                                className="btn-remove-tag"
                                type="button"
                                onClick={() => removerEspecializacao(esp)}
                            >
                                <HiOutlineX />
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    </>
  )
}