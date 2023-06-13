import classes from './PaymentRecord.module.css';

const PaymentRecord = (props) => {
  return (
    <li>
      <h2>{props.title}</h2>
      <h2>{props.releaseDate}</h2>
      <h2>{props.openingText}</h2>
    </li>
  );
};


export default PaymentRecord;