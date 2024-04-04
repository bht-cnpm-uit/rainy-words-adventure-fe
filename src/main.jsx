import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
<<<<<<< HEAD
    // <React.StrictMode>
    <App />
    // </React.StrictMode>,
=======
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
        ,
    </React.StrictMode>,
>>>>>>> loginFormAPI
);
