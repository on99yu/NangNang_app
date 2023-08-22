
import BuyerHeader from './BuyerHeader/BuyerHeader';
import BuyerFooter from './BuyerFooter/BuyerFooter';
import BuyerContainer2 from './BuyerContainer/BuyerContainer2.js';
import classes from './BuyerWrap.module.css';
import { randomItem } from '../../mocks/mockData';

import axios from 'axios'; // axios를 사용하여 API 요청을 보냅니다.

let receiptNo = randomItem.receiptNo;

const apiUrl = 'https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/paymentprocess/startsetting';

axios.post(apiUrl)
  .then(response => {
    const payment_receipt_idx = response.data.data;
    console.log('Payment Receipt Index:', payment_receipt_idx);
    receiptNo = payment_receipt_idx;
  })
  .catch(error => {
    console.error('API 요청 중 오류 발생:', error);
  });

const BuyerWrap2 = () => {


  console.log(randomItem);
  const showModalHandler = () => {
    window.open(
      `http://nanng.onrender.com/qrpage?sellerFlatform=${randomItem.sellerPlatform}&productName=${randomItem.productName}&productPrice=${randomItem.productPrice}&walletName=${randomItem.walletName}&walletContractAddress=${randomItem.walletContractAddress}&recieptNo=${receiptNo}&sellerId=${randomItem.sellerId}`,
      'PopupWin',
      'top=140, left=400, width=330, height=410, menubar=no, toolbar=no, location=no, directories=no, status=no, scrollbars=no, copyhistory=no, resizable=no'
    );

  };

  return (
    <div className={classes.b_wrap}>
      <BuyerHeader />
      <BuyerContainer2 onShowModal={showModalHandler} />
      <BuyerFooter />
    </div>
  );
};

export default BuyerWrap2;
