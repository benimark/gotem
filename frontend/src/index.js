import {Provider} from "react-redux"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./store"
import Footer from "./Components/Footer/Footer";

ReactDOM.render(
  <Provider store={store}>
  <App />
  <Footer></Footer>
  </Provider>,
document.getElementById('root')
);