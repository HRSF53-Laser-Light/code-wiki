import React from 'react';
import ReactDOM from 'react-dom';

import Post from './post.jsx';

export default class SideNav extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <ul className="posts">
            <Post />
          </ul>
        </div>
      </div>
    );
  }
}