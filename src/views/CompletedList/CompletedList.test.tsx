import React from 'react';
import ReactDOM from 'react-dom';
import CompletedList from './CompletedList';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CompletedList/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
