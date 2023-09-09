import classes from './SignFormPage.module.css';
import SignIn from '../components/LoginPage/SignIn';
// import UserContext from '../contexts/user-context';

const SignInFormPage = () => {
  return (
    // <UserContext.Consumer>
    // </UserContext.Consumer>
    <div className={classes.login}>
      <SignIn />
    </div>
  );
};

export default SignInFormPage;
