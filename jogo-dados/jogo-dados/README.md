# 🎲 Jogo de Dados

Jogo de dados para 2 jogadores, disputado em 5 rodadas. Em cada rodada os
jogadores jogam dois dados; vence a rodada quem tiver a maior soma. Ao final
das 5 rodadas, vence a partida quem tiver vencido mais rodadas (ou há empate
geral).

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Estrutura

- `components/Dado.js` — recebe a prop `valor` (1 a 6, ou `null` antes da
  jogada) e exibe a imagem SVG correspondente (`public/dados/*.svg`).
- `components/JogoDados.js` — componente principal com toda a lógica do jogo
  (rodadas, turnos, placar, mensagens e reinício).
- `public/dados/` — imagens dos 6 dados + imagem "vazio" (dado ainda não
  jogado).
