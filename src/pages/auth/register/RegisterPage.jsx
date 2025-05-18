import RegisterForm from "./RegisterForm";
import FormHeader from "../components/FormHeader";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <div className={styles["register-container"]}>
      <div className={styles["register-wrap"]}>
        <FormHeader />
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
