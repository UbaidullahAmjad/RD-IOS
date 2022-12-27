import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import LocalizationContext from '../../../LocalizationContext';
import { CustomMenu } from '../../components/custom-menu/custom-menu';
import TextCard from '../../components/TextCard/TextCard';
import { removeData } from '../../Store/Actions/cartAction';
import { franshiseGetSuppliers } from '../../Store/Actions/franchiseAction';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  logout,
  storeUserSelect,
  storeModal,
} from '../../Store/Actions/userAction';

const Supplier = props => {
  const { setLocale, t } = React.useContext(LocalizationContext);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    props.franshiseGetSuppliers(
      t('Something Went Wrong! Kindly try again later'),
      t('Kindly Check your Internet Connection'),
    );
  }, []);

  React.useEffect(() => {
    checkValue();
  }, []);

  const checkValue = async () => {
    const storeUserSelect = await AsyncStorage.getItem('storeUserSelectData');
    const storeUserSelectData = JSON.parse(storeUserSelect);
    if (storeUserSelectData !== null) {
      props.storeModal(false);
    } else {
      setTimeout(() => {
        props.storeModal(true);
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 10 }}>
      <View
        style={{
          padding: '4%',
          justifyContent: 'space-between',
          backgroundColor: '#F2F2F2',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View>
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Entypo name="menu" color="#6C757D" size={24} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {props?.rectify?.rectify?.length != 0 ? (
            <TouchableOpacity
              onPress={() => props?.navigation.navigate('Rectify')}
              style={{
                position: 'relative',
                padding: 5,
              }}>
              <TouchableOpacity
                style={{ marginRight: 12 }}
                onPress={() => props?.navigation.navigate('Rectify')}>
                <FontAwesome
                  name="shopping-cart"
                  size={16}
                  color={'#6C757D'}></FontAwesome>
              </TouchableOpacity>
              <View
                style={{
                  color: '#fff',
                  position: 'absolute',
                  zIndex: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: -5,
                  right: 10,
                  padding: 1,
                  backgroundColor: '#6C757D',
                  borderRadius: 100,
                  width: 15,
                  height: 15,
                  elevation: 2,
                }}>
                <Text
                  style={{
                    fontSize: 8,
                    color: '#fff',
                  }}>
                  {props?.rectify?.rectify?.length}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          <View style={{ zIndex: 1 }}>
            <Entypo
              name="dots-three-vertical"
              onPress={() => setVisible(true)}
              size={18}
              color="#6C757D"
            />
            <View style={{}}>
              {visible && (
                <CustomMenu
                  changeEng={async () => {
                    try {
                      setLocale('en');
                      await AsyncStorage.setItem(
                        'language',
                        JSON.stringify('en'),
                      );
                    } catch (error) {
                      console.log(error.message);
                    }
                  }}
                  changeFrn={async () => {
                    try {
                      setLocale('fn');
                      await AsyncStorage.setItem(
                        'language',
                        JSON.stringify('fn'),
                      );
                    } catch (error) {
                      console.log(error.message);
                    }
                  }}
                  visible={visible}
                  setVisible={setVisible}
                />
              )}
            </View>
          </View>

          <TouchableOpacity
            style={{ marginHorizontal: 8 }}
            onPress={() => props.storeModal(!props.shared.storeModalVisible)}>
            <FontAwesome5 name="store" size={16} color="#DC3545" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginLeft: 8 }}
            onPress={() => props?.logout()}>
            <FontAwesome5 name="sign-out-alt" size={18} color="#DC3545" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 6 }}>
        <Text
          style={{
            color: 'black',
            paddingTop: 12,
            paddingBottom: 2,
            fontSize: 16,
            paddingHorizontal: 8,
            fontWeight: 'bold',
          }}>
          {t('dount')}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          data={props.fransh.franchiseData}
          ListFooterComponent={() => {
            return <View style={{ height: 24 }} />;
          }}
          renderItem={({ item, index }) => {
            return (
              <TextCard
                name={item.supplier?.name}
                id={item?.supplier.id}
                category={item?.categories}
                navigation={props.navigation}
                email={item.supplier?.email}
                categories={
                  <ScrollView
                    horizontal={true}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    {item.categories.map((item, index) => (
                      <Text
                        key={index}
                        style={{
                          backgroundColor: '#EC607F',
                          padding: item?.name ? 3 : 0,
                          borderRadius: 5,
                          elevation: 5,
                          color: '#fff',
                          margin: item?.name ? 8 : 0,
                        }}>
                        {item?.name}
                      </Text>
                    ))}
                  </ScrollView>
                }
                min_req_qty={item.supplier?.min_req_qty}></TextCard>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                props.franshiseGetSuppliers(
                  t('Something Went Wrong! Kindly try again later'),
                  t('Kindly Check your Internet Connection'),
                );
              }}
            />
          }
          keyExtractor={(item, index) => index}
        />
      </View>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <RadioButton.Group
              onValueChange={async newValue => {
                setValue(newValue);
                await props.storeUserSelect(newValue);
                setTimeout(() => {
                  setModalVisible(false);
                }, 500);
              }}
              value={value}>
              {Object.keys(props.user?.storeData).length != 0 ? (
                <View>
                  <Entypo
                    name="cross"
                    onPress={() => setModalVisible(!modalVisible)}
                    size={20}
                    color="#DC3545"
                    style={{alignSelf: 'flex-end'}}
                  />
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
      </Modal> */}
    </SafeAreaView>
  );
};

const mapStateToProps = ({ fransh, shared, cart, rectify, user }) => ({
  fransh,
  shared,
  cart,
  rectify,
  user,
});

export default connect(mapStateToProps, {
  franshiseGetSuppliers,
  removeData,
  logout,
  storeUserSelect,
  storeModal,
})(Supplier);
