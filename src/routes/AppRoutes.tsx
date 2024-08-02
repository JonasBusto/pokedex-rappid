import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { PokemonDetail } from '../pages/PokemonDetail';
import { MyAccount } from '../pages/MyAccount';
import { PrivateRoute } from './PrivateRoutes';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/' element={<MyAccount />} />
      <Route path='/pokemon/:name' element={<PokemonDetail />} />
      <Route element={<PrivateRoute />}>
        <Route path='/account' element={<MyAccount />} />
      </Route>
    </Routes>
  );
}
