import React from 'react';
import axios from 'axios';

import Post from './post.jsx';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    var _this = this;
    // grab post data
    axios.get('/api/posts')
      .then(function(response) {
        _this.setState({
          data: response.data.rows
        });
      })
      .catch(function(err) {
        console.log(err);
      })
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <ul className="posts">
            {this.state.data.map(post => (<Post data={post} key={post.id} />))}
          </ul>
        </div>
      </div>
    );
  }
}



