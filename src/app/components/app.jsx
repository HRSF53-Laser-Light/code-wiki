import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//components
import TopNav from './topNav/topNav.jsx';
import SideNav from './sideNav/sideNav.jsx';
import MainView from './mainView/mainView.jsx';
import GuestView from './guestView/guestView.jsx';

var endpoint = 'https://api.linkpreview.net';
var target = 'https://www.codementor.io/tamizhvendan/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack-du107r9zr';

axios.post('/api/externalReq/linkPreview', {
  endpoint: endpoint,
  target: target
})
.then(function(response) {
  console.log(response.data);
})
.catch(function(error) {
  console.log(error);
})

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
    return this.state.signedIn ? this.signedInView() : this.signedOutView();
  }
}



ReactDOM.render(<App />, document.getElementById('app'));





