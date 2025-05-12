import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../styles/color';

type CategoryDiamondProps = {
  setFilterQuery: (filterQuery: string) => void;
};

export const CategoryDiamond = ({setFilterQuery}: CategoryDiamondProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.archive}
        onPress={() => setFilterQuery('archive')}>
        <Text style={styles.archiveText}>Archive</Text>
      </TouchableOpacity>
      <View style={styles.diamondContainer}>
        <TouchableOpacity
          style={styles.diamond}
          onPress={() => setFilterQuery('revelation')}>
          <Text style={styles.diamondText}>REVELATION</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.diamond}
          onPress={() => setFilterQuery('alchemy')}>
          <Text style={styles.diamondText}>ALCHEMY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.diamond}
          onPress={() => setFilterQuery('gate')}>
          <Text style={styles.diamondText}>GATE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.diamond}
          onPress={() => setFilterQuery('metaphysics')}>
          <Text style={styles.diamondText}>METAPHYSICS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 380,
  },
  diamondContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
    transform: [{rotateZ: '45deg'}],
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
