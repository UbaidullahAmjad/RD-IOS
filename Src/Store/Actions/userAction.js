import Toast from 'react-native-toast-message';
import {
  CHANGE_BTN_LOADER,
  CHANGE_USER_DATA,
  CHANGE_CART_DATA,
  CHANGE_STORE_DATA,
  CHANGE_STORE_USER_SELECT_DATA,
  CHANGE_STORE_MODAL,
  CHANGE_STORE_SCREEN,
} from './type';
import {userLogin, editProfileservice} from '../../Service/ServiceRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onOtherStatus, Helper} from '../../Service/Helper';
import store from '..';

export const login = (email, password, empty) => {
  return async dispatch => {
    if (email == '' || password == '') {
      Toast.show({
        type: 'error',
        text1: 'OOPS!',
        text2: `${empty}`,
      });
    } else if (!Helper(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email!',
        text2: 'Kindly Enter Correct Email Address',
      });
    } else {
      dispatch({type: CHANGE_BTN_LOADER, payload: true});
      userLogin(email, password)
        .then(async response => {
          console.log(response.data.selected_stores);
          if (response?.status == 200) {
            await AsyncStorage.setItem(
              'token',
              JSON.stringify(response.data.token),
            );
            await AsyncStorage.setItem(
              'userData',
              JSON.stringify(response.data.data),
            );
            await AsyncStorage.setItem(
              'storeData',
              JSON.stringify(response.data.selected_stores),
            );
            // await AsyncStorage.setItem('cart', JSON.stringify(response.data.cart_page_array))
            dispatch({type: CHANGE_USER_DATA, payload: response.data.data});
            dispatch({
              type: CHANGE_STORE_DATA,
              payload: response.data.selected_stores,
            });
            // dispatch({ type: CHANGE_CART_DATA, payload: response.data.cart_page_array })
            dispatch({type: CHANGE_BTN_LOADER, payload: false});
          } else {
            dispatch({type: CHANGE_BTN_LOADER, payload: false});
          }
        })
        .catch(error => {
          dispatch({type: CHANGE_BTN_LOADER, payload: false});
          onOtherStatus(
            error,
            dispatch,
            'Invalid Username or Password',
            'Kindly Check Your Internet Connection',
          );
        });
    }
  };
};

export const alreadyLogin = () => {
  return async dispatch => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const storeData = await AsyncStorage.getItem('storeData');
      const storeUserSelect = await AsyncStorage.getItem('storeUserSelectData');
      const storeUserSelectData = JSON.parse(storeUserSelect);
      const storeDataParse = JSON.parse(storeData);
      const userDataParse = JSON.parse(userData);
      if (userDataParse !== null) {
        dispatch({type: CHANGE_USER_DATA, payload: userDataParse});
      }
      if (storeData !== null) {
        dispatch({
          type: CHANGE_STORE_DATA,
          payload: storeDataParse,
        });
      }
      if (storeUserSelectData !== null) {
        dispatch({
          type: CHANGE_STORE_USER_SELECT_DATA,
          payload: storeUserSelectData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const EditProfile = (
  fullname,
  email,
  phone,
  password,
  success,
  warning,
  updated,
  internet,
) => {
  return async dispatch => {
    dispatch({type: CHANGE_BTN_LOADER, payload: true});
    editProfileservice(
      fullname,
      email,
      phone,
      password,
      store.getState().user.userData.id,
    )
      .then(async response => {
        if (response?.status == 200) {
          Toast.show({
            type: 'success',
            text1: `${updated}`,
            text2: `${success}`,
          });
          await AsyncStorage.setItem(
            'userData',
            JSON.stringify(response.data.data),
          );
          dispatch({type: CHANGE_USER_DATA, payload: response.data.data});
        }
        dispatch({type: CHANGE_BTN_LOADER, payload: false});
      })
      .catch(e => {
        dispatch({type: CHANGE_BTN_LOADER, payload: false});
        onOtherStatus(e, dispatch, warning, internet);
      });
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch({type: CHANGE_USER_DATA, payload: null});
    dispatch({type: CHANGE_CART_DATA, payload: []});
    dispatch({type: CHANGE_STORE_DATA, payload: []});
    dispatch({type: CHANGE_STORE_USER_SELECT_DATA, payload: null});
    dispatch({type: CHANGE_STORE_SCREEN, payload: false});
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('cart');
    await AsyncStorage.removeItem('storeData');
    await AsyncStorage.removeItem('storeUserSelectData');
  };
};

export const storeUserSelect = value => {
  return async dispatch => {
    await AsyncStorage.setItem('storeUserSelectData', JSON.stringify(value));
    dispatch({type: CHANGE_STORE_USER_SELECT_DATA, payload: value});
  };
};

export const storeModal = id => {
  return async dispatch => {
    dispatch({type: CHANGE_STORE_MODAL, payload: id});
  };
};

export const storeScreen = () => {
  return async dispatch => {
    dispatch({type: CHANGE_STORE_SCREEN, payload: true});
  };
};
