import classes from "./Container.module.css";
import Header from "../components/Header/Header";
import Category from "../components/Category/Category";
import Footer from "../components/Footer/Footer";
import MyInfo from "../components/ContainerComponents/BlockchainManager/MyInfo/MyInfo";

const Container6 = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Category />
      <MyInfo />
      <Footer />
    </div>
  );
};

export default Container6;
