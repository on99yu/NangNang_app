import { Link } from 'react-router-dom';
import classes from './SignIn.module.css';
const SignIn = () => {
  return (
    <div className={classes.wrap}>
      <h1>Login</h1>
      <form id="signinForm" className={classes.form}>
        <input type={'text'} id="username" placeholder="Username"></input>
        <input type={'password'} id="password" placeholder="Password"></input>
        <div className={classes.signbuttons}>
          <Link to={'/signin'} className={classes.signinbutton}>
            <button
              type="submit"
              id="loginButton"
              className={classes.signinbutton}
            >
              Sign In
            </button>
          </Link>
          <Link to={'/signup'} className={classes.signupbutton}>
            <button
              type="submit"
              id="loginButton"
              className={classes.signinbutton}
            >
              Sign Up
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
