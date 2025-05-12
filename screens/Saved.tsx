import {ScrollView, StyleSheet, View} from 'react-native';
import FilterButtons from '../components/FilterButtons';
import colors from '../styles/color';
import {Products} from '../components/Products';
import ProtectedRoute from '../components/ProtectedRoute';

export const Saved = () => {
  return (
    <ProtectedRoute>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <FilterButtons />
          <Products page="saved" />
        </View>
      </ScrollView>
    </ProtectedRoute>
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
    padding: 10,
  },
});
