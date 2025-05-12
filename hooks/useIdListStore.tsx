import {create} from 'zustand';

type IdListType = {
  idList: string[];
  setIdList: (idList: string[]) => void;

  idType:
    | 'Blogs'
    | 'Ebooks'
    | 'Audio Books'
    | 'Explanation Audios'
    | 'Events'
    | null;
  setIdType: (
    type:
      | 'Blogs'
      | 'Ebooks'
      | 'Audio Books'
      | 'Explanation Audios'
      | 'Events'
      | null,
  ) => void;
};

export const useIdListStore = create<IdListType>(set => ({
  idList: [],
  idType: null,

  setIdList: (idList: string[]) => {
    set({idList: idList});
  },
  setIdType: (
    type:
      | 'Blogs'
      | 'Ebooks'
      | 'Audio Books'
      | 'Explanation Audios'
      | 'Events'
      | null,
  ) => {
    set({idType: type});
  },
}));
