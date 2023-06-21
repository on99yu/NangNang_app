import React, {useContext, useEffect, useState} from  'react';
import { View,Text,StyleSheet,ScrollView, FlatList } from 'react-native';
import { Link } from '@react-navigation/native';

import HeaderLogo from '../components/HeaderLogo';
import ScreenTitle from '../components/ScreenTitle';
import Colors from '../constants/colors';
import SubmitButton from '../components/Buttons/SubmitButton';
import ContentsBox from '../components/ContentsBox';
import { usePayinfo } from '../context/PayinfoContext';
import { AuthContext } from '../context/AuthContext';
import { WC_connector } from '../api/WC_connector';
import {DataTable} from 'react-native-paper';
import Paymentdetail from './Paymentdetail';
const MyPaymentlist = ({navigation}) => {
    
    const [payinfo, setPayinfo] = usePayinfo();
    
    const [state, dispatch] = useContext(AuthContext)
    const [paymentList, setPaymentList] = useState([]);

    // useEffect 데이터가져오기
    const dummydata =[{
            uid:"1",
            paymentid:"1",
            productname:"물김치",
            price:10000,
            productcount:1,
            paymenttime:"1시"
        },{
            uid:"2",
            paymentid:"2",
            productname:"배추김치",
            price:20000,
            productcount:2,
            paymenttime:"2시"
        },{
            uid:"3",
            paymentid:"3",
            productname:"열무김치",
            price:30000,
            productcount:3,
            paymenttime:"3시"
    }]
    useEffect(()=>{
        setPaymentList(dummydata)
        return()=>{

        }
    },[])
    // 결제내역 가져오는 API Post
    // Item View
    const paymentdetail = (id) =>{
        if(id){
            navigation.navigate('Paymentdetail',{pid: id,})
        }
    }
    const renderItem = ({item, key})=>{
        return(
            <DataTable.Row style={styles.tablerow}>
                <DataTable.Cell>{item.paymentid}</DataTable.Cell>
                <DataTable.Cell>{item.productname}</DataTable.Cell>
                <DataTable.Cell>{item.price}</DataTable.Cell>
                <DataTable.Cell>{item.paymenttime}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{paymentdetail(item.paymentid)}}>
                    <Text style={{color:Colors.orange500, alignSelf:'center'}} > 상세보기</Text></DataTable.Cell>
            </DataTable.Row>
        )
    }
    return (
        <View style={styles.PaymentlistView}>
            <View style={styles.header}>
                <Link to={{screen:'MyWallets'}}  style={styles.link}>뒤로 가기</Link>
                <Text style={{color:'red'}}>사용자 : {state.email}</Text>
                <HeaderLogo />
            </View>
            <View style={styles.title}>
                <ScreenTitle title="결제 내역"/>
            </View>
                <DataTable style={styles.table}>
                    <DataTable.Header style={styles.tableheader}>
                        <DataTable.Title>결제번호</DataTable.Title>
                        <DataTable.Title>상품</DataTable.Title>
                        <DataTable.Title>가격</DataTable.Title>
                        <DataTable.Title>결제시간</DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                    </DataTable.Header>
                        <FlatList
                        data={paymentList}
                        renderItem={renderItem}
                        keyExtractor={item=>item.id}
                        ></FlatList>
                </DataTable>
        </View>
    );
};
const styles = StyleSheet.create({
    PaymentlistView: {
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
        flex:0.2
    },
    button:{
        flex:0.3,
        width:'70%',
        alignSelf:'center',
        // alignItems:'center'
    },
    text:{
        colors: Colors.indigo500,
    },
    table:{
        width:'90%', 
        alignSelf:'center', 
        borderWidth: 1,
        borderColor:'black',
        borderRadius:15,
    },
    tableheader:{
        borderBottomWidth:1,
        borderBottomColor:'black',
        borderTopStartRadius:13,
        borderTopRightRadius:13,
        theme:'dark',
        backgroundColor:'#8B98CC',
    },
    tablerow:{
        borderTopWidthWidth:1,
        borderBottomColor:'black',
    }

})
export default MyPaymentlist;
