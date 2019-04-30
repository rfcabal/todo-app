import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import CreateEdit from './CreateEdit';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <CreateEdit/>
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
