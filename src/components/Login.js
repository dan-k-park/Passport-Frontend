import React, { Component } from 'react';
import { api } from '../services/api';
import Form from 'react-bootstrap/Form'

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
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default Login;