import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import i18n from './translation/i18n'
import { I18nextProvider } from 'react-i18next';

import './index.css';
import App from './App'
import reportWebVitals from './reportWebVitals'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './store/reducers/rootReducer'


const store = configureStore({reducer: rootReducer})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
