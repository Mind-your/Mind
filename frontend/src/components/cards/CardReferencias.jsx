import { HiOutlineLink } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";

export default function CardReferencias({
    removeCard,
    articleData,
    handleReferenceChange
}) {
  return (
    <>
        <div className="container-referencias">
            <div>
                <label htmlFor="name-reference">Nome da Referência</label>
                <input 
                    id="name-reference" 
                    type="text" 
                    placeholder="Artigo acerca de..."
                    onChange={(e) => handleReferenceChange(articleData.id, 'name_reference', e.target.value)}
                    value={articleData.name_reference}
                />
            </div>

            <div>
                <label htmlFor="link-reference">Link</label>
                <input 
                    className="input-with-icon"
                    id="link-reference" 
                    placeholder="https://exemplo.com/artigo"
                    type="text" 
                    onChange={(e) => handleReferenceChange(articleData.id, 'link', e.target.value)}
                    value={articleData.link}
                />
            </div>
            <button 
                className="close-icon-reference-card"
                onClick={removeCard}>
                <HiOutlineX/>
            </button>
        </div>
    </>
  )
}
