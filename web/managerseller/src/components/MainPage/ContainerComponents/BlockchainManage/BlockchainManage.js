import classes from "./BlockchainManage.module.css";
import { useQuery } from "react-query";
const fetchBlockchainList = async () => {
  const response = await fetch('https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/brofucntions/sangyunbro/BlockchainOne/readMainBlockchainList');
  if (!response.ok) {
    throw new Error('API 호출이 실패했습니다.');
  }
  return response.json();
};

const fetchSellerChosenList = async () => {
  const response = await fetch('https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/brofucntions/sangyunbro/BlockchainTwo/readSellersChosenMainBlockchain?seller_id=seller1001');
  if (!response.ok) {
    throw new Error('API 호출이 실패했습니다.');
  }
  return response.json();
};


const BlockchainManage = () => {
  const { data: firstData, isLoading: isLoadingFirst } = useQuery(
    "firstData",
    fetchBlockchainList
  );

  const { data: secondData, isLoading: isLoadingSecond } = useQuery(
    "secondData",
    fetchSellerChosenList
  );

  const sellerChosen = secondData?.data || [];


  return (
    <div className={classes.blockchainmanage_wrap}>
      <div className={classes.blockchainmanage}>
        <div className={classes.blockchainmanage_text}>블록체인 관리</div>
        <hr className={classes.divider} />
        <div className={classes.payment_blockchain}>
          <h3>결제 가능한 블록체인</h3>
          <br />
          {isLoadingFirst ? (
            <p>Loading list data...</p>
          ) : (
            <table className={classes.blockchain_list}>
              <tbody>
                {Object.entries(firstData.data).map(([key, value]) => (
                  <tr
                    key={key}
                    className={sellerChosen.includes(key) ? classes.unhighlighted_row : classes.highlighted_row}
                  >
                    {value}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <button className={classes.edit_button}>수정</button>
      </div>
    </div>
  );
};

export default BlockchainManage;