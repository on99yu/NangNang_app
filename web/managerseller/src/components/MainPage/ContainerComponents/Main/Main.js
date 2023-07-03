import classes from './Main.module.css';
import React, { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
const Main = () => {
  const { user } = useContext(UserContext);
  return (
    <div className={classes.main_wrap}>
      <div className={classes.main}>
        <div className={classes.main_text}>Main</div>
        <div className={classes.main_component_wrap}>
          <button>user 정보</button>
          {console.log(user)}
        </div>
      </div>
    </div>
  );
};

export default Main;
