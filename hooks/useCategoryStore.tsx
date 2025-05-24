import {create} from 'zustand';

type CategoryType =
  | 'All'
  | 'Archive'
  | 'Chronicle of Creation'
  | 'Divine Revelation'
  | 'Sacred Blueprint'
  | 'Oneness'
  | null;

type CategoryStoreType = {
  category: CategoryType;
  changeCategory: (category: CategoryType) => void;
};

export const useCategoryStore = create<CategoryStoreType>(set => ({
  category: null,
  changeCategory(category) {
    set({category: category});
  },
}));
