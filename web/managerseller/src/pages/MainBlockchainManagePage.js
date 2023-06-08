import classes from './Container.module.css';
import Header from '../components/MainPage/Header/Header';
import Category from '../components/MainPage/Category/Category';
import Footer from '../components/MainPage/Footer/Footer';
import BlockchainManage from '../components/MainPage/ContainerComponents/WalletManager/BlockchainManage/BlockchainManage';

const MainBlockchainManagePage = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Category />
      <BlockchainManage />
      <Footer />
    </div>
  );
};

export default MainBlockchainManagePage;
