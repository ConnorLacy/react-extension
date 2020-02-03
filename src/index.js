import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const rootElement = document.createElement('div')
rootElement.id = 'react-chrome-ext'
document.body.appendChild(rootElement)


ReactDOM.render(<App />, rootElement);
