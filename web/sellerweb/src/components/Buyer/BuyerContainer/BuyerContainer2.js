import classes from "./BuyerContainer1.module.css";
import BuyerCategory from "../BuyerComponents/BuyerCategory/BuyerCategory";
import BuyerContents2 from "../BuyerComponents/BuyerContents2";

const BuyerContainer2 = (props) => {
  return (
    <div className={classes.b_container}>
      <BuyerCategory />
      <BuyerContents2 onShowModal={props.onShowModal} />
    </div>
  );
};

export default BuyerContainer2;
