'use client';

import { useEffect, useState } from 'react';
import Dado from './Dado';

const TOTAL_RODADAS = 5;

function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

function estadoInicial() {
  return {
    rodada: 1,
    dadosJogador1: [null, null],
    dadosJogador2: [null, null],
    turno: 1, // 1 = vez do jogador 1, 2 = vez do jogador 2, 0 = ninguém (processando)
    placar: { jogador1: 0, jogador2: 0, empates: 0 },
    mensagem: '',
    resolvendoRodada: false,
    jogoFinalizado: false,
    mensagemFinal: '',
  };
}

export default function JogoDados() {
  const [estado, setEstado] = useState(estadoInicial);

  // Avança automaticamente para a próxima rodada depois de mostrar o
  // resultado da rodada atual (quando ainda não é a última rodada).
  useEffect(() => {
    if (!estado.resolvendoRodada) return;

    const timer = setTimeout(() => {
      setEstado((prev) => ({
        ...prev,
        rodada: prev.rodada + 1,
        dadosJogador1: [null, null],
        dadosJogador2: [null, null],
        turno: 1,
        mensagem: '',
        resolvendoRodada: false,
      }));
    }, 1400);

    return () => clearTimeout(timer);
  }, [estado.resolvendoRodada]);

  function jogar(jogador) {
    setEstado((prev) => {
      if (prev.jogoFinalizado || prev.resolvendoRodada) return prev;
      if (jogador !== prev.turno) return prev;

      const novosDados = [rolarDado(), rolarDado()];

      // Jogador 1 joga primeiro: apenas registra os dados e passa a vez.
      if (jogador === 1) {
        return {
          ...prev,
          dadosJogador1: novosDados,
          turno: 2,
        };
      }

      // Jogador 2 joga: com os dois resultados, apura a rodada.
      const somaJogador1 = prev.dadosJogador1[0] + prev.dadosJogador1[1];
      const somaJogador2 = novosDados[0] + novosDados[1];

      const placar = { ...prev.placar };
      let mensagem;

      if (somaJogador1 > somaJogador2) {
        mensagem = 'Jogador 1 venceu';
        placar.jogador1 += 1;
      } else if (somaJogador2 > somaJogador1) {
        mensagem = 'Jogador 2 venceu';
        placar.jogador2 += 1;
      } else {
        mensagem = 'Empate';
        placar.empates += 1;
      }

      const eraUltimaRodada = prev.rodada >= TOTAL_RODADAS;

      if (eraUltimaRodada) {
        let mensagemFinal;
        if (placar.jogador1 > placar.jogador2) {
          mensagemFinal = 'Jogador 1 venceu o jogo';
        } else if (placar.jogador2 > placar.jogador1) {
          mensagemFinal = 'Jogador 2 venceu o jogo';
        } else {
          mensagemFinal = 'Empate Geral';
        }

        return {
          ...prev,
          dadosJogador2: novosDados,
          placar,
          mensagem,
          turno: 0,
          jogoFinalizado: true,
          mensagemFinal,
        };
      }

      return {
        ...prev,
        dadosJogador2: novosDados,
        placar,
        mensagem,
        turno: 0,
        resolvendoRodada: true,
      };
    });
  }

  function jogarNovamente() {
    setEstado(estadoInicial());
  }

  const {
    rodada,
    dadosJogador1,
    dadosJogador2,
    turno,
    mensagem,
    jogoFinalizado,
    mensagemFinal,
  } = estado;

  return (
    <div className="jogo-container">
      <h1 className="titulo">Jogo de Dados</h1>
      <p className="rodada">
        Rodada <strong>{rodada}</strong>/{TOTAL_RODADAS}
      </p>

      <div className="jogadores">
        <div className="jogador-col">
          <h2>Jogador 1</h2>
          <div className="dados-row">
            <Dado valor={dadosJogador1[0]} />
            <Dado valor={dadosJogador1[1]} />
          </div>
          <button
            className="btn-jogar"
            onClick={() => jogar(1)}
            disabled={jogoFinalizado || turno !== 1}
          >
            Jogar
          </button>
        </div>

        <div className="divisor" />

        <div className="jogador-col">
          <h2>Jogador 2</h2>
          <div className="dados-row">
            <Dado valor={dadosJogador2[0]} />
            <Dado valor={dadosJogador2[1]} />
          </div>
          <button
            className="btn-jogar"
            onClick={() => jogar(2)}
            disabled={jogoFinalizado || turno !== 2}
          >
            Jogar
          </button>
        </div>
      </div>

      <div className="mensagem-box">
        {jogoFinalizado ? mensagemFinal : mensagem || 'Aguardando jogada...'}
      </div>

      {jogoFinalizado && (
        <button className="btn-jogar-novamente" onClick={jogarNovamente}>
          Jogar novamente
        </button>
      )}
    </div>
  );
}
