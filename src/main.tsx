import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { AppProvider } from './context/AppContext.tsx';
import { PrimeReactProvider } from 'primereact/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        <PrimeReactProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PrimeReactProvider>
      </AppProvider>
    </Provider>
  </React.StrictMode>
);
