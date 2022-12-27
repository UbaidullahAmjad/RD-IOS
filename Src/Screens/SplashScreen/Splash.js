import React, { useEffect } from "react";
import { Image, ImageBackground, View, Text } from "react-native";

// import SplashScreen from "react-native-splash-screen";
import Login from "../LoginScreen/login";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      navigation.navigate("Login");
    }, 3000);
  }, []);

  return (
    <View>
      <Image
        source={require("../../assets/images/donut_image.png")}
        resizeMode={"stretch"}
        style={{ width: "100%", height: "100%" }}
      />
      {/* <Text>SPLASH</Text> */}
    </View>
  );
};

export default Splash;
