import {useQuery} from '@tanstack/react-query';
import {useState, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import AudioBookCard from '../components/Card/AudioBookCard';
import BlogCard from '../components/Card/BlogCard';
import EBookCard from '../components/Card/EbookCard';
import ExplanationAudioCard from '../components/Card/ExplanationAudioCard';
import FilterButtons from '../components/FilterButtons';
import SearchHeader from '../components/Headers/SearchHeader';
import Loading from '../components/Loading';
import {useFetchStore} from '../hooks/useFetchStore';
import {useIdListStore} from '../hooks/useIdListStore';
import api from '../utils/api';
import EventCard from '../components/Card/EventCard';
import colors from '../styles/color';

export const Search = () => {
  const {setIdList} = useIdListStore();

  const {fetchData} = useFetchStore();

  const [query, setQuery] = useState('');

  const getAllId = () => {
    let idList: string[] = [];

    data?.data.map((product: any) => {
      idList = [...idList, product.id];
    });

    setIdList(idList);
  };

  const fetchProduct = async () => {
    const response = await api.get(`library/${fetchData.url}?search=${query}`);
    return response;
  };

  const {data, isLoading, isError, refetch, isRefetching, isFetching, error} =
    useQuery({
      queryKey: ['search', query, fetchData.name],
      queryFn: fetchProduct,
    });

  useEffect(() => {
    getAllId();
  }, [data]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <SearchHeader query={query} setQuery={setQuery} />
        <FilterButtons />
        <View style={styles.productContainer}>
          {query ? (
            data?.data.map((product: any, index: number) => {
              switch (fetchData.name) {
                case 'Blogs':
                  return <BlogCard {...product} key={index} />;
                case 'Ebooks':
                  return <EBookCard {...product} key={index} />;
                case 'Audio Books':
                  return <AudioBookCard {...product} key={index} />;
                case 'Explanation Audios':
                  return <ExplanationAudioCard {...product} key={index} />;
                case 'Events':
                  return <EventCard {...product} key={index} />;
                default:
                  return null;
              }
            })
          ) : isRefetching || isLoading || isFetching ? (
            <Loading size={32} color={colors.primaryBorder} />
          ) : data?.data.length === 0 && query ? (
            <Text>No Item Found!</Text>
          ) : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edcef5',
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productContainer: {
    paddingBottom: 100,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
    rowGap: 30,
  },
});
