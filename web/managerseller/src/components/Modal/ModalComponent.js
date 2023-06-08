import Modal from './Modal';
import classes from './ModalComponent.module.css';

const asset = (
  <ul className={classes.list}>
    {[
      { id: 'BTC', name: 'BTC', amount: 0.2, krw: 23000 },
      { id: 'ETH', name: 'ETH', amount: 1, krw: 3000000 },
      { id: 'BTC', name: 'BTC', amount: 0.2, krw: 23000 },
      { id: 'ETH', name: 'ETH', amount: 1, krw: 3000000 },
      { id: 'BTC', name: 'BTC', amount: 0.2, krw: 23000 },
      { id: 'ETH', name: 'ETH', amount: 1, krw: 3000000 },
      { id: 'BTC', name: 'BTC', amount: 0.2, krw: 23000 },
      { id: 'ETH', name: 'ETH', amount: 1, krw: 3000000 },
      { id: 'BTC', name: 'BTC', amount: 0.2, krw: 23000 },
      { id: 'ETH', name: 'ETH', amount: 1, krw: 3000000 },
      { id: 'BTC', name: 'BTC', amount: 0.2, krw: 23000 },
      { id: 'ETH', name: 'ETH', amount: 1, krw: 3000000 },
    ].map((coin) => (
      <>
        <li className={classes.coinname}>
          {coin.name} : {coin.amount}
        </li>
      </>
    ))}
  </ul>
);

const ModalComponent = (props) => {
  const propsname = props.WalletName;
  const propsImageUrl = props.WalletImageUrl;
  return (
    <Modal>
      <div className={classes.wrap}>
        <h1 className={classes.title}>지갑 등록</h1>
        <div className={classes.wallet}>
          <img
            className={classes.walletimg}
            src={propsImageUrl}
            alt="이미지 파일"
          />
          <h2 className={classes.walletname}>{propsname}</h2>
        </div>
        <div className={classes.address}>
          <input
            className={classes.inputaddress}
            type={'text'}
            placeholder="0x..."
          />
          <button className={classes.buttonaddress} type="submit">
            조회
          </button>
        </div>
        <div className={classes.assetwrap}>
          <div className={classes.asset}>
            <h3 className={classes.currentasset}>자금 현황</h3>
            {asset}
          </div>
        </div>
        <div className={classes.buttons}>
          <button className={classes.completebutton}>등록</button>
          <button onClick={props.onHideModal} className={classes.backbutton}>
            돌아가기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
