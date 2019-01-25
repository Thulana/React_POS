import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './login';
import Home from './home';
import Orders from './orders';
import viewOrder from './viewOrder';
import errorPage from './errorPage';

// main routes for react app
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
