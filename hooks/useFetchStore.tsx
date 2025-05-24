import {create} from 'zustand';

type UrlType =
  | 'blogAPI/blogs/'
  | 'ebookAPI/products/'
  | 'audioBookAPI/products/'
  | 'explanationAudioAPI/products/'
  | 'eventAPI/';
type nameType =
  | 'Blogs'
  | 'Ebooks'
  | 'Audio Books'
  | 'Explanation Audios'
  | 'Events';

type FetchType = {
  fetchData: {
    url: UrlType;
    name: nameType;
  };
  changeFetchData: (url: UrlType, name: nameType) => void;
};

export const useFetchStore = create<FetchType>(set => ({
  fetchData: {
    url: 'ebookAPI/products/',
    name: 'Ebooks',
  },
  changeFetchData: (url: UrlType, name: nameType) => {
    set({fetchData: {url: url, name: name}});
  },
}));
