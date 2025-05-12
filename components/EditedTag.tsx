import {View, Text, StyleSheet} from 'react-native';

const EditedTag = () => {
  return (
    <View style={styles.container}>
      <View style={styles.orangeTag}></View>
      <Text style={{fontSize: 12}}>edited</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  orangeTag: {
    width: 10,
    aspectRatio: 1,
    borderRadius: '50%',
    backgroundColor: 'orange',
  },
});

export default EditedTag;
