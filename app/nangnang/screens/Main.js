import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Pressable,Image } from 'react-native';

import Colors from '../constants/colors';
import Logo from '../components/Logo';
import SubmitButton from '../components/Buttons/SubmitButton';

const Main = ({ navigation }) => {
    return (
        <View style={styles.MainView}>
            <Logo/>
            <View style={styles.ButtonView}>
                <SubmitButton
                    onPress={()=>navigation.navigate('MyWallets')}
                    >지갑등록 / 지갑확인</SubmitButton>
                <SubmitButton>내 결제 내역</SubmitButton>
                <SubmitButton>내 정보</SubmitButton>
                <Pressable
                    style={styles.button}
                    onPress={()=>navigation.navigate('MyWallets')}>
                    <Text style={styles.text}>결제하러가기</Text>
                </Pressable>
                <TouchableOpacity onPress={()=>navigation.navigate('QRCodeScanner')}>
                    <Image
                        style={styles.QRcode} 
                        source={require('../assets/qrcode.png')}/>
                </TouchableOpacity>
                {/* <TouchableOpacity 
                    style={styles.button}
                    onPress={()=>navigation.navigate('MyWallets')}>
                    <Text style={styles.text}>지갑등록하기 / 지갑확인</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>결제내역</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>내정보</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,{backgroundColor: Colors.orange500}]}>
                    <Text style={styles.text}>결제하러가기</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    ButtonView: {
        flex:0.7,
        height: '50%',
        width:'50%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignSelf:'center',
    },
    button:{
        borderRadius: 10,
        backgroundColor: Colors.indigo400,
        borderColor: Colors.orange400,
        borderWidth: 2,
        width: '100%',
        height: 50,
        marginTop: 10,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color: Colors.Incarnadine500
    },
    QRcode:{
        color: Colors.orange400,
        width: 100,
        height:100,

        alignSelf:'center'
    }
})
export default Main;