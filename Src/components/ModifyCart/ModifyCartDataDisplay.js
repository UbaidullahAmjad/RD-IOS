import React, { useEffect, useState } from "react";
import { Text, TextInput, ToastAndroid, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { connect } from 'react-redux';
import LocalizationContext from '../../../LocalizationContext';
import { modifyCart } from "../../Store/Actions/cartAction";
const Table = (props) => {
    const { t } = React.useContext(LocalizationContext);
    const [quantity, setqunatity] = useState(0)
    const [MinCheck, setMinCheck] = useState(false);
    const [MinNo, setMinNo] = useState(0);
    useEffect(() => {

        if (Object.keys(props?.alreadyInCart).length != 0) {
            const availableIndex = props?.alreadyInCart.product.findIndex(obj => obj?.id == props?.item?.id)
            if (availableIndex == -1) {
                setqunatity(0)
                setMinNo(0)
                setMinCheck(false)
            } else {
                setqunatity(props?.alreadyInCart?.product[availableIndex].quantity)
                if (props?.alreadyInCart?.product[availableIndex].minquantity > 0) {
                    setMinCheck(true)
                    setMinNo(props?.alreadyInCart?.product[availableIndex].minquantity)
                }
            }
        }
    }, [props.alreadyInCart])
    function addItem(quantity) {
        try {
            const availableIndex = props?.alreadyInCart?.product.findIndex(obj => obj.id == props?.item?.id) // findout the product if it is already exist
            if (quantity == 0) {  // if user again put zero in product. so we will remove the product
                ToastAndroid.showWithGravity(
                    t("Qunatity must be greater then One"),
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                // setqunatity(1)
            } else {
                if (availableIndex == -1) {
                }
                else { // only increase the qunatity
                    let temparray = props.alreadyInCart
                    temparray.product[availableIndex].quantity = quantity
                    // props.AddDataTocart(temparray)
                }
            }
        } catch (error) {
            

        }



    }
    function addMinquantity(minquantity) {
        if (quantity < 1) {
            ToastAndroid.showWithGravity(
                t('Minimum Requirted Quantity must be less than or equal to the avaliable quantity'),
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );

        } else {

            const availableIndex = props.alreadyInCart?.product.findIndex(obj => obj.id == props?.item?.id) // findout the product if it is already exist
            if (availableIndex == -1) { // first time user increase the counting (greater than zero)
                let temp = { ...props.alreadyInCart }
                temp.product[availableIndex].quantity = quantity
                temp.product[availableIndex].minquantity = minquantity
                props.AddDataTocart(temp)


            }
            else { // only increase the qunatity
                let temparray = { ...props.alreadyInCart }
                temparray.product[availableIndex].minquantity = minquantity
                props.AddDataTocart(temparray)
            }
        }

    }

    return (
        <View style={{
            flexDirection: "row", flexWrap: "wrap",

            paddingVertical: 12,
            borderBottomWidth: 2,
            borderColor: '#F0F2F5',
            backgroundColor: quantity > 0 ? "#F2F2F2" : "#fff",
            paddingHorizontal: 8
        }}>
            <View style={{ width: '60%', paddingRight: 8, justifyContent: "center" }}>
                <Text numberOfLines={3} style={{ fontWeight: "bold", fontSize: 18 }}>{props?.item?.name}</Text>
                <View>
                    <Text numberOfLines={2}>{props?.item?.package}  {props?.item?.unit[0].toLowerCase() + props?.item?.unit.slice(1)} / {t('package')}</Text>
                </View>
                <View>
                    <Text>{props?.item?.price_per_package}€ / {t('package price')}</Text>
                </View>


            </View>
            <View style={{ width: "40%", justifyContent: "center", alignItems: "center" }}>

                <View style={{
                    borderWidth: 0,
                    height: 80,
                    width: "80%",
                    backgroundColor: '#E9E9E9',
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "flex-end"
                }}>
                    <TextInput
                        keyboardType="numeric"
                        value={quantity == 0 ? '' : quantity.toString()}
                        numberOfLines={3}
                        style={{
                            fontSize: 18,

                        }}
                        onChangeText={(value) => {
                            let data = JSON.stringify(parseInt(value))
                            if (data != 'null') {
                                setqunatity(data)
                                addItem(data)

                            } else {
                                setqunatity('')
                                addItem(0)
                            }
                        }}
                    />
                </View>
                {props?.min_req_qty == 1 ? (
                    <View style={{ flexDirection: 'row', marginTop: 12, width: "100%" }}>
                        <Checkbox
                            status={MinCheck == true ? "checked" : "unchecked"}
                            onPress={() =>{ 
                                if(!MinCheck == false){
                                    addMinquantity(0)
                                    setMinNo('')
                                }
                                setMinCheck(!MinCheck)}}
                            style={{}}
                        />
                        <View style={{ justifyContent: "center", marginLeft: "2%" }}>
                            <Text>Min Qty</Text>
                        </View>

                    </View>
                ) : null}

                {MinCheck && (
                    <View style={{
                        borderWidth: 0,
                        height: 80,
                        width: "80%",
                        backgroundColor: '#E9E9E9',
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "flex-end"
                    }}>


                        <TextInput
                            keyboardType="numeric"
                            value={MinNo == 0 ? "" : MinNo.toString()}
                            numberOfLines={3}
                            style={{
                                fontSize: 18,

                            }}
                            onChangeText={(value) => {
                                let data = JSON.stringify(parseInt(value))
                                if (data != 'null') {
                                    if (parseInt(data) > parseInt(quantity)) {
                                        setMinNo('')
                                        ToastAndroid.showWithGravity(
                                            t('Minimum Requirted Quantity must be less than or equal to the avaliable quantity'),
                                            ToastAndroid.SHORT,
                                            ToastAndroid.CENTER
                                        );
                                    } else {
                                        setMinNo(data)
                                        addMinquantity(data)
                                    }


                                } else {
                                    setMinNo('')
                                }
                            }}
                        />



                    </View>
                )}





            </View>


        </View>
    );
};



const mapStateToProps = (state, ownProps) => ({
    cart: state.cart,
    item: ownProps.item,
    alldata: ownProps.alldata,
    navigation: ownProps.navigation
})

export default connect(mapStateToProps, {
    modifyCart
})(Table)
