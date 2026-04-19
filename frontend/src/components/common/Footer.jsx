import {Link} from "react-router-dom"
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import { useState } from "react";

export default function Footer() {
  const [copied, setCopied] = useState(null);

  const handleCopyEmail = () => {
    const email = "mind@falsoemail.com";
    navigator.clipboard.writeText(email).then(() => {
      setCopied("email");
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleCopyPhone = () => {
    const phone = "(11) 1111-1111";
    navigator.clipboard.writeText(phone).then(() => {
      setCopied("phone");
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <>
        <footer>
            <nav className="grid-footer" aria-label="Navegação geral do site">
                <ul>
                    <li><Link to="/sobrenos">Sobre nós</Link></li>
                    <li><Link to="/artigos">Artigos</Link></li>
                    <li><Link to="/termos-e-condicoes">Termos e Acordos</Link></li>
                    <li><Link to="">Entre para nosso time</Link></li>
                </ul>
                <div>
                    <ul>
                        <li>
                            <Link
                                to="/"
                                onClick={(e) => {
                                    if (window.location.pathname === "/") {
                                        e.preventDefault();
                                        document.getElementById('planos')?.scrollIntoView({
                                            behavior: 'smooth'
                                        });
                                    }
                                }}>Planos</Link>
                        </li>
                        <li>
                            <Link to="/:tipo(paciente|psicologo)/perfil/:id/configuracoes">Atribuições</Link>
                        </li>
                        <li>
                            <Link to="/adicionar-artigos">Canal de denúncia</Link>
                        </li>
                    </ul>
                    <p>Contatos:</p>
                    <div className="icon-btns">
                        <button 
                            className="icon-btn icon-ui" 
                            aria-label="Copiar email"
                            onClick={handleCopyEmail}
                            title={copied === "email" ? "Copiado!" : "Copiar email"}
                        >
                            <HiOutlineMail />
                        </button>
                        <button 
                            className="icon-btn icon-ui" 
                            aria-label="Copiar telefone"
                            onClick={handleCopyPhone}
                            title={copied === "phone" ? "Copiado!" : "Copiar telefone"}
                        >
                            <HiOutlinePhone />
                        </button>
                    </div>
                </div>
            </nav>
            <hr/>
            <p className="footer-copyright">&copy; 2026 All rights reserved - Mind</p>
        </footer>
    </>
  )
}