import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { getCategoryProduct } from "../../Store/Actions/franchiseAction";
const Categories = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.getCategoryProduct(props.categoryid, props.supplierId)}
      style={{ marginLeft: props.left_margin,  }}  >
      <View style={{
        width: 60,
        height: 60,
        borderRadius: 100,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#EC607F",
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: "center",
        
      }}>
        <Image
          source={props.image_source}
          style={{
            width: 50,
            height: 50,

          }}
          resizeMode="contain"
        />
      </View>
      <View style={{ }}>
        <Text
          style={{ textAlign: "center",  marginTop: 3, fontSize: 12 , color:"black" }}
          ellipsizeMode={"tail"}
          numberOfLines={2}
        >
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const mapStateToProps = ({ }) => ({

})


export default connect(mapStateToProps, {
  getCategoryProduct
})(Categories)


