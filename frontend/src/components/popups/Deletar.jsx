import { HiOutlineX } from "react-icons/hi";
import "../../assets/styles/popups/deletar.css";

export default function Deletar({ 
  open = false, 
  close = () => {}, 
  onConfirm = () => {}, 
  loading = false,
  title = "Deletar conta",
  message = "Você tem certeza de que quer deletar a sua conta. Isso resultará na exclusão de seus dados, visibilidade aos psicólogos e qualquer informação adquirida pelo usuário durante a utilização da plataforma",
  confirmText = "Confirmar"
}) {
  if (!open) return null;
  
  const handleConfirm = () => {
    onConfirm();
  };
  
  return (
    <>
      <div className="pop-up-backdrop" onClick={close}></div>
      <div className="pop-up-deletar">
          <button 
            className="btn-cancelar-pop-up-deletar" 
            onClick={close}
            disabled={loading}>
            <HiOutlineX />
          </button>
          <h1>{title}</h1>
          <span>{message}</span>
          <button 
            id='btnADeletarPerfil' 
            className="btn-deletar button-proceed"
            onClick={handleConfirm}
            disabled={loading}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Processando...' : confirmText}
          </button>
      </div>
    </>
  )
}