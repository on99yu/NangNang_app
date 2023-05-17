import classes from "./BuyerItems.module.css";
import AvailableItems from "./AvailableItems";
import GroupItemSelect from "./GroupItemSelect";

const BuyerItems = () => {
  return (
    <div className={classes.container}>
      <GroupItemSelect />
      <AvailableItems />
    </div>
  );
};

export default BuyerItems;
