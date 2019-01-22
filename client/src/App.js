import React, { Component } from 'react';
import './App.css';
import Header from "./js/header";
import Main from "./js/main";
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
        <Header/>
        <Main />
      </div>
    );
  }
}

export default App;
