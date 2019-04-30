import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import FormTodo from './FormTodo';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <FormTodo id={0} action={"edit"}/>
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
