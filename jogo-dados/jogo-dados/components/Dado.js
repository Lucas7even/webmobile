export default function Dado({ valor }) {
  const valorValido = Number.isInteger(valor) && valor >= 1 && valor <= 6;
  const src = valorValido ? `/dados/${valor}.svg` : '/dados/vazio.svg';
  const alt = valorValido ? `Dado com valor ${valor}` : 'Dado ainda não jogado';

  return (
    <div className="dado">
      <img src={src} alt={alt} width={64} height={64} />
    </div>
  );
}
