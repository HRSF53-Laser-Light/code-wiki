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
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  //if this works, log user in
  signInUser(e) {
    e.preventDefault();
    console.log(this.state.username, ' // ', this.state.password);
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
      <div className="text-center">
      <form className="sign-in">
        <div className="form-group">
          <input name="username" type="text" className="form-control" placeholder="username" onChange={(e)=>this.trackChange(e)}/>
          <input name="password" type="text" className="form-control" placeholder="password" onChange={(e)=>this.trackChange(e)}/>
          {/*<input id="password2" type="text" className="form-control" placeholder="re-enter password" />*/}
        </div>
        <button onClick={(e)=>this.signUpNewUser(e)} type="submit" className="btn btn-default">Sign Up</button>
      </form>
        <a href="#" onClick={(e)=>this.toggleView(e)}>Sign In</a>
      </div>
    );
  }

  existingUserForm() {
    return (
      <div className="text-center">
      <form className="sign-in">
        <div className="form-group">
          <input name="username" type="text" className="form-control" placeholder="username" onChange={(e)=>this.trackChange(e)}/>
          <input name="password" type="text" className="form-control" placeholder="password" onChange={(e)=>this.trackChange(e)}/>
        </div>
        <button onClick={(e)=>this.signInUser(e)} type="submit" className="btn btn-default">Sign In</button>
      </form>
      <a href="#" onClick={(e)=>this.toggleView(e)}>Sign Up</a>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            {(this.state.newUser) ? this.newUserForm() : this.existingUserForm()}
          </div>
        </div>
      </div>
    );
  }

}