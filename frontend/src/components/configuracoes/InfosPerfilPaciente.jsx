import { getDefaultWallpaper } from "../../utils/imageHelper";

export default function InfosPerfilPaciente({
    formData, 
    handleChange,
    imgWallpaper,
    novaWallpaper,
    chooseWallpaper
}) {
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
                <span>Escreva sobre você, condições médicas e diagnósticos recentes.</span>
                <textarea 
                    id="sobreMimEdit" 
                    type="text" 
                    name="sobreMim"
                    value={formData.sobreMim}
                    onChange={handleChange}
                    rows="4"
                ></textarea>
            </div>

            <div className="container-medicamento">
                <h3 id="Medicamento">Medicamento</h3>
                <span>Escreva sobre medicamentos já em uso, périodo de seu consumo, e se necessário, efeitos colateras pessoais.</span>
                <textarea 
                    id="medicamentosEdit"
                    type="text"
                    name="medicamentos"
                    value={formData.medicamentos}
                    onChange={handleChange}
                ></textarea>
            </div>

            <div className="container-preferencias">
                <h3 id="Preferencias">Preferências</h3>
                <span>Preferências de atendimento e assuntos</span>
                <textarea 
                    id="preferenciasEdit" 
                    type="text"
                    name="preferencias"
                    value={formData.preferencias}
                    onChange={handleChange}
                ></textarea>
            </div>
        </div>
    </>
  )
}