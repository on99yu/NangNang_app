import classes from './Wallet.module.css';

const Wallet = (props) => {
  return (
    <>
      {props.walletImage.map((it) => (
        <div className={classes.component_wrap}>
          <div className={classes.component_components}>
            <div className={classes.component_component_no1}>
              <div className={classes.wallet_name}>{it.name}</div>
              <img
                className={classes.wallet_img}
                src={it.imgUrl}
                alt="이미지 파일"
              />
            </div>
            <div className={classes.component_component_no2}>
              <button
                className={classes.component_component_no2_button}
                onClick={() => props.showModal(it.name, it.imgUrl)}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Wallet;
