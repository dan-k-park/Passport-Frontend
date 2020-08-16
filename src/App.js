import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import NewTrip from './components/NewTrip';


import './App.css';
import { api } from './services/api';

const { getNames } = require('country-list');


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      countries: [],
      displayCountries: [],
      trips: [],
      tripToEdit: {}
    }
  }
  
  componentDidMount() {
    // const token = localStorage.getItem('token')
    // if (token) {
    //   api.auth.getCurrentUser().then(user => {
    //     if (!user.error && !user.message) {
    //       this.setState({
    //         currentUser: user
    //       })
    //     }
    //   })
    // }
    this.setState({
      currentUser: {
        id: 1,
        username: 'user',
        password: 'pass',
        name: 'Joey'
      },
      countries: getNames()
    })
  }

  login = user => {
    localStorage.setItem('token', user.jwt);
    api.auth.getCurrentUser().then(user => {
      if (!user.error && !user.message) {
        this.setState({
          currentUser: user
        })
      }
    })
  }

  render() {
    return (
      <Router>
        <Route
          path='/login'
          exact
          render = {props => <Login {...props} handleLogin={this.login} />}
        />

        <Route 
          path='/'
          exact
          render = {props => <Home {...props} currentUser={this.state.currentUser} />}
        />

        <Route
          path='/new'
          exact
          render = {props => <NewTrip {...props} /> }
        />
      </Router>
    )
  }
}

export default App;
