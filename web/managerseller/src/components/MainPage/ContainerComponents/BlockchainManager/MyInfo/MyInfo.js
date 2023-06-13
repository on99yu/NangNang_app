import classes from "./MyInfo.module.css";

const MyInfo = () => {
  return (
    <div className={classes.paymentrecord_wrap}>
      <div className={classes.paymentrecord}>
        <div className={classes.paymentrecord_text}>내 정보</div>
        <div className={classes.walleview_component_wrap}>내 정보</div>
      </div>
    </div>
  );
};

export default MyInfo;
