import classes from './SignFormPage.module.css';
import SignUp from '../components/LoginPage/SignUp';

const SignUpFormPage = () => {
  return (
    <div className={classes.login}>
      <SignUp />
    </div>
  );
};

export default SignUpFormPage;
