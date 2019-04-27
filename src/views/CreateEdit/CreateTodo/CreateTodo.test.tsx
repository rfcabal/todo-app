import React from 'react';
import ReactDOM from 'react-dom';
import CreateTodo from './CreateTodo';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateTodo/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
