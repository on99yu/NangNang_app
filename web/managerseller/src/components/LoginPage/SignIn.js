import { Link } from 'react-router-dom';
import classes from './SignIn.module.css';
const SignIn = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
          ></input>
          <input
            className={classes.inputaddress}
            type={'password'}
            id="password"
            placeholder="Password"
          ></input>
          <div className={classes.signbuttons}>
            <Link to={'/signin'} className={classes.signinbutton}>
              <button
                type="submit"
                id="loginButton"
                className={classes.signinbutton}
              >
                로그인
              </button>
            </Link>
            <Link to={'/signup'} className={classes.signupbutton}>
              <button
                type="submit"
                id="loginButton"
                className={classes.signinbutton}
              >
                회원가입
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
