import React, { Component } from 'react';
import { api } from '../services/api'

class Login extends Component {
  constructor() {
    this.state = {
      error: false,
      fields: {
        username: '',
        password: ''
      }
    }
  }

  componentDidMount() {
    if (token) {
      console.log(token)
    }
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value};
    this.setState({ fields: newFields })
  }

  handleSubmit = e => {
    e.preventDefault();
    api.auth.login(this.state.fields).then(res => {
      if (!res.error) {
        alert('Login success')
      } else {
        this.setState({ error: true })
      }
    })
  }

  render() {
    return (
      <h1>placeholder</h1>
    )
  }
}

export default Login;