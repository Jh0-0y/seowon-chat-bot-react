import { useRegister } from "@/modules/auth/authHooks";
import styles from "../../../pages/RegisterPage.module.css";

const StepInfo = ({ onNext }) => {
  const {
    formData,
    setFormData,
    passwordCheck,
    setPasswordCheck,
    handleSubmit,
    error,
  } = useRegister(onNext);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const isAllFilled =
    Object.values(formData).every((val) => val.trim() !== "") &&
    passwordCheck.trim() !== "";

  return (
    <form className={styles["register-form"]} onSubmit={handleSubmit}>
      <header className={styles["register-header"]}>
        <h1 className={styles["register-title"]}>회원정보</h1>
        <p className={styles["register-sub-title"]}>
          회원님의 소중한 정보를 입력해주세요.
        </p>
      </header>

      <section className={styles["register-content"]}>
        {[
          {
            id: "profile_img",
            label: "프로필",
            type: "text",
            placeholder: "",
          },
          {
            id: "user_name",
            label: "사용자 이름",
            type: "text",
            placeholder: "이름을 입력해주세요",
          },
          {
            id: "email",
            label: "이메일",
            type: "email",
            placeholder: "email@email.com",
          },
          {
            id: "user_password",
            label: "비밀번호",
            type: "password",
            placeholder: "비밀번호",
          },
          {
            id: "passwordCheck",
            label: "비밀번호 확인",
            type: "password",
            placeholder: "비밀번호 확인",
          },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id} className={styles["form-group"]}>
            <label htmlFor={id} className={styles["form-label"]}>
              {label}
            </label>
            <div className={styles["form-inline"]}>
              <div className={styles["form-inp-box"]}>
                <input
                  id={id}
                  type={type}
                  value={
                    id === "passwordCheck" ? passwordCheck : formData[id] || ""
                  }
                  onChange={
                    id === "passwordCheck"
                      ? (e) => setPasswordCheck(e.target.value)
                      : handleChange
                  }
                  placeholder={placeholder}
                  className={styles["form-inp"]}
                />
              </div>
            </div>
          </div>
        ))}

        {error && <p className={styles["error-message"]}>{error}</p>}
      </section>

      <footer className={styles["register-footer"]}>
        <button
          type="submit"
          className={styles["form-next-btn"]}
          disabled={!isAllFilled}
        >
          다음
        </button>
      </footer>
    </form>
  );
};

export default StepInfo;
