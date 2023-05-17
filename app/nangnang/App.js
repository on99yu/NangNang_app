import React,{useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, BackHandler, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Colors from './constants/colors';
import GetStarted from './screens/GetStarted';
import Login from './screens/Login';
import Main from './screens/Main';
import MyWallets from './screens/MyWallets';
import Register from './screens/Register';


import QRCodeScanner from './screens/QRCodeScanner';
import Payinfo from './screens/Payinfo'

import AuthProvider from './constants/AuthContext';
import { useAuth } from './constants/AuthContext';
import PayinfoProvider from './constants/PayinfoContext';
const Stack = createNativeStackNavigator();

const Navigator = () =>{
  const [user] = useAuth();

  if(!user){
    return (
        <Stack.Navigator screenOptions={{headerShown : false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            {/* <Stack.Screen name="GetStarted" component={GetStarted} /> */}
          {/* <Stack.Screen name="Main" component={Main} /> */}
        </Stack.Navigator>
    )
  }

  return (
      <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="MyWallets" component={MyWallets}/>
        <Stack.Screen name="Payinfo" component={Payinfo}/>
        <Stack.Screen name="QRCodeScanner" component={QRCodeScanner}/>
      </Stack.Navigator>
  )
}


export default function App() {
  useEffect(()=>{
    const backAction = ()=>{
      Alert.alert("알림","어플을 종료하시겠습니까?",[
        {
          text:"아니요",
          onPress:()=>null,
          style:"cancel",
        },
        {
          text:"네",
          onPress:()=>BackHandler.exitApp()
        }
      ]);
      return true
    }

    const backHandler= BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    )
  },[]);

  return (
    // @@@ 스크린을 필요에 따라 구분하는법 배우고 해야함
    <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <AuthProvider>
            <PayinfoProvider>
              <Navigator/>
            </PayinfoProvider>
          </AuthProvider>
        </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:Colors.backgroundwhite
    }
});
