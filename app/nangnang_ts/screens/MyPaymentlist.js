import React, {useContext, useEffect, useState} from  'react';
import { View,Text,StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Link } from '@react-navigation/native';
import axios from 'axios';

import HeaderLogo from '../components/HeaderLogo';
import ScreenTitle from '../components/ScreenTitle';
import Colors from '../constants/colors';

import { usePayinfo } from '../context/PayinfoContext';
import { AuthContext } from '../context/AuthContext';
import {DataTable} from 'react-native-paper';

const MyPaymentlist = ({navigation}) => {
    
    const [state, dispatch] = useContext(AuthContext)
    const [paymentList, setPaymentList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        async function loadPaymentlist(){
            setIsLoading(true);
            try{
                const res = await axios({
                    methood:"GET",
                    url:`https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/getpaymentreceiptdata/getallpaymentreceiptdatabyuserid?user_id=${state.uid}`
                })
                console.log(JSON.stringify(res.data.data, null,2))

                const paymentData = res.data.data.map((item)=>({
                    payment_receipt_idx: item.statusInfoData.payment_receipt_idx,
                    product_name: item.productsAllData[0].product_name,
                    total_won_price: item.participantsInfoData.total_won_price,
                    payment_end_time: item.statusInfoData.payment_end_time,
                }))
                console.log(JSON.stringify(paymentData,null,2))
                setPaymentList(paymentData)
            }catch(e){
                console.log(e)
            }
            setIsLoading(false);
        }
        loadPaymentlist();

    },[])
    const paymentdetail = async(id) =>{
        try{
            const paymentdetailData = await axios({
                method:"GET",
                url:`https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/getpaymentreceiptdata/productnameprice?payment_receipt_idx=${id}`
            })
            console.log(JSON.stringify(paymentdetailData.data,null,2))
            if(paymentdetailData){
                navigation.navigate('Paymentdetail',{ data : paymentdetailData.data.data})
            }else{
                console.log("제품 상세 데이터를 가져올수없습니다.")
            }
        }catch(e){
            console.log(e)
        }
    }
    const renderItem = ({item, key})=>{
        return(
            <DataTable.Row style={styles.tablerow}>
                <DataTable.Cell>{item.payment_receipt_idx}</DataTable.Cell>
                <DataTable.Cell>{item.product_name}</DataTable.Cell>
                <DataTable.Cell>{item.total_won_price}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{paymentdetail(item.payment_receipt_idx)}}>
                    <Text style={{color:Colors.orange500, alignSelf:'center'}} > 상세보기</Text></DataTable.Cell>
            </DataTable.Row>
        )
    }
    return (
        <View style={styles.PaymentlistView}>
            <View style={styles.header}>
                <Link to={{screen:'Main'}}  style={styles.link}>뒤로 가기</Link>
                <Text style={{color:'red'}}>사용자 : {state.name}</Text>
                <HeaderLogo />
            </View>
            <View style={styles.title}>
                <ScreenTitle title="결제 내역"/>
            </View>
                {isLoading ?  
                    <View style={{margin:16,}}>
                        <Text style={{color:Colors.orange500, alignSelf:'center'}}
                            >결제 데이터를 가져오는 중입니다.</Text>
                        <ActivityIndicator/>
                    </View> : <></>}
                <DataTable style={styles.table}>
                    <DataTable.Header style={styles.tableheader}>
                        <DataTable.Title>결제번호</DataTable.Title>
                        <DataTable.Title>상품</DataTable.Title>
                        <DataTable.Title>가격</DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                    </DataTable.Header>
                        <FlatList
                        data={paymentList}
                        renderItem={renderItem}
                        keyExtractor={item=>item.payment_receipt_idx.toString()}
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
        flex:0.2
    },
    button:{
        flex:0.3,
        width:'70%',
        alignSelf:'center',
    },
    text:{
        colors: Colors.indigo500,
    },
    table:{
        flex:1.3,
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
