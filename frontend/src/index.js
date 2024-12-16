import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/main.css'
import App from './App';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <PersistGate persistor={persistor} loading={null}>
    <App />
  </PersistGate>
</Provider>
);
