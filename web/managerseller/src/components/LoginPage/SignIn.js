import React from "react";
// import { Link } from 'react-router-dom';
import classes from "./SignIn.module.css";
import { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
// import { LoginReturnData } from "../../databasefunction/LoginReturnDataFunc";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const SignIn = () => {
  const [state, dispatch] = useContext(AuthContext);
  // const { user, updateUser } = useContext('');
  const [signInId, setSignInId] = useState("");
  const [signInPw, setSignInPw] = useState("");
  const [signInInvalid, setSignInInvalid] = useState(false);
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

    setLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: "https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/login/loginreturndata",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          input_user_id: "gen1001",
          input_user_pwd: "gen1001",
        },
      });
      console.log(JSON.stringify(res, null, 2));
      if (Object.keys(res).length === 0) {
        // 빈 객체인 경우에 대한 처리
        throw new Error("Empty response data.");
      }
      dispatch({
        type: "USER_LOGIN",
        payload: true,
        id: id,
        // real_name: res.data.real_name,
      });
    } catch (error) {
      console.log(error);
      alert("Login failed");
      setSignInInvalid(true);
    } finally {
      setLoading(false);
    }
  };

  // const loginHandler = useCallback(async (event) => {
  //   event.preventDefault(); // 폼 제출 기본 동작 방지
  //   let id = signInId;
  //   let pw = signInPw;
  //   setLoading(true);
  //   try {
  //     const response = await fetch({
  //       method: "POST",
  //       url: "https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/login/loginreturndata",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: {
  //         input_user_id: "gen1001",
  //         input_user_pwd: "gen1001",
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //     alert("Login failed");
  //     setSignInInvalid(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    setSignInInvalid(false); // 컴포넌트가 마운트될 때 count 상태를 0으로 설정
    console.log(state);
  }, [state]);

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
              type={"text"}
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
              type={"password"}
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
        <Link to={"/signup"} className={classes.signupbutton_wrap}>
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
            {/* {user !== null ? (
              <ul>
                {Object.entries(user).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}: </strong> {value}
                  </li>
                ))}
              </ul>
            ) : (
              <p>로그인 데이터가 없습니다.</p>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
