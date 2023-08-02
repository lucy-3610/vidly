import React, { Component } from 'react';

class MovieForm extends Component {
    handleSave = () => {
        this.props.history.push('/movies');
    }

    render() {
        return (<React.Fragment>
            <h1>Movie Form {this.props.match.params.id}</h1>
            <button onClick={this.handleSave} className="btn btn-primary btn-sm">Save</button>
        </React.Fragment>);
    }
}

export default MovieForm;