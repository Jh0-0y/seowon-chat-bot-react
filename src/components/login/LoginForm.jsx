import { Link } from "react-router-dom";
import { useLogin } from "@/modules/hooks/useLogin";
import { useLoginLogic } from "@/modules/hooks/useFormLogic";
import GoogleLogo from "@/assets/logo/GoogleLogo";
import styles from "../../pages/LoginPage.module.css";

const LoginForm = () => {
  const {
    user_id,
    setUserId,
    user_password,
    setPassword,
    errorMessage,
    handleLogin,
    isLoading,
  } = useLogin();

  const { idRef, passwordRef, localError, handleCustomLogin, handleKeyDown } =
    useLoginLogic(user_id, user_password, handleLogin);

  return (
    <form className={styles["login-form"]} onSubmit={handleCustomLogin}>
      <div className={styles["login-content"]}>
        <div className={styles["login-title"]}>
          <h2>로그인</h2>
        </div>
        <div className="login-group">
          <div className={styles["inp-group"]}>
            <input
              type="text"
              className={styles["inp-fd"]}
              id="username"
              placeholder=""
              value={user_id}
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={idRef}
            />
            <label htmlFor="username" className={styles["inp-lb"]}>
              아이디
            </label>
          </div>

          <div className={styles["inp-group"]}>
            <input
              type="password"
              className={styles["inp-fd"]}
              id="passwd"
              placeholder=""
              value={user_password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={passwordRef}
            />
            <label htmlFor="passwd" className={styles["inp-lb"]}>
              비밀번호
            </label>
          </div>

          {(localError || errorMessage) && (
            <p className={styles["error-message"]}>
              {localError || errorMessage}
            </p>
          )}

          <div className="help-text-wrap">
            <p className={styles["help-text"]}>
              <Link to="/auth/remember">아이디 및 비밀번호를 잊으셨나요?</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="login-btn-wrap">
        <button
          type="submit"
          className={styles["login-btn"]}
          disabled={isLoading}
        >
          {isLoading ? <span className={styles.spinner}></span> : "로그인"}
        </button>
        <p className={styles["signup-text"]}>
          계정이 없으신가요? <Link to="/auth/register">회원가입</Link>
        </p>
      </div>

      <button type="button" className={styles["google-btn"]}>
        <GoogleLogo size="20" />
        <span className={styles["google-btn-name"]}>Google 계정으로 로그인</span>
      </button>
    </form>
  );
};

export default LoginForm;
