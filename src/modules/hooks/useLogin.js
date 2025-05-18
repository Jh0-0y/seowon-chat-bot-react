import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/modules/store/slices/loginSlice";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); //페이지 이동을 위한 ROUTE 네비게이터

  const { isLoggedIn, error } = useSelector((state) => state.login);

  const [user_id, setUserId] = useState("");
  const [user_password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    console.log(user_id, user_password,)
    e.preventDefault();
    setIsLoading(true);
    dispatch(login({ user_id, user_password }));

  };

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(false);
      navigate("/");
    } else if (error) {
      setIsLoading(false);
    }
  }, [isLoggedIn, error, navigate]);

  return {
    user_id,
    setUserId,
    user_password,
    setPassword,
    errorMessage: error,
    handleLogin,
    isLoading,
  };
};
