import React, { useEffect,useContext } from 'react'
import { View,Text,StyleSheet,ScrollView} from 'react-native'
import { Link } from '@react-navigation/native';
import SubmitButton from '../components/Buttons/SubmitButton';
import Colors from '../constants/colors';
import { AuthContext } from '../context/AuthContext';
import ContentsBox from '../components/ContentsBox';
import HeaderLogo from '../components/HeaderLogo';
import ScreenTitle from '../components/ScreenTitle';

function Paymentdetail({route, navigation}) {
    const data = route.params.data; 
    const [state, dispatch] = useContext(AuthContext)
    const goback = ()=>{
        navigation.goBack()
    }
    useEffect(()=>{
        console.log("제품 결제내역",JSON.stringify(data.networkInfoData,null,2))
    },[])
  return (
    <View style={styles.paymentdetailView}>
        <View style={styles.header}>
                <Link to={{screen:'MyPaymentlist'}}  style={styles.link}>뒤로 가기</Link>
                <Text style={{color:'red'}}>사용자 : {state.name}</Text>
            <HeaderLogo />
        </View>
        <View style={styles.title}>
            <ScreenTitle title="상세 결제 내역" />
        </View>
        <ScrollView style={styles.content}>
            <ContentsBox title="제품명" contents={data.productsAllData[0].product_name}/>
            <ContentsBox title="결제된 금액(원)" contents={data.productsAllData[0].product_won_price_per}/>
            <ContentsBox title="사용한 지갑" contents={data.networkInfoData.payment_wallet_name}/>
            <ContentsBox title="사용한 코인" contents={""}/>
            <ContentsBox title="환산된 코인 금액" contents={data.participantsInfoData.total_coin_price}/>
            <ContentsBox title="보낸 지갑 주소" contents={data.participantsInfoData.receiver_wallet_address}/>
            <ContentsBox title="결제 시작" contents={data.statusInfoData.payment_end_time}/>
        </ScrollView>
        <View style={styles.button}>
                <SubmitButton onPress={goback}>확인</SubmitButton>
        </View>
    </View>
    
  )
}
const styles = StyleSheet.create({
    paymentdetailView: {
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
export default Paymentdetail