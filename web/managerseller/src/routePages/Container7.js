import classes from "./Container.module.css";
import Header from "../components/Header/Header";
import Category from "../components/Category/Category";
import Footer from "../components/Footer/Footer";
import WalletView from "../components/ContainerComponents/BlockchainManager/WalletView/WalletView";

const Container7 = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Category />
      <WalletView />
      <Footer />
    </div>
  );
};

export default Container7;
