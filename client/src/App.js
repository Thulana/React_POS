import React, { Component } from 'react';
import './App.css';
import Header from "./js/header";
import Main from "./js/main";
import ErrorBoundary from './js/errorBoundry';
class App extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
    }
  }

  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <Header />
          <Main />
        </ErrorBoundary >
      </div>
    );
  }
}

export default App;
