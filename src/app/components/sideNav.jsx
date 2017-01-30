import React from 'react';
import ReactDOM from 'react-dom'

export default class SideNav extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="col-sm-2 navbar-side-container">
        <div className="navbar-side">
          <span>Categories</span>
          <ul className="category-list">
            <li><a href="#">All</a></li>
            <li><a href="#">React</a></li>
            <li><a href="#">Angular</a></li>
          </ul>
        </div>
      </div>
    );
  }
}