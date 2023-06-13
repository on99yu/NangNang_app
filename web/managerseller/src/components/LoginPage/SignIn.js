import React from 'react';
// import { Link } from 'react-router-dom';
import classes from './SignIn.module.css';
import { useState, useEffect } from 'react';
// import { withRouter } from 'react-router-dom';

const SignIn = (props) => {
  const [signInId, setSignInId] = useState('');
  const [signInPw, setSignInPw] = useState('');
  const [signInInvalid, setSignInInvalid] = useState(false);

  const handleUsernameChange = (event) => {
    setSignInId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setSignInPw(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    // 사용자 입력 가져오기
    var id = signInId;
    var password = signInPw;

    // 서버로 로그인 요청 보내기 (예: AJAX 요청)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          var accessToken = response.accessToken;

          // 액세스 토큰 저장 (로컬 스토리지 사용)
          localStorage.setItem('accessToken', accessToken);

          // 로그인 성공 후 필요한 동작 수행
          // 예: 다른 페이지로 이동, UI 업데이트 등
          alert('Login successful, 새로고침을 눌러주세요');
          setSignInInvalid(false);
          window.history.pushState('v1', '', '/');
        } else {
          // 로그인 실패 처리
          // 예: 오류 메시지 표시, 입력 초기화 등
          alert('Login failed');
          setSignInInvalid(true);
        }
      }
    };
    xhr.send(JSON.stringify({ id: id, pw: password }));
  };

  useEffect(() => {
    setSignInInvalid(false); // 컴포넌트가 마운트될 때 count 상태를 0으로 설정
  }, []);

  return (
    <div className={classes.login_component}>
      <div className={classes.wrap}>
        <h1>Seller Manager</h1>
        <h1>Login</h1>
        <form id="signinForm" className={classes.form} onSubmit={handleSubmit}>
          <input
            className={classes.inputaddress}
            type={'text'}
            id="username"
            placeholder="Username"
            required
            autoComplete="email"
            onChange={handleUsernameChange}
          ></input>
          <input
            className={classes.inputaddress}
            type={'password'}
            id="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            onChange={handlePasswordChange}
          ></input>
          <div className={classes.signbuttons}>
            <button
              type="submit"
              id="signinbutton"
              className={classes.signinbutton}
            >
              로그인
            </button>
            <button
              type="submit"
              id="signupbutton"
              className={classes.signinbutton}
            >
              회원가입
            </button>
            <div className={classes.signInInvalid}>
              {signInInvalid && (
                <>
                  <p> 아이디 또는 비밀번호를 잘못 입력했습니다.</p>
                  <p> 입력하신 내용을 다시 확인해주세요.</p>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
