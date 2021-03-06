import React, { Component } from 'react';
import axios from 'axios'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone : '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

const postData = {
  email:  this.state.email,
  password: this.state.password
};

const axiosConfig = {
  headers: {
      'Content-Type': 'application/json'
  }
};


    onSubmit = (event) => {
    event.preventDefault();
axios.post('personnel/login', postData, axiosConfig)
.then((res) => {

if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }

})
.catch((err) => {
   console.error(err);
   alert('Error logging in please try again');
});
}


  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login Below!</h1>
        <input
          type="phone"
          name="phone"
          placeholder="Enter phone"
          value={this.state.phone}
          onChange={this.handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}
