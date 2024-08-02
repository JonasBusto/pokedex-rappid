import { useNavigate } from 'react-router-dom';
import { loginUserWithGoogle, logoutUser } from '../store/user/thunks';
import { useAppDispatch, useAppSelector } from './store';

export function useAuth() {
  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const statusSign = useAppSelector((state) => state.user.statusSign);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginGoogle = async () => {
    const res: any = await dispatch(loginUserWithGoogle());
    console.log(res);
    if (res.error) {
      alert(res.payload);
    } else {
      navigate('/');
    }
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  return { loggedUser, loginGoogle, logout, statusSign };
}
