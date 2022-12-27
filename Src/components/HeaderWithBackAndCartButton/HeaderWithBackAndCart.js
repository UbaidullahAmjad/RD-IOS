import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import LocalizationContext from '../../../LocalizationContext';
import store from '../../Store';
import {
  addtoCartAction,
  addtoCartActionStoreSelection,
} from '../../Store/Actions/cartAction';
import {logout, storeModal, storeScreen} from '../../Store/Actions/userAction';

const HeaderWithBackAndCart = props => {
  return (
    <View
      style={{
        padding: 12,
        backgroundColor: '#F2F2F2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={props.backNavigation}
        style={{justifyContent: 'center', zIndex: 1}}>
        <FontAwesome
          name={'arrow-left'}
          color="#6C757D"
          size={16}></FontAwesome>
      </TouchableOpacity>
      <View style={{maxWidth: '80%'}}>
        <Text
          numberOfLines={1}
          style={{fontSize: 18, color: '#6C757D', fontWeight: '700'}}>
          {props.HeaderText}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {props.store_button ? (
          <TouchableOpacity
            style={{marginRight: 16}}
            onPress={() => {
              store.dispatch(storeModal(true));
              store.dispatch(storeScreen());
            }}>
            <FontAwesome name="store" size={16} color="#DC3545" />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity onPress={() => store.dispatch(logout())}>
          <FontAwesome
            name={'sign-out-alt'}
            size={18}
            style={{marginTop: 5, color: '#DC3545'}}></FontAwesome>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderWithBackAndCart;
