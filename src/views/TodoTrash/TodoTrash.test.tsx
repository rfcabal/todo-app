import React from 'react';
import ReactDOM from 'react-dom';
import TodoTrash from './TodoTrash';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TodoTrash/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
