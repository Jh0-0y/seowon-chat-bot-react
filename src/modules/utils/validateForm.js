export const validateLogin = ({ user_id, user_password }) => {
    if (!user_id) return { ok: false, message: "아이디를 입력해 주세요.", focus: "user_id" };
    if (!user_password) return { ok: false, message: "비밀번호를 입력해 주세요.", focus: "user_password" };
    return { ok: true };
  };