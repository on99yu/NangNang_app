import classes from './PaymentRecordList.module.css';

import PaymentRecord from './PaymentRecord';

const PaymentRecordList = (props) => {
  return (
    <ul>
      {props.records.map((record) => (
        <PaymentRecord
          key={record.id}
          title={record.title}
          releaseDate={record.releaseDate}
          openingText={record.openingText}
        />
      ))}
    </ul>
  );
};

export default PaymentRecordList;