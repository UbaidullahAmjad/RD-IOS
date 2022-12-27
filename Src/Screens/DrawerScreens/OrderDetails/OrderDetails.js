import React, { useEffect } from "react";
import { FlatList, View, Image, Dimensions, RefreshControl } from "react-native";
import { connect } from 'react-redux';
import { getorderDetail } from "../../../Store/Actions/cartAction";
import OrderDetailTable from '../../../components/OrderDetailTable/OrderDetailTable'
import HeaderWithBackAndCart from "../../../components/HeaderWithBackAndCartButton/HeaderWithBackAndCart";
import LocalizationContext from '../../../../LocalizationContext';
let deviceHeight = Dimensions.get('window').height

const OrderDetails = (props) => {
  const { setLocale, t } = React.useContext(LocalizationContext);
  useEffect(() => {
    props.getorderDetail(t('Something Went Wrong! Kindly try again later'), t('Kindly Check your Internet Connection'))
  }, [])
  return (
    <View style={{
      flex: 1
    }}>
      <HeaderWithBackAndCart
        HeaderText={''}
        backNavigation={() => props.navigation.goBack()}
        icon_name={"trash"}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        data={props.cart.orderDetail}
        renderItem={({ item, index }) => {
          if (item?.order.order_status == 1) {
            var btnname = t('Confirmed')
            var btncolor = '#28A745'
          }
          else if (item?.order.order_status == 2) {
            var btnname = t('In-Delivery')
            var btncolor = '#6C757D'
          }
          else if (item?.order.order_status == 3) {
            var btnname = t('Delivered')
            var btncolor = '#007BFF'
          } else {
            var btnname = t('Treated')
            var btncolor = '#FFC107'
          }
          return (
            <OrderDetailTable btncolor={btncolor} btnText={btnname} item={item} navigation={props.navigation} />
          )
        }}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={() => {
          return (
            <View style={{ justifyContent: "center", alignItems: "center", height: (95 / 100) * deviceHeight, }}>
              <Image source={require('../../../assets/images/folder.png')} />
            </View>
          )
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              props.getorderDetail(t('Something Went Wrong! Kindly try again later'), t('Kindly Check your Internet Connection'))
            }}
          />
        }
      />

    </View>
  );
};

const mapStateToProps = ({ cart }) => ({
  cart
})

export default connect(mapStateToProps, {
  getorderDetail
})(OrderDetails)

