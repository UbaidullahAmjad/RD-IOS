import React, { useEffect, useState } from "react";
import {
  ActivityIndicator, Dimensions, FlatList, Image, RefreshControl, SafeAreaView, Text, TouchableOpacity, View
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import LocalizationContext from '../../../LocalizationContext';
import HeaderWithBackAndCart from '../../components/HeaderWithBackAndCartButton/HeaderWithBackAndCart';
import { addtoCartAction, removeData } from '../../Store/Actions/cartAction';
import {
  getMoreData,
  getMoreProductOfCategory, getSupplierProduct, onBackHome
} from "../../Store/Actions/franchiseAction";
import { addtoRectifyList, getMoreDataRectifySupplier, getrectifySupplierProduct } from '../../Store/Actions/rectifyAction';
import RectifyProductlst from './Component/RectifyProductlst';

let deviceHeight = Dimensions.get('window').height

const Home = (props) => {
  const { t } = React.useContext(LocalizationContext);
  const [rectifyData, setrectifyData] = useState(props?.route?.params?.item)
  useEffect(() => {
    props.getrectifySupplierProduct(props?.route?.params?.item?.order?.supplier_id, t('Something Went Wrong! Kindly try again later'), t('Kindly Check your Internet Connection'))

  }, [])


  const reachend = () => {
    props.getMoreDataRectifySupplier(props?.route?.params?.item?.order?.supplier_id)

  }

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <HeaderWithBackAndCart
        HeaderText={t('Rectify')}
        backNavigation={() => props.navigation.goBack()}
        icon_name={"trash"}
      />
      <View style={{ flex: 1, paddingTop: '4%', backgroundColor: '#fff' }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", borderBottomWidth: 2, borderColor: '#F0F2F5', paddingBottom: 14, marginHorizontal: 6 }}>
          <View style={{ width: "60%", paddingRight: 8 }}>
            <Text numberOfLines={1}>
              {t('Product Name')}

            </Text>
          </View>
          <View style={{ width: "40%", justifyContent: 'center', alignItems: 'center' }}>
            <Text numberOfLines={1}>
              {t('Quantity')}
            </Text>

          </View>

        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
          initialNumToRender={15}
          data={props.rectify.rectifySupplierdata}
          numColumns={1}
          ListFooterComponent={() => {
            return (
              <View style={{ height: 80, alignItems: 'center', justifyContent: "center" }} >
                {props.rectify.nextPage ? (
                  <ActivityIndicator size="small" color="#ec607f" />

                ) :
                  props.rectify.rectifySupplierdata != 0 ? (
                    <Text style={{ color: "#000" }}>{t('noDataShow')}</Text>
                  ) : null
                }
              </View>
            )
          }}
          renderItem={({ item, index }) => {
            return (
              <RectifyProductlst
                removeClippedSubviews={false}
                item={item}
                index={index}
                sid={props.route.params?.Supplierid}
                sname={props.route.params?.Suppliername}
                AddDataTocart={(value) => {
                  setrectifyData(value)
                }}
                alreadyInRectify={rectifyData}
                min_req_qty={props?.route?.params?.min_req_qty}
                navigation={props?.navigation}
              // min_req_qty={props.rectify.rectifySupplierdata?.supplier?.min_req_qty}
              />
            )
          }}
          onEndReached={() => reachend()}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={150}
          ListEmptyComponent={() => {
            return (
              <View style={{ justifyContent: "center", alignItems: "center", height: (65 / 100) * deviceHeight, }}>
                <Image source={require('../../assets/images/folder.png')} />
              </View>
            )
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                props.getrectifySupplierProduct(props?.route?.params?.item?.order?.supplier_id, t('Something Went Wrong! Kindly try again later'), t('Kindly Check your Internet Connection'))
              }}
            />
          }
          keyExtractor={(item, index) => index}

        />
      </View>

      <TouchableOpacity
        onPress={() => {
          props.addtoRectifyList(rectifyData, props.navigation, t('Something Went Wrong! Kindly try again later'), t('Kindly Check your Internet Connection'))

        }}

        style={{

          width: 50,
          height: 50,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ec607f",
          position: "absolute",
          right: 24,
          bottom: 24

        }}>
        <FontAwesome
          name="shopping-cart"
          size={18}
          color={"#fff"}
        ></FontAwesome>

      </TouchableOpacity>
    </SafeAreaView>
  );
};
const mapStateToProps = ({ fransh, cart, rectify }) => ({
  fransh,
  cart,
  rectify
})


export default connect(mapStateToProps, {
  getrectifySupplierProduct,
  getSupplierProduct,
  getMoreData,
  getMoreProductOfCategory,
  onBackHome,
  addtoCartAction,
  removeData,
  addtoRectifyList,
  getMoreDataRectifySupplier
})(Home)

