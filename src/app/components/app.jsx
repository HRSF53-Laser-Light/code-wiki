import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//components
import TopNav from './topNav/topNav.jsx';
import SideNav from './sideNav/sideNav.jsx';
import MainView from './mainView/mainView.jsx';
import GuestView from './guestView/guestView.jsx';
import Posts from './mainView/posts.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      signedIn: false,
      username: null,
      userId: null,
      allCategories: ['All'],
      currentCategory: 'All',
      tags: [],
      createPost: false,
      postData: {},
      postDataByVote: []
    }

    this.getUserFromSession();

    this.setCreatePost  = this.setCreatePost.bind(this);
    this.updateUser     = this.updateUser.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.getCategories  = this.getCategories.bind(this);
    this.getPosts       = this.getPosts.bind(this);
    this.updatePostData = this.updatePostData.bind(this);
  }

  getUserFromSession() {
    axios.get('/api/session')
    .then(response => {
      if(response.status === 200) {
        this.setState({
          signedIn: true,
          username: response.data.user.username,
          userId: response.data.user.id
        });
      }
    });
  }

  getPosts() {
    var _this = this;

    axios.get('/api/posts', {
      params: {
        category: _this.state.currentCategory
      }
    })
    .then(function(response) {

      var rows = response.data.rows;
      var data = {};
      var dataByVote = [];

      for(var i = 0; i < rows.length; i++) {
        data[rows[i].id] = rows[i];
        dataByVote.push(rows[i]);
      }
      _this.setState({
        postData: data,
        postDataByVote: dataByVote
        // loaded: true
      });
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  //@QUESTION should we be using for loops, or ForEach, by importing underscore? or .map?
  getCategories() {
    axios.get('/api/categories')
    .then(response => {
      var data = response.data;

      //default to always having an 'All' category. also the default for App's state.category
      var newCategories = ['All'];

      for(var i = 0; i < data.length; i++) {
        newCategories.push(data[i].name);
      }

      this.setState({allCategories: newCategories});
    });
  }

  setCreatePost(e, boolValue) {
    this.setState({
      createPost: boolValue
    });
  }

  updateUser(boolValue, username, userId) {
    this.setState({
      signedIn: boolValue,
      username: username,
      userId: userId
    });
  }

  updateCategory(e, currentCategory) {
    e.preventDefault();
    this.setState({
      currentCategory: currentCategory
    });
  }

  updatePostData(data) {
    this.setState({
      postData: data
    });
  }

  // @QUESTION should I be passing app state through as props into child components? Is this when we start using Flux/Redux?
  signedInView() {
    return (
      <div>
        <TopNav
        username={this.state.username}
        signedIn={this.state.signedIn}
        updateUser={this.updateUser}
        resetCategory={this.updateCategory}
        setCreatePost={this.setCreatePost}/>

        <SideNav
        getCategories={this.getCategories}
        currentCategory={this.state.currentCategory}
        allCategories={this.state.allCategories}
        updateCategory={this.updateCategory}/>

        <MainView
        userId={this.state.userId}
        currentCategory={this.state.currentCategory}
        allCategories={this.state.allCategories}
        postData={this.state.postData}
        postDataByVote={this.state.postDataByVote}
        getPosts={this.getPosts}
        updatePostData={this.updatePostData}
        createPost={this.state.createPost}
        setCreatePost={this.setCreatePost}/>
      </div>
    );
  }

  signedOutView() {
    console.log(this.state.signedIn);
    return (
      <div>
        <TopNav
        signedIn={this.state.signedIn}
        updateUser={this.updateUser}/>

        <GuestView
        updateUser={this.updateUser}/>
      </div>
    );
  }

  render() {
    // return this.state.signedIn ? this.signedInView() : this.signedOutView();
    return true ? this.signedInView() : this.signedOutView();
  }
}



ReactDOM.render(<App />, document.getElementById('app'));





