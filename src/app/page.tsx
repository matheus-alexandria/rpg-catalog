import Card from "@/components/Card";
import CardExpanded from "@/components/CardExpanded";
import Image from "next/image";


export default function Home() {
  return (
    <main className="w-screen h-screen flex">
      <div className="flex items-center justify-center">
        <CardExpanded />
      </div>
    </main>
  );
}
/**
 * title: Dungeons & Dragons
 * description: Dungeons & Dragons (commonly abbreviated as D&D or DnD)[2] is a fantasy tabletop role-playing game (RPG) originally created and designed by Gary Gygax and Dave Arneson.[3][4][5] The game was first published in 1974 by Tactical Studies Rules, Inc. (TSR).[5] It has been published by Wizards of the Coast, now a subsidiary of Hasbro, since 1997. The game was derived from miniature wargames, with a variation of the 1971 game Chainmail serving as the initial rule system.[4][6] D&D's publication is commonly recognized as the beginning of modern role-playing games and the role-playing game industry,[5][7] and also deeply influenced video games, especially the role-playing video game genre.
 * system: d20
 * latest_edition: 5th
 * publish_date: 1974
 * number_of_players: 2-?
 * 
 * 
 * title: Call of Cthulhu
 * description: Call of Cthulhu is a horror fiction role-playing game based on H. P. Lovecraft's story of the same name and the associated Cthulhu Mythos.[1] The game, often abbreviated as CoC, is published by Chaosium; it was first released in 1981 and is in its seventh edition, with licensed foreign language editions available as well. Its game system is based on Chaosium's Basic Role-Playing (BRP) with additions for the horror genre. These include special rules for sanity and luck.
 * system: d100
 * latest_edition: 7th
 * publish_date: 1981
 * number_of_players: 2-?
 */