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
const PayResult = ({navigation}) => {
    
    const [payinfo] = usePayinfo();
    
    const [state, dispatch] = useContext(AuthContext)
    return (
        <View style={styles.PayinfoView}>
            <View style={styles.header}>
                <Link to={{screen:'MyWallets'}}  style={styles.link}>뒤로 가기</Link>
                <Text style={{color:'red'}}>사용자 : {state.email}</Text>
                <HeaderLogo />
            </View>
            <View style={styles.title}>
                <ScreenTitle title="결제 완료" />
            </View>
            <ScrollView style={styles.content}>
                <ContentsBox title="제품명" contents={payinfo.Name}/>
                <ContentsBox title="결제 금액" contents={payinfo.Price}/>
                <ContentsBox title="사용 지갑" contents={payinfo.Wallet}/>
                <ContentsBox title="사용 코인" contents={payinfo.Coin}/>
                <ContentsBox title="지갑 키" contents={payinfo.WalletKey}/>
            </ScrollView>
            <View style={styles.button}>
                <SubmitButton onPress={() => navigation.navigate('Main')}>확인</SubmitButton>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    PayinfoView: {
        flex: 1,
    },
    header:{
        // flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    link:{
        color: Colors.orange500,
        fontSize:15,
        fontWeight:'bold',
        // borderWidth:1,

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
        // alignItems:'center'
    }
})
export default PayResult;
