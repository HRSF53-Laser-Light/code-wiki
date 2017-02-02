import React from 'react';
import ReactDOM from 'react-dom'

export default class SideNav extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-4">
          <h3>Angular</h3>
        </div>
        <div className="col-sm-8 text-right">
          <span>Filter By: </span>
          <ul className="tag-list">
            <li>Debugging</li>
          </ul>
          <span className="add-filter"><a href="#">add filter</a></span>
        </div>
      </div>
    );
  }
}





