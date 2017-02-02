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
    }
  }

  updateUser(boolValue) {
    this.setState({
      signedIn: boolValue
    });
  }

  signedInView() {
    return (
      <div>
        <TopNav signedIn={this.state.signedIn} updateUser={this.updateUser.bind(this)}/>
        <SideNav />
        <MainView />
      </div>
    );
  }

  signedOutView() {
    return (
      <div>
        <TopNav signedIn={this.state.signedIn} updateUser={this.updateUser.bind(this)}/>
        <GuestView />
      </div>
    );
  }

  render() {
    if(this.state.signedIn) {
      return this.signedInView();
    }
    else {
      return this.signedOutView();
    }
  }
}



ReactDOM.render(<App />, document.getElementById('app'));





