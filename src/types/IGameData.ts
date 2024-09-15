export type IGameData = {
  id: string;
  title: string;
  description: string;
  cover_path: string;
  explanation?: string;
  game_themes: {
    theme: {
      name: string;
    };
  }[];
  gameplay_focus: string;
  dice: string;
};
