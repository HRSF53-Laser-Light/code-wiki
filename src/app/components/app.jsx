import React from 'react';
import ReactDOM from 'react-dom';

//components
import TopNav from './topNav/topNav.jsx';
import SideNav from './sideNav/sideNav.jsx';
import MainView from './mainView/mainView.jsx';
import GuestView from './guestView/guestView.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      signedIn: false,
      username: null
    }
  }

  updateUser(boolValue, username) {
    this.setState({
      signedIn: boolValue,
      username: username
    });
  }

  // @QUESTION should I be passing app state through as props into child components? Is this when we start using Flux/Redux?
  signedInView() {
    return (
      <div>
        <TopNav username={this.state.username} signedIn={this.state.signedIn} updateUser={this.updateUser.bind(this)}/>
        <SideNav />
        <MainView />
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





