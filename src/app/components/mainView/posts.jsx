import React from 'react';
import axios from 'axios';
import Loader from 'react-loader';

import Post from './post.jsx';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    //for the Loader that we need to figure out how to implement proprerly
    this.state = {
      // loaded: false
    }

    this.upVotePost = this.upVotePost.bind(this);
    this.downVotePost = this.downVotePost.bind(this);
  }

  componentDidMount() {
    //Posts loads for the first time when the Posts compenented 
    this.props.getPosts();    
  }

  upVotePost(postId) {
    // need to send userId with it, so we can keep track of who voted
    // and not let people vote more than once
    axios.post('/api/upvote', {
      postId: postId,
      userId: this.props.userId
    })
    .then(response => {
      if (response.status === 200) {
        console.log('You can\'t upvote twice!');
      }

      //takes the updated post and updates just that post in data & dataByVote
      var updatedPost = response.data;
      var id = updatedPost.id;

      var data = this.props.postData;
      data[id] = updatedPost;

      var dataByVote = this.props.postDataByVote;
      for (var i = 0; i < dataByVote.length; i++) {
        if (dataByVote[i].id === id) {
          dataByVote[i] = data[id];
        }
      }

      this.props.updatePostData(data, dataByVote);
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

      var data = this.props.postData;
      data[id] = updatedPost;

      var dataByVote = this.props.postDataByVote;
      for (var i = 0; i < dataByVote.length; i++) {
        if (dataByVote[i].id === id) {
          dataByVote[i] = data[id];
        }
      }

      this.props.updatePostData(data, dataByVote);
    });
  }

  renderPosts() {
    var posts = [];
    var data = this.props.postData;
    var postDataByVote = this.props.postDataByVote;

    //creates a b
    for(var i = 0; i < postDataByVote.length; i++) {
      posts.push(
        <Post
        data={postDataByVote[i]}
        key={postDataByVote[i].id}
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
          {/*<Loader loaded={this.state.loaded}>*/}
            <ul className="posts">
              {this.renderPosts()}
            </ul>
          {/*</Loader>*/}
        </div>
      </div>
    );
  }
}



