import classes from "./Container.module.css";
import Header from "../components/Header/Header";
import Category from "../components/Category/Category";
import Footer from "../components/Footer/Footer";
import WalletManage from "../components/ContainerComponents/WalletManager/WalletManage/WalletManage";

const Container2 = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Category />
      <WalletManage />
      <Footer />
    </div>
  );
};

export default Container2;
