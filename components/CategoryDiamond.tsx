import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../styles/color';
import {useCategoryStore} from '../hooks/useCategoryStore';

export const CategoryDiamond = () => {
  const {changeCategory} = useCategoryStore();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.archive}
        onPress={() => changeCategory('Archive')}>
        <Text style={styles.archiveText}>Archive</Text>
      </TouchableOpacity>
      <View style={styles.diamondContainer}>
        <TouchableOpacity
          style={styles.diamond}
          onPress={() => changeCategory('Divine Revelation')}>
          <Text style={styles.diamondText}>DIVINE REVELATION</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.diamond}
          onPress={() => changeCategory('Oneness')}>
          <Text style={styles.diamondText}>ONENESS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.diamond}
          onPress={() => changeCategory('Chronicle of Creation')}>
          <Text style={styles.diamondText}>CHRONICLE OF CREATION</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.diamond}
          onPress={() => changeCategory('Sacred Blueprint')}>
          <Text style={styles.diamondText}>SACRED BLUEPRINT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 380,
    marginVertical: 100,
  },
  diamondContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
    transform: [{rotateZ: '45deg'}],
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,

    // Android shadow
    elevation: 5,
  },
  diamond: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 135,
    height: 135,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  diamondText: {
    fontWeight: 700,
    textAlign: 'center',
    color: colors.secondary,
    transform: [{rotateZ: '-45deg'}],
  },
  archive: {
    position: 'absolute',
    top: -50,
    right: 20,
  },
  archiveText: {
    fontWeight: 700,
    color: colors.purple,
  },
});
