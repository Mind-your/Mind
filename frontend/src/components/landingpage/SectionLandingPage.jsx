import '../../assets/styles/landingpage/section.css';
import Hero from "../landingpage/Hero"
import Apresentacao from "../landingpage/Apresentacao"
import Caracteristicas from "../landingpage/Caracteristicas"
import Informacoes from "../landingpage/Informacoes"
import Perguntas from "../landingpage/Perguntas"
import Planos from "../landingpage/Planos"

import { Link } from 'react-router'

export default function Section() {
    return (
        <>
            <div className="section-landingpage">
                <Hero />
                <Apresentacao />
                <Caracteristicas />
                <Informacoes />
                <Planos />
                <Perguntas />
            </div>

        </>
    )
}
