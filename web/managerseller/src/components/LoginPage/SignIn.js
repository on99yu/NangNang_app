import React from 'react';
// import { Link } from 'react-router-dom';
import classes from './SignIn.module.css';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginReturnData } from '../../databasefunction/LoginReturnDataFunc';
import { UserContext } from '../../contexts/UserContext';

const SignIn = () => {
  const { user, updateUser } = useContext(UserContext);
  const [signInId, setSignInId] = useState('');
  const [signInPw, setSignInPw] = useState('');
  const [signInInvalid, setSignInInvalid] = useState(false);
  const [signInData, setSignInData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (event) => {
    setSignInId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setSignInPw(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    let id = signInId;
    let pw = signInPw;

    try {
      setLoading(true);
      const data = await LoginReturnData(id, pw);
      setSignInData(data);
      alert('Login successful');
      updateUser({
        id: signInData.id,
        pw: signInData.password,
        email: signInData.email,
        name: signInData.real_name,
        inumber: signInData.resident_registration_number,
        phone: signInData.phone_number,
      });
      window.location.href = '/main';
    } catch (error) {
      console.log(error);
      alert('Login failed');
      setSignInInvalid(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSignInInvalid(false); // 컴포넌트가 마운트될 때 count 상태를 0으로 설정
  }, []);

  return (
    <div className={classes.login_component}>
      <div className={classes.wrap}>
        <h1>Seller Manager</h1>
        <h1>SignIn</h1>
        <br />
        <form id="signinForm" className={classes.form} onSubmit={handleSubmit}>
          <label className={classes.formlabel}>
            <span className={classes.formtext}>아이디&nbsp;&nbsp;</span>
            <input
              className={classes.inputaddress}
              type={'text'}
              id="username"
              placeholder=""
              required
              autoComplete="on"
              onChange={handleUsernameChange}
            />
          </label>
          <label className={classes.formlabel}>
            <span className={classes.formtext}>비밀번호&nbsp;&nbsp;</span>
            <input
              className={classes.inputaddress}
              type={'password'}
              id="password"
              placeholder="8자 이상"
              required
              autoComplete="off"
              onChange={handlePasswordChange}
            />
          </label>
          <div className={classes.signbuttons}>
            <button
              type="submit"
              id="signinbutton"
              className={classes.signinbutton}
            >
              로그인
            </button>
          </div>
        </form>
        <Link to={'/signup'} className={classes.signupbutton_wrap}>
          <button id="signupbutton" className={classes.signupbutton}>
            회원가입
          </button>
        </Link>
        <div className={classes.signInInvalid}>
          {signInInvalid && (
            <>
              <p> 아이디 또는 비밀번호를 잘못 입력했습니다.</p>
              <p> 입력하신 내용을 다시 확인해주세요.</p>
            </>
          )}
        </div>
        {loading ? (
          <p>로그인 중입니다...</p>
        ) : (
          <div>
            {signInData !== null ? (
              <ul>
                {Object.entries(signInData).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}: </strong> {value}
                  </li>
                ))}
              </ul>
            ) : (
              <p>로그인 데이터가 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
