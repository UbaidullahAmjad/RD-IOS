import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
// import {
//   CHANGE_BUTTON_LOADING, CHANGE_LOADER, IS_LOGIN_HOST
// } from './Store/Actions/types';

export function Helper(mail) {
    if (
        /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(
            mail,
        )
    ) {
        return true;
    }
    else {
        Toast.show({
            text1: 'OOPS!',
            text2: 'Kindly Enter the Valid Email Address',
            position: 'top',
        });
        return false;
    }


}

export const getToken = async () => {
    const token = await AsyncStorage.getItem('userData');
    const parse = JSON.parse(token);
    return parse.data.token;
};

// export const getFCMToken = async () => {
//   let myFCMToken = await messaging().getToken().then(fcmToken => {
//     if (fcmToken) {
//       return fcmToken
//     } else {
//       // return null
//     }
//   })
//   return myFCMToken
// };

export const onOtherStatus = (result, dispatch, warning, internet) => {
    //   dispatch({ type: CHANGE_BUTTON_LOADING, payload: false });
    //   dispatch({ type: CHANGE_LOADER, payload: false });
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
            text2: `${warning ? warning : ''}`,
            position: 'top',
        });
    }

    else if (result?.message == 'Network Error') {
        Toast.show({
            text1: 'OOPS!',
            text2: `${internet ? internet : ""}`,
            position: 'top',
        });
    }
};

export const onRejection = (error, dispatch) => {
    dispatch({ type: CHANGE_BUTTON_LOADING, payload: false });
    dispatch({ type: CHANGE_LOADER, payload: false });
    // alert('helper')
    console.log('error', error);
    if (error.message === 'Network request failed') {
        Toast.show({
            text1: 'Internet',
            text2: 'Kindly Check your Internet Connection',
            position: 'top',
        });
    }
};
