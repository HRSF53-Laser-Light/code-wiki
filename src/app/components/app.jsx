import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//components
import TopNav from './topNav.jsx'
import SideNav from './sideNav.jsx';
import MainHeader from './mainHeader.jsx';
import Posts from './posts.jsx';

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
  }
  render() {
    return (
      <div>
        <div className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <a href="../" className="navbar-brand">Code Wiki</a>
            </div>
            <nav className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><a href="#">Post</a></li>
              </ul>
              <form className="navbar-form navbar-left" role="search">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Sign In</a></li>
                <li><a href="#">Sign Up</a></li>
              </ul>
            </nav>
          </div>
        </div>
          <SideNav />
          <div className="col-sm-10 main-container">
            <div className="main">
              <MainHeader />
              <div className="divider-full"></div>
              <Posts />
            </div>
          </div>
        <TopNav />
      </div>
    );
  }
}













ReactDOM.render(<App />, document.getElementById('app'));





