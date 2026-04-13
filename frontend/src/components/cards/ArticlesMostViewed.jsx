import "../../assets/styles/artigos/articles-sidebar.css";
import { AiOutlineEye } from "react-icons/ai";

export default function ArticlesMostViewed({ articles }) {
  const topViewed = articles
    .slice()
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  return (
    <aside className="sidebar-box">
      <div className="sidebar-header">
        <AiOutlineEye className="sidebar-icon" />
        <h3>ARTIGOS MAIS VISTOS</h3>
      </div>

      <div className="sidebar-articles">
        {topViewed.map((article) => (
          <div key={article.id} className="sidebar-article-card">
            <img src={article.avatar} alt={article.autor} className="avatar" />
            <div className="sidebar-article-info">
              <h4>{article.title}</h4>
              <span className="view-count">
                <AiOutlineEye /> {article.views}
              </span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
