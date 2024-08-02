import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AppContext } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

export function NavPage() {
  const {
    isLoading,
    showModalSign,
    handleCloseModalSign,
    handleShowModalSign,
  } = useContext(AppContext);

  const { logout, loggedUser, loginGoogle } = useAuth();

  return (
    <nav>
      <Link to='/'>PokeApi</Link>
      {!loggedUser && !isLoading && (
        <>
          <button onClick={handleShowModalSign}>Iniciar sesión</button>

          <Modal show={showModalSign} onHide={handleCloseModalSign}>
            <Modal.Body>
              Inicia sesión con google para guardar tus pokemons favoritos
              <button onClick={loginGoogle}>Login google</button>
            </Modal.Body>
          </Modal>
        </>
      )}
      {loggedUser && (
        <>
          <button onClick={logout}>Cerrar Sesión</button>
          <Link to='/account'>
            <img src={loggedUser.photoProfile} alt='' />
          </Link>
        </>
      )}
    </nav>
  );
}
