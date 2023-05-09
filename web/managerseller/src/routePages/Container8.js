import classes from "./Container.module.css";
import Header from "../components/Header/Header";
import Category from "../components/Category/Category";
import Footer from "../components/Footer/Footer";
import EmptyPage from '../components/ContainerComponents/EmptyPage/EmptyPage';

const Container8 = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Category />
      <EmptyPage />
      <Footer />
    </div>
  );
};

export default Container8;
