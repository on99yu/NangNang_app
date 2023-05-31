import classes from './Container.module.css';
import Header from '../components/MainPage/Header/Header';
import Category from '../components/MainPage/Category/Category';
import Footer from '../components/MainPage/Footer/Footer';
import WalletView from '../components/MainPage/ContainerComponents/BlockchainManager/WalletView/WalletView';
import ModalComponent from '../components/Modal/ModalComponent';
import { useState } from 'react';

const walletSourceList = [
  {
    id: 0,
    name: 'RAINBOW',
    imgUrl: require('../asset/images/Rainbow.png'),
  },
  {
    id: 1,
    name: 'METAMASK',
    imgUrl: require('../asset/images/MetaMask.png'),
  },
  {
    id: 2,
    name: 'TRUSTWALLET',
    imgUrl: require('../asset/images/TrustWallet.png'),
  },
  {
    id: 3,
    name: 'CRYPTO.COM',
    imgUrl: require('../asset/images/CryptoDotCom.png'),
  },
  {
    id: 4,
    name: 'PILLER',
    imgUrl: require('../asset/images/PillerWallet.png'),
  },
  {
    id: 5,
    name: 'MATH',
    imgUrl: require('../asset/images/MathWallet.png'),
  },
  {
    id: 6,
    name: 'ARGENT',
    imgUrl: require('../asset/images/ArgentWallet.png'),
  },
];

const MainWalletViewPage = () => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [selectedWalletName, setSelectedWalletName] = useState('');
  const [selectedWalletImgUrl, setSelectedWalletImgUrl] = useState();

  const showModalHandler = (walletName, walletImageUrl) => {
    setSelectedWalletName(walletName);
    setSelectedWalletImgUrl(walletImageUrl);
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  return (
    <div className={classes.container}>
      <Header />
      <Category />
      <WalletView
        onShowModal={showModalHandler}
        walletImage={walletSourceList}
      />
      <Footer />
      {modalIsShown && (
        <ModalComponent
          onHideModal={hideModalHandler}
          walletImage={walletSourceList}
          WalletName={selectedWalletName}
          WalletImageUrl={selectedWalletImgUrl}
        />
      )}
    </div>
  );
};

export default MainWalletViewPage;
