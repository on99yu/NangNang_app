import classes from './WalletView.module.css';
// import { useState } from 'react';
import Wallet from './Wallet';

const WalletView = (props) => {
  // const [registerIsDone, setRegisterIsDone] = useState(false);

  return (
    <div className={classes.walletview_wrap}>
      <div className={classes.walletview}>
        <div className={classes.walletview_text}>지갑조회/등록</div>
        <div className={classes.walleview_components_wrap}>
          <ul className={classes.components}>
            <Wallet
              showModal={props.onShowModal}
              walletImage={props.walletImage}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WalletView;
