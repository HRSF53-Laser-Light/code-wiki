import React from 'react'

export default class SearchBox extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search" />
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }
}