import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

const HeaderWithOnlyBackButton = (props) => {
  return (
    <View style={{ padding: 12, backgroundColor: "#EC607F" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableWithoutFeedback onPress={props.backNavigation}>
            <FontAwesome
              name={"arrow-left"}
              style={{ fontSize: 24, marginRight: 20, color: "#fff" }}
            ></FontAwesome>
          </TouchableWithoutFeedback>
          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
            {props.HeaderText}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderWithOnlyBackButton;
