import React from 'react';
import './EditTodo.css';

class EditTodo extends React.PureComponent<{ match: any }, { currentId: number }> {

    constructor(props: any) {
        super(props);
        this.state = {
            currentId: 0
        }
    }

    updateId(id: number) {
        this.setState({
            currentId: id
        })
    }

    componentDidMount() {
        this.updateId(this.props.match.params.todoId)
    }

    componentDidUpdate(prevProps: any) {
        if (prevProps.match.params.todoId !== this.props.match.params.todoId) {
            this.updateId(this.props.match.params.todoId)
        }
    }

    render() {
        return (
            <div>
                Editing todo id: {this.state.currentId}
            </div>
        );
    }

}

export default EditTodo;
