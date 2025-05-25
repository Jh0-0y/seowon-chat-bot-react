import { useLogout } from "@/modules/auth/authHooks";

const LogoutBtn = () => {
  const handleLogout = useLogout();

  return (
    <button type="button" onClick={handleLogout}>
      로그아웃
    </button>
  );
};

export default LogoutBtn;
