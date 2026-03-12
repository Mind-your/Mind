import "../../assets/styles/perfil/section.css";
import Info from './info.jsx';
import Calendario from './calendario.jsx';
import Sobre from './sobre.jsx';
import Logout from './logout.jsx';
import Notificacoes from './notificacoes.jsx';

export default function SectionPaciente({ id }) {
    return (
        <div className="container-section-perfil">
            <div className="sobre-notif-container">
                <Info id={id} />
                <Sobre id={id} />
            </div>
            <div className="perfil-container">
                <Logout />
                <Calendario id={id} />
                <Notificacoes id={id} />
            </div>
        </div>
    );
}
