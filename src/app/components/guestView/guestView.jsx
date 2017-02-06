import React from 'react';
import axios from 'axios';

export default class GuestView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: true,
      username: '',
      password: ''
    }
  }

  //@QUESTION: should I be grabbing form data this way?
  trackChange(e) {
    // console.log(e.target.name, ": ", e.target.value);
    this.setState({[e.target.name]: e.target.value});
  }

  toggleView(e) {
    e.preventDefault();
    this.setState({
      newUser: !this.state.newUser
    });
  }

  signUpNewUser(e) {
    e.preventDefault();
    axios.post('/api/signup', {
      username: this.state.username,
      password: this.state.password
    })
    .then((response) => {
      if(response.status === 201) {
        //@TODO update to match whatever Kay changes it to in controller.js
        this.props.updateUser(true, response.data.username, response.data.userId);
      }
      else{
        //@TODO flash an error
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  //if this works, log user in
  signInUser(e) {
    e.preventDefault();
    axios.post('/api/signin', {
      username: this.state.username,
      password: this.state.password
    })
    .then((response) => {
      if(response.status === 201) {
        //@TODO update to match whatever Kay changes it to in controller.js
        this.props.updateUser(true, response.data.username, response.data.userId);
      }
      else{
        //@TODO flash an error
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  newUserForm() {
    return (
      <div>
        <div className="container">
          <div className="spaceman">
            <img height="600px" src="assets/img/astronaut.gif"/>
          </div>
          <div className="signup-main text-center col-sm-4 col-sm-offset-5">
            <img className="mb30" height="150px" src="assets/img/logo.svg"/>
            <span className="mb20">New? Sweet, let’s sign you up!</span>
            <form>
              <input name="username" type="text" className="form-control" placeholder="username" onChange={(e)=>this.trackChange(e)}/>
              <input name="password" type="text" className="form-control" placeholder="password" onChange={(e)=>this.trackChange(e)}/>
              <button onClick={(e)=>this.signUpNewUser(e)} type="submit" className="btn">Sign up</button>
            </form>
          </div>
        </div>
        <div className="footer">
          <div className="text-center">
            <span>Already have a WikiLinks account? <a href="#" onClick={(e)=>this.toggleView(e)}>Log in</a>.</span>
          </div>
        </div>
      </div>
    );
  }

  existingUserForm() {
    return (
      <div>
        <div className="container">
          <div className="spaceman">
            <img height="600px" src="assets/img/astronaut.gif"/>
          </div>
          <div className="login-main text-center col-sm-4 col-sm-offset-5">
            <img className="mb30" height="150px" src="assets/img/logo.svg"/>
            <span className="mb20">Log in to your account</span>
            <form>
              <input name="username" type="text" className="form-control" placeholder="username" onChange={(e)=>this.trackChange(e)}/>
              <input name="password" type="text" className="form-control" placeholder="password" onChange={(e)=>this.trackChange(e)}/>
              <button onClick={(e)=>this.signInUser(e)} type="submit" className="btn">Sign In</button>
            </form>
          </div>
        </div>
        <div className="footer">
          <div className="text-center">
            <span>Don’t have a WikiLinks account? <a href="#" onClick={(e)=>this.toggleView(e)}>Sign Up</a>.</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="login-container">
        {(this.state.newUser) ? this.newUserForm() : this.existingUserForm()}
      </div>
    );
  }

}