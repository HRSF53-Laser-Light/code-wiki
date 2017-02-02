import React from 'react';

export default class GuestView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: false
    }
  }

  toggleView() {
    this.setState({
      newUser: !this.state.newUser
    });
  }

  newUserView() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <form className="sign-in">
              <div className="form-group">
                <input id="username" type="text" className="form-control" placeholder="username" />
                <input id="password" type="text" className="form-control" placeholder="password" />
                <input id="password2" type="text" className="form-control" placeholder="re-enter password" />
              </div>
              <button type="submit" className="btn btn-default">Sign Up</button>
              <a href="#" onClick={()=>this.toggleView()}>Sign In</a>
            </form>
          </div>
        </div>
      </div>
    );
  }

  existingUserView() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <form className="sign-in">
              <div className="form-group">
                <input id="username" type="text" className="form-control" placeholder="username" />
                <input id="password" type="text" className="form-control" placeholder="password" />
              </div>
              <button type="submit" className="btn btn-default">Sign In</button>
              <a href="#" onClick={()=>this.toggleView()}>Sign Up</a>
            </form>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if(this.state.newUser) {
      return this.newUserView();
    }
    else {
      return this.existingUserView();
    }
  }

}