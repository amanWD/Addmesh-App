import {format} from 'date-fns';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import EditedTag from '../EditedTag';
import {BlogType} from '../../types/ProductType';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../types/NavigationType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type NavigationProps = NativeStackNavigationProp<StackParamList>;

const BlogCard = ({
  id,
  title,
  created_at,
  updated_at,
  description,
  tag,
  is_saved,
}: BlogType) => {
  const readableCreatedDate = format(new Date(created_at), 'PPP');
  const readableUpdatedDate = format(new Date(updated_at), 'PPP');

  const {navigate} = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity
      onPress={() => navigate('BlogDetail', {id: id})}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title} </Text>
        {is_saved ? (
          <MaterialIcons name="bookmark" size={22} color="black" />
        ) : null}
      </View>
      <Text style={styles.body}>{description.slice(0, 200)}</Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{tag}</Text>
        {readableCreatedDate === readableUpdatedDate ? (
          <Text style={styles.footerText}>{readableCreatedDate}</Text>
        ) : (
          <View
            style={{
              alignSelf: 'flex-end',
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
            }}>
            <Text style={styles.footerText}>{readableUpdatedDate}</Text>
            <EditedTag />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 370,
    height: 'auto',
    backgroundColor: '#b191c7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    gap: 3,
  },
  title: {
    fontWeight: 500,
    fontSize: 22,
    padding: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    fontWeight: 400,
    fontSize: 16,
    color: '#3d3d3d',
  },
  footer: {
    display: 'flex',
    alignItems: 'flex-end',
    margin: 3,
  },
  footerText: {
    fontSize: 12,
  },
});

export default BlogCard;
