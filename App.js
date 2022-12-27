import React, {useEffect} from "react";
import { StyleSheet,SafeAreaView,StatusBar } from "react-native";
import Navigator from "./Src/Navigations/index";
import RNBootSplash from 'react-native-bootsplash'; // https://github.com/zoontek/react-native-bootsplash
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
export default function App() {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  },[])

  return <SafeAreaView
  style={{
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 0,
    // position:'absolute',
    // top: 40, bottom: 0, left: 0, right: 0, height: '100%', width: '100%',
    // marginBottom: -16,
    marginTop: Platform.OS === 'android' ? -12 : 0,
  }}>
  <StatusBar
    hidden={false}
    backgroundColor={'white'}
    barStyle={'dark-content'}></StatusBar>
  {/* <AppContainer></AppContainer> */}
  <Navigator />
</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
