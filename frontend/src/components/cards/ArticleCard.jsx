import "../../assets/styles/artigos/article-card.css";
import { AiOutlineLike, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import FullArticle from "../pop-ups/FullArticle";

export default function ArticleCard({ article }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <article className="article-card">
                <div className="article-image-container">
                    <img src={article.img} alt={article.title} className="article-image" />
                </div>

                <div className="article-content">
                    <h2 className="article-title">{article.title}</h2>
                    <p className="article-description">{article.descricao}</p>

                    <div className="article-footer">
                        <div className="article-meta">
                            <img src={article.avatar} alt={article.autor} className="author-avatar" />
                            <div className="author-info">
                                <span className="author-name">{article.autor}</span>
                                <span className="article-date">{article.data}</span>
                            </div>
                        </div>
                    </div>
                    <div className="container-likes-view">
                        <div className="article-stats">
                            <div className="stat">
                                <AiOutlineLike className="stat-icon" />
                                <span>{article.likes}</span>
                            </div>
                            <div className="stat">
                                <AiOutlineEye className="stat-icon" />
                                <span>{article.views}</span>
                            </div>
                        </div>

                        <button
                            className="btn-see-more"
                            onClick={() => setIsOpen(true)}
                        >
                            Ver
                        </button>
                    </div>
                </div>
            </article>

            <FullArticle info={article} open={isOpen} close={() => setIsOpen(false)} />
        </>
    );
}
