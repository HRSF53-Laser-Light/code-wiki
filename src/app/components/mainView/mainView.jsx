import React from 'react';

import MainHeader from './mainHeader.jsx';
import Posts from './posts.jsx';
import NewPost from './newPost.jsx';

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createPost: false
    }
    this.newPostHandler = this.newPostHandler.bind(this);
  }

  showExistingPosts() {
    return (
      <div>
        <MainHeader category={this.props.category}/>
        <div className="divider-full"></div>
        <Posts />
      </div>
    );
  }
  newPostHandler(e) {
    e.preventDefault();
    this.setState({
      createPost: !this.state.createPost
    })
  }
  render() {
    return (
      <div className="col-sm-10 main-container">
        <div className="main">
          {this.state.createPost ? <NewPost newPostHandler={this.newPostHandler} /> : this.showExistingPosts()}
        </div>
      </div>
    );
  }
}