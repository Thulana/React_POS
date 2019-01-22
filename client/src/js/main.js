import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './login';
import Home from './home';
import Orders from './orders';
import viewOrder from './viewOrder';
import errorPage from './errorPage';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/orders' component={Orders}/>
      <Route path='/order' component={viewOrder}/>
      <Route component={errorPage}/>
    </Switch>
  </main>
)

export default Main
