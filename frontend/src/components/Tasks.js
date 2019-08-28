import React, { Component } from 'react';
import axios from 'axios';
import { getCookie } from '../utils/cookies';
class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isLoading: false,
      error: null,
    };


  }

  async  componentDidMount() {
    this.getTasks();
  }


  getTasks() {
    /* Initialize all necessary variables */
    const API_URI = 'http://localhost:3000/tasks/assigned?page=1&limit=5&order=created&orderMethod=DESC'
    const jwt_token = getCookie('token');
    const authString = 'Bearer '.concat(jwt_token);
    axios.defaults.headers.common['Authorization'] = authString;
    const qs = require('qs');
    this.setState({ isLoading: true });

    /* Send axios request */
     axios.get(API_URI)
      .then(result => this.setState({
        tasks: result.data,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
    console.log('Logging tasks:' + this.tasks)
  }

  render() {
    const { tasks, isLoading, error } = this.state;
    if (error) {
      return <p> {error} </p>;
    }
    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (<div>
      {tasks.map((task) => (

        (<div><pre>{JSON.stringify(task, null, 2)}</pre></div>)

      ))}

    </div>);
  }

}
export default Tasks;
