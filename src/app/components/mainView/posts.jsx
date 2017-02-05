import React from 'react';
import axios from 'axios';

import Post from './post.jsx';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.upVotePost = this.upVotePost.bind(this);
    this.downVotePost = this.downVotePost.bind(this);
  }
  componentDidMount() {
    var _this = this;
    // grab post data
    axios.get('/api/posts')
      .then(function(response) {

        var rows = response.data.rows;
        var data = {};

        for(var i = 0; i < rows.length; i++) {
          data[rows[i].id] = rows[i];
        }
        _this.setState({
          data: data
        });
      })
      .catch(function(err) {
        console.log(err);
      })
  }

  upVotePost(postId) {
    axios.post('/api/upvote', {
      id: postId,
      commentorId: this.props.userId
    })
    .then(response => {
      var id = response.data.id;

      var data = this.state.data;
      data[id].vote_count += 1;

      this.setState({data: data});
    });
  }

  downVotePost(postId) {
    axios.post('/api/downvote', {
      id: postId,
      commentorId: this.props.userId
    })
    .then(response => {
      var id = response.data.id;

      var data = this.state.data;
      data[id].vote_count -= 1;

      this.setState({data: data});
    });
  }

  renderPosts() {
    var posts = [];
    var data = this.state.data;
    for(var key in data) {
      posts.push(
        <Post
        data={data[key]}
        key={data[key].id}
        downVotePost={this.downVotePost}
        upVotePost={this.upVotePost}/>
      )
    }
    return posts;
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <ul className="posts">
            {/*this.state.data.map((post, index)=> (<Post data={post} key={post.id} />))*/}
            {this.renderPosts()}
          </ul>
        </div>
      </div>
    );
  }
}



