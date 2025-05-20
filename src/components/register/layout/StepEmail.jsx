import { useState, useEffect } from "react";
import styles from "../../../pages/RegisterPage.module.css";

const StepEmail = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [requested, setRequested] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const isEmailValid = email.trim() !== "";
  const isAuthValid = requested && timeLeft > 0 && authCode === "112233";

  const handleRequestAuth = () => {
    if (!isEmailValid) return;
    setRequested(true);
    setTimeLeft(300);
    alert("인증이 요청되었습니다.");
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m} : ${s}`;
  };

  return (
    <form
      className={styles["register-form"]}
      onSubmit={(e) => {
        e.preventDefault();
        if (isAuthValid) {
          onNext();
        }
      }}
    >
      <header className={styles["register-header"]}>
        <h1 className={styles["register-title"]}>이메일 인증</h1>
        <p className={styles["register-sub-title"]}>
          계정 분실에 대비하여{" "}
          <span className={styles["register-highlight"]}>이메일 주소</span>{" "}
          인증이 필요합니다.
        </p>
      </header>

      <section className={styles["register-content"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="email" className={styles["form-label"]}>
            이메일
          </label>
          <div className={styles["form-inline"]}>
            <div className={styles["form-inp-box"]}>
              <input
                type="email"
                id="email"
                placeholder="email@email.com"
                className={styles["form-inp"]}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="button"
              className={styles["form-btn"]}
              disabled={!isEmailValid}
              onClick={handleRequestAuth}
            >
              인증요청
            </button>
          </div>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="auth-code" className={styles["form-label"]}>
            인증번호(숫자 6자리)
          </label>
          <div className={styles["form-auth-box"]}>
            <input
              type="text"
              id="auth-code"
              className={styles["form-inp"]}
              placeholder="000000"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              disabled={!requested || timeLeft <= 0}
            />
            <div className={styles["form-timer"]}>
              {requested
                ? timeLeft > 0
                  ? formatTime(timeLeft)
                  : "만료됨"
                : ""}
            </div>
          </div>
        </div>
      </section>
      <footer className={styles["register-footer"]}>
        <button
          type="submit"
          className={styles["form-next-btn"]}
          disabled={!isAuthValid}
        >
          인증확인
        </button>
      </footer>
    </form>
  );
};

export default StepEmail;
