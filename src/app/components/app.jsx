import React from 'react'
import ReactDOM from 'react-dom'

//components
import TopNav from './topNav.jsx'

export default class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <TopNav />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));