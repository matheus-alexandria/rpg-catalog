export default function AddGameModal() {
  return (
    <div className="absolute h-80 w-96 left-1/2 top-1/2 bg-red-400">
      <h3>Adicionar novo jogo</h3>
      <form>
        <p>Insira o nome do RPG de mesa:</p>
        <input type="text" placeholder="Dungeons & Dragons"></input>
        <button>Criar</button>
      </form>
    </div>
  )
}