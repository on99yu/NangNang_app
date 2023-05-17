import classes from "./WalletManage.module.css";

const WalletManage = () => {
  return (
    <div className={classes.walletmanage_wrap}>
      <div className={classes.walletmanage}>
        <div className={classes.walletmanage_text}>지갑관리</div>
        <div className={classes.walletmanage_component_wrap}>지갑관리</div>
      </div>
    </div>
  );
};

export default WalletManage;
