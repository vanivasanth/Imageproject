import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";
import {ImgarrayContextProvider} from './context/ImgArrCtx';
import { SingleImgContextProvider } from './context/SingleImgCtx';
import { MultiShareContextProvider } from './context/Multishare-context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <React.StrictMode>  
            <Provider store={store}>
               <ImgarrayContextProvider>
                 <SingleImgContextProvider>
                   <MultiShareContextProvider>
                      <HashRouter basename='/'>
                          <App/>
                      </HashRouter>
                   </MultiShareContextProvider>
                 </SingleImgContextProvider>
               </ImgarrayContextProvider>
            </Provider>   
                 
       </React.StrictMode>
);
