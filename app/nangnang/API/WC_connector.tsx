import { useWalletConnect } from "@walletconnect/react-native-dapp";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";

// 23.05.07 수정본

// 해당 파일은 Walletconnect version 1.0을 사용한 파일.
export const WC_connector = () => {
    // 트랜잭션 전송 결과 해시값을 저장하는 상태
    const [sendTxResult, setSendTxResult] = useState('');
  
    // 월렛 커넥터를 사용하기 위해 생성하는 중간다리 객체
    const connector = useWalletConnect();
  
    // 주소를 짧게 표시하기 위한 함수
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
        console.log("Func connectWallet -> connector.accounts[0] : " + connector.accounts[0]);
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
        console.log("transactionResult : " + transactionResult);
      })
      .catch(error => {
        console.error("Error in sendTx:", error);
        setSendTxResult('오류가 발생했습니다.');
      });
      
    }, [connector]);

    useEffect(() => {
      console.log("useEffect -> connector.accounts[0] : " + connector.accounts[0]);
    }, [connector.accounts[0]]);

    useEffect(() => {
        console.log("useEffect -> sendTxResult : " + sendTxResult);
    }, [sendTxResult]);

    // WC_connector가 가진 함수들을 다른 곳에서 사용하기 위해 리턴
    return {
      connectWallet,
      killSession,
      sendTx,
      connector,
      shortenAddress,
    };
}