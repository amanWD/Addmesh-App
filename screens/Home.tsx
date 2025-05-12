import {StyleSheet, Text, View} from 'react-native';
import colors from '../styles/color';
import {useTranslation} from 'react-i18next';

export const Home = () => {
  const {t} = useTranslation();

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
