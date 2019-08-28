import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUserAction } from '../actions/authenticationActions';
import { setCookie } from '../utils/cookies';



class LoginPage extends Component {
  onHandleLogin = (event) => {
    event.preventDefault();

    let personnel_phone = event.target.personnel_phone.value;
    let personnel_password = event.target.personnel_password.value;

    const data = {
      personnel_phone, personnel_password
    };

    this.props.dispatch(loginUserAction(data));
  }

  componentDidMount() {
    document.title = 'React Login';
  }

  render() {
    let isSuccess, message;

    if (this.props.response.login.hasOwnProperty('response')) {

      if (this.props.response.login.response.msg !== null && 
         (this.props.response.login.response.msg !== null ||
        this.props.response.login.response.msg !== undefined)) {
        isSuccess = true;
        setCookie('token', this.props.response.login.response.token, 1);
      }
    }

    return (
<div>
        <h3>Login Page</h3>
        {!isSuccess ? <div>{message}</div> : <Redirect to='tasks' />}
        <form onSubmit={this.onHandleLogin}>
          <div>
            <label htmlFor="personnel_phone">Personnel_Phone</label>
            <input type="personnel_phone" name="personnel_phone" id="personnel_phone" />
          </div>
          <div>
            <label htmlFor="personnel_password">Personnel_Password</label>
            <input type="personnel_password" name="personnel_password" id="personnel_password" />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
      </div>

        );
      }
    }
    
const mapStateToProps = (response) => ({response});
        
        export default connect(mapStateToProps)(LoginPage);
