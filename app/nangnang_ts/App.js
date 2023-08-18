import React,{useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, Alert, Pressable} from 'react-native';

import Colors from './constants/colors';
import Navigator from './navigator/Navigator';
import AuthProvider from './context/AuthContext';
import PayinfoProvider from './context/PayinfoContext';

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
    return ()=>backHandler.remove();
  },[]);

  return (
     <SafeAreaView style={styles.container}>
           <AuthProvider>
             <PayinfoProvider>
               <Navigator/>
        </PayinfoProvider>
       </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:Colors.backgroundwhite
  },
});
