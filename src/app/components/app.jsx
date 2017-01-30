import React from 'react';
import ReactDOM from 'react-dom';

import SideNav from './sideNav.jsx';

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
              <span>hello</span>
            </div>
          </div>
      </div>
    );
  }
}













ReactDOM.render(<App />, document.getElementById('app'));