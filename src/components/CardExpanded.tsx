import Image from 'next/image';

export default function CardExpanded() {
  const x = 1222;
  const y = x / 0.76375;

  return (
    <div className="h-full m-2 flex bg-zinc-800 p-8">
      <div className="mr-8">
        <Image
          src="https://rpg-catalog-bucket.s3.amazonaws.com/upload/dnd_handbook.jpg"
          alt="DnD Players Handbook face cover"
          width={x}
          height={y}
        />
      </div>

      <div className="flex flex-col rounded-xl px-3">
        <b className="text-5xl font-serif">Dungeons & Dragons</b>

        <hr className="mt-2" />
        <p className="mt-8 mb-12">
          Dungeons & Dragons (comumente abreviado como D&D ou DnD) é um RPG de mesa com gênero de
          fantasia, foi originalmente criado e projetado por Gary Gygax e Dave Arneson. O jogo foi
          publicado pela primeira vez em 1974 por Tactical Studies Rules, Inc. Atualmente vem sendo
          publicado pela Wizards of the Coast, que desde 1997 se tornou uma subsidiária da Hasbro. O
          jogo foi derivado de jogos de guerra em miniatura, uma variação do jogo Chainmail de 1971
          serviu como o sistema de regras inicial. A publicação de D&D é comumente reconhecida como
          o início do RPG moderno e da indústria de RPG, e também influenciou profundamente os
          videogames, especialmente o gênero RPG.
        </p>

        <b>Como começar a jogar?</b>
        <p className="mb-8">
          Para jogar uma sessão de Dungeons & Dragons é necessário de um mínimo de duas pessoas, uma
          para ser o &quot;mestre&quot; e outra para ser um jogador. O mestre é como um narrador de
          história, ele dita o que está acontecendo em cada etapa do jogo e os jogadores agem para
          dar continuidade a história, indicando o que querem fazer para o mestre enquanto ele narra
          as consequências de cada ação feita pelos jogadores. É importante que os jogadores tenham
          noção das regras, mas o mais crucial é que o mestre tenha um entedimento das regras para
          aplicar durante a sessão e tirar dúvidas dos jogadores.
        </p>

        <strong>FAQ / Dicas</strong>
        <p className="mt-1 mb-4">
          <b>Preciso de dados para jogar?</b> Você precisa de dados para jogar, mas não precisa ter
          eles fisicamente. Apesar de ser divertido jogar dados, você pode usar as diversas
          ferramentas online para rodar todos os dados necessários (
          <a className="text-red-400" href="https://rolladie.net/roll-a-d20-die">
            como esta
          </a>
          ), o seu mestre vai avisar sempre que precisar rolar algum tipo de dado.
        </p>
        <p className="mb-4">
          <b>Posso jogar com até quantas pessoas?</b> O ideal é um grupo entre 4 a 6 pessoas,
          contando com o mestre, mas é possível jogar com bem mais pessoas!
        </p>

        <ul>
          <li>
            <b className="mr-1">Sistema:</b> d20
          </li>
          <li>
            <b className="mr-1">Última edição:</b> 5 edição
          </li>
          <li>
            <b className="mr-1">Ano de publicação:</b> 1974
          </li>
          <li>
            <b className="mr-1">Número de jogadores:</b> Mínimo 2
          </li>
        </ul>
      </div>
    </div>
  );
}
