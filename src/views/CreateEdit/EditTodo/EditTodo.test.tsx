import React from 'react';
import ReactDOM from 'react-dom';
import EditTodo from './EditTodo';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EditTodo/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
