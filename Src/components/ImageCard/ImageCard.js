import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View, TextInput } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Checkbox } from "react-native-paper";

import FrontAwesome from "react-native-vector-icons/FontAwesome5";
import LocalizationContext from '../../../LocalizationContext';


const ImageCard = (props) => {
  const { setLocale, t } = React.useContext(LocalizationContext);
  if (props.index % 2 == 0) {
    var space = true
  } else {
    var space = false
  }
  return (
    <View style={{
      height: 280,
      marginLeft: 12,
      width: "45%",
      borderRadius: 12,
      overflow:"hidden",
      marginTop: props.index == 0 || props.index ==1 ? 0 :  space ? -10 * props.index :0,
    }}>
      <View style={{
        height: space ? 240 : 260,
        width: "100%",
        elevation: 10,
        backgroundColor: "#fff",
        borderRadius: 12,
       marginTop: props.index == 1 ? 0 : props.index == 3 ? 0 : space ? 0 : 0.6 * props.index
      }}>
        <TouchableHighlight
          onPress={() =>
            props.navigation.navigate("ProductDetail", {
              image: props.image_product,
              item: props.item
            })
          }
          style={{ flexWrap: 'wrap', borderRadius: 12,  }}
          underlayColor={"#fff"}
        >
          <View style={{ width: "100%" }}>
            <View style={{
              width: "100%",
              height: '60%',
              justifyContent: 'center',
              alignItems: 'center',

            }}>
              <Image
                source={props.image_product}
                style={{ borderTopRightRadius: 24, borderTopLeftRadius: 24, resizeMode: 'contain', height: 100, width: 100 }}
              // resizeMode='contain'
              />

            </View>
            <View style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              paddingBottom: 18
            }}>
              <View style={{}}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    marginTop: 5,
                    color: "black"
                  }}
                >
                  {props.item.name}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 6, justifyContent: "space-between" }}>
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "700",
                      color: "#0A0A0A"
                    }}
                  >
                    {t('Available stock :')}
                  </Text>

                </View>
                <Text
                  style={{
                    fontSize: 12,
                    // fontWeight: "700",
                    color: "#0A0A0A",
                  }}
                >
                  {props.item.quantity}
                </Text>



              </View>
              <View style={{ flexDirection: 'row', justifyContent: "space-between", }}>
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "700",
                      color: "#0A0A0A"
                    }}
                  >
                    {t('Price')} :
                  </Text>

                </View>

                <Text
                  style={{
                    fontSize: 12,
                    // fontWeight: "700",
                    color: "#0A0A0A",
                  }}
                >
                  {props.item?.price_per_package}
                </Text>



              </View>


            </View>
          </View>
        </TouchableHighlight>


      </View>

    </View>
  );
};

export default ImageCard;