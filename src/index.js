import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/cart-context';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <CartProvider>
      <Router>
        <App />
      </Router>
    </CartProvider>
  </StrictMode>,
  rootElement
);
