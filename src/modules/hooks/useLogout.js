import { useDispatch } from 'react-redux';
import { logout } from '@/modules/store/slices/loginSlice';
import { useNavigate } from 'react-router-dom';

function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Redux 상태 초기화
    navigate('/');
  };

  return handleLogout
}

export default useLogout;