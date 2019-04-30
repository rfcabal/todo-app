import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import CompletedList from './CompletedList';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <CompletedList/>
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
