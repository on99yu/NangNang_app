import classes from './MyInfo.module.css';
// import { useState, useEffect } from 'react';
// import { userDataDB } from '../../../../databasefunction/UserDataCRUD';
import Contents from './MyInfoContents.js';

const MyInfo = () => {

  return (
    <div className={classes.paymentrecord_wrap}>
      <div className={classes.paymentrecord}>
        <h1 className={classes.paymentrecord_text}>내 정보</h1>
        <div className={classes.walleview_component_wrap}>
          <Contents />
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
