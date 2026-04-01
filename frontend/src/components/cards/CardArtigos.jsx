import "../../assets/styles/artigos/cards-artigos.css"
import fotoPsi from '../../assets/img/perfil-default.png';
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaEye } from "react-icons/fa";

export default function CardArtigos({info, styleArticle = "row"}) {
  const navigate = useNavigate();

  // Preview do conteudo
  const conteudo = {
      titulo: "Titulo do Artigo",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor.",
      autor: "Psicólogo",
      data: "01/01/2024",
      likes: 0,
      views: 0,
      wallpaper_img: true
  };

  return (
    <>
      <article className="artigo-page-card" style={{flexDirection: info.id == 1 ? styleArticle : ""}}>
        <div className="artigo-banner">
          {conteudo.wallpaper_img ? (
            <img src={info.img} alt="banner do artigo" style={{
                width: 
                  info.id == 1 && styleArticle == "column" ? 
                  "100%" : 
                  "clamp(100px, 20vw, 150px)"}}/>
          ) : (
            <></>
          )}
        </div>

        <div className="artigo-content">
          <h2>{conteudo.titulo}</h2>

          <p className="artigo-descricao">{conteudo.descricao}</p>

          <div className="artigo-autor">
            <img id="perfilFoto" src={fotoPsi} alt="Foto do Psicólogo" className="foto-autor"/>
            <p>@{conteudo.autor} • {conteudo.data}</p>
          </div>

          <div className="artigo-footer">
            <div className="artigo-stats">
              <span><FaThumbsUp /> {conteudo.likes}</span>
              <span><FaEye /> {conteudo.views}</span>
            </div>

            <button onClick={() => navigate(`/artigo/1`)} className="btn-artigo button-proceed">
              Ver
            </button>
          </div>

        </div>
    </article>
    </>
  )
}
