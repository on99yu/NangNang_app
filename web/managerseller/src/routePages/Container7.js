import classes from './Container.module.css';
import Header from '../components/MainPage/Header/Header';
import Category from '../components/MainPage/Category/Category';
import Footer from '../components/MainPage/Footer/Footer';
import WalletView from '../components/MainPage/ContainerComponents/BlockchainManager/WalletView/WalletView';

const Container7 = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Category />
      <WalletView />
      <Footer />
    </div>
  );
};

export default Container7;
