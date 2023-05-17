import classes from "./Container.module.css";
import Header from "../components/Header/Header";
import Category from "../components/Category/Category";
import Footer from "../components/Footer/Footer";
import Main from "../components/ContainerComponents/Main/Main";

const Container1 = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Category />
      <Main />
      <Footer />
    </div>
  );
};

export default Container1;
