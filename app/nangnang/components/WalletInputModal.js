import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { View, Modal, StyleSheet, Text, TextInput,Image, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

import wallets from '../constants/wallets';
import EtherScanAPI from '../api/EtherScanAPI';
import Colors from '../constants/colors';
import FunctionButton from './Buttons/FunctionButton';
import SubmitButton from './Buttons/SubmitButton';
import { AuthContext } from '../context/AuthContext';
import { usePayinfo } from '../context/PayinfoContext';
const WalletInputModal = forwardRef((props, ref) => {

    useImperativeHandle(ref, ()=>({
        takeaddress
    }))

    const [state, dispatch] = useContext(AuthContext)
    const [payinfo, setPayinfo] = usePayinfo();   
    const [walletAddress, setWalletAddress] = useState("");
    const [coin, setCoin] = useState("");
    const [Value, setValue] = useState({
        CoinValue: 0,
        Price:0,
    })

    const takeaddress = async ()=> {
        try {
            const walletname =  await state.wallet.find(e => e.walletname === props.title)
            console.log('from WalletInpuModal - ',walletname);
            setWalletAddress(walletname.walletaddress)
        }catch(err){
            console.log("takeaddress error", err)
        }
    }
    // 자금조회 테스트 함수
    const Balance = async ()=>{
        axios({
            method:"POST",
            url:"http://localhost:3000/getBalance",
            headers:{
                "Content-Type": 'application/json',
            },
            data:{
                "walletAddress":"0x91C15316d4bfaaAF130cc80215a16Aa1A23D98A9",
                "tokenName":"ETH"
            }
        }).then((res)=>{
            console.log(res)

        }).catch((e)=>{
            console.log(e)
            alert(e.message)
        })
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

    const walletSelect = ()=>{
        const newArrData = wallets.map((e, index)=>{
            if(props.walletid == e.id){
                return{
                    ...e,
                    selected: true,
                }
            }
            return {
                ...e,
                selected:false
            }
        })  
        setPayinfo(e => ({
            ...e,
            mywalletname: props.title,
            exchangedvalue: Value.CoinValue,
            mywalletaddress: walletAddress,
            ticker: coin,
        }))
        props.setWalletList(newArrData)
        console.log("from WalletInputModal - 최종 결제정보 -", payinfo);
        props.oncancel()
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
                            <Text style={styles.text}>코인 가치($) : {Value.CoinValue}</Text>
                        <Text style={styles.text}>환산된 가격 : <Text style={{color:'black',fontWeight: 'bold',}}>{Value.Price}</Text> 원</Text>
                        <TextInput
                            style={styles.inputaddress}
                            placeholder="지갑주소"
                            placeholderTextColor="#A9A9AC"
                            value={walletAddress}
                            onChangeText={(e) => setWalletAddress(e)} />
                        <View style={{borderWidth: 1,borderColor:'gray',borderRadius:10, flexDirection:'row', paddingHorizontal:10}}>
                            <View style={{justifyContent:'center'}}>
                                <Text style={styles.text}>티커 선택 </Text>
                            </View>
                            <Picker
                                selectedValue={coin}
                                onValueChange={(value, index) => setCoin(value)}
                                mode="dropdown" // Android only
                                style={styles.picker}>
                                <Picker.Item label="BTC" value="BTC" />
                                <Picker.Item label="ETH" value="ETH" />
                                <Picker.Item label="USDT" value="USDT" />
                                <Picker.Item label="BNB" value="BNB" />
                                <Picker.Item label="USDC" value="USDC" />
                                <Picker.Item label="STETH" value="STETH" />
                                <Picker.Item label="ADA" value="ADA" />
                                <Picker.Item label="DOGE" value="DOGE" />
                                <Picker.Item label="TRX" value="TRX" />
                                <Picker.Item label="SOL" value="SOL" />
                            </Picker>
                        </View>
                        <FunctionButton onPress={NowBalance}>자금 계산</FunctionButton>
                        <FunctionButton onPress={props.oncancel}>닫기</FunctionButton>
                        <FunctionButton onPress={walletSelect}>이 지갑 선택</FunctionButton>
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
    picker: {
        // marginVertical: 30,
        width: 150,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
      },
})
export default WalletInputModal;