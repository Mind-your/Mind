import "../assets/styles/addartigos/addartigos.css";
import FormArticle from "../components/addartigos/FormArticle";
import SkipNavigation from "../components/SkipNavigation";
import ArtigosPerfil from "../components/perfilpage/ArtigosPerfil";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getDefaultWallpaper } from "../utils/imageHelper";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { criarArtigo, atualizarArtigo, buscarPorId, uploadImagem } from "../services/artigoService";

export default function AddArtigos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const { user, loading } = useAuth();
  const [novaImagem, setNovaImagem] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [imgWallpaperArtigo, setImgWallpaperArtigo] = useState(
    getDefaultWallpaper(),
  ); // para wallpaper
  const initialArticleData = {
    id: "",
    titulo: "",
    artigo_texto: "",
    publicado: false,
    referencias: [
      {
        id: `ref-${Date.now()}`,
        nome_referencia: "",
        link: "",
      },
    ],
  };
  const [articleData, setArticleData] = useState(initialArticleData);

  const handleSubmitArticle = async (e) => {
    e.preventDefault();
    setSalvando(true);

    try {
      if (!articleData.titulo.trim() || !articleData.artigo_texto.trim()) {
        toast.error("Título e conteúdo do artigo é obrigatório");
        return;
      }

      const dados = {
        titulo: articleData.titulo,
        corpo: articleData.artigo_texto,
        publicado: articleData.publicado || false, // Assuming default is false or maintained
        referencias: articleData.referencias.filter(
          (ref) => ref.nome_referencia.trim() || ref.link.trim()
        )
      };

      let savedArticleId = id;

      if (isEdit) {
        await atualizarArtigo(id, dados);
        toast.success("Artigo atualizado!");
      } else {
        const response = await criarArtigo(dados);
        savedArticleId = response.id;
        toast.success("Artigo criado!");
      }

      // Upload image if a new image was selected
      if (novaImagem && savedArticleId) {
        await uploadImagem(savedArticleId, novaImagem);
      }

      setArticleData({
        id: "",
        titulo: "",
        artigo_texto: "",
        referencias: initialArticleData.referencias,
      });

      setImgWallpaperArtigo(getDefaultWallpaper());
      setNovaImagem(null);
      
      if (!isEdit) {
         navigate(`/artigos`); // O redirecionar para lista
      }
    } catch (error) {
      toast.error("Erro ao criar artigo");
    } finally {
      setSalvando(false);
    }
  };

  const getDadosArtigo = (imgWallpaper) => {
    return {
      ...articleData,
      imgWallpaper,
      autorId: user.id,
      criadoEm: new Date(),
      referencias: articleData.referencias.filter(
        (ref) => ref.nome_referencia.trim() || ref.link.trim(),
      ),
    };
  };

  useEffect(() => {
    if (!id) {
      // Para zerar caixa de textos de informações ao voltar a página
      setArticleData(initialArticleData);
      setImgWallpaperArtigo(getDefaultWallpaper());
      setNovaImagem(null);
      return;
    }

    const carregarArtigo = async () => {
      try {
        const response = await buscarPorId(id);
        
        const artigoCarregado = {
          id: response.id,
          titulo: response.titulo,
          artigo_texto: response.corpo,
          publicado: response.publicado,
          referencias: response.referencias && response.referencias.length > 0 
            ? response.referencias 
            : initialArticleData.referencias
        };

        if (response.imagem) {
            setImgWallpaperArtigo(`http://localhost:8080/api/images/articles/${response.imagem}`);
        }

        setArticleData(artigoCarregado);
      } catch (error) {
        toast.error("Erro ao carregar artigo");
      }
    };
    carregarArtigo();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setArticleData((prev) => ({
      ...prev,
      [id]: e.target.type === 'checkbox' ? e.target.checked : value,
    }));
  };

  const handleNewImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB");
      return;
    }

    // Validar tipo
    if (!file.type.startsWith("image/")) {
      toast.error("Selecione uma imagem válida");
      return;
    }

    setNovaImagem(file);
    setImgWallpaperArtigo(URL.createObjectURL(file)); // Criar preview local da nova imagem
  };

  const newCardReference = () => {
    setArticleData((prev) => ({
      ...prev,
      referencias: [
        ...prev.referencias,
        { id: `ref-${Date.now()}`, nome_referencia: "", link: "" },
      ],
    }));
  };

  const removeCardReference = (id) => {
    setArticleData((prev) => ({
      ...prev,
      referencias: prev.referencias.filter((card) => card.id !== id),
    }));
  };

  const handleReferenceChange = (id, type, value) => {
    setArticleData((prev) => ({
      ...prev,
      referencias: prev.referencias.map((card) =>
        card.id === id ? { ...card, [type]: value } : card,
      ),
    }));
  };

  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <SkipNavigation mainContent="formPageArticle" />
      <section className="config">
        <div className="container-section">
          <div className="container-edit-artigo">
            <h3>Indice</h3>
            <nav aria-label="Seções das artigos ">
              <ul className="atalhos">
                <li>
                  <a href="#formPageArticle" id="novoArtigo">
                    Novo Artigo
                  </a>
                </li>
                <li>
                  <a href="#formPageReferences" id="referencias">
                    Referências
                  </a>
                </li>
                <li>
                  <a href="#artigosPublicados" id="artigosAnteriores">
                    Artigos anteriores
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="container-form-artigo">
            <FormArticle
              imgWallpaperArtigo={imgWallpaperArtigo}
              articleData={articleData}
              handleSubmitArticle={handleSubmitArticle}
              handleChange={handleChange}
              handleNewImage={handleNewImage}
              handleReferenceChange={handleReferenceChange}
              newCardReference={newCardReference}
              removeCardReference={removeCardReference}
              salvando={salvando}
            />
            <ArtigosPerfil />
          </div>
        </div>
      </section>
    </>
  );
}
