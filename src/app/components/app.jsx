import React from 'react';
import ReactDOM from 'react-dom';
var TopNav = require('./topNav.jsx');

export default class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        Hello World
        <TopNav />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));