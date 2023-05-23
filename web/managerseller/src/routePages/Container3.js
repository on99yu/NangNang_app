import classes from './Container.module.css';
import Header from '../components/MainPage/Header/Header';
import Category from '../components/MainPage/Category/Category';
import Footer from '../components/MainPage/Footer/Footer';
import NetworkManage from '../components/MainPage/ContainerComponents/WalletManager/NetworkManage/NetworkManage';

const Container3 = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Category />
      <NetworkManage />
      <Footer />
    </div>
  );
};

export default Container3;
