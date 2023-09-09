import classes from "./BuyerContents2.module.css";
import AvailableItems2 from "./BuyerItems/AvailableItems2";
import InfoContents from "./InfoForPay/InfoContents";
const BuyerContents2 = (props) => {
  return (
    <div className={classes.b_buyer}>
      <AvailableItems2 />
      <InfoContents onShowModal={props.onShowModal} />
    </div>
  );
};

export default BuyerContents2;
