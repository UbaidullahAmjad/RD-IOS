import React from "react";

import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

import store from '../../Store'

const TextCard = (props) => {
  const gotoProductORCart = (id) => {
       props.navigation.navigate('Home', {
        Supplierid: id,
        Suppliername: props.name,
        category: props.category,
        min_req_qty: props?.min_req_qty
      })
    // const findCart = id => store.getState().cart.cart.findIndex(obj => obj.sid == id)
    // if (findCart(id) == -1) {
    //   props.navigation.navigate('Home', {
    //     Supplierid: id,
    //     Suppliername: props.name,
    //     category: props.category,
    //     min_req_qty: props?.min_req_qty
    //   })
    // } else {
    //   props.navigation.navigate('Cart')
    // }

  }
  return (
    <TouchableHighlight
      activeOpacity={2}
      underlayColor="#ec607f"
      onPress={() => gotoProductORCart(props.id)}
      style={{
        backgroundColor: "#fff",
        elevation: 10,
        marginTop: 12,
        borderRadius: 12,
        marginHorizontal: 6


      }}
    >
      <View style={{ margin: 10, marginBottom: 0 }}>
        <View
          underlayColor="#f7f7f7"
        >
          <View
            style={{
              padding: 10,
              flexDirection: "row",
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../../assets/images/supplier.png")}
              style={{ marginRight: 10, width: 64, height: 64 }}
            />
            <View style={{ flex: 1, justifyContent: "center", marginLeft: 8 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{props.name}</Text>
              <Text style={{ fontSize: 12 }}>{props.email}</Text>
            </View>

          </View>
        </View>
        <View
          style={{
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {props.categories}
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default TextCard;
