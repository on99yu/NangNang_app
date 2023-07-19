import classes from "./PaymentRecord.module.css";
import { useEffect, useRef } from "react";

const PaymentRecord = (props) => {
  // const ref = useRef(networkInfoData)

  // useEffect(() => {
  //   console.log(ref);
  // }, [ref]);

  let total = 0;

  for (let i = 0; i < props.productsAllData.length; i++) {
    console.log(props.productsAllData[i].product_won_price_per);
    total += Number(props.productsAllData[i].product_won_price_per);
  }
  console.log(`total: `, total);
  return (
    <>
      <tbody>
        <tr>
          <td className={classes.table_td}>
            {props.participantsData.consumer_id}
          </td>
          <td className={classes.table_td}>
            {props.networkInfoData.payment_wallet_name}
          </td>
          <td className={classes.table_td}>
            {props.networkInfoData.detailed_network_name}
          </td>
          <td className={classes.table_td}>
            {props.networkInfoData.main_blockchain_name}
          </td>
          <td className={classes.table_td}>{`${total}원`}</td>
          <td className={classes.table_td}>
            {props.statusInfoData.payment_start_time}
          </td>
          <td className={classes.table_td}>
            {props.statusInfoData.payment_end_time}
          </td>
          <td className={classes.table_td}>
            {props.statusInfoData.payment_status}
          </td>
        </tr>
        {/* <tr>
            <td className={classes.table_td}>
              {props.networkInfoData.payment_wallet_name}
            </td>
            <td className={classes.table_td}>
              {props.networkInfoData.detailed_network_name}
            </td>
            <td className={classes.table_td}>100</td>
          </tr> */}
      </tbody>
      <tfoot>
        {/* <tr>
            <td className={classes.table_td}>합계</td>
            <td className={classes.table_td}>300</td>
            <td className={classes.table_td}>150</td>
          </tr> */}
      </tfoot>
      {/* <li className={classes.row}>
        <h2>{props.networkInfoData.payment_receipt_idx}</h2>
        <h2>{props.networkInfoData.payment_wallet_name}</h2>
        <h2>{props.networkInfoData.main_blockchain_name}</h2>
        <h2>{props.networkInfoData.detailed_network_name}</h2>
      </li>
      <li>
        <h2>{props.networkInfoData.payment_receipt_idx}</h2>
        <h2>{}</h2>
        <h2>{}</h2>
        <h2>{}</h2>
      </li> */}
    </>
  );
};

export default PaymentRecord;
