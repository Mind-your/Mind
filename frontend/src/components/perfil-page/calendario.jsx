import React, { useState } from "react";
import "../../assets/styles/perfil.css";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

const consultasPadrao = {
  "2026-03-21": ["12:13", "14:30"],
  "2026-04-22": ["10:15"],
  "2026-04-24": ["09:00", "10:00", "16:45"],
  "2026-04-25": ["21:00"]
};

function formatDia(date) {
  return date.toISOString().split("T")[0];
}

function gerarDiasCalendario(data) {
  const ano = data.getFullYear();
  const mes = data.getMonth();

  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes + 1, 0);

  const dias = [];

  const inicio = primeiroDia.getDay();
  const totalDias = ultimoDia.getDate();

  for (let i = 0; i < inicio; i++) {
    dias.push(null);
  }

  for (let i = 1; i <= totalDias; i++) {
    dias.push(new Date(ano, mes, i));
  }

  return dias;
}

export default function Calendario() {

  const hoje = new Date();

  const [mesAtual, setMesAtual] = useState(new Date());
  const [consultas] = useState(consultasPadrao);
  const [modalAberto, setModalAberto] = useState(false);
  const [diaModal, setDiaModal] = useState(null);

  const diasCalendario = gerarDiasCalendario(mesAtual);

  function mesAnterior() {
    const novaData = new Date(mesAtual);
    novaData.setMonth(novaData.getMonth() - 1);
    setMesAtual(novaData);
  }

  function mesProximo() {
    const novaData = new Date(mesAtual);
    novaData.setMonth(novaData.getMonth() + 1);
    setMesAtual(novaData);
  }

  function abrirModal(dia) {
    setDiaModal(formatDia(dia));
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function renderHorariosModal() {
    if (!diaModal) return null;

    const horarios = consultas[diaModal] || [];

    if (horarios.length === 0) {
      return <p>Nenhum horário registrado</p>;
    }

    return horarios
      .slice()
      .sort((a, b) => a.localeCompare(b))
      .map((h, i) => (
        <div key={i} className="horario ocupado-modal">
          {h}
        </div>
      ));
  }

  return (
    <div className="container-calendario">

      <h1>Agenda</h1>

      <div className="header-calendario">

        <button onClick={mesAnterior} className="button-seta-calendario">
          <HiChevronLeft />
        </button>

        <h2>
          {mesAtual.toLocaleString("pt-BR", {
            month: "long",
          })}
        </h2>

        <button onClick={mesProximo} className="button-seta-calendario">
          <HiChevronRight />
        </button>

      </div>

      <div className="grid-calendario">

        {diasSemana.map((dia, i) => (
          <div key={i} className="dia-semana">
            {dia}
          </div>
        ))}

        {diasCalendario.map((dia, i) => {

          const isHoje =
            dia &&
            dia.getDate() === hoje.getDate() &&
            dia.getMonth() === hoje.getMonth() &&
            dia.getFullYear() === hoje.getFullYear();

          const horarios = dia ? consultas[formatDia(dia)] || [] : [];

          return (
            <div
              key={i}
              className={`dia-calendario ${isHoje ? "dia-hoje" : ""}`}
              onClick={() => dia && abrirModal(dia)}
            >

              <div className="numero-dia">
                {dia ? dia.getDate() : ""}
              </div>

             

                {horarios.slice(0, 2).map((h, idx) => (
                  <div key={idx} className="horario ocupado">
                    {h}
                  </div>
                ))}

                {horarios.length > 2 && (
                  <div className="mais-horarios">
                    +{horarios.length - 2} mais
                  </div>
                )}

              </div>

            
          );
        })}

      </div>

      {modalAberto && (
        <div
          className="modal"
          onClick={(e) => {
            if (e.target.className === "modal") fecharModal();
          }}
        >

          <div className="modal-content">

            <span className="fechar" onClick={fecharModal}>
              &times;
            </span>

            <h2>{diaModal}</h2>

            <div className="modal-horarios">
              {renderHorariosModal()}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}