import {create} from 'zustand';

type Chapter = {
  name: string;
  playlist: string[];
};

type PlaylistStoreType = {
  id: string;
  setId: (id: string) => void;
  chapter: Chapter[];
  setChapter: (chapter: Chapter[]) => void;
  currentAudioIndex: number;
  setCurrentAudioIndex: (currentAudioIndex: number) => void;
  currentChapterIndex: number;
  setCurrentChapterIndex: (currentChapterIndex: number) => void;
};

export const usePlaylistStore = create<PlaylistStoreType>(set => ({
  id: '',
  setId(id) {
    set({id: id});
  },
  chapter: [],
  setChapter(chapter: Chapter[]) {
    set({chapter: chapter, currentAudioIndex: 0, currentChapterIndex: 0});
  },
  currentAudioIndex: 0,
  setCurrentAudioIndex(currentAudioIndex) {
    set({currentAudioIndex: currentAudioIndex});
  },
  currentChapterIndex: 0,
  setCurrentChapterIndex(currentChapterIndex) {
    set({currentChapterIndex: currentChapterIndex});
  },
}));
