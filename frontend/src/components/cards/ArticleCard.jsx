import "../../assets/styles/artigos/article-card.css";
import { AiOutlineLike, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultArticleImg from "../../assets/img/articles.png";
import DefaultProfileImg from "../../assets/img/perfil-default.png";

export default function ArticleCard({ article }) {
    const navigate = useNavigate();

    const articleImg = article.imagem 
        ? `http://localhost:8080/api/images/articles/${article.imagem}` 
        : DefaultArticleImg;

    const authorImg = article.autorAvatar 
        ? `http://localhost:8080/api/images/${article.autorAvatar}` 
        : DefaultProfileImg;

    const formattedDate = article.dataCriacao 
        ? new Date(article.dataCriacao).toLocaleDateString('pt-BR') 
        : "";

    return (
        <article className="article-card">
            <div className="article-image-container">
                <img src={articleImg} alt={article.titulo} className="article-image" />
            </div>

            <div className="article-content">
                <h2 className="article-title">{article.titulo}</h2>
                <p className="article-description">
                    {article.corpo?.length > 240 
                        ? `${article.corpo.substring(0, 220)}...` 
                        : article.corpo}
                </p>

                <div className="article-footer">
                    <div className="article-meta">
                        <img src={authorImg} alt={article.autorNome} className="author-avatar" />
                        <div className="author-info">
                            <span className="author-name">@{article.autorNome}</span>
                            <span className="article-date">{formattedDate}</span>
                        </div>
                    </div>
                </div>
                <div className="container-likes-view">
                    <div className="article-stats">
                        <div className="stat">
                            <AiOutlineLike className="stat-icon" id="IconLike" />
                            <span>{article.likes || 0}</span>
                        </div>
                        <div className="stat">
                            <AiOutlineEye className="stat-icon" id="IconView"/>
                            <span>{article.views || 0}</span>
                        </div>
                    </div>

                    <button
                        className="btn-see-more"
                        onClick={() => navigate(`/artigo/${article.id}`)}
                    >
                        Ver
                    </button>
                </div>
            </div>
        </article>
    );
}
