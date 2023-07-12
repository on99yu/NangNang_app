// import { useState } from 'react';

import BuyerHeader from './BuyerHeader/BuyerHeader';
import BuyerFooter from './BuyerFooter/BuyerFooter';
import BuyerContainer2 from './BuyerContainer/BuyerContainer2.js';
import classes from './BuyerWrap.module.css';
// import Modal from '../Modal';
// import axios from 'axios';

const BuyerWrap2 = () => {
  // const [modalIsShown, setModalIsShown] = useState(false);
  // const [showQRCode, setShowQRCode] = useState(false);

  const showModalHandler = () => {
    // setShowQRCode(true);
    window.open(
      'http://localhost:8080/qrpage?sellerFlatform=NANGNANG&productName=Kimchi&productPrice=10000&productValue=1&walletName=metamask&walletContractAddress=0x2a535b423542c23a211cd3124a1121b33a&sellerId=sellerid',
      'PopupWin',
      'top=140, left=400, width=330, height=410, menubar=no, toolbar=no, location=no, directories=no, status=no, scrollbars=no, copyhistory=no, resizable=no'
    );

  };

  return (
    <div className={classes.b_wrap}>
      <BuyerHeader />
      <BuyerContainer2 onShowModal={showModalHandler} />
      <BuyerFooter />
      {/* {showQRCode && <div><QRCode value={qrCodeData} /></div>} */}
      {/* {modalIsShown && <Modal onClose={hideModalHandler} />} */}
    </div>
  );
};

export default BuyerWrap2;
