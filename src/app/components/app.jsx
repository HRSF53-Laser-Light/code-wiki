import React from 'react';
import ReactDOM from 'react-dom';

//components
import TopNav from './topNav/topNav.jsx';
import SideNav from './sideNav/sideNav.jsx';
import MainView from './mainView/mainView.jsx';

export default class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <TopNav />
        <SideNav />
        <MainView />
      </div>
    );
  }
}



ReactDOM.render(<App />, document.getElementById('app'));





