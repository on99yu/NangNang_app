import BuyerHeader from "./BuyerHeader/BuyerHeader";
import BuyerContainer1 from "./BuyerContainer/BuyerContainer1";
import BuyerFooter from "./BuyerFooter/BuyerFooter";
import classes from "./BuyerWrap.module.css";

const BuyerWrap1 = () => {
  return (
    <div className={classes.b_wrap}>
      <BuyerHeader />
      <BuyerContainer1 />
      <BuyerFooter />
    </div>
  );
};

export default BuyerWrap1;
