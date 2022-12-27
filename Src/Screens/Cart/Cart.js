import React from 'react';
import {Dimensions, FlatList, Image, View, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import LocalizationContext from '../../../LocalizationContext';
import HeaderWithBackAndCart from '../../components/HeaderWithBackAndCartButton/HeaderWithBackAndCart';
import OrderCartTable from '../../components/OrderCartTable/OrderCartTable';
import {StackActions} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {removeData} from '../../Store/Actions/cartAction';

let deviceHeight = Dimensions.get('window').height;

const Cart = props => {
  const {t} = React.useContext(LocalizationContext);
  // useFocusEffect(

  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       props.removeData()
  //       props.navigation.dispatch(StackActions.popToTop())
  //       return true;
  //     };

  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   }, []),
  // );
  return (
    <View style={{flex: 1}}>
      <HeaderWithBackAndCart
        HeaderText={t('cart')}
        backNavigation={() => props?.navigation.goBack()}
        icon_name={'trash'}
        store_button={'store'}
      />
      {/* <OrderCartTable item={props.cart.cart} navigation={props.navigation} /> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        // data={emptyCart == false ? cart.cart : []}
        data={props.cart.cart}
        renderItem={({item, index}) => {
          return <OrderCartTable item={item} navigation={props.navigation} />;
        }}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: (95 / 100) * deviceHeight,
              }}>
              <Image source={require('../../assets/images/folder.png')} />
            </View>
          );
        }}
      />
    </View>
  );
};

const mapStateToProps = ({cart}) => ({
  cart,
});

export default connect(mapStateToProps, {
  removeData,
})(Cart);
