import { useState } from "react";
import "../assets/styles/artigos/artigos.css";
import ArticleCard from "../components/cards/ArticleCard";
import ArticlesMostLiked from "../components/cards/ArticlesMostLiked";
import ArticlesMostViewed from "../components/cards/ArticlesMostViewed";
import { HiOutlineSearch } from "react-icons/hi";

import article01 from "../assets/img/article01.jpg";
import article02 from "../assets/img/article02.jpg";
import user01 from "../assets/img/perfil-default.png";

export default function Artigos() {
  const [searchText, setSearchText] = useState("");

  const articles = [
    {
      id: 1,
      img: article01,
      title: "Importância da consulta psicológica",
      autor: "@LuigiAmaral",
      avatar: user01,
      data: "12 Dez 2025",
      likes: 20,
      views: 100,
      descricao: "A saúde mental é essencial para o bem-estar. Entenda como a terapia pode ajudar no equilíbrio emocional.",
    },
    {
      id: 2,
      img: article02,
      title: "Números de emergência",
      autor: "@LuigiAmaral",
      avatar: user01,
      data: "10 Dez 2025",
      likes: 15,
      views: 80,
      descricao: "Conheça os principais números de emergência no Brasil e saiba como agir rapidamente.",
    },
    {
      id: 3,
      img: article01,
      title: "Saúde mental no dia a dia",
      autor: "@Maria",
      avatar: user01,
      data: "08 Dez 2025",
      likes: 30,
      views: 120,
      descricao: "Pequenas mudanças na rotina podem melhorar sua saúde mental e reduzir o estresse.",
    },
  ];

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchText.toLowerCase()) ||
    article.autor.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <main className="container-artigos">
      {/* SEARCH */}
      <div className="search-section">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Pesquisar por nome, autor..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <HiOutlineSearch className="search-icon" />
          </button>
        </form>
      </div>

      {/* CONTEÚDO */}
      <div className="articles-container">
        {/* SEÇÃO ESQUERDA - ARTIGOS PRINCIPAIS */}
        <div className="articles-main">
          <div className="articles-list">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="no-results">
                <p>Nenhum artigo encontrado</p>
              </div>
            )}
          </div>
        </div>

        {/* SEÇÃO DIREITA - SIDEBARS */}
        <aside className="articles-sidebar">
          <ArticlesMostLiked articles={articles} />
          <ArticlesMostViewed articles={articles} />
        </aside>
      </div>
    </main>
  );
}