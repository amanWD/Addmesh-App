export type BlogType = {
  id: string;
  title: string;
  description: string;
  tag: string;
  created_at: string;
  updated_at: string;
  isSaved: boolean;
};

export type EbookType = {
  id: string;
  title: string;
  description: string;
  image: string;
  price_in_etb: number;
  price_in_usd: number;
  created_at: string;
  updated_at: string;
  ebook_file: string;
  is_saved: boolean;
  is_bought: boolean;
};

export type AudioBookType = {
  id: string;
  title: string;
  description: string;
  image: string;
  price_in_etb: number;
  price_in_usd: number;
  created_at: string;
  updated_at: string;
  playlist: number[];
  is_saved: boolean;
  is_bought: boolean;
};

export type ExplanationAudioType = {
  id: string;
  title: string;
  description: string;
  image: string;
  price_in_etb: number;
  price_in_usd: number;
  created_at: string;
  updated_at: string;
  chapters: number[];
  is_saved: boolean;
  is_bought: boolean;
};

export type EventType = {
  id: string;
  title: string;
  description: string;
  number_of_rounds: number;
  number_of_sites: number;
  link: string;
  location: string;
  is_saved: boolean;
  is_bought: boolean;
  price_in_etb: number;
  price_in_usd: number;
  starting_time: string;
  ending_time: string;
  image: string;
};
