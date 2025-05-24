import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CategoryDiamond} from './CategoryDiamond';
import {useEffect, useRef, useState} from 'react';
import {useFetchStore} from '../hooks/useFetchStore';
import {useIdListStore} from '../hooks/useIdListStore';
import api from '../utils/api';
import {useQuery} from '@tanstack/react-query';
import {Screen} from './Screen';
import BlogCard from './Card/BlogCard';
import EBookCard from './Card/EbookCard';
import AudioBookCard from './Card/AudioBookCard';
import ExplanationAudioCard from './Card/ExplanationAudioCard';
import EventCard from './Card/EventCard';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/color';
import {useCategoryStore} from '../hooks/useCategoryStore';

type ProductsProps = {
  page: 'library' | 'my-shelf' | 'saved';
};

export const Products = ({page}: ProductsProps) => {
  const {fetchData} = useFetchStore();

  const {category, changeCategory} = useCategoryStore();

  const dropdownRef = useRef<SelectDropdown>(null);

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
    const response = api.get(
      `${page}/${fetchData.url}?category=${category ? category : ''}`,
    );
    return response;
  };

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['products', fetchData.name, page, category],
    queryFn: () => fetchProducts(),
  });

  useEffect(() => {
    const index = categoryDropDownData.findIndex(
      item => item.title.toLowerCase() === category?.toLowerCase(),
    );
    if (index !== -1) {
      dropdownRef.current?.selectIndex(index);
    }
  }, [category]);

  useEffect(() => {
    getAllId();
  }, [data?.data, category]);

  const categoryDropDownData = [
    {title: 'All'},
    {title: 'Archive'},
    {title: 'Chronicle of Creation'},
    {title: 'Divine Revelation'},
    {title: 'Sacred Blueprint'},
    {title: 'Oneness'},
  ];

  return (
    <>
      {category ? (
        <SelectDropdown
          ref={dropdownRef}
          data={categoryDropDownData}
          onSelect={(selectedItem, index) => {
            changeCategory(selectedItem.title.toLowerCase());
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {selectedItem && selectedItem.title}
                </Text>
                {isOpened ? (
                  <MaterialIcons
                    name="keyboard-arrow-up"
                    size={24}
                    color={colors.primaryBorder}
                  />
                ) : (
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={24}
                    color={colors.primaryBorder}
                  />
                )}
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && {backgroundColor: '#D2D9DF'}),
                }}>
                <Text>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          defaultValueByIndex={0}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      ) : null}
      <Screen isError={isError} error={error} isLoading={isLoading} data={data}>
        <View style={styles.productContainer}>
          {category ||
          fetchData.name === 'Blogs' ||
          fetchData.name === 'Events' ? (
            data?.data
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
                  case 'Events':
                    return <EventCard {...product} key={index} />;
                  default:
                    return null;
                }
              })
          ) : (
            <CategoryDiamond />
          )}
        </View>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  filter: {
    alignSelf: 'flex-end',
  },
  dropdownButtonStyle: {
    marginTop: 24,
    marginBottom: 12,
    marginHorizontal: 10,
    height: 40,
    minWidth: 180,
    borderWidth: 2,
    borderColor: colors.primaryBorder,
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    zIndex: 10,
  },
  dropdownButtonTxtStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primaryBorder,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
});
