import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import EtherScanAPI from '../API/EtherScanAPI';
import { useAuth } from '../constants/AuthContext';

import Colors from '../constants/colors';
import FunctionButton from './Buttons/FunctionButton';
import getBalance from './getBalance';
const WalletInputModal = (props) => {
    const [walletAddress, setWalletAddress] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0);

    // @@@@@ State 공부해서 최적화 시켜야한다.
    const [Ether, setEther] = useState(0);
    const [Dollar, setDollar] = useState(0);

    const [user] =useAuth();

    const NowBalance = async () => {
        const address = "0x91C15316d4bfaaAF130cc80215a16Aa1A23D98A9";
        console.log(address);
        try {
            const response = await EtherScanAPI.get(`?module=account&action=balance&address=${address}&tag=latest&apikey=CDFTCSDIJ4HNYU41CJYRP2I3SSCNJ7PGYD`)
            const Balance = response.data.result
            setEther(Balance *(Math.pow(10, -18)))
            CoinValue()
        } catch (error) {
            Error(error)
        }
    }

    const CoinValue = async ()=>{
        try{
            const response = await axios.get(`https://api.upbit.com/v1/ticker?markets=USDT-ETH`,{
                headers:{
                    Accept: 'application/json',
                },
            })
            setDollar((Ether * response.data[0].trade_price).toFixed(3))
        }catch(error){
            Error(error)
        }
    }

    return (
            <Modal
                animationType='fade'
                visible={props.visible}>
                    <View style={styles.centerdView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.text, {fontSize: 20, color:Colors.orange500}]}>{props.title}</Text>
                        <Text style={styles.text}>{user.email}님의 자금</Text>
                        <Text style={styles.text}>{Ether} : 이더리움</Text>
                        <Text style={styles.text}>{Dollar} : 달러</Text>
                        <TextInput
                            style={styles.inputaddress}
                            placeholder="지갑주소"
                            placeholderTextColor="#A9A9AC"
                            value={walletAddress}
                            onChangeText={(e) => setWalletAddress(e)} />
                        <FunctionButton onPress={NowBalance}>입력</FunctionButton>
                        <FunctionButton onPress={NowBalance}>초기화</FunctionButton>
                        <FunctionButton onPress={props.oncancel}>닫기</FunctionButton>
                    </View>
                    </View>
            </Modal>
    );
};
const styles = StyleSheet.create({
    centerdView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        height:'60%',
        margin: 20,
        backgroundColor: Colors.backgroundwhite,
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    inputaddress: {
        backgroundColor: '#fff',
        color: Colors.indigo500,
        borderRadius: 10,
        width: 200,
        height: 40,
        // marginTop: 10,
        padding: 10,
    },
    text:{
        color: Colors.indigo500,
    },

})
export default WalletInputModal;