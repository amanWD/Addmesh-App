export type Playlist = {
  url: string;
  title: string;
  duration: number;
};

export type Chapter = {
  name: string;
  playlist: Playlist[];
};

export type Track = {
  id: string;
  url: string;
  title: string;
  duration: number;
};
