import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';
import Toast from 'react-native-toast-message';
import store from '..';
import {onOtherStatus} from '../../Service/Helper';
import {
  confirmCartservice,
  getConfirmCartDate,
  getOrderDetails,
} from '../../Service/ServiceRequest';
import {
  CHANGE_BTN_LOADER,
  CHANGE_CART_CONFIRM_DATE_DATA,
  CHANGE_CART_DATA,
  CHANGE_CART_DATE_MODAL,
  CHANGE_LOADER,
  CHANGE_ORDER_DETAIL,
  CHANGE_PRODUCT,
  CHANGE_STORE_SCREEN,
} from './type';

export const addtoCartAction = (product, navigation, internet) => {
  return async dispatch => {
    dispatch({type: CHANGE_CART_DATA, payload: [product]});
    dispatch({type: CHANGE_LOADER, payload: true});
    getConfirmCartDate(product.sid, store.getState().user.userData.id)
      .then(resp => {
        if (resp.status == 200) {
          dispatch({type: CHANGE_CART_CONFIRM_DATE_DATA, payload: resp.data});
          dispatch({type: CHANGE_LOADER, payload: false});
        } else {
          dispatch({type: CHANGE_BTN_LOADER, payload: false});
        }
      })
      .catch(result => {
        console.log(result);
        dispatch({type: CHANGE_LOADER, payload: false});
        dispatch({type: CHANGE_CART_CONFIRM_DATE_DATA, payload: {}});
        if (result?.message == 'Network Error') {
          Toast.show({
            text1: 'OOPS!',
            text2: `${internet ? internet : ''}`,
            position: 'top',
          });
        }
      });
    navigation.navigate('Cart');
  };
};

export const addtoCartActionStoreSelection = () => {
  return async dispatch => {
    dispatch({type: CHANGE_CART_CONFIRM_DATE_DATA, payload: []});
    dispatch({type: CHANGE_STORE_SCREEN, payload: false});
    dispatch({type: CHANGE_LOADER, payload: true});
    getConfirmCartDate(
      store?.getState()?.cart?.cart[0]?.sid,
      store.getState().user.userData.id,
    )
      .then(resp => {
        if (resp.status == 200) {
          dispatch({type: CHANGE_CART_CONFIRM_DATE_DATA, payload: resp.data});
          dispatch({type: CHANGE_LOADER, payload: false});
        } else {
          dispatch({type: CHANGE_BTN_LOADER, payload: false});
        }
      })
      .catch(result => {
        dispatch({type: CHANGE_LOADER, payload: false});
        dispatch({type: CHANGE_CART_CONFIRM_DATE_DATA, payload: {}});
        if (result?.message == 'Network Error') {
          Toast.show({
            text1: 'OOPS!',
            text2: `${internet ? internet : ''}`,
            position: 'top',
          });
        }
      });
  };
};

export const removeData = () => {
  return async dispatch => {
    dispatch({type: CHANGE_PRODUCT, payload: []});
    dispatch({type: CHANGE_CART_DATA, payload: []});
    dispatch({type: CHANGE_CART_CONFIRM_DATE_DATA, payload: {}});
  };
};

export const modifyCart = (supplierid, navigation) => {
  return async dispatch => {
    // console.log("$44444444444444444444444444444444444444")
    // console.log(supplierid)
    // let categories = store.getState().fransh.franchiseData.filter((item, index) => {
    //     return item.supplier.id == supplierid
    // })
    dispatch({type: CHANGE_PRODUCT, payload: []});
    navigation.push('DrawerScreen', {
      screen: 'Home',
      params: {
        Supplierid: supplierid,
        // category: categories[0].categories,
      },
    });
  };
};

export const deleteItem = (id, sid) => {
  return async dispatch => {
    let cartdata = [...store.getState().cart.cart];
    var newCart = [];

    for (let i = 0; i < cartdata.length; i++) {
      if (sid == cartdata[i].sid) {
        const newData = cartdata[i].product.filter((item, index) => {
          return item.id != id;
        });
        if (newData.length == 0) {
        } else {
          let newObj = {...cartdata[i]};
          newObj['product'] = newData;
          newCart.push(newObj);
        }
      } else {
        newCart.push(cartdata[i]);
      }
    }
    dispatch({type: CHANGE_CART_DATA, payload: [...newCart]});
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };
};

export const getDateofCart = (
  sid,
  warning,
  internet,
  rule,
  change,
  productChange,
) => {
  return async dispatch => {
    dispatch({type: CHANGE_LOADER, payload: true});
    getConfirmCartDate(sid, store.getState().user.userData.id)
      .then(resp => {
        if (resp.status == 200) {
          change();
          productChange();
          // dispatch({ type: CHANGE_CART_DATE_MODAL, payload: true })
          dispatch({type: CHANGE_CART_CONFIRM_DATE_DATA, payload: resp.data});
          dispatch({type: CHANGE_LOADER, payload: false});
        } else {
          dispatch({type: CHANGE_BTN_LOADER, payload: false});
        }
      })
      .catch(result => {
        dispatch({type: CHANGE_LOADER, payload: false});
        console.log(result);
        if (result?.response?.status == 500) {
          Toast.show({
            text1: 'OOPS',
            text2: `${warning ? warning : ''}`,
            position: 'top',
          });
        } else if (result?.response?.status == 404) {
          Toast.show({
            text1: 'OOPS!',
            text2: `${warning ? warning : ''}`,
            position: 'top',
          });
        } else if (result?.response?.status == 401) {
          Toast.show({
            text1: 'OOPS!',
            text2: `${rule ? rule : ''}`,
            position: 'top',
          });
        } else if (result?.message == 'Network Error') {
          Toast.show({
            text1: 'OOPS!',
            text2: `${internet ? internet : ''}`,
            position: 'top',
          });
        }
      });
  };
};

