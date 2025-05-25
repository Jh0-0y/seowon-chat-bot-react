import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "./slices/loginSlice";
import { registerUser } from "./slices/registerSlice";
import { validateLogin } from "./authUtils";
import { focusInput } from "@/modules/shared/utils/focusHelpers";

// ------------------------------- 로그인 -----------------------------------
// 로그인 기능 커스텀 훅
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Redux store에서 로그인 상태와 에러 메시지 가져오기
  const { isLoggedIn, error } = useSelector((state) => state.login);

  // 사용자 입력값과 로딩 상태 관리
  const [user_id, setUserId] = useState("");
  const [user_password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 로그인 버튼 클릭 시 실행되는 핸들러
  const handleLogin = (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    setIsLoading(true); // 로딩 상태 시작
    dispatch(login({ user_id, user_password })); // 로그인 액션 디스패치
  };

  // 로그인 성공 또는 실패 시 후속 처리
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(false); // 로딩 상태 종료
      navigate("/"); // 홈 페이지로 이동
    } else if (error) {
      setIsLoading(false); // 실패 시에도 로딩 종료
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

// 로그인 폼 커스텀 훅
export const useLoginHandler = (user_id, user_password, handleLogin) => {
  // 입력 요소에 포커스를 주기 위한 ref
  const idRef = useRef(null);
  const passwordRef = useRef(null);

  // 로컬 유효성 검사 에러 메시지 상태
  const [localError, setLocalError] = useState("");

  /**
   * 로그인 버튼 또는 Enter 키로 제출할 때 호출되는 함수
   * - 유효성 검사 후 포커스 이동
   * - 문제 없으면 실제 로그인 핸들러 실행
   */
  const handleCustomLogin = (e) => {
    e.preventDefault();

    const result = validateLogin({ user_id, user_password });

    if (!result.ok) {
      // 입력값이 비어 있을 경우 해당 input에 포커스 이동
      if (result.focus === "user_id") focusInput(idRef);
      if (result.focus === "user_password") focusInput(passwordRef);

      setLocalError(result.message);
      return;
    }

    // 유효성 통과 시 에러 초기화 및 로그인 요청 실행
    setLocalError("");
    handleLogin(e);
  };

  /**
   * 키보드로 Enter 입력 시 handleCustomLogin 실행
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCustomLogin(e);
    }
  };

  return {
    idRef,
    passwordRef,
    localError,
    handleCustomLogin,
    handleKeyDown,
  };
};

// ------------------------------- 회원가입 -----------------------------------

// 회원가입 처리를 위한 커스텀 훅
export const useRegister = (onSuccess) => {
  const dispatch = useDispatch();

  // 회원가입 폼 데이터 및 상태 관리
  const [formData, setFormData] = useState({
    user_id: "",
    user_password: "",
    user_name: "",
    email: "",
    phone_number: "",
  });
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");

  // 회원가입 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인란이 비밀번호란과 동일한지 검사
    if (formData.user_password !== passwordCheck) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap(); // 회원가입 액션 실행
      onSuccess(); // 성공 시 콜백 실행
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

// ------------------------------- 로그아웃 -----------------------------------

// 로그아웃 처리를 위한 커스텀 훅
export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그아웃 실행 시 Redux 상태 초기화 및 홈 이동
  const handleLogout = () => {
    dispatch(logout()); // Redux 상태 초기화
    navigate('/');
  };

  return handleLogout
};