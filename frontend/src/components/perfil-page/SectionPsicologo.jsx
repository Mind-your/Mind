import "../../assets/styles/perfil/section.css";
import InfoPsicologo from './InfoPsicologo.jsx';
import Calendario from './Calendario.jsx';
import SobrePsicologo from './SobrePsicologo.jsx';
import Notificacoes from './Notificacoes.jsx';
import Logout from './Logout.jsx';
import ArtigosPerfil from './ArtigosPerfil.jsx';

export default function SectionPsicologo({ id }) {
    return (
        <div className="container-section-perfil">
            <div className="sobre-notif-container">
                <InfoPsicologo id={id} />
                <SobrePsicologo id={id} />
                <ArtigosPerfil id={id} />
            </div>
            <div className="perfil-container">
                <Logout />
                <Calendario id={id} />
                <Notificacoes id={id} />
            </div>
            
        </div>
    );
}
