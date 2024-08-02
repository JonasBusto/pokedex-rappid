import { Navigate, Outlet } from 'react-router-dom';
import { useLoad } from '../hooks/useLoad';
import { useAuth } from '../hooks/useAuth';
import { Load } from '../components/items/Load';

export function PrivateRoute() {
  const { loggedUser } = useAuth();
  const { isLoading } = useLoad();

  if (isLoading) {
    return <Load />;
  }

  if (!loggedUser) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
}
