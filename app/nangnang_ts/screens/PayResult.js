import React, {useContext} from  'react';
import { View,Text,StyleSheet,ScrollView } from 'react-native';
import { Link } from '@react-navigation/native';

import HeaderLogo from '../components/HeaderLogo';
import ScreenTitle from '../components/ScreenTitle';
import Colors from '../constants/colors';
import SubmitButton from '../components/Buttons/SubmitButton';
import ContentsBox from '../components/ContentsBox';
import { usePayinfo } from '../context/PayinfoContext';
import { AuthContext } from '../context/AuthContext';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
const PayResult = ({navigation}) => {
    const{  provider, } = useWalletConnectModal();

    const [payinfo, setPayinfo] = usePayinfo();
    const [state] = useContext(AuthContext)
    const PaymentComplete = ()=>{
        setPayinfo(it => ({
            ...it,
            inpayment:false
        }))
        provider?.disconnect();
        navigation.navigate('Main')
        console.log("PaymentComplete", JSON.stringify(payinfo,null,2))
    }

    return (
        <View style={styles.PayinfoView}>
            <View style={styles.header}>
                <Link to={{screen:'MyWallets'}}  style={styles.link}>뒤로 가기</Link>
                <Text style={{color:'red'}}>사용자 : {state.name}</Text>
                <HeaderLogo />
            </View>
            <View style={styles.title}>
                <ScreenTitle title="결제 완료" />
            </View>
            <ScrollView style={styles.content}>
                <ContentsBox title="제품명" contents={payinfo.product_name}/>
                <ContentsBox title="결제된 금액(원)" contents={payinfo.price}/>
                <ContentsBox title="사용한 지갑" contents={payinfo.selectedWallet}/>
                <ContentsBox title="사용한 코인" contents={payinfo.ticker}/>
                <ContentsBox title="환산된 코인 금액" contents={payinfo.exchangedvalue}/>
                <ContentsBox title="보낸 지갑 주소" contents={payinfo.walletaddress}/>
            </ScrollView>
            <View style={styles.button}>
                <SubmitButton onPress={PaymentComplete}>확인</SubmitButton>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    PayinfoView: {
        flex: 1,
    },
    header:{

        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    link:{
        color: Colors.orange500,
        fontSize:15,
        fontWeight:'bold',
        alignSelf:'flex-end', 
        padding: 30,
        marginVertical: 16,
    },
    title:{
        flex:0.3
    },
    content:{
        flex:1,
    },
    button:{
        flex:0.3,
        width:'70%',
        alignSelf:'center',
    }
})
export default PayResult;
