import Modal from './Modal';
import classes from './ModalComponent.module.css';
import Web3 from 'web3';
import { useState } from 'react';
import { useMutation } from 'react-query';

const ModalComponent = (props) => {
  const [balanceResult, setBalanceResult] = useState('');
  const [error, setError] = useState(null);
  // const [walletAddress, setWalletAddress] = useState('');
  const [isAddressValid, setAddressValid] = useState(false);

  const eth = 'ether';
  let address = "";
  const handleAddressChange = (e) => {
    // setWalletAddress(e.target.value);
  };



  // seller의 아이디로 선택한 지갑에 대해 오직 하나의 wallet_address를 저장하는 함수
  const mutation = useMutation((data) =>
    fetch('https://nanng.onrender.com/api/brofucntions/sangyunbro/WalletOne/createSellerChosenWalletFunc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  );
  // seller의 아이디로 선택한 지갑에 대해 오직 하나의 wallet_address를 저장하는 함수에 대한 FormSubmit
  const handleFormSubmit = async () => {
    try {
      // API 호출을 실행합니다.
      const formData = {
        seller_id: 'seller9999',
        crypto_wallet_idx: '5',
        wallet_address: address,
      }
      await mutation.mutateAsync(formData);
      // 성공적으로 호출되면 실행할 작업을 수행합니다.
      console.log('handle form submit API 호출이 성공했습니다.');
    } catch (error) {
      // 호출이 실패하면 실행할 작업을 수행합니다.
      console.error('API 호출이 실패했습니다.', error);
    }
  };

  const buttonHandler = () => {
    // 사용자가 입력한 지갑 주소 가져오기
    address = document.getElementById('walletAddress').value;

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
            onClick={() => {
              props.onHideModal();
              handleFormSubmit();
            }}
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
