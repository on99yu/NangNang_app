import BuyerItems from "./BuyerItems/BuyerItems";
import classes from "./BuyerContents1.module.css";
import InfoList from "./InfoForPay/InfoList";

const BuyerContents1 = () => {
  return (
    <div className={classes.b_buyer}>
      <BuyerItems />
      <InfoList />
    </div>
  );
};

export default BuyerContents1;
