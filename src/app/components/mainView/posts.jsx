import React from 'react';
import axios from 'axios';
import Loader from 'react-loader';

import Post from './post.jsx';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      dataByVote: [],
      loaded: false
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
        var dataByVote = [];

        for(var i = 0; i < rows.length; i++) {
          data[rows[i].id] = rows[i];
          dataByVote.push(rows[i]);
        }
        _this.setState({
          data: data,
          dataByVote: dataByVote,
          loaded: true
        });
      })
      .catch(function(err) {
        console.log(err);
      })
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
    var dataByVote = this.state.dataByVote;

    for(var i = 0; i < dataByVote.length; i++) {
      posts.push(
        <Post
        data={dataByVote[i]}
        key={dataByVote[i].id}
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



