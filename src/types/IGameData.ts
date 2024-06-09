export type IGameData = {
  id: string;
  title: string;
  description: string;
  cover_path: string;
  GameTheme: {
    theme: {
      name: string;
    };
  }[];
  gameplay_focus: string;
  dice: string;
};
