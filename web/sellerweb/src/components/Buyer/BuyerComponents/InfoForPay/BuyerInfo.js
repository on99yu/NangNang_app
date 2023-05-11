import classes from "./BuyerInfo.module.css";

const BuyerInfo = () => {
  return (
    <div className={classes.buyerinfo}>
      <div className={classes.title}>
        <h3 className={classes.b_info}>구매자 정보</h3>
        <h3 className={classes.update}>수정</h3>
      </div>
      <div className={classes.info}>
        <h3>이름: 박상윤</h3>
        <h3>이메일: parkyoon97@gmail.com</h3>
        <h3>휴대폰 번호: +82 01056167232</h3>
      </div>
    </div>
  );
};

export default BuyerInfo;
