import {create} from 'zustand';
import {ProductType} from '../types/ProductType';

type IdListType = {
  idList: string[];
  setIdList: (idList: string[]) => void;

  idType: ProductType | null;
  setIdType: (type: ProductType | null) => void;
};

export const useIdListStore = create<IdListType>(set => ({
  idList: [],
  idType: null,

  setIdList: (idList: string[]) => {
    set({idList: idList});
  },
  setIdType: (type: ProductType | null) => {
    set({idType: type});
  },
}));
