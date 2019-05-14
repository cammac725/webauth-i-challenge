import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import axios from 'axios';

import './App.css';
import Register from './components/Register';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:9090/api/users')
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(err => console.log(err))
  }

  addUser = user => {
    axios.post('http://localhost:9090/api/users', user)
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Route
        path='/api/auth/register'
        render={props => <Register {...props} addUser={this.addUser} />}
      />
    );
  }
}

export default App;
