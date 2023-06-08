import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { View, Modal, StyleSheet, Text, TextInput,Image, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import EtherScanAPI from '../api/EtherScanAPI';

import Colors from '../constants/colors';
import FunctionButton from './Buttons/FunctionButton';
import SubmitButton from './Buttons/SubmitButton';
import { AuthContext } from '../context/AuthContext';

const WalletInputModal = forwardRef((props, ref) => {

    useImperativeHandle(ref, ()=>({
        takeaddress
    }))

    const [state, dispatch] = useContext(AuthContext)
    const [walletAddress, setWalletAddress] = useState("");
    
    const [Value, setValue] = useState({
        CoinValue: 0,
        Price:0,
    })
    const takeaddress = async (item)=> {
        console.log("takeaddress 함수 호출 ", )
        const  walletname =  await state.wallet.find(e => e.walletname)
        console.log(walletname);
        setWalletAddress(walletname.walletaddress)
    }
    
    const NowBalance = async () => {
        const address = "0x91C15316d4bfaaAF130cc80215a16Aa1A23D98A9";
        setWalletAddress(address);
        try {
            const CrpytoValue = await EtherScanAPI.get(`?module=account&action=balance&address=${address}&tag=latest&apikey=CDFTCSDIJ4HNYU41CJYRP2I3SSCNJ7PGYD`)
            const currentPrice = await axios.get(`https://api.upbit.com/v1/ticker?markets=KRW-ETH`,{
                headers:{
                    Accept: 'application/json',
                },
            })
            const Balance = CrpytoValue.data.result
            setValue( {
                CoinValue : Balance *(Math.pow(10, -18)),
                Price:   ( (Balance * (Math.pow(10, -18))) *currentPrice.data[0].trade_price ).toFixed(3)
            })

        } catch (error) {
            Error(error)
        }
    }
    const Initialization =() =>{
        setValue({CoinValue:0, Price:0})
    }

    return (
            <Modal
                animationType='fade'
                visible={props.visible}
                transparent={true}>
                    <KeyboardAvoidingView  behavior='padding' style={styles.centerdView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.text, {fontSize: 20, color:Colors.orange500}]}>{props.title}</Text>
                        <View style={styles.iconwrapper}>
                            <Image
                                style={styles.image}
                                source={props.imageURL} />
                        </View>
                        <View>
                            <Text style={styles.text}>{Value.CoinValue} : {""}</Text>
                        </View>
                        <Text style={styles.text}>{Value.Price} 원</Text>
                        <TextInput
                            style={styles.inputaddress}
                            placeholder="지갑주소"
                            placeholderTextColor="#A9A9AC"
                            value={walletAddress}
                            onChangeText={(e) => setWalletAddress(e)} />
                        <FunctionButton onPress={NowBalance}>자금 계산</FunctionButton>
                        <FunctionButton onPress={Initialization}>초기화</FunctionButton>
                        <FunctionButton onPress={props.oncancel}>닫기</FunctionButton>
                    </View>
                    
                    </KeyboardAvoidingView>
            </Modal>

    );
});
const styles = StyleSheet.create({
    centerdView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        height:'80%',
        width: '80%',

        margin: 20,
        backgroundColor: Colors.backgroundwhite,
        borderRadius: 20,
        padding: 30,
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
        width: "100%",
        height: 40,
        padding: 10,
    },
    text:{
        color: Colors.indigo500,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 30
    },
    iconwrapper: {
        // margin: '10%',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: Colors.backgroundwhite,

        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default WalletInputModal;