import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from "react-redux"
import Actions from "./redux/actions"

import ChildComponent from "./ChildComponent"

class App extends Component {
  componentDidMount() {
    const props = this.props;
    props.getList()
  }

  onSelect(event) {
    const name = event.target.value
    this.props.setName(name);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Zen Educate coding challenge</h1>
        </header>

        <div className="container">
          <h2>Questions</h2>
          <p>1. Why isn&#39;t the select tag being filled with options?  Please fix without making the App component stateful.</p>
          <p><i>Because there was no mapDispatchToProps actually dispatching anything to the store through the getList action creator</i></p>
          <p>2. Once the select tag is being filled with the appropriate options, why isn&#39;t the name being edited within the Child component changing on select?  Please fix without connecting the Child component to the redux store, and without referencing props directly within render.</p>
          <p><i>We were missing the dispatching of the setName action to update the store with the current name and the ChildComponent needed a way to update its state (selected_name) from a change in the props, coming from the parent</i></p>
          <p>3. Ruby on Rails: Create a rails api-only application.  Create an endpoint that sorts (alphabetically) and returns a few instances of a class (in json) for the following names: James, Jono, John, Radu, Cole, and yourself. 1 name per instance please.</p>
          <p><i>Assuming here that we are returning a JSON representation of an object that can be parsed into an instance.</i></p>
          <p><i>api to receive a list of names, then sort alphabetically and return an array of json objects with a name tag</i></p>
          <p>4. Instead of using the mock api-call in the react project, hit your new rails endpoint and prefill the select tag using the json your new endpoint returns.</p>
          <p>5. You&#39;re done.  Commit back to the react project, and invite us (Github usernames: colemerrick, S1rFrancis, zduci) to the rails one.  Thanks!</p>
          <p>6. Suggest any important refactors and why.</p>
            <i>
              <ul>
                On the React App:
                <li>onSelect needed to dispatch an action</li>
                <li>remove initOptionList and mount options on render once a names list is available</li>
                <li>mapStateToProps reference updated: state.names.list</li>
                <li>write component tests</li>
                <li>remove constructor</li>
                <li>show error message on api call failure, instead of console log</li>
                <li>move the endpoint host address to an env file</li>
              </ul>
              <ul>
                On the Node API:
                <li>validate the request body against a contract, before calling the handler</li>
                <li>write unit tests for the handlers</li>
              </ul>
            </i>
        </div>

        <select
          onChange={event => this.onSelect(event)}
          id="selector"
          value={this.props.selectedName}>
            {this.props.namesList
              && this.props.namesList.map(item => {
                return <option key={item.name} value={item.name}>{item.name}</option>
              })
            }
        </select>

        <ChildComponent selected_name={this.props.selectedName} />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  namesList: state.names.list,
  selectedName: state.names.selected_name
})

const mapDispatchToProps = dispatch => ({
  getList: () => dispatch(Actions.getOrderedListFromApi()),
  setName: (name) => dispatch(Actions.setName(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
