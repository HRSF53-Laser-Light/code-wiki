import React from 'react'

import PostButton from './postButton.jsx'
import SearchBox from './searchBox.jsx'
import AccountLink from './accountLink.jsx'
import SignoutButton from './signoutButton.jsx'

export default class TopNav extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='container-fluid'>
          <ul className="nav navbar-nav navbar-left">
            <li><img className='logo' src='http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/magic-marker-icons-natural-wonders/115691-magic-marker-icon-natural-wonders-sun9-sc37.png'/></li>
            <li><a href="../" className="navbar-brand">Code Wiki</a></li>
            <li><PostButton /></li>
            <li><SearchBox /></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><AccountLink /></li>
            <li><SignoutButton /></li>
          </ul>
        </div>
      </nav>
    );
  }
}