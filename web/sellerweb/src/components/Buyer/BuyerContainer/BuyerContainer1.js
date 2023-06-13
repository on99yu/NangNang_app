import classes from "./BuyerContainer1.module.css";
import BuyerCategory from "../BuyerComponents/BuyerCategory/BuyerCategory";
import BuyerContents1 from "../BuyerComponents/BuyerContents1";

const BuyerContainer1 = () => {
  return (
    <div className={classes.b_container}>
      <BuyerCategory />
      <BuyerContents1 />
    </div>
  );
};

export default BuyerContainer1;
