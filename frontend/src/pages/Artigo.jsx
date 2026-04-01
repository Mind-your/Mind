import { HiOutlineReply } from "react-icons/hi";
import { FaThumbsUp, FaEye } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/styles/artigos/artigo.css";
import "../assets/styles/artigos/cards-artigos.css";
import imgWallpaper from "../assets/img/article01.jpg";

export default function Artigo() {
  const navigate = useNavigate();

  const artigo = {
        id: 1,
        titulo: "Titulo",
        autor: "Author",
        data: "00/00/0000",
        likes: 0,
        views: 0,
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut molestias qui mollitia soluta commodi quisquam cupiditate debitis nihil sapiente, officia rerum fugit, pariatur dolor a possimus dicta aspernatur. Reprehenderit quisquam dolor ipsam corporis placeat eos officiis nihil. Adipisci debitis eum quidem eveniet, dolorem ea, repudiandae eligendi mollitia quod inventore ab iure suscipit ipsum velit corrupti illum iusto a laboriosam numquam, aliquam provident. Tempore officiis ipsa dignissimos velit perspiciatis voluptas quia eos recusandae asperiores in atque cupiditate placeat totam similique magni, quo aspernatur odio sequi quasi quidem aperiam dolores. Ducimus unde accusamus delectus ipsum optio natus repudiandae aut perferendis assumenda doloribus!`,
        references: [
        "https://www.exemplo.com/referencia-1",
        "https://www.exemplo.com/referencia-2"
        ]
    
  };

  return (
    <main className="article-page">
      <div className="article-page-wrapper">
          <img
            src={imgWallpaper}
            alt="banner do artigo"
            className="article-banner"
          />

          <h1>{artigo.titulo}</h1>
          <div className="article-author">
            <p>
              <span>@{artigo.autor}</span>
              <span>•</span>
              <span>{artigo.data}</span>
            </p>
          </div>
          <hr />

          <div className="article-stats">
            <span><FaThumbsUp /> {artigo.likes}</span>
            <span><FaEye /> {artigo.views}</span>
          </div>
          <hr />

          <div className="article-content">
            <p>{artigo.text}</p>
          </div>

          <h2>Referências</h2>
          <ul>
            {artigo.references.map((ref, i) => (
              <li key={i}>
                <a href={ref} target="_blank">
                  {ref}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="button-proceed"
            onClick={() => navigate("/artigos")}>
            <HiOutlineReply /> Voltar
          </button>

      </div>

    </main>
  );
}