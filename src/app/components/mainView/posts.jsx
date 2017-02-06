import React from 'react';
import axios from 'axios';
import Loader from 'react-loader';

import Post from './post.jsx';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loaded: false
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.upVotePost = this.upVotePost.bind(this);
    this.downVotePost = this.downVotePost.bind(this);
  }
  componentDidMount() {
    this.props.getPosts.call(this);
  }

  upVotePost(postId) {
    axios.post('/api/upvote', {
      postId: postId,
      userId: this.props.userId
    })
    .then(response => {
      if (response.status === 200) {
        console.log('You can\'t upvote twice!');
      }
      var updatedPost = response.data;
      var id = updatedPost.id;

      var data = this.state.data;
      data[id] = updatedPost;

      this.setState({data: data});
    });
  }

  downVotePost(postId) {
    axios.post('/api/downvote', {
      postId: postId,
      userId: this.props.userId
    })
    .then(response => {
      if (response.status === 200) {
        console.log('You can\'t downvote twice!');
      }
      var updatedPost = response.data;
      var id = updatedPost.id;

      var data = this.state.data;
      data[id] = updatedPost;

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
          <Loader loaded={this.state.loaded}>
            <ul className="posts">
              {this.renderPosts()}
            </ul>
          </Loader>
        </div>
      </div>
    );
  }
}



