import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CategoryDiamond} from './CategoryDiamond';
import {useEffect, useState} from 'react';
import {useFetchStore} from '../hooks/useFetchStore';
import {useIdListStore} from '../hooks/useIdListStore';
import api from '../utils/api';
import {useQuery} from '@tanstack/react-query';
import {Screen} from './Screen';
import BlogCard from './Card/BlogCard';
import EBookCard from './Card/EbookCard';
import AudioBookCard from './Card/AudioBookCard';
import ExplanationAudioCard from './Card/ExplanationAudioCard';

type ProductsProps = {
  page: 'library' | 'my-shelf' | 'saved';
};

export const Products = ({page}: ProductsProps) => {
  const [filterQuery, setFilterQuery] = useState('');

  const {fetchData} = useFetchStore();

  const [openModal, setOpenModal] = useState(false);

  const {setIdList, setIdType} = useIdListStore();

  const getAllId = () => {
    let idList: string[] = [];

    data?.data.map((product: any) => {
      idList = [...idList, product.id];
    });

    setIdType(fetchData.name);
    setIdList(idList);
  };

  const fetchProducts = async () => {
    const response = api.get(`${page}/${fetchData.url}`);
    return response;
  };

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['products', fetchData.name, page],
    queryFn: () => fetchProducts(),
  });

  useEffect(() => {
    getAllId();
  }, [data?.data]);

  useEffect(() => {
    setFilterQuery('');
  }, [page, fetchData]);

  return (
    <Screen isError={isError} error={error} isLoading={isLoading} data={data}>
      <TouchableOpacity
        style={styles.filter}
        onPress={() => setFilterQuery('')}>
        <Text>{filterQuery.toUpperCase()}</Text>
      </TouchableOpacity>
      <View style={styles.productContainer}>
        {filterQuery ||
        fetchData.name === 'Blogs' ||
        fetchData.name === 'Events' ? (
          data?.data
            .filter((product: any) => {
              if (fetchData.name === 'Blogs' || fetchData.name === 'Events') {
                return product;
              } else {
                return product?.category === filterQuery;
              }
            })
            .sort(
              (a: any, b: any) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
            )
            .map((product: any, index: number) => {
              switch (fetchData.name) {
                case 'Blogs':
                  return <BlogCard {...product} key={index} />;
                case 'Ebooks':
                  return <EBookCard {...product} key={index} />;
                case 'Audio Books':
                  return <AudioBookCard {...product} key={index} />;
                case 'Explanation Audios':
                  return <ExplanationAudioCard {...product} key={index} />;
                // case 'Event':
                //   return (
                //     <EventCard
                //       image={product.image}
                //       id={product.id}
                //       title={product.title}
                //       isBought={product.is_bought}
                //       isSaved={product.is_saved}
                //       key={index}
                //     />
                //   );
                default:
                  return null;
              }
            })
        ) : (
          <CategoryDiamond setFilterQuery={setFilterQuery} />
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 30,
  },
  filter: {
    alignSelf: 'flex-end',
  },
});
