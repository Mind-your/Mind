import { useState } from "react";
import { FaEye, FaThumbsUp } from "react-icons/fa";
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Deletar from "../popups/Deletar";
import "../../assets/styles/perfil/artigos-perfil.css";
import "../../assets/styles/ui/icons.css";

export default function ArtigosPerfil({ id }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [artigoSelecionado, setArtigoSelecionado] = useState(null); // Para verificar qual artigo está sendo deletado
  const [deletando, setDeletando] = useState(false);
  const [busca, setBusca] = useState("");
  const [artigos, setArtigos] = useState([
    {
      id: 1,
      titulo: "Titulo1",
      descricao:
        "Lorem ipsum dolor sit amet consectetur. Venenatis bibendum odio diam magna vitae sit urna molestie imperdie...",
      likes: 15,
      views: 20,
    },
    {
      id: 2,
      titulo: "Titulo2",
      descricao:
        "Lorem ipsum dolor sit amet consectetur. Venenatis bibendum odio diam magna vitae sit urna molestie imperdie...",
      likes: 15,
      views: 21,
    },
  ]); 


  const artigosFiltrados = artigos.filter((artigo) =>
    artigo.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  const removePublishedArticle = (id) => {
    setDeletando(true);
    setArtigos(artigos.filter((artigo) => artigo.id !== id));
    setDeletando(false);
  }

  return (
    <div className="artigos-container">

      <div className="artigos-header">
        <h2>Artigos Publicados</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar artigo..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <HiOutlineSearch />
        </div>
      </div>

      <div className="artigos-lista">
        {artigosFiltrados.map((artigo) => (
          <div className="artigo-card" key={artigo.id}>

            <div className="artigo-info">
              <h3>{artigo.titulo}</h3>

              <p>{artigo.descricao}</p>

              <div className="artigo-info-footer">
                <div className="artigo-stats">
                  <span>
                    <FaThumbsUp /> {artigo.likes}
                  </span>
                  <span>
                    <FaEye /> {artigo.views}
                  </span>
                </div>

                <div className="btns-articles-edit">

                  <button className="icon-attention" 
                    onClick={() => {
                      setIsOpen(true);
                      setArtigoSelecionado(artigo.id)
                    }} 
                    disabled={deletando}><HiOutlineTrash/>
                  </button>

                  <button 
                    className="icon-edit" 
                    onClick={() => navigate(`/adicionar-artigos/${artigo.id}`)}> 
                    <HiOutlinePencilAlt />
                  </button>

                  <button 
                    className="button-confirm button-ver-artigo" 
                    onClick={() => navigate(`/artigo/${artigo.id}`)}>
                      Ver
                  </button>
                </div>
              </div>
            </div>
            <Deletar 
                open={isOpen && artigoSelecionado === artigo.id} 
                close={() => {
                  setIsOpen(false);
                  setArtigoSelecionado(null);
                }}
                onConfirm={() => removePublishedArticle(artigo.id)}
                loading={deletando}
            />
          </div>
        ))}
      </div>
    </div>
  );
}