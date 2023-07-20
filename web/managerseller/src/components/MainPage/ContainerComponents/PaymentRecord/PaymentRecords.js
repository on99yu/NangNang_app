import classes from "./PaymentRecords.module.css";
import { useState, useEffect, useCallback } from "react";
import PaymentRecordList from "./PaymentRecordList";

const PaymentRecords = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecordsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/getpaymentreceiptdata/getallpaymentreceiptdatabyuserid?user_id=seller1002"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      // console.log(data);
      setRecords(data.data);
      // console.log(records);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchRecordsHandler();
  }, [fetchRecordsHandler]);

  let content = <p>Found no Records.</p>;

  // 결제 내역이 있을 경우
  if (records.length > 0) {
    content = <PaymentRecordList records={records} />;
  }
  // 에러가 발생한 경우
  if (error) {
    content = <p>{error}</p>;
  }

  // 데이터를 로딩 중인 경우
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div className={classes.paymentrecords_wrap}>
      <div className={classes.paymentrecords}>
        <div className={classes.text_button_wrap}>
          <div className={classes.paymentrecords_text}>결제내역</div>
          <button
            className={classes.check_table_button}
            onClick={fetchRecordsHandler}
          >
            조회
          </button>
        </div>
        <div className={classes.paymentrecords_table_wrap}>{content}</div>
      </div>
    </div>
  );
};

export default PaymentRecords;
