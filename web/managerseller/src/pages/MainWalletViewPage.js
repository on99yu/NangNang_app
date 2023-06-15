import classes from './Container.module.css';
import Header from '../components/MainPage/Header/Header';
import Category from '../components/MainPage/Category/Category';
import Footer from '../components/MainPage/Footer/Footer';
import WalletView from '../components/MainPage/ContainerComponents/BlockchainManager/WalletView/WalletView';
import ModalComponent from '../components/Modal/ModalComponent';
import { useState } from 'react';

const MainWalletViewPage = ({ walletImage }) => {
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
      <WalletView onShowModal={showModalHandler} walletImage={walletImage} />
      <Footer />
      {modalIsShown && (
        <ModalComponent
          onHideModal={hideModalHandler}
          walletImage={walletImage}
          WalletName={selectedWalletName}
          WalletImageUrl={selectedWalletImgUrl}
        />
      )}
    </div>
  );
};

export default MainWalletViewPage;
