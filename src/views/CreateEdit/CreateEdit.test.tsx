import React from 'react';
import ReactDOM from 'react-dom';
import CreateEdit from './CreateEdit';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateEdit/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
