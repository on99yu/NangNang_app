import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import classes from './WalletView.module.css';
import Wallet from './Wallet';


const walletArr = ["MetaMask", "TrustWallet", "Bitpay", "Argent", "Rainbow", "taehwanWallet"];

async function getWalletData() {
  const response = await fetch(
    "https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/brofucntions/sangyunbro/WalletTwo/chosenwallet?seller_id=seller1001"
  );
  const data = await response.json();

  return data.data;
}

const WalletView = (props) => {
  const { data: walletData, isLoading, isError, error } = useQuery(
    'sellerWallet', () => getWalletData(), {
    staleTime: 300000,
  }
  );


  useEffect(() => {
    console.log(walletData);
  }, [walletData]); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행


  let content = <p>Found no Wallet.</p>;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );
  else if (walletData !== {}) {
    content =
      <div>
        {Object.entries(walletData).map(([key, value]) => (
          <div key={key}>
            <span>{walletArr[key]}: </span>
            <span>{value}</span>
            <br />
            <br />
          </div>
        ))}
        <br />
        <br />

        <Wallet
          showModal={props.onShowModal}
          walletData={walletData}
        />
      </div>
  }
  else {
    content =
      <>
        <p>Found no Wallet.</p>
        <br />
        <br />
        <br />
        <Wallet
          showModal={props.onShowModal}
          walletData={walletData}
        />
      </>
  }

  return (
    <div className={classes.walletview_wrap}>
      <div className={classes.walletview}>
        <div className={classes.walletview_text}>지갑조회/등록</div>
        <div className={classes.walleview_components_wrap}>
          <div className={classes.component}>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching wallet data</p>}
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletView;