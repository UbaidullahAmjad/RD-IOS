import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
  LogBox,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import Cart from '../Screens/Cart/Cart';
import ModifyCart from '../Screens/Cart/ModifyCart';
import Delivery from '../Screens/DeliveryAddress/Delivery';
import FranchiseScreen from '../Screens/FranchiseScreen/Franchise';
import Login from '../Screens/LoginScreen/login';
import OrderConfirm from '../Screens/OrderConfirmation/OrderConfirm';
import RectifyModify from '../Screens/Rectify/modifyRectify';
import rectify from '../Screens/Rectify/rectify';
import Invoice from '../Screens/OrderConfirmation/Invoice';
import DrawerComponent from './Drawer/Drawer';
import Home from '../Screens/DrawerScreens/Home/Home';
import {RadioButton} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import LocalizationContext from '../../LocalizationContext';
import {storeUserSelect, storeModal} from '../Store/Actions/userAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addtoCartActionStoreSelection} from '../Store/Actions/cartAction';

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
const Index = props => {
  const [value, setValue] = React.useState('');
  const {t} = React.useContext(LocalizationContext);

  React.useEffect(() => {
    checkValue();
  }, []);

  const checkValue = async () => {
    const storeUserSelect = await AsyncStorage.getItem('storeUserSelectData');
    const storeUserSelectData = JSON.parse(storeUserSelect);
    if (storeUserSelectData !== null) {
      setValue(storeUserSelectData);
    }
  };

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          {props.user.userData == null ? (
            <Stack.Screen
              name={'Login'}
              component={Login}
              options={{headerShown: false}}></Stack.Screen>
          ) : (
            <>
              <Stack.Screen
                name={'DrawerScreen'}
                component={DrawerComponent}
                options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen
                name={'Home'}
                component={Home}
                options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen
                name={'Franchise'}
                component={FranchiseScreen}
                options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen
                name={'ModifyCart'}
                component={ModifyCart}
                options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen
                name={'OrderConfirmation'}
                component={OrderConfirm}
                options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen
                name={'Cart'}
                component={Cart}
                options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen
                name={'Invoice'}
                component={Invoice}
                options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen
                name={'Rectify'}
                component={rectify}
                options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen
                name={'RectifyModify'}
                component={RectifyModify}
                options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen
                name={'Delivery'}
                component={Delivery}
                options={{headerShown: false}}></Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>

      <Toast />

      <Modal
        statusBarTranslucent={false}
        visible={props.shared.dataLoader}
        transparent={true}>
        <View
          style={{
            backgroundColor: '#000000aa',
            flex: 1,
            justifyContent: 'center',
            paddingLeft: '3%',
            paddingRight: '3%',
          }}>
          <ActivityIndicator size="large" color={'red'} />
        </View>
      </Modal>

      <Modal
        animationType='none'
        transparent={true}
        visible={props.shared.storeModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <RadioButton.Group
              onValueChange={async newValue => {
                setValue(newValue);
                await props.storeUserSelect(newValue);
                setTimeout(() => {
                  props.storeModal(!props.shared.storeModalVisible);
                }, 100);
                if (props?.user?.storeScreen) {
                  props.addtoCartActionStoreSelection();
                }
              }}
              value={value}>
              <Entypo
                name="cross"
                onPress={() =>
                  props.storeModal(!props.shared.storeModalVisible)
                }
                size={20}
                color="#DC3545"
                style={{alignSelf: 'flex-end'}}
              />
              {Object.keys(props.user?.storeData).length != 0 ? (
                <View>
                  <Text
                    style={{fontSize: 16, fontWeight: '700', marginBottom: 6}}>
                    {t('Select Store')}
                  </Text>
                  {props.user?.storeData.map((item, index) => {
                    return (
                      <View key={index}>
                        <View style={{flexDirection: 'row'}}>
                          <RadioButton value={item.id} />
                          <View style={{justifyContent: 'center'}}>
                            <Text>{item.name_fr}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <Text
                  style={{fontSize: 14, fontWeight: '700', marginBottom: 6}}>
                  {t('no supplier associated rule found')}
                </Text>
              )}
            </RadioButton.Group>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    borderColor: '#DC3545',
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const mapStateToProps = ({user, shared}) => ({
  user,
  shared,
});

export default connect(mapStateToProps, {
  storeUserSelect,
  storeModal,
  addtoCartActionStoreSelection,
})(Index);
