import classes from './SignFormPage.module.css';
import SignIn from '../components/LoginPage/SignIn';

const SignInFormPage = ({ handleSetAccessToken }) => {
  return (
    <div className={classes.login}>
      <SignIn handleSetAccessToken={handleSetAccessToken} />
    </div>
  );
};

export default SignInFormPage;
