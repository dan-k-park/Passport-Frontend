import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login';
import Map from './components/Map';


import './App.css';
import { api } from './services/api';

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
    const token = localStorage.getItem('token')
    if (token) {
      api.auth.getCurrentUser().then(user => {
        if (!user.error && !user.message) {
          this.setState({
            currentUser: user
          })
        }
      })
    }
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
          render = {props => <Map {...props} currentUser={this.state.currentUser} />}
        />
      </Router>
    )
  }
}

export default App;
