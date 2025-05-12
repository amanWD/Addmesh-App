import {useQuery} from '@tanstack/react-query';
import {format} from 'date-fns';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import EditedTag from '../../components/EditedTag';
import {useIdListStore} from '../../hooks/useIdListStore';
import api from '../../utils/api';
import BlogHeader from '../../components/Headers/BlogHeader';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Screen} from '../../components/Screen';
import {StackParamList} from '../../types/NavigationType';

type DetailRouteProp = RouteProp<StackParamList, 'BlogDetail'>;

export default function BlogDetail() {
  const route = useRoute<DetailRouteProp>();

  const {id} = route.params;

  const [blogId, setBlogId] = useState(id);

  const [loadingSave, setLoadingSave] = useState(false);

  const {idList, idType} = useIdListStore();

  const next = () => {
    const index = idList.indexOf(blogId);
    if (index === idList.length - 1) setBlogId(idList[0]);
    else setBlogId(idList[index + 1]);
  };

  const previous = () => {
    const index = idList.indexOf(blogId);
    if (index === 0) setBlogId(idList[idList.length - 1]);
    else setBlogId(idList[index - 1]);
  };

  const fetchBlogDetail = async () => {
    const response = await api.get(`library/blogAPI/blogs/${blogId}/`);
    return response;
  };

  const {data, isLoading, isError, error, isRefetching, refetch} = useQuery({
    queryKey: ['blog', 'detail', blogId],
    queryFn: fetchBlogDetail,
  });

  const navigation = useNavigation();

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({
      headerShown: false,
    });

    return () => {
      parent?.setOptions({
        headerShown: true,
      });
    };
  }, [navigation]);

  const readableCreatedDate =
    data?.data.created_at && !isNaN(new Date(data.data.created_at).getTime())
      ? format(new Date(data.data.created_at), 'PPP')
      : 'Unknown date';

  const readableUpdatedDate =
    data?.data.updated_at && !isNaN(new Date(data.data.updated_at).getTime())
      ? format(new Date(data.data.updated_at), 'PPP')
      : 'Unknown date';

  return (
    <Screen error={error} isError={isError} isLoading={isLoading} data={data}>
      <View style={styles.container}>
        <BlogHeader
          isSaved={data?.data.is_saved}
          id={blogId}
          refetch={refetch}
          loadingSave={loadingSave}
          setLoadingSave={setLoadingSave}
        />
        <ScrollView
          style={styles.Scrollcontainer}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={'black'}
            />
          }>
          <Text style={styles.title}>{data?.data.title}</Text>
          <Text style={styles.body}> {data?.data.description}</Text>
          {readableCreatedDate === readableUpdatedDate ? (
            <Text style={{alignSelf: 'flex-end'}}>{readableCreatedDate}</Text>
          ) : (
            <View
              style={{
                alignSelf: 'flex-end',
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text>{readableUpdatedDate}</Text>
              <EditedTag />
            </View>
          )}
          <Text style={{alignSelf: 'flex-end'}}>
            Author - {data?.data.author}
          </Text>
          <View
            style={{
              display:
                idList.length > 2 && idType === 'Blogs' ? 'flex' : 'none',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 30,
            }}>
            <TouchableOpacity style={styles.prevBtn} onPress={previous}>
              <Text>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextBtn} onPress={next}>
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edcef5',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  prevBtn: {
    backgroundColor: '#402000',
    borderRadius: 10,
    paddingVertical: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 40,
    zIndex: 10,
    opacity: 0.85,
  },
  nextBtn: {
    backgroundColor: '#402000',
    borderRadius: 10,
    paddingVertical: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 40,
    zIndex: 10,
    opacity: 0.85,
  },
  Scrollcontainer: {
    position: 'relative',
    padding: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
  },
  body: {
    fontSize: 18,
    fontWeight: '300',
    marginHorizontal: 8,
    marginVertical: 12,
  },
});
