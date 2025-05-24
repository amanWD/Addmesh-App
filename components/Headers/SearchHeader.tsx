import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SearchHeader = ({query, setQuery}: {query: string; setQuery: any}) => {
  const {goBack} = useNavigation();
  const {top} = useSafeAreaInsets();

  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  }, []);

  return (
    <View style={[styles.container, {height: 80 + top}]}>
      <TouchableOpacity style={styles.backBtn} onPress={() => goBack()}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>
      <View style={styles.searchInputContainer}>
        <MaterialIcons name="search" size={24} color="black" />
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          value={query}
          onChangeText={text => setQuery(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 10,
    backgroundColor: '#b088ba',
    width: '100%',
    paddingBottom: 10,
  },
  backBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
  },
  searchBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
  },
  searchBtnText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#552f6e',
  },
  searchInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#a074ab',
    width: 330,
    height: 35,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  searchInput: {
    fontSize: 20,
    height: '90%',
    width: '90%',
    paddingHorizontal: 5,
  },
});

export default SearchHeader;
