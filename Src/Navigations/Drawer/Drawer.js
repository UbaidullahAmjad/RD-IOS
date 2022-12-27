import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { connect } from 'react-redux';
import CustomDrawerContent from "../../Screens/DrawerScreens/CustomDrawerContent/CustomDrawerContent";
import EditProfile from "../../Screens/DrawerScreens/EditProfile/EditProfile";
import Home from "../../Screens/DrawerScreens/Home/Home";
import OrderDetails from "../../Screens/DrawerScreens/OrderDetails/OrderDetails";
import LocalizationContext from '../../../LocalizationContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import rectify from "../../Screens/Rectify/rectify";
import Franchise from "../../Screens/FranchiseScreen/Franchise";
const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator()

const HomeStackftn = (props) => {
  return (
    <HomeStack.Navigator
      initialRouteName="Homes"
      screenOptions={{
        headerShown: false
      }}
    >
      <HomeStack.Screen
        name='Homes'
        component={Home}
        initialParams={props.route.params}
      />
      {/* <HomeStack.Screen
        name='Rectify'
        component={rectify}
        initialParams={props.route.params}
        screenOptions={{
          headerShown:'false'
        }}
      /> */}

    </HomeStack.Navigator>)

}

const Index = ({ navigation, cart, route, rectify }) => {
  const { t } = React.useContext(LocalizationContext);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Franchise"
        component={Franchise}
        options={{
          headerTintColor: "#6C757D",
          title: t('Home'),
          headerTitle: '',
          // headerRight: () => (
          //   <View style={{ flexDirection: 'row' }}>
          //     {cart?.cart?.length != 0 ? (
          //       <View style={{
          //         position: 'relative',
          //         padding: 5,
          //       }}>
          //         <TouchableOpacity
          //           style={{ marginRight: 12 }}
          //           onPress={() => navigation.navigate("Cart")}
          //         >
          //           <FontAwesome
          //             name="shopping-cart"
          //             size={16}
          //             color={"#6C757D"}
          //           ></FontAwesome>
          //         </TouchableOpacity>
          //         <View style={{
          //           color: '#fff',
          //           position: 'absolute',
          //           zIndex: 10,
          //           justifyContent: 'center',
          //           alignItems: 'center',
          //           top: -5,
          //           right: 10,
          //           padding: 1,
          //           backgroundColor: '#fff',
          //           borderRadius: 100,
          //           width: 15,
          //           height: 15,
          //           elevation: 2
          //         }}>
          //           <Text style={{
          //             fontSize: 8
          //           }}>{cart.cart.length}</Text>
          //         </View>


          //       </View>

          //     ) : null}
          //     {rectify?.rectify?.length != 0 ? (
          //       <View style={{
          //         position: 'relative',
          //         padding: 5,
          //       }}>
          //         <TouchableOpacity
          //           style={{ marginRight: 12, }}
          //           onPress={() => navigation.navigate("Rectify")}
          //         >
          //           <FontAwesome
          //             name="shopping-cart"
          //             size={16}
          //             color={"#6C757D"}
          //           ></FontAwesome>
          //         </TouchableOpacity>
          //         <View style={{
          //           color: '#fff',
          //           position: 'absolute',
          //           zIndex: 10,
          //           justifyContent: 'center',
          //           alignItems: 'center',
          //           top: -5,
          //           right: 10,
          //           padding: 1,
          //           backgroundColor: 'pink',
          //           borderRadius: 100,
          //           width: 15,
          //           height: 15,
          //           elevation: 2
          //         }}>
          //           <Text style={{
          //             fontSize: 8
          //           }}>{rectify?.rectify?.length}</Text>
          //         </View>


          //       </View>

          //     ) : null}
          //   </View>
          // ),
          drawerIcon: ({ focused, color }) => {
            return (
              <FontAwesome
                name="home"
                color={focused ? "#fff" : "#6C757D"}
                size={16}
              />
            );
          },
          drawerActiveBackgroundColor: "#0D6EFD",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#6C757D",
        }}
        initialParams={route.params}
      ></Drawer.Screen>
      <Drawer.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTintColor: "#6C757D",
          headerTitle: '',
          title: t('EditProfile'),
          drawerIcon: ({ focused, color }) => {
            return (
              <FontAwesome
                name="user-edit"
                size={16}
                color={focused ? "#fff" : "#6C757D"}
              />
            );
          },
          drawerActiveBackgroundColor: "#0D6EFD",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#6C757D",
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          headerTintColor: "#6C757D",
          headerTitle: '',
          title: t('OrderDetails'),
          // headerRight: () => (
          //   <TouchableOpacity
          //     style={{ marginHorizontal: 12 }}
          //     onPress={() => navigation.navigate("Cart")}
          //   >
          //     {/* <FontAwesome
          //       name="shopping-cart"
          //       size={16}
          //       color={"#6C757D"}
          //     ></FontAwesome> */}
          //   </TouchableOpacity>
          // ),
          drawerIcon: ({ focused, color }) => (
            <FontAwesome
              name="list"
              color={focused ? "#fff" : "#6C757D"}
              size={16}
            />
          ),
          drawerActiveBackgroundColor: "#0D6EFD",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#6C757D",
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};



const mapStateToProps = ({ cart, rectify }) => ({
  cart,
  rectify
})


export default connect(mapStateToProps, {

})(Index)
