// import { useState } from 'react';

import BuyerHeader from './BuyerHeader/BuyerHeader';
import BuyerFooter from './BuyerFooter/BuyerFooter';
import BuyerContainer2 from './BuyerContainer/BuyerContainer2.js';
import classes from './BuyerWrap.module.css';
import { randomItem } from '../../mocks/mockData';

// import Modal from '../Modal';
// import axios from 'axios';

const BuyerWrap2 = () => {
  // const [modalIsShown, setModalIsShown] = useState(false);
  // const [showQRCode, setShowQRCode] = useState(false);

  console.log(randomItem);
  const showModalHandler = () => {
    // setShowQRCode(true);
    window.open(
      `http://localhost:8080/qrpage?sellerFlatform=${randomItem.sellerPlatform}&productName=${randomItem.productName}&productPrice=${randomItem.productPrice}&walletName=${randomItem.walletName}&walletContractAddress=${randomItem.walletContractAddress}&recieptNo=${randomItem.receiptNo}&sellerId=${randomItem.sellerId}`,
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
