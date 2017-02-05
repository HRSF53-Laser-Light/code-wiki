import React from 'react';
import axios from 'axios';
import Loader from 'react-loader';

import Post from './post.jsx';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    var _this = this;
    // grab post data
    axios.get('/api/posts')
      .then(function(response) {
        _this.setState({
          data: response.data.rows,
          loaded: true
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
            <Loader loaded={this.state.loaded}>
              {this.state.data.map(post => (<Post data={post} key={post.id} />))}
            </Loader>
          </ul>
        </div>
      </div>
    );
  }
}



