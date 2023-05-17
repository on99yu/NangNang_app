import classes from "./InfoContents.module.css";
import InfoList from "./InfoList";
import DeliveryInfo from "./DeliveryInfo";
const InfoContents = (props) => {
  return (
    <div className={classes.info_contents}>
      <div>
        <DeliveryInfo />
      </div>
      <InfoList onShowModal={props.onShowModal} />
    </div>
  );
};

export default InfoContents;
