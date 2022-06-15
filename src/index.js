import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { saveState } from './localStorage';
import {store} from './store';

store.subscribe(() => {
  saveState({cart: store.getState().cart})
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>    
  </Provider>
);

reportWebVitals();
