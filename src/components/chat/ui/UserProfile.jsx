import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserImgIcon } from "@/assets/icons/Icons";

const UserProfile = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let user_name = "로그인 해주세요";
  let user_profile = <UserImgIcon />;
  const isLoggedIn = !!token;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      user_name = decoded.user_name || "이름 없음";
      user_profile = decoded.user_profile || <UserImgIcon />;
    } catch (e) {
      console.error("❌ JWT 디코딩 실패:", e);
    }
  }

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate("/auth/login");
    }
  };

  return (
    <div
      className="sidebar-profile cursor-pointer hover:opacity-80"
      onClick={handleClick}
    >
      <img
        src={user_profile}
        alt="사용자 프로필"
        className="w-12 h-12 rounded-full object-cover mx-auto"
      />
      <p className="mt-2 text-sm font-medium text-center text-gray-800">
        {user_name}
      </p>
    </div>
  );
};

export default UserProfile;
