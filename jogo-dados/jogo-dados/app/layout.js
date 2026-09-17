import './globals.css';

export const metadata = {
  title: 'Jogo de Dados',
  description: 'Jogo de dados entre 2 jogadores, disputado em 5 rodadas.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
