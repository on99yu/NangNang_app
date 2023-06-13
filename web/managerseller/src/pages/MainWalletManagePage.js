import classes from './Container.module.css';
import Header from '../components/MainPage/Header/Header';
import Category from '../components/MainPage/Category/Category';
import Footer from '../components/MainPage/Footer/Footer';
import WalletManage from '../components/MainPage/ContainerComponents/WalletManager/WalletManage/WalletManage';

const MainWalletManagePage = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Category />
      <WalletManage />
      <Footer />
    </div>
  );
};

export default MainWalletManagePage;
