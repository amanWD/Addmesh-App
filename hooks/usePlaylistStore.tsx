import {create} from 'zustand';
import {Chapter} from '../types/PlaylistType';

type PlaylistStoreType = {
  trackImageUrl: string;
  setTrackImageUrl: (trackImageUrl: string) => void;
  chapters: Chapter[];
  setChapters: (chapter: Chapter[]) => void;
  currentAudioIndex: number;
  setCurrentAudioIndex: (currentAudioIndex: number) => void;
  currentChapterIndex: number;
  setCurrentChapterIndex: (currentChapterIndex: number) => void;
};

export const usePlaylistStore = create<PlaylistStoreType>(set => ({
  trackImageUrl: '',
  setTrackImageUrl(trackImageUrl) {
    set({trackImageUrl: trackImageUrl});
  },
  chapters: [],
  setChapters(chapter: Chapter[]) {
    set({chapters: chapter, currentAudioIndex: 0, currentChapterIndex: 0});
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
