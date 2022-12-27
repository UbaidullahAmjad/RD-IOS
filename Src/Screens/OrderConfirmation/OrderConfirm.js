import React from "react";
import {
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

import HeaderWithOnlyBackButton from "../../components/HeaderWithOnlyBackButton/HeaderWithOnlyBackButton";

const OrderConfirm = ({ navigation }) => {
  return (
    <View>
      <HeaderWithOnlyBackButton
        HeaderText={"OrderConfirmation"}
        backNavigation={() =>
          navigation.navigate("DrawerScreen", { screen: "Home" })
        }
      />
      <View style={{ alignItems: "center", marginTop: 70 }}>
        <FontAwesome
          name="check-circle"
          style={{ fontSize: 120, color: "#EC607F" }}
        />
        <Text style={{ marginTop: 20, fontSize: 30 }}>Thank You</Text>
        <Text style={{ marginTop: 10, fontSize: 18 }}>
          Your Order Has Been Placed !!!
        </Text>
        <Text style={{ color: "#ec607f", marginVertical: 10, fontSize: 18 }}>
          Your Order Number: 04348
        </Text>
        {/* <Text style={{ width: "55%", textAlign: "center", fontSize: 18 }}>
          Our rider will reach within 25-30 minutes at your delivery address.
        </Text> */}
        <View style={{ width: "100%" }}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("DrawerScreen", { screen: "Home" })
            }
          >
            <View
              style={{
                elevation: 1,
                padding: 10,
                marginTop: 20,
                alignSelf: "center",
                borderRadius: 30,
                backgroundColor: "#EC607F",
                width: "40%",
              }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Back To Shop
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default OrderConfirm;
