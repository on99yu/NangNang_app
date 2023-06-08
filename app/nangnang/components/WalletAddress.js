import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import EtherScanAPI from '../api/EtherScanAPI';

import Colors from '../constants/colors';
import FunctionButton from './Buttons/FunctionButton';

import { AuthContext } from '../context/AuthContext';
const WalletAddress = (props) => {

    const [state, dispatch] = useContext(AuthContext)
    const [walletAddress, setWalletAddress] = useState("0x91C15316d4bfaaAF130cc80215a16Aa1A23D98A9");
    const [Ether, setEther] = useState(0);
    
    const WASaveHandler = ()=>{
            const walletName = props.title
            saveAddress(walletName, "0x91C15316d4bfaaAF130cc80215a16Aa1A23D98A9")
    }
    
    const saveAddress = (walletName, Address) => {
        dispatch({
            type:'save_address',
            walletname : walletName,
            walletaddress: Address,
        })
        console.log("save_address", state)
    }
    return (
            <Modal
                animationType='fade'
                visible={props.visible}
                transparent={true}>
                    <View style={styles.centerdView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.text, {fontSize: 20, color:Colors.orange500}]}>{props.title}</Text>
                        <Text style={styles.text}>{state.email}님</Text>
                        <TextInput
                            style={styles.inputaddress}
                            placeholder="지갑주소"
                            placeholderTextColor="#A9A9AC"
                            value={walletAddress}
                            onChangeText={(e) => setWalletAddress(e)} />
                        <FunctionButton >자금 계산</FunctionButton>
                        <FunctionButton onPress={WASaveHandler}>지갑주소 등록</FunctionButton>
                        <FunctionButton onPress={props.oncancel} >닫기</FunctionButton>
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
export default WalletAddress;