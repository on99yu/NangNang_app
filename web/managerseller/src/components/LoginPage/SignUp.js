import { Link } from 'react-router-dom';
import classes from './SignUp.module.css';
import { useState, useEffect } from 'react';
import { userDataDB } from '../../databasefunction/UserDataCRUD';

const SignUp = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [consumerOrNot, setConsumerOrNot] = useState(0); // 초기값은 판매자(0)
  const [email, setEmail] = useState('');
  const [realName, setRealName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rRNumber, setRRNumber] = useState('');
  const [userData, setUserData] = useState(null);

  const handleCreate = async () => {
    const result = await userDataDB.createUserData(
      id,
      password,
      consumerOrNot,
      email,
      realName,
      phoneNumber,
      rRNumber
    );
    if (result === 1) {
      const data = handleRead();
      alert(`user data creation accepted ${data}`);
      window.location.href = '/';
    } else {
      console.log('user data creation failed');
    }
  };

  const handleRead = async () => {
    const data = await userDataDB.readUserData(id);
    if (data) {
      setUserData(data);
      console.log(data);
    } else {
      alert('user data read failed');
    }
    return data;
  };

  useEffect(() => {
    // 초기 데이터 로드 등 필요한 작업 수행
  }, []);

  return (
    <div className={classes.signupwrap}>
      <div className={classes.wrap}>
        <h1>Seller Manager</h1>
        <h1>SignUp</h1>
        <br />
        <form className={classes.form}>
          <label className={classes.formlabel}>
            <span className={classes.formtext}>아이디&nbsp;&nbsp;</span>
            <input
              className={classes.inputaddress}
              type={'text'}
              id="username"
              value={id}
              placeholder=""
              required
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </label>
          <label className={classes.formlabel}>
            <span className={classes.formtext}>비밀번호&nbsp;&nbsp;</span>
            <input
              className={classes.inputaddress}
              type={'password'}
              id="password"
              value={password}
              placeholder="8자 이상"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <label className={classes.formlabel}>
            <span className={classes.formtext}>성명&nbsp;&nbsp;</span>
            <input
              className={classes.inputaddress}
              type={'text'}
              id="real_name"
              value={realName}
              placeholder=""
              required
              onChange={(e) => setRealName(e.target.value)}
            />
          </label>
          <label className={classes.formlabel}>
            <span className={classes.formtext}>주민등록번호&nbsp;&nbsp;</span>
            <input
              className={classes.inputaddress}
              type={'text'}
              id="resident_registration_number"
              value={rRNumber}
              placeholder="9XXXXX-1XXXXXX"
              required
              onChange={(e) => setRRNumber(e.target.value)}
            />
          </label>
          <label className={classes.formlabel}>
            <span className={classes.formtext}>전화번호&nbsp;&nbsp;</span>
            <input
              className={classes.inputaddress}
              type={'text'}
              id="phone_number"
              value={phoneNumber}
              placeholder="010-XXXX-XXXX"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <label className={classes.formlabel}>
            <span className={classes.formtext}>이메일&nbsp;&nbsp;</span>
            <input
              className={classes.inputaddress}
              type={'text'}
              id="email"
              value={email}
              placeholder="xxxxx@gmail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div className={classes.signbuttons}>
            <button
              type="button"
              onClick={handleCreate}
              className={classes.signinbutton}
            >
              가입
            </button>
          </div>
        </form>
        <Link to={'/'} className={classes.cancelbutton_wrap}>
          <button className={classes.cancelbutton}>취소</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
