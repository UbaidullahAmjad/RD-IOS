import React, {useState, useEffect} from 'react';
import {Text, TextInput, ToastAndroid, View} from 'react-native';
// import { Checkbox } from "react-native-paper";
import CheckBox from '@react-native-community/checkbox';
import {connect} from 'react-redux';
import LocalizationContext from '../../../LocalizationContext';
import {modifyCart} from '../../Store/Actions/cartAction';
const Table = props => {
  const {setLocale, t, locale} = React.useContext(LocalizationContext);
  const [quantity, setqunatity] = useState(0);
  const [MinCheck, setMinCheck] = useState(false);
  const [MinNo, setMinNo] = useState(0);

  function addItem(quantity) {
    try {
      const availableIndex = props?.alreadyInCart?.product.findIndex(
        obj => obj.id == props?.item?.product?.id,
      ); // findout the product if it is already exist
      if (quantity == 0) {
        // if user again put zero in product. so we will remove the product

        if (availableIndex != -1) {
          let temp = props.alreadyInCart;
          temp.product.splice(availableIndex, 1);
          // props.AddDataTocart(temp)
        }
      } else {
        if (availableIndex == -1) {
          // first time user increase the counting (greater than zero)
          const temp = {...props.alreadyInCart};
          temp.product.push({
            id: props?.item?.product?.id,
            name: props?.item?.product?.name,
            price_per_package: props?.item?.product?.price_per_package,
            price_per_package_peritem:
              props?.item?.product?.price_per_package_peritem,
            quantity: quantity,
            minquantity: MinNo,
            unit: props?.item?.unit?.name,
            package: props?.item?.product?.package,
            active: props?.item?.product?.min_req_qty,
          });
        } else {
          // only increase the qunatity
          let temparray = props.alreadyInCart;
          temparray.product[availableIndex].quantity = quantity;
          // props.AddDataTocart(temparray)
        }
      }
    } catch (error) {}
  }
  function addMinquantity(minquantity) {
    if (quantity < 1) {
      ToastAndroid.showWithGravity(
        t(
          'Minimum Requirted Quantity must be less than or equal to the avaliable quantity',
        ),
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      const availableIndex = props.alreadyInCart?.product.findIndex(
        obj => obj.id == props.item.product.id,
      ); // findout the product if it is already exist
      if (availableIndex == -1) {
        // first time user increase the counting (greater than zero)
        let temp = {...props.alreadyInCart};
        temp.product.push({
          id: props?.item?.product?.id,
          name: props?.item?.product?.name,
          price_per_package: props?.item?.product?.price_per_package,
          price_per_package_peritem:
            props?.item?.product?.price_per_package_peritem,
          quantity: quantity,
          minquantity: minquantity,
          unit: props?.item?.unit?.name,
          package: props?.item?.product?.package,
          active: props?.item?.product?.min_req_qty,
          // sid: props?.sid,
          // sname: props?.sname
        });
        props.AddDataTocart(temp);
      } else {
        // only increase the qunatity
        let temparray = {...props.alreadyInCart};
        temparray.product[availableIndex].minquantity = minquantity;
        props.AddDataTocart(temparray);
      }
    }
  }
  useEffect(() => {
    if (Object.keys(props?.alreadyInCart).length != 0) {
      const availableIndex = props?.alreadyInCart.product.findIndex(
        obj => obj?.id == props?.item?.product?.id,
      );
      if (availableIndex == -1) {
        setqunatity(0);
        setMinNo(0);
        setMinCheck(false);
      } else {
        setqunatity(props?.alreadyInCart?.product[availableIndex].quantity);
        if (props?.alreadyInCart?.product[availableIndex].minquantity > 0) {
          setMinCheck(true);
          setMinNo(props?.alreadyInCart?.product[availableIndex].minquantity);
        }
      }
    }
    // }, [props.alreadyInCart, props.item.product.id])
  }, [props.alreadyInCart]);
  // Save data in parent 'cartdata' state when user increase or decrease the item
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',

        paddingVertical: 12,
        borderBottomWidth: 2,
        borderColor: '#F0F2F5',
        backgroundColor: quantity > 0 ? '#F2F2F2' : '#fff',
        paddingHorizontal: 8,
      }}>
      <View style={{width: '70%', paddingRight: 8, justifyContent: 'center'}}>
        <Text numberOfLines={3} style={{fontWeight: 'bold', fontSize: 18}}>
          {props?.item?.product?.name}
        </Text>
        <View>
          <Text numberOfLines={2}>
            {props?.item?.product?.package}{' '}
            {props?.item?.unit?.name[0].toLowerCase() +
              props?.item?.unit?.name.slice(1)}{' '}
            / {t('package')}
          </Text>
        </View>
        <View>
          <Text>
            {props?.item?.product?.price_per_package}€ / {t('package price')}
          </Text>
        </View>
      </View>
      <View style={{width: '30%'}}>
        <TextInput
          // placeholder="0"
          keyboardType="numeric"
          value={quantity == 0 ? '' : quantity.toString()}
          style={{
            fontSize: 18,
            borderWidth: 0,
            height: 80,
            width: '95%',
            backgroundColor: '#E9E9E9',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
            textAlign: 'center',
          }}
          onChangeText={value => {
            let data = JSON.stringify(parseInt(value));
            if (data != 'null') {
              setqunatity(data);
              addItem(data);
            } else {
              setqunatity('');
              addItem(0);
            }
          }}
        />

        {props?.min_req_qty == 1 ? (
          <View style={{flexDirection: 'row',justifyContent:'center', marginTop: 12, width: '100%'}}>
            <CheckBox
              style={{ width: 15, height: 15}}
              boxType={'square'}
              tintColor	={'#EC607F'}
              onTintColor={'#EC607F'}
              onCheckColor={'#EC607F'}
              lineWidth={1}
              disabled={false}
              value={MinCheck}
              onValueChange={newValue => setMinCheck(newValue)}
            />
            <View style={{justifyContent: 'center', marginLeft: '5%'}}>
              <Text>Min Qty</Text>
            </View>
          </View>
        ) : null}

        {MinCheck && (
          <View style={{flexDirection: 'row', marginTop: 12, width: '100%'}}>
            <View
              style={{
                borderWidth: 0,
                height: 80,
                width: '100%',
                backgroundColor: '#E9E9E9',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}>
              <TextInput
                // placeholder="0"
                keyboardType="numeric"
                value={MinNo == 0 ? '' : MinNo.toString()}
                numberOfLines={3}
                style={{
                  fontSize: 18,
                  borderWidth: 0,
                  height: 80,
                  width: '95%',
                  backgroundColor: '#E9E9E9',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                  textAlign: 'center',
                }}
                onChangeText={value => {
                  let data = JSON.stringify(parseInt(value));
                  if (data != 'null') {
                    if (parseInt(data) > parseInt(quantity)) {
                      setMinNo('');
                      ToastAndroid.showWithGravity(
                        t(
                          'Minimum Requirted Quantity must be less than or equal to the avaliable quantity',
                        ),
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                      );
                    } else {
                      setMinNo(data);
                      addMinquantity(data);
                    }
                  } else {
                    setMinNo('');
                  }
                }}
              />
            </View>
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
  navigation: ownProps.navigation,
});

export default connect(mapStateToProps, {
  modifyCart,
})(Table);
