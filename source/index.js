// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// Instruments
import './theme/init';
import { store } from './init/store';

// App
import App from './pages/App';

render(
    <Provider store = { store }>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
);
