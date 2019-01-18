import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./js/header";
import Main from "./js/main";
import Login from "./js/login"
class App extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      usernameItem: {text:'', key:''},
      passwordItem: {text:'', key:''},
    }
  }
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  login = e => {
    e.preventDefault()
    console.log('Hello World')
  }
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };
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
