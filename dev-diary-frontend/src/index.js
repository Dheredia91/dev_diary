import React from 'react';
import { createRoot } from 'react-dom/client'; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


// create the root element and use createRoot (React 18)
const container = document.getElementById('root');
const root = createRoot(container);

// Provider component wraps the entire app
// making the Redux store available to all components
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
