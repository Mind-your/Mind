import "../../assets/styles/artigos/articles-sidebar.css";
import { AiOutlineLike } from "react-icons/ai";

export default function ArticlesMostLiked({ articles }) {
  const topLiked = articles
    .slice()
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 4);

  return (
    <aside className="sidebar-box">
      <div className="sidebar-header">
        <AiOutlineLike className="sidebar-icon" />
        <h3>ARTIGOS MAIS CURTIDOS</h3>
      </div>

      <div className="sidebar-articles">
        {topLiked.map((article) => (
          <div key={article.id} className="sidebar-article-card">
            <img src={article.avatar} alt={article.autor} className="avatar" />
            <div className="sidebar-article-info">
              <h4>{article.title}</h4>
              <span className="like-count">
                <AiOutlineLike /> {article.likes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
