import classes from "./Container.module.css";
import Header from "../components/Header/Header";
import Category from "../components/Category/Category";
import Footer from "../components/Footer/Footer";
import BlockchainManage from "../components/ContainerComponents/WalletManager/BlockchainManage/BlockchainManage";

const Container4 = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Category />
      <BlockchainManage />
      <Footer />
    </div>
  );
};

export default Container4;
