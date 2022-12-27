import React, { useEffect, useState } from "react";
import { FlatList, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import LocalizationContext from '../../../LocalizationContext';
import HeaderWithBackAndCart from "../../components/HeaderWithBackAndCartButton/HeaderWithBackAndCart";
import ModifyCartDataDisplay from "../../components/ModifyCart/ModifyCartDataDisplay";
import { addtoCartAction } from "../../Store/Actions/cartAction";

function modifyCart(props) {
    const { t } = React.useContext(LocalizationContext);
    const [cartdata, setcartdata] = useState({})
    const { sid, sname } = props.route.params.product
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            setcartdata(props.route.params.product)
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;

    }, [props.navigation])
   
    return (
        <View style={{ flex: 1 }}>
            <HeaderWithBackAndCart
                HeaderText={t('Modify')}
                backNavigation={() => props.navigation.goBack()}
                icon_name={"trash"}
            />
            <View style={{ flex: 1, paddingTop: '2%', backgroundColor: '#fff' }}>
                <View style={{ flexDirection: "row", flexWrap: "wrap", borderBottomWidth: 2, borderColor: '#F0F2F5', paddingBottom: 14, marginHorizontal: 6 , }}>
                    <View style={{ width: "60%", paddingRight: 8 ,   }}>
                        <Text numberOfLines={1}>
                            {t('Product Name')}

                        </Text>
                    </View>
                    <View style={{ width: "40%", justifyContent: 'center', alignItems: 'center' ,    }}>
                        <Text numberOfLines={1}>
                            {t('Quantity')}
                        </Text>

                    </View>

                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={10}
                    data={props.route.params.product.product}
                    numColumns={1}
                    removeClippedSubviews={false}
                    ListFooterComponent={() => {
                        return (
                            <View style={{ height: 30, alignItems: 'center', justifyContent: "center" }} >

                            </View>
                        )
                    }}
                    renderItem={({ item, index }) => {
                        return (

                            <ModifyCartDataDisplay
                                item={item}
                                index={index}
                                sid={sid}
                                sname={sname}
                                AddDataTocart={(value) => {

                                    setcartdata(value)
                                }}
                                alreadyInCart={cartdata}
                                navigation={props.navigation}
                                min_req_qty={props?.route?.params?.product?.min_req_qty}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index}

                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    props.addtoCartAction(cartdata, props.navigation)
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
        </View>

    )
}

const mapStateToProps = () => ({

})


export default connect(mapStateToProps, {
    addtoCartAction
})(modifyCart)
