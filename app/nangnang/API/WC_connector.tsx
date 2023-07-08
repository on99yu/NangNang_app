import { useWalletConnect } from "@walletconnect/react-native-dapp";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import EtherScanAPI from "./EtherScanAPI";
import { usePayinfo } from "../context/PayinfoContext";
import axios from "axios";
// 23.05.07 수정본

// 해당 파일은 Walletconnect version 1.0을 사용한 파일.
export const WC_connector = (navigation: any) => {
    // 트랜잭션 전송 결과 해시값을 저장하는 상태
    const [sendTxResult, setSendTxResult] = useState('');
    // 월렛 커넥터를 사용하기 위해 생성하는 중간다리 객체
    const connector = useWalletConnect();
    const paymentdata={
      payment_receipt_multiple_products_info:{
        payment_receipt_idx: 1,
        product_info_idx:"",
        quantity:"",
      },
      payment_receipt_network_info:{
        payment_receipt_idx: 1,
        detailed_network_name:"",
        detailed_network_real_id_num:"",
        main_blockchain_name:"",
        payment_wallet_name:"",
      },
      payment_receipt_participants:{
        payment_receipt_idx: 1,
        consumer_id:"",
        seller_id:"",
      },
      payment_receipt_price_address_info:{
        payment_receipt_idx:1,
        receiver_seller_id:"",
        receiver_wallet_address:"",
        sender_consumer_id:"",
        sender_wallet_address:"",
        total_coin_price:"",
        total_won_price:"",
      },
      payment_receipt_status_info:{
        payment_receipt_idx:1,
        payment_end_time:"",
        payment_start_time:"",
        payment_status:"",
      }
    }
    const paymentCheck = async (transactionhash: any)=>{
      console.log("paymentCheck 함수 실행")
      try{
        const res = await EtherScanAPI.get(`?module=transaction&action=gettxreceiptstatus&txhash=${transactionhash}&apikey=CDFTCSDIJ4HNYU41CJYRP2I3SSCNJ7PGYD`)
        const status = res.data.status
        console.log('paymentCheck - 거래 결과 ', status)
        console.log('transactionhash 값 ',transactionhash )
        if(status === "1" || status === 1){
          console.log()
          try{
              const savepayment= await axios.post('http://127.0.0.1:5001/nangnang-b59c0/asia-northeast3/api/paymentreceipt/demo',{
                header:{
                  Accept: 'application/json',
                },
                data:{
                  "multipleProductsInfo":
                          {
                              "payment_receipt_idx": "10",
                              "product_info_idx":"9",
                              "quantity":"1"
                          },
                        "networkInfo":{
                          "payment_receipt_idx": "10",
                          "detailed_network_name":"a",
                          "detailed_network_real_id_num":"a",
                          "main_blockchain_name":"a",
                          "payment_wallet_name":"a"
                        },
                        "participants":{
                          "payment_receipt_idx": "10",
                          "consumer_id":"1",
                          "seller_id":"1"
                        },
                        "priceAddressInfo":{
                          "payment_receipt_idx":"10",
                          "receiver_seller_id":"1",
                          "receiver_wallet_address":"1",
                          "sender_consumer_id":"1",
                          "sender_wallet_address":"1",
                          "total_coin_price":"1",
                          "total_won_price":"1"
                        },
                        "statusInfo":{
                          "payment_receipt_idx":"10",
                          "payment_end_time":"1",
                          "payment_start_time":"1",
                          "payment_status":"1"
                        }
                }
              })
              console.log("paymentcheck 결과", savepayment)
              navigation.navigate('PayResult')
              console.log("결제 완료")
          }catch(e){
              Error(e)
          }
        }else{
          console.log("결제에 오류가 발생했습니다.")
        }
      }catch(e){
        console.log(e)
      }
    } 
    const shortenAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(
          address.length - 4,
          address.length
        )}`;
      }
    
    // 월렛 연결 함수 
    // 해당 함수가 실행되면 핸드폰에 있는 월렛 중 하나를 선택하라는 창이 뜸
    // 선택하면 해당 월렛에 로그인 후 연결 승인을 누르면  연결 완료
    const connectWallet = useCallback(async () => {
      try {
        await connector.connect();
        console.log("connectWallet called");
        // console.log("Func connectWallet -> connector.accounts[0] : " + connector.accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet: ", error);
      }
    }, [connector]);

  
    // 월렛 연결 해제 관련 상수, 함수
    const initialState = {
      sendTxResult: '',
    };
    
    const resetState = () => {
      setSendTxResult(initialState.sendTxResult);
    };

    // 월렛 연결 해제 함수
    const killSession = useCallback(() => {
      if (connector) {
        connector.killSession().then(() => {
          console.log('Session killed');
          resetState();
        }).catch((error) => {
          console.log('Error killing session:', error);
        });
      }
    }, [connector]);
  
    // 트랜잭션 전송 함수
    // from : 사용자가 연결한 월렛 주소 = connector.accounts[0]
    // toAccount : 트랜잭션을 전송할 주소
    // value : 전송할 금액
    // .then 코드는 트랜잭션 전송이 성공했을 때 실행되는 코드로 sendTxResult 상태에 값을 저장하고 트랜잭션 ID를 출력함
    // .catch 코드는 트랜잭션 전송이 실패했을 때 실행되는 코드
    const sendTx = useCallback((toAccount: string, valueAmount: string) => {
      console.log("sendTx called")
      console.log("Func sendTx -> connector.accounts[0] : " + connector.accounts[0]);
      setSendTxResult('');
      
      connector.sendTransaction({
        from: connector.accounts[0],
        to: toAccount,
        value: valueAmount,
      })
      .then(transactionResult => {
        setSendTxResult(JSON.stringify(transactionResult));
        paymentCheck(transactionResult)

      })
      .catch(error => {
        console.log("Error in sendTx:", error);
        setSendTxResult('오류가 발생했습니다.');
      });
      
    }, [connector]);

    // WC_connector가 가진 함수들을 다른 곳에서 사용하기 위해 리턴
    return {
      connectWallet,
      killSession,
      sendTx,
      connector,
      shortenAddress,
    };
}