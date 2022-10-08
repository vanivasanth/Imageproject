import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { MultiShareContextProvider } from './context/Multishare-context';


ReactDOM.render(
  
<MultiShareContextProvider>
  <HashRouter basename='/'>
       <App/>
  </HashRouter>
</MultiShareContextProvider>,
  document.getElementById('root')
);
