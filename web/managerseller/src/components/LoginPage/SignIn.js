import React from "react";
import classes from "./SignIn.module.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
const SignIn = (props) => {
  const [signInInvalid, setSignInInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const signIn = useContext(UserContext);

  const handleUsernameChange = (event) => {
    signIn.id = event.target.value;
    // setSignInId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    signIn.password = event.target.value;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
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
    } catch (error) {
      console.log(error);
      alert("Login failed");
      setSignInInvalid(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.login_component}>
      {console.log(signIn)}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
