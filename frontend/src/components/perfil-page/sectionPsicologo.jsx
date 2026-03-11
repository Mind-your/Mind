import '../../assets/styles/perfil.css';
import InfoPsicologo from './infoPsicologo.jsx';
import Calendario from './calendario.jsx';
import SobrePsicologo from './sobrePsicologo.jsx';
import Notificacoes from './notificacoes.jsx';
import Logout from './logout.jsx';

export default function SectionPsicologo({ id }) {
    return (
        <div className="container-section-perfil">
            <div className="sobre-notif-container">
                <InfoPsicologo id={id} />
                <SobrePsicologo id={id} />
            </div>
            <div className="perfil-container">
                <Logout />
                <Calendario id={id} />
                <Notificacoes id={id} />
            </div>
            
        </div>
    );
}
