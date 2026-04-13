import "../../assets/styles/artigos/cards-artigos.css";
import "../../assets/styles/pop-ups/full-article.css";
import FullArticle from "../pop-ups/FullArticle";
import { useState } from "react";

export default function CardArtigos({ info, styleArticle = "row" }) {
  const [isOpen, setIsOpen] = useState(false);

  const isDestaque = styleArticle === "column";

  return (
    <>
      <article
        className="artigo-container"
        style={{ flexDirection: isDestaque ? "column" : "row" }}
      >
        <img
          src={info.img}
          alt="imagem de artigo"
          className="img-artigos"
          style={{ width: isDestaque ? "100%" : "clamp(100px, 20vw, 150px)" }}
        />

        <div className="artigo-texto">
          <div className="visible">
            <span>
              <h3>{info.title}</h3>
              <p>{info.autor}</p>
            </span>
            <button
              type="button"
              className="artigo-btn button-proceed"
              onClick={() => setIsOpen(true)}
            >
              Ver
            </button>
          </div>
        </div>

        <FullArticle info={info} open={isOpen} close={() => setIsOpen(false)} />
      </article>
    </>
  );
}