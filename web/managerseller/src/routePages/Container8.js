import classes from './Container.module.css';
import Header from '../components/MainPage/Header/Header';
import Category from '../components/MainPage/Category/Category';
import Footer from '../components/MainPage/Footer/Footer';
import EmptyPage from '../components/MainPage/ContainerComponents/EmptyPage/EmptyPage';

const Container8 = () => {
  return (
    <div className={classes.container}>
      <EmptyPage />
    </div>
  );
};

export default Container8;
