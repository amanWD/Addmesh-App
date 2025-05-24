import Toast from 'react-native-toast-message';
import api from './api';

export const toggleSave = async (
  id: string,
  setLoadingSave: any,
  refetch?: any,
) => {
  setLoadingSave(true);
  const response = await api.post(`saved/toggleSaveProduct/`, {
    product_id: id,
  });
  return response;
};
