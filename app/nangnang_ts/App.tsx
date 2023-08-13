// import React,{useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, Alert, Pressable} from 'react-native';

// import Colors from './constants/colors';
// import Navigator from './navigator/Navigator';
// import AuthProvider from './context/AuthContext';
// import PayinfoProvider from './context/PayinfoContext';
import { WalletConnectModal, useWalletConnectModal  } from '@walletconnect/modal-react-native'

const projectId = 'e68a43fe8e9a0534d9f14f37689857ef'

const providerMetadata = {
  name: 'YOUR_PROJECT_NAME',
  description: 'YOUR_PROJECT_DESCRIPTION',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
}

export default function App() {

  const { isOpen, open, close, provider, isConnected, address } = useWalletConnectModal();

  // useEffect(()=>{
  //   const backAction = ()=>{
  //     Alert.alert("알림","어플을 종료하시겠습니까?",[
  //       {
  //         text:"아니요",
  //         onPress:()=>null,
  //         style:"cancel",
  //       },
  //       {
  //         text:"네",
  //         onPress:()=>BackHandler.exitApp()
  //       }
  //     ]);
  //     return true
  //   }
  //   const backHandler= BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   )
  //   return ()=>backHandler.remove();
  // },[]);

const closefunc = async () => {
  if(isOpen) {
    await close();
    console.log("close")
  }
  console.log("nothing happen")
}

const providerTest1 = () => {
  const expiry = provider?.session?.expiry
  console.log("expiry = ", expiry);
  const uri = provider?.uri
  console.log("uri = ", uri);
  const namespaces = provider?.namespaces
  console.log("namespaces = ", namespaces);

}

const killSession =  () => {
  provider?.disconnect();
  if(isConnected){
    console.log("아직 세션 살아있음");
  }
}


  return (
    // <SafeAreaView style={styles.container}>
    //       <AuthProvider>
    //         <PayinfoProvider>
    //           <Navigator/>
    //         </PayinfoProvider>
    //       </AuthProvider>
    // </SafeAreaView>

    <View style={styles.container}>
      <Text>WC test</Text>
      <Pressable onPress={()=>open()} style={{marginTop:16}}>
        <Text>{isConnected ? 'View Account\n'+ address : 'Connect'}</Text>
      </Pressable>
      <Pressable onPress={()=>provider?.request({
          method: 'eth_sendTransaction',
          params: [{
            data: "0x1111",
            from: address,
            to: address,
          }]
        })
      } style={{marginTop:16}}>
        <Text>{isConnected ? 'sendTx' : 'Connected yet'}</Text>
      </Pressable>

      <Pressable onPress={()=>providerTest1()} style={{marginTop:16}}>
        <Text>{isConnected ? 'printData' : 'Connect'}</Text>
      </Pressable>

      <Pressable onPress={()=>killSession()} style={{marginTop:16}}>
        <Text>{isConnected ? 'killSession' : 'kill'}</Text>
      </Pressable>


      <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
