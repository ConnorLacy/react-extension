import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const rootElement = document.createElement('div')
rootElement.id = 'react-chrome-ext'
document.body.appendChild(rootElement)


ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
