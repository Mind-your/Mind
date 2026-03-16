import '../../assets/styles/perfil.css';
import Info from './Info.jsx';
import Calendario from './Calendario.jsx';
import Sobre from './Sobre.jsx';
import Notificacoes from './Notificacoes.jsx';

export default function SectionPaciente({ id }) {
    return (
        <div className="container-section-perfil">
            <div className="perfil-container">
                <Info id={id} />
                <Calendario id={id} />
            </div>
            <div className="sobre-notif-container">
                <Sobre id={id} />
                <Notificacoes id={id} />
            </div>
        </div>
    );
}
