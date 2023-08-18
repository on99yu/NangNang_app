import Modal from './Modal';
import classes from './ModalComponent.module.css';
import Web3 from 'web3';
import { useState } from 'react';
import { useQuery } from 'react-query';

const ModalComponent = (props) => {
  const [balanceResult, setBalanceResult] = useState('');
  const [error, setError] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [isAddressValid, setAddressValid] = useState(false);

  const eth = 'ether';

  const handleAddressChange = (e) => {
    setWalletAddress(e.target.value);
  };

  const requestData = {
    walletAddress,
    tokenName: 'ETH',
  };

  const url =
    'https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/brofucntions/sangyunbro/WalletOne/createSellerChosenWalletFunc';


  const { isLoading, isError, data, refetch, isSuccess } = useQuery(
    'createSellerChosenWallet',
    () =>
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }).then((response) => response.json()),
    {
      enabled: false, // 초기에는 요청 비활성화
      // 여기에 필요한 다른 옵션들 추가 가능
    }
  );

  let content = <p>Found no Acount.</p>;

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );

  /* 아직 미완성 */
  const handleRegistration = () => {
    if (isAddressValid) {
      console.log(`지갑 주소 등록: `, walletAddress);
      refetch();
    } else {
      console.log(`조회되지 않은 주소입니다. 등록할 수 없습니다.`);
    }
  };

  const buttonHandler = () => {
    // 사용자가 입력한 지갑 주소 가져오기
    const address = document.getElementById('walletAddress').value;

    // Web3 인스턴스 생성
    const web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_PROVIDER)
    );
    // 주소 조회하기
    web3.eth
      .getBalance(address)
      .then((balance) => {
        const etherBalance = web3.utils.fromWei(balance, eth);
        const etherBalanceFixed = (+etherBalance).toFixed(6);
        console.log('조회 결과 (Ether):', etherBalanceFixed);
        setAddressValid(true);
        setBalanceResult(etherBalanceFixed.toString());
        setError(null);
      })
      .catch((error) => {
        console.error('조회 에러:', error);
        setError('조회 실패');
        setBalanceResult(null);
      });
  };

  return (
    <Modal>
      <div className={classes.wrap}>
        <h1 className={classes.title}>지갑 등록</h1>

        <div className={classes.address}>
          <input
            id={'walletAddress'}
            className={classes.inputaddress}
            type={'text'}
            placeholder="0x..."
            onChange={handleAddressChange}
          />
          <button
            className={classes.buttonaddress}
            type="submit"
            onClick={buttonHandler}
          >
            조회
          </button>
        </div>
        <div className={classes.assetwrap}>
          <div className={classes.asset}>
            <h3 className={classes.currentasset}>자금 현황</h3>
            <ul className={classes.list}>
              <li className={classes.coinname}>
                {content}
                {balanceResult && (
                  <p>
                    {eth}: {balanceResult}
                  </p>
                )}
                {error && <p>{error}</p>}
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.buttons}>
          <button
            className={classes.completebutton}
            onClick={handleRegistration}
            disabled={!isAddressValid}
          >
            등록
          </button>
          <button onClick={props.onHideModal} className={classes.backbutton}>
            돌아가기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
