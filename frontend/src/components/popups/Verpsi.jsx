import fotoDefault from '../../assets/img/perfil-default.png'
import Calendario from '../perfilpage/Calendario';
import "../../assets/styles/popups/verpsi.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
// import { listarTodosDoPsicologo } from "../../services/horarioService";
import { HiOutlineUser } from "react-icons/hi";
import { toast } from "react-toastify";

export default function VerPsi({ open = false, close = () => { }, perfil }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [selecionadoData, setSelecionadoData] = useState("");
  const [selecionadoHorario, setSelecionadoHorario] = useState("");
  const [selecionadoSemana, setSelecionadoSemana] = useState("");

  const tags = ["ansiedade", "depressão", "autoestima", "relacionamentos"];
  const mockHorarios = [
    { diaDaSemana: "Segunda", horaInicio: "08:00", ocupado: false },
    { diaDaSemana: "Segunda", horaInicio: "09:30", ocupado: true },
    { diaDaSemana: "Segunda", horaInicio: "10:00", ocupado: false },
    { diaDaSemana: "Terca", horaInicio: "08:00", ocupado: true },
    { diaDaSemana: "Terca", horaInicio: "11:20", ocupado: false },
  ];

  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [datasDisponiveis, setDatasDisponiveis] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const diasUnicos = [...new Set(agenda.map(a => a.diaDaSemana))];

  const getDatasPorSemana = (diaSemana) => {
    const diasMap = {
      Domingo: 0,
      Segunda: 1,
      Terca: 2,
      Quarta: 3,
      Quinta: 4,
      Sexta: 5,
      Sabado: 6
    };

    const hoje = new Date(); // data atual (fixa)

    let data = new Date(hoje); // iterador
    const limite = new Date(hoje); 
    limite.setMonth(limite.getMonth() + 2); // até onde se quer buscar (limite de três meses)

    const datas = []; 

    while (data <= limite) {
      if (data.getDay() === diasMap[diaSemana]) { // getDay() irá de 0 a 6 na semana
        const formatada = data.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit"
        });
        datas.push(formatada);
      }
      data.setDate(data.getDate() + 1);
    }

    return datas;
  };

  useEffect(() => { // fetch das informações dos psicologos
    (async () => {
      try {
        if (perfil?.id) {
            // const data = await listarTodosDoPsicologo(perfil.id);
            const data = mockHorarios // Simulando dados usando mock

            setAgenda(
              data.map(a => ({
                ...a,
                diaDaSemana: a.diaDaSemana,
                horaInicio: a.horaInicio,
                ocupado: a.ocupado ?? false,
              }))
            );
        }
      } catch (err) {
          console.log(err)
      }
    })()
  }, [perfil?.id])

  useEffect(() => { // Datas apartir da semana selecionada
    if (!selecionadoSemana) return;

    const datas = getDatasPorSemana(selecionadoSemana);
    setDatasDisponiveis(datas);

  }, [selecionadoSemana]);

  useEffect(() => { // Horario selecionado
    if (!selecionadoSemana) {
      setHorariosDisponiveis([]);
      return;
    }

    const filtrados = agenda.filter(
      (h) => h.diaDaSemana.toLowerCase() === selecionadoSemana.toLowerCase()
    );

    setHorariosDisponiveis(filtrados);
  }, [selecionadoSemana, agenda]);

  useEffect(() => { // Reset das informações
    setSelecionadoData("");
    setSelecionadoHorario("");
  }, [selecionadoSemana]);

  const handleAgendar = () => { // Simulando agendamento usando mock
    if (!selecionadoData || !selecionadoHorario ) {
      toast.warn("Selecione semana e horário");
      return;
    }

    setAgenda(prev =>
      prev.map(h =>
        h.horaInicio === selecionadoHorario &&
        h.diaDaSemana === selecionadoSemana
          ? { ...h, ocupado: true }
          : h
      )
    );

    // Dados selecionados para agendamento
    const dados = {
      data: selecionadoData,
      diaDaSemana: selecionadoSemana,
      horaInicio: selecionadoHorario,
      psicologoCRP: perfil.crp,
      ocupado: true
    }
    console.log(dados)

    alert("Agendado com sucesso!");
  };

  // Focus no pop-up
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Fechar com tecla esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [close]);

  // Scroll da página quando Pop-up aberto
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // não renderiza se modal fechado ou sem perfil
  if (!open || !perfil) return null;

  const handleOpenProfile = () => {
    navigate(`/perfil/psicologo/${perfil.id}`, { state: { perfil } });
  };

  return (
    <>
    <div className="pop-up-backdrop" onClick={close} aria-hidden="true"></div>
    <div 
      className="container-ver-psi"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      ref={inputRef}
      aria-label={`Preview informações do psciologo: ${perfil.nome || "Sem nome"}`}
    >
      <div className="container-info-psi">

        <div className="preview-dados-psi">
          <div className="container-dados">
            <h2>{perfil.nome || "Não informado"}</h2>
            <p><b>Idade:</b> {perfil.idade || "Não informado"}</p>
            <p><b>Local:</b> {perfil.local || "Não informado"}</p>
            <div className="perfil-psi-all-info">
              <button
                className="icon-btn icon-ui"
                onClick={handleOpenProfile}
                aria-label="Ver perfil completo do psicólogo"
              >
                <HiOutlineUser />
              </button>
              <p>CRP: {perfil.crp || "0000-000"}</p>
            </div>
          </div>
          <hr />
          <div className="container-conhecimentos">
            <h2>Conhecimentos:</h2>
            <div>
              {tags.length === 0 ? (
                <p style={{ margin: 0 }}>Nenhuma especialidade informada</p>
              ) : (
                tags.map((t, i) => (
                  <span key={i} className="tag-chip" data-speciality={t}>{t}</span>
                ))
              )}
            </div>
          </div>
        </div>
        
        <img 
          src={perfil.foto} 
          alt={`Foto de perfil - psicologo: ${perfil.nome || "Sem nome"}`} 
          onError={(e) => {
            e.target.src = fotoDefault;
        }}/>
      </div>

      {/* horarios e dinamicidade */}
      <section className="agenda-data-horario">
        <label htmlFor="semanas" className="label-agendamento">Dia da semana</label>
        <select 
          name="semanasAgendamento" 
          id="semanas"
          value={selecionadoSemana}
          onChange={(e) => setSelecionadoSemana(e.target.value)}
        >
          <option value="" disabled hidden>Escolher semana disponivel</option>
          {diasUnicos.map((semana, i) => (
            <option key={i} value={semana}>{
              (semana || "").charAt(0).toUpperCase() + (semana || "").slice(1)
            } - feira</option>
          ))}

        </select>
      </section>

      <section className="agenda-data-horario">
        <h3 className="label-agendamento">Dias disponiveis</h3>
        <div>
          {datasDisponiveis.map((d, i) => (
            <button 
              key={i} 
              className={`btn-data-agenda 
                ${selecionadoData == d ? "selected" : ""}
              `}
              onClick={() => setSelecionadoData(d)} 
              aria-pressed={selecionadoData === d}>{d}</button>
          ))}
        </div>
      </section>

      <section className="agenda-data-horario">
        <h3 className="label-agendamento">Horários</h3>
        <div>
          {horariosDisponiveis.map((h, i) => (
            <button 
              key={i} 
              className={`btn-data-agenda 
                ${selecionadoHorario === h.horaInicio ? "selected" : ""} 
                ${h.ocupado ? "disabled" : ""}`}
              disabled={h.ocupado}
              onClick={() => !h.ocupado && setSelecionadoHorario(h.horaInicio)}
              aria-pressed={selecionadoHorario === h.horaInicio}>{h.horaInicio}</button>
          ))}
        </div>
      </section>

      <div className="container-legenda-horarios">
        <div className="tag-legenda">
          <span className="color-tag-ocupado"></span>
          <p>Ocupado</p>
        </div>
        <div className="tag-legenda">
          <span className="color-tag-livre"></span>
          <p>Em aberto</p>
        </div>
        <div className="tag-legenda">
          <span className="color-tag-seleacionado"></span>
          <p>Selecionado</p>
        </div>
      </div>
      <div className="btn-agendar-cancelar">
        <button className="button-cancelar" onClick={close} aria-label="Fechar">Cancelar</button>
        <button className="button-confirm" onClick={() => handleAgendar()}>Agendar</button>
      </div>
    </div>
    </>
  )
}
