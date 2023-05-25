import classes from './Category.module.css';
import { Link } from 'react-router-dom';

const Category = () => {
  return (
    <div className={classes.category}>
      <div className={classes.FlexContainer}>
        <div>
          <a href="#">지갑관리</a>
        </div>
        <div>
          <a href="#">네트워크관리</a>
        </div>
        <div>
          <a href="#">블록체인관리</a>
        </div>
      </div>
      <div className={classes.FlexContainer2}>
        <div className={classes.FlexContainer2_components}>
          <Link to="/WalletManage" className={classes.linkhover}>
            <button>지갑관리</button>
          </Link>
          <Link to="/NetworkManage" className={classes.linkhover}>
            <button>네트워크관리</button>
          </Link>
          <Link to="/BlockchainManage" className={classes.linkhover}>
            <button>블록체인관리</button>
          </Link>
        </div>
        <div>
          <Link to="/PaymentRecord" className={classes.linkhover}>
            <button>결제내역</button>
          </Link>
        </div>
        <div>
          <Link to="/WalletView" className={classes.linkhover}>
            <button>지갑조회/등록</button>
          </Link>
          <Link to="/MyInfo" className={classes.linkhover}>
            <button>내 정보</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
