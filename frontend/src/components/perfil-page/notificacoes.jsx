import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import '../../assets/styles/perfil.css';

export default function Notificacoes() {
    const { user } = useAuth();

    return (
        <>
            <div className="card-notif-container">
                <div className="notificacoes">
                    <h1 className="notif-titulo">Notificações</h1>
                    
                    <div id="notifSide" className="card-notif-session">
                        <div>
                            Sessão do dia 25/10 <br/>começa às 18:00
                        </div>
                        <div>
                            <Link to={`/${user.tipo}/perfil/${user.id}/video-chamada`}>
                                <button className="button-confirm">Entrar</button>
                            </Link>
                        </div>
                    </div>
                    
                    <div id="notifSide" className="card-notif-session">
                        <div>
                            Sessão do dia 28/10 <br/>começa às 18:00
                        </div>
                        <div>
                            <Link to={`/${user.tipo}/perfil/${user.id}/video-chamada`}>
                                <button className="button-confirm">Entrar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}