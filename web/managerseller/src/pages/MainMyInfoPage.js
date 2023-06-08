import classes from './Container.module.css';
import Header from '../components/MainPage/Header/Header';
import Category from '../components/MainPage/Category/Category';
import Footer from '../components/MainPage/Footer/Footer';
import MyInfo from '../components/MainPage/ContainerComponents/BlockchainManager/MyInfo/MyInfo';

const MainMyInfoPage = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Category />
      <MyInfo />
      <Footer />
    </div>
  );
};

export default MainMyInfoPage;
