import classes from "./Container.module.css";
import Header from "../components/Header/Header";
import Category from "../components/Category/Category";
import Footer from "../components/Footer/Footer";
import PaymentRecords from "../components/ContainerComponents/NetworkManager/PaymentRecord/PaymentRecords";

const Container5 = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Category />
      <PaymentRecords />
      <Footer />
    </div>
  );
};

export default Container5;
