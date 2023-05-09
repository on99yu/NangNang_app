import React ,{useState,useEffect, useContext} from 'react';
import {View,StyleSheet,Text,Button,StatusBar,Dimensions} from 'react-native';
import { Link } from '@react-navigation/native';
import { BarCodeScanner} from 'expo-barcode-scanner';

import Colors from '../constants/colors';
import SubmitButton from '../components/Buttons/SubmitButton';
import { PayinfoContext, usePayinfo } from '../constants/PayinfoContext';

const {width} = Dimensions.get('window')

function QRCodeScanner ({navigation}){
  const [hasPermission, setHasPermission] = useState(null); 
  const [scanData, setScanData] = useState(false);
  const [_, setPayinfo] = usePayinfo();


  useEffect(()=>{
    (async()=>{
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  },[]);

  let time = new Date();
  const dummydata={
    Name:"kimchi",
    Price:"5000",
    Wallet:"metamask",
    Coin:"ETH",
    WalletKey:"******",
    PaymentTime: time.toLocaleString()
  }

  const handlerBarCodeScanned = ({type, data})=>{
    
    if(data){
      setScanData(true);
      // setPayinfo(data);
      setPayinfo(dummydata);
      console.log(`${data}`);
      navigation.navigate('MyWallets');
    }
    else{
      console.log(`Data: ${data.email}`);
      console.log(`Type: ${type}`);
      setScanData(false)
    }

  } 
  if(hasPermission===null){
    return (
        <Text>카메라 권한을 확인해주세요</Text>
    )
  }
  if(hasPermission === false){
    return (
      <View style={styles.container}>
      <Text>NO Access to Camera</Text>
      <View style={styles.footer}>
        <Button onPress={() => navigation.navigate('Main')} title="뒤로가기"/>
      </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={[StyleSheet.absoluteFill, styles.qrcode]}
        onBarCodeScanned={scanData ? undefined : handlerBarCodeScanned}>
        <Text style={styles.description}>Scan your QR code</Text>
             
      </BarCodeScanner>
      {scanData && 
        <Button style={{margin:200}} title="Scan Again?" onPress={()=> setScanData(false)}/>}
      <View style={styles.footer}>
        <Button onPress={() => navigation.navigate('Main')} title="뒤로가기"/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    flex:1,
    backgroundColor:'#fff',
    // alignItems:'center',
    flexDirection:'column',
    justifyContent:'flex-end',
  },
  qrcode:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  footer:{
    flex:1,
    // flexDirection:'row',
    justifyContent:'flex-end',
    alignSelf:'center',
    marginBottom: 20,
  },

  description: {
    fontSize: width * 0.09,
    marginTop: '10%',
    textAlign: 'center',
    // alignItems:'flex-start',
    width: '70%',
    color: 'white',
  },
})
export default QRCodeScanner;

