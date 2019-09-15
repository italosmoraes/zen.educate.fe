import React, { Component } from 'react';

class ChildComponent extends Component {

  state = {
    selected_name: this.props.selected_name
  }

  componentWillUpdate(){
    this.setState((prevState) => {
      if (prevState.selected_name !== this.props.selected_name) {
        return ({
          selected_name: this.props.selected_name
        })
      }
    })
  }

  render() {
    return (
      <h3>Name being edited: {this.state.selected_name}</h3>
    );
  }
}

export default ChildComponent
