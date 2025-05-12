import {ScrollView, StyleSheet, View} from 'react-native';
import FilterButtons from '../components/FilterButtons';
import colors from '../styles/color';
import {Products} from '../components/Products';

export const Library = () => {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <FilterButtons />
        <Products page="library" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: colors.secondary,
  },
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
