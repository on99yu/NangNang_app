import classes from "./Category.module.css";
import { Link } from "react-router-dom";

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
          <Link to="/WalletManage">
            <button>지갑관리</button>
          </Link>
          <Link to="/NetworkManage">
            <button>네트워크관리</button>
          </Link>
          <Link to="/BlockchainManage">
            <button>블록체인관리</button>
          </Link>
        </div>
        <div>
          <Link to="/PaymentRecord">
            <button>결제내역</button>
          </Link>
        </div>
        <div>
          <Link to="/WalletView">
            <button>지갑조회/등록</button>
          </Link>
          <Link to="/MyInfo">
            <button>내 정보</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
