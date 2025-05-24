import {ScrollView, StyleSheet, View} from 'react-native';
import FilterButtons from '../components/FilterButtons';
import colors from '../styles/color';
import {Products} from '../components/Products';
import {useCallback, useEffect} from 'react';
import {useFetchStore} from '../hooks/useFetchStore';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import ProtectedRoute from '../components/ProtectedRoute';

export const MyShelf = () => {
  const {changeFetchData} = useFetchStore();
  const router = useRoute();

  useEffect(() => {}, [router.name]);

  // to prevent users from fetching blog (which doesn't exist on my shelf page)
  useFocusEffect(
    useCallback(() => {
      changeFetchData('ebookAPI/products/', 'Ebooks');
    }, []),
  );

  return (
    <ProtectedRoute>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <FilterButtons />
          <Products page="my-shelf" />
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
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
