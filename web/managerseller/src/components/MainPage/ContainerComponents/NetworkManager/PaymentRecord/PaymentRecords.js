import classes from './PaymentRecords.module.css';
import { useState, useEffect, useCallback } from 'react';
import PaymentRecordList from './PaymentRecordList';

const PaymentRecords = () => {
  const [records, setPaymentRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecordsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://react-http-7ddfd-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json'
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const paymentRecords = [];

      for (const key in data) {
        paymentRecords.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setPaymentRecords(paymentRecords);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchRecordsHandler();
  }, [fetchRecordsHandler]);

  let content = <p>Found no Records.</p>;

  // movies state에 무언가 들어가 있다면,
  if (records.length > 0) {
    content = <PaymentRecordList records={records} />;
  }
  // 에러가 나면
  if (error) {
    content = <p>{error}</p>;
  }

  // 데이터 호출 중이라면
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div className={classes.paymentrecords_wrap}>
      <div className={classes.paymentrecords}>
        <div className={classes.paymentrecords_text}>결제내역</div>
        <div className={classes.paymentrecords_table_wrap}>
          <div className={classes.check_table}>
            <div className={classes.check_table_text}>결제 기간</div>
            <div className={classes.date_bar}>
              <input type={'date'} />
              <div>~</div>
              <input type={'date'} />
            </div>
            <button
              className={classes.check_table_button}
              onClick={fetchRecordsHandler}
            >
              조회
            </button>
          </div>
          {content}
        </div>
      </div>
    </div>
  );
};

export default PaymentRecords;
