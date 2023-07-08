import classes from './Main.module.css';
import React, { useContext } from 'react';
import UserContext from '../../../../contexts/user-context';
const Main = () => {
  const { user, count, setCount } = useContext(UserContext);
  let i = 0;
  const countHandle = () => {
    i++;
    setCount(i);
    console.log(count);
  };

  return (
    <div className={classes.main_wrap}>
      <div className={classes.main}>
        <div className={classes.main_text}>Main</div>
        <div className={classes.main_component_wrap}>
          <button>user 정보</button>
          <div>
            <h1>Home Page</h1>
            <p>User: {user ? JSON.stringify(user) : 'No user'}</p>
            <button onClick={countHandle}>count</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
