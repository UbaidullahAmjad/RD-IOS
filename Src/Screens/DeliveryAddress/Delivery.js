import React from "react";
import {
  Text,
  TextInput,
  TouchableHighlight,
  View,
  TouchableOpacity,
} from "react-native";

import HeaderWithOnlyBackButton from "../../components/HeaderWithOnlyBackButton/HeaderWithOnlyBackButton";

const Delivery = ({ navigation }) => {
  return (
    <View>
      <HeaderWithOnlyBackButton
        HeaderText={"Delivery Address"}
        backNavigation={() => navigation.goBack()}
      />
      <View style={{ padding: 10 }}>
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "#EC607F", fontSize: 16, fontWeight: "700" }}>
            Name
          </Text>
          <TextInput
            style={{
              marginVertical: 5,
              padding: 10,
              backgroundColor: "#e7e7e7",
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "#EC607F", fontSize: 16, fontWeight: "700" }}>
            Phone Number
          </Text>
          <TextInput
            style={{
              marginVertical: 5,
              padding: 10,
              backgroundColor: "#e7e7e7",
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "#EC607F", fontSize: 16, fontWeight: "700" }}>
            Street Address
          </Text>
          <TextInput
            style={{
              marginVertical: 5,
              padding: 10,
              backgroundColor: "#e7e7e7",
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("OrderConfirmation")}
        >
          <View
            style={{
              elevation: 1,
              padding: 10,
              width: "50%",
              alignSelf: "center",
              marginTop: 20,
              borderRadius: 30,
              backgroundColor: "#EC607F",
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Delivery;
