import React from 'react'

import PostButton from './postButton.jsx'
import SearchBox from './searchBox.jsx'
import AccountLink from './accountLink.jsx'
import SignoutButton from './signoutButton.jsx'

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
  }


  signedInView() {
    return (
      <div className="nav-container">
        <ul className="nav navbar-nav navbar-left">
          <li><PostButton setCreatePost={this.props.setCreatePost}/></li>
          <li><SearchBox /></li>
        </ul>
        <ul className="nav navbar-nav navbar-center">
          <li><img height="50px" src="assets/img/logo.svg" /></li>
        </ul>
        <ul className="nav navbar-nav navbar-right nav-account">
          <li><AccountLink username={this.props.username}/></li>
          <li><SignoutButton updateUser={this.props.updateUser}/></li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='container-fluid'>
          {this.props.signedIn ? this.signedInView() : null}
        </div>
      </nav>
    );
  }
}