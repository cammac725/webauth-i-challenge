import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addUser({
      ...this.state
    })
    this.setState({
      username: '',
      password: ''
    })
  }

  handleChanges = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className='register-form' onSubmit={this.handleSubmit}>
        <form className='form'>
          <input
            type='text'
            name='username'
            placeholder='username'
            value={this.state.username}
            onChange={this.handleChanges}
          />
          <input
            type='text'
            name='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.handleChanges}
          />
          <button className='form-button' type='submit'>Register</button>
        </form>
      </div>
    )
  }
}

export default Register;