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

  const { loggedUser, loginGoogle } = useAuth();

  return (
    <nav className='d-flex justify-content-between'>
      <Link to='/' className='logo-nav'>
        <img
          src='https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png'
          alt=''
        />
      </Link>
      {!loggedUser && !isLoading && (
        <div className='d-flex align-items-center'>
          <button className='btn-sign' onClick={handleShowModalSign}>
            Iniciar sesión
          </button>

          <Modal
            className='modal-custom'
            show={showModalSign}
            onHide={handleCloseModalSign}
          >
            <Modal.Body className='d-flex flex-column'>
              <img
                src='https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png'
                alt=''
              />
              <p>
                Inicia sesión con google para guardar tus pokemons favoritos
              </p>
              <button className='btn-sign' onClick={loginGoogle}>
                Iniciar Sesión
              </button>
            </Modal.Body>
          </Modal>
        </div>
      )}
      {loggedUser && (
        <>
          <Link
            to='/account'
            className='d-flex justify-content-center align-items-center image-profile'
          >
            <img className='img-fluid' src={loggedUser.photoProfile} alt='' />
          </Link>
        </>
      )}
    </nav>
  );
}
