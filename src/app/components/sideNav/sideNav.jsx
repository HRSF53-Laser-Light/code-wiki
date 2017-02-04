import React from 'react';
import axios from 'axios';

export default class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      categories : ['All']
    }
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

      this.setState({categories: newCategories});
    });
  }

  renderCategories() {
    return (
      this.state.categories.map(name => {
        
        //Sets the class to active based on the App's state
        var activeStatus = (name === this.props.category ? 'active' : '');

        return (
          <li className={activeStatus} key={name} onClick={(e)=>this.props.updateCategory(e, name)}>{name}</li>
        )
      })
    );
  }

  render() {
    return (
      <div className="col-sm-2 navbar-side-container">
        <div className="navbar-side">
          <span>Categories</span>
          <ul className="category-list">
            {this.renderCategories()}
          </ul>
        </div>
      </div>
    );
  }
}