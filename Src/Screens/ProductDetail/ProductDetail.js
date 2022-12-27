import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableHighlight, useWindowDimensions, TextInput, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { connect } from 'react-redux';
import RenderHtml from 'react-native-render-html';
import HeaderWithBackAndCart from "../../components/HeaderWithBackAndCartButton/HeaderWithBackAndCart";
import { Checkbox } from "react-native-paper";
import { addtoCart } from "../../Store/Actions/cartAction";
import LocalizationContext from '../../../LocalizationContext';
const ProductDetail = ({ route, navigation, addtoCart, shared, cart }) => {
  const { setLocale, t } = React.useContext(LocalizationContext);
  const [MinCheck, setMinCheck] = useState(false);
  const [ReqNo, setReqNo] = useState(0);
  const [MinNo, setMinNo] = useState(0);
  const [alreadyQunatity, setalreadyQunatity] = useState(0)
  const [alreadymin, setalreadymin] = useState(0)
  const { item } = route.params
  const { width } = useWindowDimensions();
 alert('chh')
  useEffect(() => {
    var cartProduct = []
    for (let i = 0; i < cart.cart.length; i++) {
      cart.cart[i].cart_items.filter(object => {
        if (object.product_id == item.id) {
          cartProduct.push(object)
        }
      });

    }
    if (cartProduct?.length != 0) {
      console.log(cartProduct[0])
      setalreadyQunatity(cartProduct[0]?.quantity)
      // setReqNo(cartProduct[0]?.quantity)
      if (cartProduct[0]?.min_quantity > 0) {
        setalreadymin(cartProduct[0]?.min_quantity)
        // setMinNo(cartProduct[0]?.min_quantity)
        // setMinCheck(true)
      }
    }

  }, [])
  const htmlrender = {
    html: item.description
  }
  return (
    <View style={{ flex: 1 }}>
      <HeaderWithBackAndCart
        HeaderText={item.name}
        backNavigation={() =>
          navigation.goBack()
        }
        icon_name={"shopping-cart"}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ flex: 1 }}>
          <View style={{
            flex: 1
          }}>

            <View style={{ height: 200, justifyContent: "center", alignItems: "center" }}>
              <Image
                source={route.params.image}
                resizeMode={"contain"}
                style={{ width: "100%", height: "80%" }}
              ></Image>
            </View>
            <View style={{
              height: 1,
              borderWidth: 0.5,
              borderColor: '#D3D3D3',
              marginBottom: 12,

            }} />
            <View style={{ marginHorizontal: 12 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                <View style={{ maxWidth: '73%', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 18, fontWeight: "700" }}>
                    {item.name}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 20, fontWeight: "700" }}>
                    {item.price_per_package_peritem}€/{t('item')}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 7 }}>
                <RenderHtml
                  contentWidth={width}
                  source={htmlrender}
                  enableExperimentalMarginCollapsing={true}
                />
              </View>
              {alreadyQunatity != 0 && (
                <View style={{ marginTop: 12 }}>
                  <View style={{ flexDirection: 'row' , justifyContent:"space-between"}}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', width: "60%" }}>{t('Quantity in Cart')}:</Text>
                    <View style={{justifyContent:'center'}}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}> {alreadyQunatity}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' , justifyContent:"space-between" , marginTop:6}}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', width: "60%" }}>{t('Minimum Quantity in Cart')}:</Text>
                    <View style={{justifyContent:"center"}}>

                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}> {alreadymin}</Text>
                    </View>
                  </View>
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                  marginTop: 12,
                  justifyContent: "space-between",

                }}
              >
                <View style={{ justifyContent: "center" }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{t('Req No')}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",

                  }}
                >
                  <View style={{ justifyContent: 'center' }}>
                    <TextInput
                      keyboardType="numeric"
                      value={ReqNo.toString()}
                      onChangeText={(value) => setReqNo(value)}
                      style={{ padding: 8, paddingTop: 12 }}

                    />
                  </View>

                  {/* <Text>{ReqNo}</Text> */}
                  <View style={{ justifyContent: 'center' }}>
                    <TouchableHighlight
                      onPress={() => {
                        setReqNo(parseInt(ReqNo) + 1)
                      }


                      }
                      style={{
                        margin: 0,
                        padding: 0,
                        height: 12,
                      }}
                      underlayColor={"#f7f7f7"}
                    >
                      <FontAwesome
                        name="caret-up"
                        style={{
                          fontSize: 15,
                        }}
                      />
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => ReqNo != 0 && setReqNo(parseInt(ReqNo) - 1)}
                      style={{
                        margin: 0,
                        padding: 0,
                        height: 12,
                      }}
                      underlayColor={"#f7f7f7"}
                    >
                      <FontAwesome name="caret-down" style={{ fontSize: 15 }} />
                    </TouchableHighlight>

                  </View>
                </View>

              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 2,
                  marginLeft: -8
                }}
              >
                <Checkbox
                  status={MinCheck == true ? "checked" : "unchecked"}
                  onPress={() => setMinCheck(!MinCheck)}
                  style={{}}
                />
                <View style={{ justifyContent: 'center' }}>
                  <Text
                    style={{ fontSize: 14, fontWeight: 'bold' }}
                    numberOfLines={2}
                  >
                    {t('Minimum Quantity')}
                  </Text>
                </View>
              </View>
              {MinCheck && (
                <View style={{
                  marginTop: 12,
                  marginHorizontal: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between'

                }}>

                  <View style={{ justifyContent: "center" }}>
                    <Text>{t('Minimum No')}</Text>
                  </View>
                  <View style={{ flexDirection: "row",  }}>
                    <TextInput
                      keyboardType="numeric"
                      value={MinNo.toString()}
                      style={{ padding: 8, paddingTop: 12,  }}
                      onChangeText={(value) => {
                        if (value > ReqNo || value < 0) {
                          alert("Minimum Qunity must be less than required or must be positive number")
                        } else {
                          setMinNo(value)
                        }
                      }}
                    />
                    <View style={{ justifyContent: "center" }}>
                      <TouchableHighlight
                        onPress={() => {
                          if (parseInt(MinNo) + 1 > ReqNo) {
                            alert("Minimum Qunity must be less than required")
                          } else {
                            setMinNo(parseFloat(parseInt(MinNo) + 1))
                          }

                        }}
                        style={{
                          margin: 0,
                          padding: 0,
                          height: 12,
                        }}
                        underlayColor={"#f7f7f7"}
                      >
                        <FontAwesome name="caret-up" style={{ fontSize: 15 }} />
                      </TouchableHighlight>
                      <TouchableHighlight
                        onPress={() =>
                          MinNo != 0 && setMinNo(parseFloat(parseInt(MinNo) - 1))
                        }
                        style={{
                          margin: 0,
                          padding: 0,
                          height: 12,
                        }}
                        underlayColor={"#f7f7f7"}
                      >
                        <FontAwesome name="caret-down" style={{ fontSize: 15 }} />
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>

              )}
            </View>
          </View>
          <View style={{ marginHorizontal: 12, marginVertical: 12 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 8,
              paddingVertical: 12
            }}>
              <View>
                <Text> <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{t('Total Price')}:</Text> {item.price_per_package * ReqNo}</Text>
              </View>
              <View>
                <Text> <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{t('Price')}/{t('package')}:</Text> {item.price_per_package}</Text>
              </View>

            </View>
            <View>
              <TouchableOpacity
                onPress={() => addtoCart(item.id, ReqNo, MinNo, navigation)}
                style={{
                  flexDirection: "row",
                  padding: 10,
                  justifyContent: "center",
                  backgroundColor: "#EC607F",
                  borderRadius: 30,
                }}
              >
                <FontAwesome
                  name="cart-plus"
                  style={{
                    color: "#fff",
                    marginRight: 10,
                    fontSize: 16,
                  }}
                />
                {shared.btnLoader ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) :
                  <Text style={{ color: "#fff" }}>{t('AddToCart')}</Text>
                }
              </TouchableOpacity>

            </View>

          </View>
        </View>

      </ScrollView>
    </View>
  );
};



const mapStateToProps = ({ fransh, shared, cart }) => ({
  fransh,
  shared,
  cart
})


export default connect(mapStateToProps, {
  addtoCart
})(ProductDetail)
