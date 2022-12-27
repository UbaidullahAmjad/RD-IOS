import {
  DrawerContentScrollView, DrawerItem, DrawerItemList
} from "@react-navigation/drawer";
import React from "react";
import { Text, View } from "react-native";
import { Avatar } from 'react-native-paper';
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import LocalizationContext from '../../../../LocalizationContext';
import store from '../../../Store';
import { logout } from "../../../Store/Actions/userAction";

const CustomDrawerContent = (props) => {
  const { setLocale, t } = React.useContext(LocalizationContext);

  return (
    <View style={{ flex: 1, paddingTop: 18 , backgroundColor:"#F2F2F2" }}>
      <View style={{ borderBottomWidth: 0.8, borderColor: '#0D6EFD', paddingBottom: 18 }}>
        <View style={{ flexDirection: "row", marginHorizontal: 12 }}>
          {store.getState().user?.userData?.image ? (
            <Avatar.Image size={24} source={{ uri: store.getState().user?.userData?.image }} />
          ) :
            <Avatar.Text
              style={{ backgroundColor: "#0D6EFD" }}
              color='#fff'
              size={60}
              label={store.getState().user?.userData?.name ? store.getState().user?.userData?.name.substring(0, 2) : "D"} />
          }
          <View style={{ marginLeft: 8, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#6C757D",
              }}
            >
              {store.getState().user?.userData?.name ? store.getState().user.userData.name : "Dounts"}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#6C757D",
              }}
            >
              {store.getState().user.userData.email}
            </Text>

          </View>
        </View>
      </View>
      <DrawerContentScrollView style={{ flex: 1, marginTop: 18 }} {...props}>

        <View >
          <DrawerItemList {...props} />
        </View>


      </DrawerContentScrollView>
      <DrawerItem
        onPress={() => store.dispatch(logout())}
        label={t('Logout')}
        icon={({ focused, color, size }) => (
          <FontAwesome
            name="sign-out-alt"
            size={16}
            color={focused ? "#fff" : "#DC3545"}
          />
        )}
        inactiveTintColor="#DC3545"
      ></DrawerItem>

    </View>

  );
};

export default CustomDrawerContent;
