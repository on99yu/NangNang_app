import classes from './Container.module.css';
import Header from '../components/MainPage/Header/Header';
import Category from '../components/MainPage/Category/Category';
import Footer from '../components/MainPage/Footer/Footer';
import Main from '../components/MainPage/ContainerComponents/Main/Main';
import { useEffect } from 'react';
const MainHomePage = ({ isValidLogin }) => {
  useEffect(() => {
    const curAccessToken = localStorage.getItem('accessToken');
    // console.log('curAccessToken:', curAccessToken);

    isValidLogin(curAccessToken);
  }, []);

  return (
    <div className={classes.container}>
      <Header />
      <Category />
      <Main />
      <Footer />
    </div>
  );
};

export default MainHomePage;
