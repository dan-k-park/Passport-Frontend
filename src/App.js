import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";


import './App.css';

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
      
    }
  }

  render() {
    return (
      <h1>Hi</h1>
    )
  }
}

export default App;
