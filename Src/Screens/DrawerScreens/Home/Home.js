import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import LocalizationContext from '../../../../LocalizationContext';
import store from '../../../Store';
import SupplierTable from '../../../components/Table/SupplierTable';
import {addtoCartAction, removeData} from '../../../Store/Actions/cartAction';
import {
  getMoreData,
  getMoreProductOfCategory,
  getSupplierProduct,
  onBackHome,
} from '../../../Store/Actions/franchiseAction';
import {logout, storeModal} from '../../../Store/Actions/userAction';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

let deviceHeight = Dimensions.get('window').height;

const Home = props => {
  const {t} = React.useContext(LocalizationContext);
  const [cartdata, setcartdata] = useState({
    sid: props.route.params?.Supplierid,
    sname: props.route.params?.Suppliername,
    min_req_qty: props.route.params?.min_req_qty,
    product: [],
  });
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        props.removeData();
        props.navigation.goBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  function getandsetdata() {
    props.getSupplierProduct(
      props.route.params?.Supplierid,
      t('Something Went Wrong! Kindly try again later'),
      t('Kindly Check your Internet Connection'),
    );
  }

  useEffect(() => {
    getandsetdata();
  }, []);

  useEffect(() => {
    const unsubscribe = props?.navigation.addListener('focus', () => {
      if (store.getState().cart.cart?.length == 0) {
        setcartdata({
          sid: props.route.params?.Supplierid,
          sname: props.route.params?.Suppliername,
          min_req_qty: props.route.params?.min_req_qty,
          product: [],
        });
      } else {
        setcartdata(store.getState().cart.cart[0]);
      }
    });
    return unsubscribe;
  }, [props?.navigation]);
  const reachend = () => {
    if (props.fransh.categoryid == null) {
      props.getMoreData(props.route.params?.Supplierid);
    } else {
      props.getMoreProductOfCategory(props.route.params?.Supplierid);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          padding: 12,
          backgroundColor: '#F2F2F2',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems:"center"
        }}>
        <TouchableOpacity
          onPress={() => {
            props.removeData();
            props.navigation.goBack();
          }}
          style={{justifyContent: 'center'}}>
          <FontAwesome
            name={'arrow-left'}
            color="#6C757D"
            size={16}></FontAwesome>
        </TouchableOpacity>
        <View style={{width: '50%'}}>
          <Text
            numberOfLines={2}
            style={{
              color: '#6C757D',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {props.route.params?.Suppliername}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
          }}>
          {props?.rectify?.rectify?.length != 0 ? (
            <View
              style={{
                position: 'relative',
                padding: 5,
              }}>
              <TouchableOpacity
                style={{marginRight: 12}}
                onPress={() => props?.navigation.navigate('Rectify')}>
                <FontAwesome
                  name="shopping-cart"
                  size={16}
                  color={'#6C757D'}></FontAwesome>
              </TouchableOpacity>
              <View
                style={{
                  color: '#fff',
                  position: 'absolute',
                  zIndex: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: -5,
                  right: 10,
                  padding: 1,
                  backgroundColor: '#6C757D',
                  borderRadius: 100,
                  width: 15,
                  height: 15,
                  elevation: 2,
                }}>
                <Text
                  style={{
                    fontSize: 8,
                    color: '#fff',
                  }}>
                  {props?.rectify?.rectify?.length}
                </Text>
              </View>
            </View>
          ) : null}

          <TouchableOpacity
            style={{marginHorizontal: 8}}
            onPress={() => props.storeModal(!props.shared.storeModalVisible)}>
            <FontAwesome5 name="store" size={16} color="#DC3545" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginLeft: 8}}
            onPress={() => props?.logout()}>
            <FontAwesome5 name="sign-out-alt" size={18} color="#DC3545" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 1, paddingTop: '2%', backgroundColor: '#fff'}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            borderBottomWidth: 2,
            borderColor: '#F0F2F5',
            paddingBottom: 14,
            marginHorizontal: 6,
          }}>
          <View style={{width: '70%', paddingRight: 8}}>
            <Text numberOfLines={1}>{t('Product Name')}</Text>
          </View>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text numberOfLines={1}>{t('Quantity')}</Text>
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          initialNumToRender={10}
          data={props.fransh.product}
          numColumns={1}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  height: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {props.fransh.nextPage ? (
                  <ActivityIndicator size="small" color="#ec607f" />
                ) : props.fransh.product.length != 0 ? (
                  <Text>{t('noDataShow')}</Text>
                ) : null}
              </View>
            );
          }}
          renderItem={({item, index}) => {
            return (
              <SupplierTable
                item={item}
                index={index}
                sid={props.route.params?.Supplierid}
                sname={props.route.params?.Suppliername}
                AddDataTocart={value => {
                  setcartdata(value);
                }}
                alreadyInCart={cartdata}
                min_req_qty={props.route.params?.min_req_qty}
              />
            );
          }}
          onEndReached={() => reachend()}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={150}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: (65 / 100) * deviceHeight,
                }}>
                <Image source={require('../../../assets/images/folder.png')} />
              </View>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                props.getSupplierProduct(
                  props.route.params?.Supplierid,
                  t('Something Went Wrong! Kindly try again later'),
                  t('Kindly Check your Internet Connection'),
                );
              }}
            />
          }
          keyExtractor={(item, index) => index}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          if (cartdata?.product?.length == 0) {
            ToastAndroid.showWithGravity(
              t('Add Quantity To Add Products To Cart'),
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else {
            props.addtoCartAction(
              cartdata,
              props.navigation,
              t('Kindly Check your Internet Connection'),
            );
          }
        }}
        style={{
          width: '100%',
          height: 45,

          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#198754',
          position: 'absolute',
          bottom: 0,
        }}>
        <Text style={{color: '#fff', textAlign: 'center'}}>
          {t('choose delivery time')}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const mapStateToProps = ({fransh, cart, rectify, shared}) => ({
  fransh,
  cart,
  rectify,
  shared,
});

export default connect(mapStateToProps, {
  getSupplierProduct,
  getMoreData,
  getMoreProductOfCategory,
  onBackHome,
  addtoCartAction,
  removeData,
  logout,
  storeModal,
})(Home);