export const confirmOrder = (
  navigation,
  value,
  msg,
  product,
  total,
  er,
  success,
  successfull,
  warning,
  internet,
  change,
) => {
  return async dispatch => {
    if (value == '' || value == undefined) {
      ToastAndroid.showWithGravity(
        `${warning}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      var pid = [];
      var qty = [];
      var minqty = [];
      for (let i = 0; i < product.product.length; i++) {
        pid.push(product.product[i].id);
        qty.push(product.product[i].quantity);
        minqty.push(product.product[i].minquantity);
      }
      dispatch({type: CHANGE_LOADER, payload: true});
      confirmCartservice(
        pid,
        qty,
        minqty,
        store.getState().user.userData.id,
        product.sid,
        total,
        value,
        msg,
      )
        .then(async resp => {
          if (resp.status == 200) {
            dispatch({type: CHANGE_CART_CONFIRM_DATE_DATA, payload: {}});
            let remainigcart = store
              .getState()
              .cart.cart.filter(obj => obj.sid != product.sid);
            dispatch({type: CHANGE_CART_DATA, payload: remainigcart});
            await AsyncStorage.setItem('cart', JSON.stringify(remainigcart));

            Toast.show({
              type: 'success',
              text1: successfull,
              text2: success,
            });

            navigation.navigate('DrawerScreen', {
              screen: 'OrderDetails',
            });
            store.dispatch(getorderDetail(er, internet));
            // change(false) // change used to hide the modal
          }
          dispatch({type: CHANGE_LOADER, payload: false});
        })
        .catch(result => {
          console.log(result);
          dispatch({type: CHANGE_LOADER, payload: false});
          if (result?.response?.status == 500) {
            ToastAndroid.showWithGravity(
              `${er}`,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else if (result?.response?.status == 404) {
            ToastAndroid.showWithGravity(
              `${er}`,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else if (result?.response?.status == 401) {
            ToastAndroid.showWithGravity(
              `${er}`,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else if (result?.message == 'Network Error') {
            ToastAndroid.showWithGravity(
              `${internet}`,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        });
    }
  };
};

// Phase 1 Code
// export const addtoCart = (productid, quantity, minquantity, navigation) => {
//     return async dispatch => {
//         if (quantity == 0) {
//             Toast.show({
//                 type: 'error',
//                 text1: 'Quantity!',
//                 text2: 'Quantity Must be greater than 0'
//             });

//         } else {
//             dispatch({ type: CHANGE_BTN_LOADER, payload: true })
//             var formdata = new FormData();
//             formdata.append("product_id", `[${productid}]`);
//             formdata.append("quantity", ` [${quantity}]`);
//             formdata.append("min_qty", `[${minquantity}]`);
//             formdata.append("user_id", `${store.getState().user.userData.id}`);
//             console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
//             console.log(formdata)
//             var requestOptions = {
//                 method: 'POST',
//                 body: formdata,
//                 redirect: 'follow'
//             };
//             let cartData = await fetch(
//                 BASE_URL + 'cart/add/item',
//                 requestOptions,
//             ).then(response =>
//                 response.json().then(data => ({ response: response, data })),
//             );
//             dispatch({ type: CHANGE_BTN_LOADER, payload: false })
//             if (cartData.response.status == 200) {
//                 dispatch({ type: CHANGE_CART_DATA, payload: cartData.data.cart_page_array })
//                 await AsyncStorage.setItem('cart', JSON.stringify(cartData.data.cart_page_array))
//                 navigation.goBack()
//                 Toast.show({
//                     type: 'success',
//                     text1: 'Added!',
//                     text2: 'Item added successfully'
//                 });
//             }
//             else {
//                 onOtherStatus(cartData, dispatch)
//                 console.log(cartData.status)
//             }
//         }
//     };
// }

export const hideCOnfirmDateModal = () => {
  return async dispatch => {
    dispatch({type: CHANGE_CART_DATE_MODAL, payload: false});
    dispatch({type: CHANGE_CART_CONFIRM_DATE_DATA, payload: {}});
  };
};

export const getorderDetail = (warning, internet) => {
  return async dispatch => {
    dispatch({type: CHANGE_LOADER, payload: true});
    getOrderDetails(store.getState().user.userData.id)
      .then(resp => {
        if (resp.status == 200) {
          dispatch({
            type: CHANGE_ORDER_DETAIL,
            payload: resp?.data?.all_orders?.reverse(),
          });
        }
        dispatch({type: CHANGE_LOADER, payload: false});
      })
      .catch(e => {
        console.log(e);
        dispatch({type: CHANGE_LOADER, payload: false});
        onOtherStatus(e, dispatch, warning, internet);
      });
  };
};
