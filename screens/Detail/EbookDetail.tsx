import {useQuery} from '@tanstack/react-query';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {format} from 'date-fns';
import EditedTag from '../../components/EditedTag';
import {useCartStore} from '../../hooks/useCartStore';
import api from '../../utils/api';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackParamList} from '../../types/NavigationType';
import {Screen} from '../../components/Screen';
import {CollapsibleHeader} from '../../components/Headers/CollapsibleHeader';
import {AuthContext} from '../../context/AuthContext';
import colors from '../../styles/color';
import {useIdListStore} from '../../hooks/useIdListStore';

type DetailRouteProp = RouteProp<StackParamList, 'EbookDetail'>;

export default function EBookDetail() {
  const route = useRoute<DetailRouteProp>();

  const {navigate, getParent} = useNavigation<any>();

  const authContext = useContext(AuthContext);

  const {id} = route.params;

  const [ebookId, setEbookId] = useState(id);

  const {removeItem, cart, addItem} = useCartStore();

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const fetchEbookDetail = async () => {
    const response = await api.get(`library/ebookAPI/products/${ebookId}/`);
    return response;
  };

  const {data, isLoading, isError, error, isRefetching, refetch} = useQuery({
    queryKey: ['ebook', 'detail', ebookId],
    queryFn: fetchEbookDetail,
  });

  const readableCreatedDate =
    data?.data.created_at && !isNaN(new Date(data.data.created_at).getTime())
      ? format(new Date(data.data.created_at), 'PPP')
      : 'Unknown date';

  const readableUpdatedDate =
    data?.data.updated_at && !isNaN(new Date(data.data.updated_at).getTime())
      ? format(new Date(data.data.updated_at), 'PPP')
      : 'Unknown date';

  useLayoutEffect(() => {
    const parent = getParent();
    parent?.setOptions({
      headerShown: false,
    });

    return () => {
      parent?.setOptions({
        headerShown: true,
      });
    };
  }, [navigate]);

  return (
    <Screen isLoading={isLoading} isError={isError} error={error} data={data}>
      <View style={styles.container}>
        <CollapsibleHeader
          data={data}
          scrollY={scrollY}
          refetch={refetch}
          setId={setEbookId}
          type="Ebooks"
        />
        <ScrollView
          style={{alignSelf: 'flex-start', paddingTop: 20}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={'black'}
            />
          }>
          <View style={styles.ebookDetailContainer}>
            <Text style={styles.title}>{data?.data.title}</Text>
            {data?.data.is_bought || data?.data.is_free ? null : (
              <>
                <Text style={{marginTop: 10, fontSize: 18}}>
                  <Text style={{fontWeight: '900', fontSize: 16}}>Price:</Text>{' '}
                  ${data?.data.price_in_usd} / {data?.data.price_in_etb} ብር
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 10,
                  }}>
                  {!cart.find(item => item.id === ebookId) ? (
                    <>
                      <TouchableOpacity
                        style={[styles.ActionBtn, {backgroundColor: '#212121'}]}
                        onPress={() => {
                          if (authContext?.user) {
                            addItem({
                              id: data?.data.id,
                              image: data?.data.image,
                              title: data?.data.title,
                              price_in_etb: data?.data.price_in_etb,
                              price_in_usd: data?.data.price_in_usd,
                              quantity: 1,
                              type: data?.data.type,
                            });

                            navigate('WebViewPage', {
                              uri: 'https://stage.addmeshbook.com/Cart/Checkout',
                            });
                          } else {
                            navigate('Account');
                          }
                        }}>
                        <Text style={{color: 'white'}}>Buy</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.ActionBtn}
                        onPress={() => {
                          if (authContext?.user) {
                            addItem({
                              id: data?.data.id,
                              image: data?.data.image,
                              title: data?.data.title,
                              price_in_etb: data?.data.price_in_etb,
                              price_in_usd: data?.data.price_in_usd,
                              quantity: 1,
                              type: data?.data.type,
                            });
                          } else {
                            navigate('Account');
                          }
                        }}>
                        <Text>Add To Cart</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={[styles.ActionBtn, {backgroundColor: '#212121'}]}
                        onPress={() => navigate('Cart')}>
                        <Text style={{color: 'white'}}>Go To Cart</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.ActionBtn,
                          {
                            backgroundColor: '#d44242',
                            borderColor: '#d44242',
                            width: 170,
                          },
                        ]}
                        onPress={() => removeItem(ebookId)}>
                        <Text style={{textAlign: 'center', color: 'white'}}>
                          Remove From Cart
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </>
            )}
            <Text>
              <Text style={{fontWeight: '900', fontSize: 16}}>
                Description:
              </Text>{' '}
              {data?.data.description}
            </Text>
            {readableCreatedDate === readableUpdatedDate ? (
              <Text style={{alignSelf: 'flex-end', fontWeight: 'bold'}}>
                {readableCreatedDate}
              </Text>
            ) : (
              <View
                style={{
                  alignSelf: 'flex-end',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <Text style={{fontWeight: 'bold'}}>{readableUpdatedDate}</Text>
                <EditedTag />
              </View>
            )}
            <Text style={{alignSelf: 'flex-end', fontWeight: 'bold'}}>
              Author: {data?.data.author}
            </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#b088ba',
  },
  prevBtn: {
    position: 'absolute',
    left: -45,
    backgroundColor: '#4f371f',
    borderRadius: 10,
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 35,
    zIndex: 10,
    opacity: 0.85,
  },
  nextBtn: {
    position: 'absolute',
    right: -45,
    backgroundColor: '#4f371f',
    borderRadius: 10,
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 35,
    zIndex: 10,
    opacity: 0.85,
  },
  backBtn: {
    position: 'absolute',
    left: 10,
    zIndex: 10,
  },
  saveBtn: {
    position: 'absolute',
    right: 10,
    zIndex: 10,
  },
  image: {
    margin: 20,
    paddingBottom: 30,
    width: 250,
  },
  readBtn: {
    width: 55,
    backgroundColor: '#552f6e',
    padding: 11,
    aspectRatio: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
  },
  ebookDetailContainer: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 800,
  },
  ActionBtn: {
    borderWidth: 1,
    borderColor: '#212121',
    padding: 11,
    width: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
  },
});
