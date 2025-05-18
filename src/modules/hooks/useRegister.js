import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "@/modules/store/slices/registerSlice";

export const useRegister = (onSuccess) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    user_id: "",
    user_password: "",
    user_name: "",
    email: "",
    phone_number: "",
  });
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.user_password !== passwordCheck) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
      onSuccess();
    } catch (err) {
      setError("회원가입에 실패했습니다.");
    }
  };

  return {
    formData,
    setFormData,
    passwordCheck,
    setPasswordCheck,
    handleSubmit,
    error,
  };
};
