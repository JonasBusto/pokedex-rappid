import { Footer } from './components/structure/Footer';
import { Header } from './components/structure/Header';
import { Main } from './components/structure/Main';
import './styles/app.css';

export function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
