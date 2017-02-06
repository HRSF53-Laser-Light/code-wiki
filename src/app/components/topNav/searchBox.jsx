import React from 'react'

export default class SearchBox extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text" className="search-box" placeholder="Search" />
        </div>
      </form>
    );
  }
}