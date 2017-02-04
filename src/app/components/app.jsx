import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//components
import TopNav from './topNav/topNav.jsx';
import SideNav from './sideNav/sideNav.jsx';
import MainView from './mainView/mainView.jsx';
import GuestView from './guestView/guestView.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      signedIn: true,
      username: null,
      userId: null,
      allCategories: ['All'],
      currentCategory: 'All',
      tags: [],
      createPost: false
    }
    //@TODO move bind calls to here
  }

    componentDidMount() {
    this.getCategories();
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

  // @QUESTION should I be passing app state through as props into child components? Is this when we start using Flux/Redux?
  signedInView() {
    return (
      <div>
        <TopNav
        username={this.state.username}
        signedIn={this.state.signedIn}
        updateUser={this.updateUser.bind(this)}
        resetCategory={this.updateCategory.bind(this)}
        setCreatePost={this.setCreatePost.bind(this)}/>

        <SideNav
        currentCategory={this.state.currentCategory}
        allCategories={this.state.allCategories}
        updateCategory={this.updateCategory.bind(this)}/>

        <MainView
        currentCategory={this.state.currentCategory}
        allCategories={this.state.allCategories}
        createPost={this.state.createPost}
        setCreatePost={this.setCreatePost.bind(this)}/>
      </div>
    );
  }

  signedOutView() {
    return (
      <div>
        <TopNav
        signedIn={this.state.signedIn}
        updateUser={this.updateUser.bind(this)}/>

        <GuestView
        updateUser={this.updateUser.bind(this)}/>
      </div>
    );
  }

  render() {
    return this.state.signedIn ? this.signedInView() : this.signedOutView();
  }
}



ReactDOM.render(<App />, document.getElementById('app'));





