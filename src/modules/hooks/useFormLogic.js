import { useRef, useState} from "react";
import { validateLogin } from "@/modules/utils/validateForm";
import { focusInput } from "@/modules/utils/focusHelpers";

export const useLoginLogic = (user_id, user_password, handleLogin) => {
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const [localError, setLocalError] = useState("");

  const handleCustomLogin = (e) => {
    e.preventDefault();

    const result = validateLogin({ user_id, user_password });

    if (!result.ok) {
      if (result.focus === "user_id") focusInput(idRef);
      if (result.focus === "user_password") focusInput(passwordRef);
      setLocalError(result.message);
      return;
    }

    setLocalError("");
    handleLogin(e);
  };

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
