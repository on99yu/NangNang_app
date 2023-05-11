import { useState } from "react";

import BuyerHeader from "./BuyerHeader/BuyerHeader";
import BuyerFooter from "./BuyerFooter/BuyerFooter";
import BuyerContainer2 from "./BuyerContainer/BuyerContainer2.js";
import classes from "./BuyerWrap.module.css";
import Modal from "../Modal";
import axios from 'axios';

const BuyerWrap2 = () => {
  const [modalIsShown, setModalIsShown] = useState(false);
  

  const showModalHandler = () => {
    setModalIsShown(true);
    timer();
  };
  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  const timer = async () => {
    const countDownSeconds = 300; //타이머 시작 시간
    let startTime = new Date().getTime()+countDownSeconds*1000;
    const checktx = async ()=>{
      const checkbool= await handleButtonClick();
      console.log(checkbool);
      if(checkbool===true){
        alert("결제 완료되었습니다.");
        hideModalHandler();
        clearInterval(timerInterval);
      }
      let currentTime = new Date().getTime();
      let difference = startTime - currentTime;
      
      // 차이가 양수인 경우, 남은 시간을 계산하고 출력합니다.
      if (difference >= 0) {
        let minutes = Math.floor(difference / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // 남은 시간을 00:00 형태로 포맷합니다.
        let formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // 남은 시간을 출력합니다.
        console.log(formattedTime);
      }else {
        clearInterval(timerInterval);
        hideModalHandler();
        alert("시간이 만료되었습니다.");
        console.log("타이머 종료");
      }
    }  
    let timerInterval = setInterval(checktx, 1000);  
  };
  const handleButtonClick = async () => {
    const walletAddress = "0x437782D686Bcf5e1D4bF1640E4c363Ab70024FBC"; // replace with your wallet address
    const apiKey = "6B2YPZKMRVD5EBYYVRUI9X3ARHU6FVSY8B"; // replace with your Etherscan API key
    const data1 = await getWalletTransaction(walletAddress, apiKey);
    var isTrue;
    console.log(data1);
    if(data1===0.00196){
      isTrue = true;
    }else{
      isTrue = false;
    }
    return await isTrue;
  }

  const getWalletTransaction = async (walletAddress, apiKey) => {
      const response = await axios.get(`https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${apiKey}`).catch(error => {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request)
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log('Error', error.message)
        }
        console.log(error.config)
      });
      const gasprice = response.data.result;
      //console.log(gasprice);
      console.log(gasprice);
      const balanceInEth = gasprice.at(-1).value / 10 ** 18;
      return balanceInEth;
  }

  return (
    <div className={classes.b_wrap}>
      <BuyerHeader />
      <BuyerContainer2 onShowModal={showModalHandler} />
      <BuyerFooter />
      {modalIsShown && <Modal onClose={hideModalHandler}/>}
    </div>
  );
};

export default BuyerWrap2;
