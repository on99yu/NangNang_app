import classes from "./Container.module.css";
import Header from "../components/Header/Header";
import Category from "../components/Category/Category";
import Footer from "../components/Footer/Footer";
import NetworkManage from "../components/ContainerComponents/WalletManager/NetworkManage/NetworkManage";

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
