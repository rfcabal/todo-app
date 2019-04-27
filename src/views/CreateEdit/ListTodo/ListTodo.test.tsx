import React from 'react';
import ReactDOM from 'react-dom';
import ListTodo from './ListTodo';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListTodo/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
