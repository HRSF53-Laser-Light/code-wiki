import React from 'react';

import MainHeader from './mainHeader.jsx';
import Posts from './posts.jsx';
import NewPost from './newPost.jsx';

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
  }

  showExistingPosts() {
    return (
      <div>
        <MainHeader currentCategory={this.props.currentCategory}/>
        <div className="divider-full"></div>
        <Posts
        userId={this.props.userId}
        currentCategory={this.props.currentCategory}
        getPosts={this.props.getPosts}/>
      </div>
    );
  }

  createNewPost() {
    return (
      <NewPost
      userId={this.props.userId}
      allCategories={this.props.allCategories}
      setCreatePost={this.props.setCreatePost}/>
    );
  }

  render() {
    return (
      <div className="col-sm-10 main-container">
        <div className="main">
          {this.props.createPost ? this.createNewPost() : this.showExistingPosts()}
        </div>
      </div>
    );
  }
}