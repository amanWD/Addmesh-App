import Toast from 'react-native-toast-message';
import api from './api';

export const toggleSave = async (
  id: string,
  setLoadingSave: any,
  refetch?: any,
) => {
  setLoadingSave(true);
  const response = await api
    .post(`saved/toggleSaveProduct/`, {
      product_id: id,
    })
    .then(() => {
      refetch();
      setLoadingSave(false);
      Toast.show({type: 'success', text1: 'Successfully Saved!'});
    })
    .catch(() => {
      Toast.show({
        type: 'error',
        text1: 'Failed to save',
        text2: 'You must have and account!',
      });
      setLoadingSave(false);
    });
};
