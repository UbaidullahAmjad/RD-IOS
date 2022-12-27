import React, { useEffect, useState } from "react";
import { Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { connect } from 'react-redux';
import LocalizationContext from '../../../../LocalizationContext';
import { modifyCart } from "../../../Store/Actions/cartAction";
const RectifyProductList = (props) => {
    const { t } = React.useContext(LocalizationContext);
    const [quantity, setqunatity] = useState(0)
    const [MinCheck, setMinCheck] = useState(false);
    const [MinNo, setMinNo] = useState(0);
    useEffect(() => {
        if (Object.keys(props?.alreadyInRectify).length != 0) {
            const availableIndex = props?.alreadyInRectify.order_items.findIndex(obj => obj?.product_id == props?.item?.product?.id)
            if (availableIndex == -1) {
                setqunatity(0)
                setMinNo(0)
                setMinCheck(false)
            } else {
                setqunatity(props?.alreadyInRectify?.order_items[availableIndex].quantity)
                if (parseInt(props?.alreadyInRectify?.order_items[availableIndex].min_quantity) > 0) {
                    setMinCheck(true)
                    setMinNo(props?.alreadyInRectify?.order_items[availableIndex].min_quantity)
                }
            }
        }
    }, [props.alreadyInRectify, props.item.product.id])
    function addItem(quantity) {
        try {
            const availableIndex = props?.alreadyInRectify?.order_items.findIndex(obj => obj.product_id == props?.item?.product?.id) // findout the product if it is already exist
            if (quantity == 0) {  // if user again put zero in product. so we will remove the product

                if (availableIndex != -1) {
                    let temp = props.alreadyInRectify
                    temp.order_items.splice(availableIndex, 1);
                    props.AddDataTocart(temp)
                }

            } else {
                if (availableIndex == -1) { // first time user increase the counting (greater than zero)
                    const temp = { ...props.alreadyInRectify }
                    temp.order_items.push({
                        product_id: props?.item?.product?.id,
                        product_name: props?.item?.product?.name,
                        quantity: quantity,
                        min_quantity: MinNo,
                        unit_name: props?.item?.unit?.name,
                        unit_price: props?.item?.product?.price_per_package_peritem
                    })
                    props.AddDataTocart(temp)


                }
                else { // only increase the qunatity
                    let temparray = props.alreadyInRectify
                    temparray.order_items[availableIndex].quantity = quantity
                    props.AddDataTocart(temparray)
                }
            }
        } catch (error) {
            console.log('error', error)

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

            const availableIndex = props?.alreadyInRectify?.order_items.findIndex(obj => obj.product_id == props?.item?.product?.id) // findout the product if it is already exist

            if (availableIndex == -1) { // first time user increase the counting (greater than zero)
                let temp = { ...props.alreadyInRectify }
                temp.product.push({

                    product_id: props?.item?.product?.id,
                    product_name: props?.item?.product?.name,
                    quantity: quantity,
                    min_quantity: minquantity,
                    unit_name: props?.item?.unit?.name,
                    unit_price: props?.item?.product?.price_per_package_peritem,
                    min_req_qty: props?.props?.min_req_qty
                })
                props.AddDataTocart(temp)


            }
            else { // only increase the qunatity
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", props.alreadyInRectify)
                let temparray = { ...props.alreadyInRectify }
                temparray.order_items[availableIndex].min_quantity = minquantity
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
                <Text numberOfLines={3} style={{ fontWeight: "bold" }}>{props?.item?.product?.name}</Text>
                <View>
                    <Text numberOfLines={2}>{props?.item?.product?.package}  {props?.item?.unit?.name[0].toLowerCase() + props?.item?.unit?.name.slice(1)} / {t('package')}</Text>
                </View>
                <View>
                    <Text>{props?.item?.product?.price_per_package}€ / {t('package price')}</Text>
                </View>


            </View>
            <View style={{ width: "40%", alignItems: 'center', justifyContent: "center" }}>
                <TextInput
                    keyboardType="numeric"
                    value={quantity == 0 ? '' : quantity.toString()}
                    numberOfLines={3}
                    style={{
                        fontSize: 14,
                        borderWidth: 0,
                        height: 80,
                        width: "90%",
                        backgroundColor: '#E9E9E9',
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",

                        textAlign: "center"
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

                {props?.min_req_qty == 1 ? (
                    <View style={{ flexDirection: 'row', marginTop: 12, }}>
                        <Checkbox
                            status={MinCheck == true ? "checked" : "unchecked"}
                            onPress={() => {
                                if(!MinCheck == false){
                                    addMinquantity(0)
                                    setMinNo(0)
                                }
                                setMinCheck(!MinCheck)
                            }
                            }
                            style={{}}
                        />
                        <View style={{ justifyContent: "center", marginLeft: "2%" }}>
                            <Text>Min Qty</Text>
                        </View>

                    </View>
                ) : null}

                {MinCheck && (
                    <View style={{ flexDirection: 'row', flexWrap: "wrap", marginTop: 12 }}>
                        <TextInput
                            keyboardType="numeric"
                            value={MinNo.toString()}
                            numberOfLines={3}
                            style={{
                                fontSize: 14,
                                borderWidth: 0,
                                height: 80,
                                width: "90%",
                                backgroundColor: '#E9E9E9',
                                borderRadius: 8,
                                justifyContent: "center",
                                alignItems: "center",

                                textAlign: "center"
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
})(RectifyProductList)
