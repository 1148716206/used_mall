import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./store";
import decode from 'jwt-decode';
import { syncInfoAc } from './pages/login/store/actionCreators'

const token = localStorage.getItem('@#@TOKEN');
//解析 TOKEN 并同步到 Redux
if (token) {
  try {
    store.dispatch(syncInfoAc(decode(token)))
  } catch {
    localStorage.removeItem('@#@TOKEN');
    window.location.href = '/login';
  }
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
