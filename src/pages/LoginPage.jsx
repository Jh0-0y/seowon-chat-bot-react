import LoginForm from "../components/login/LoginForm";
import FormHeader from "../components/FormHeader";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-wrap"]}>
        <FormHeader />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
