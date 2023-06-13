import BuyerInfo from "./BuyerInfo";
import DiscountInfo from "./DiscountInfo";
import RecieptInfo from "./RecieptInfo";
import TotalInfo from "./TotalInfo";

import classes from "./InfoList.module.css";

const InfoList = (props) => {
  return (
    <div className={classes.infoList}>
      <BuyerInfo />
      <DiscountInfo />
      <RecieptInfo />
      <TotalInfo onShowModal={props.onShowModal} />
    </div>
  );
};

export default InfoList;
