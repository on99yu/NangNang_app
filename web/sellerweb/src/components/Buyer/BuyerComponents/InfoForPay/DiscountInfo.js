import classes from "./DiscountInfo.module.css";
import combobox from "../../../../images/combobox.jpg";
const DiscountInfo = () => {
  return (
    <div className={classes.discountinfo}>
      <h3 className={classes.title}>할인 정보</h3>
      <img className={classes.combobox} src={combobox} alt="combobox" />
    </div>
  );
};

export default DiscountInfo;
