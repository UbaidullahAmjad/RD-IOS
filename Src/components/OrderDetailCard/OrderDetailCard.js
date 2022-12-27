import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import OrderDetailTable from "../OrderDetailTable/OrderDetailTable";

const OrderDetailCard = () => {
  return (
    <View style={{ margin: 10 }}>
      <ScrollView>
        <OrderDetailTable btncolor="#5cb85c" btnText="Delivered" />
        <OrderDetailTable btncolor="#f0ad4e" btnText="Confirmed" />
        <OrderDetailTable btncolor="#d9534f" btnText="Canceled" />
      </ScrollView>
    </View>
    
  );
};

export default OrderDetailCard;
