import {useQuery} from '@tanstack/react-query';
import React, {useContext, useLayoutEffect, useState} from 'react';
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
import {CollapsibleHeader} from '../../components/Headers/CollapsibleHeader';
import {Screen} from '../../components/Screen';
import {AuthContext} from '../../context/AuthContext';
import colors from '../../styles/color';

type DetailRouteProp = RouteProp<StackParamList, 'EventDetail'>;

export default function EventDetail() {
  const route = useRoute<DetailRouteProp>();

  const {id} = route.params;

  const [eventId, setEventId] = useState(id);

  const {addItem, removeItem, cart} = useCartStore();

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const {navigate, getParent} = useNavigation<any>();

  const authContext = useContext(AuthContext);

  const fetchEventDetail = async () => {
    const response = await api.get(`library/eventAPI/${eventId}/`);
    return response;
  };

  const {data, isLoading, isError, error, isRefetching, refetch} = useQuery({
    queryKey: ['event', 'detail', eventId],
    queryFn: fetchEventDetail,
  });

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

  const readableCreatedDate =
    data?.data.created_at && !isNaN(new Date(data.data.created_at).getTime())
      ? format(new Date(data.data.created_at), 'PPP')
      : 'Unknown date';

  const readableUpdatedDate =
    data?.data.updated_at && !isNaN(new Date(data.data.updated_at).getTime())
      ? format(new Date(data.data.updated_at), 'PPP')
      : 'Unknown date';

  return (
    <Screen isLoading={isLoading} isError={isError} error={error} data={data}>
      <View style={styles.container}>
        <CollapsibleHeader
          data={data}
          scrollY={scrollY}
          refetch={refetch}
          setId={setEventId}
          type="Events"
        />
        <ScrollView
          style={{alignSelf: 'flex-start', paddingTop: 20, width: '100%'}}
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
          <View style={styles.eventDetailContainer}>
            <Text style={styles.title}>{data?.data.title}</Text>
            {data?.data.is_bought ? null : (
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
                  {!cart.find(item => item.id === eventId) ? (
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
                        onPress={() => removeItem(eventId)}>
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
  eventDetailContainer: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 800,
    width: '100%',
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
    color: colors.primary,
    fontSize: 28,
    fontWeight: '800',
  },
});
