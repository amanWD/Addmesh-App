import {StyleSheet, Text, View} from 'react-native';
import colors from '../styles/color';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {useCategoryStore} from '../hooks/useCategoryStore';

export const Home = () => {
  const {t} = useTranslation();

  const {changeCategory} = useCategoryStore();

  useFocusEffect(
    useCallback(() => {
      changeCategory(null);
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text>{t('home')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
});
