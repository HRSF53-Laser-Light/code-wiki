import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//components
import TopNav from './topNav/topNav.jsx';
import SideNav from './sideNav/sideNav.jsx';
import MainView from './mainView/mainView.jsx';
import GuestView from './guestView/guestView.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      signedIn: true,
      username: null,
      category: 'All',
      tags: []

    }
  }

  updateUser(boolValue, username) {
    this.setState({
      signedIn: boolValue,
      username: username
    });
  }

  updateCategory(e, category) {
    e.preventDefault();
    this.setState({
      category: category
    });
  }

  // @QUESTION should I be passing app state through as props into child components? Is this when we start using Flux/Redux?
  signedInView() {
    return (
      <div>
        <TopNav username={this.state.username} signedIn={this.state.signedIn} updateUser={this.updateUser.bind(this)} resetCategory={this.updateCategory.bind(this)}/>
        <SideNav category={this.state.category} updateCategory={this.updateCategory.bind(this)}/>
        <MainView category={this.state.category}/>
      </div>
    );
  }

  signedOutView() {
    return (
      <div>
        <TopNav signedIn={this.state.signedIn} updateUser={this.updateUser.bind(this)}/>
        <GuestView updateUser={this.updateUser.bind(this)}/>
      </div>
    );
  }

  render() {
    return this.state.signedIn ? this.signedInView() : this.signedOutView();
  }
}



ReactDOM.render(<App />, document.getElementById('app'));





