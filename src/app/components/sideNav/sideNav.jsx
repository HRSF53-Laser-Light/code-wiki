import React from 'react';
import axios from 'axios';

export default class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      categories : []
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
      this.state.categories = [];
      for(var i = 0; i < data.length; i++) {
        this.setState({categories: this.state.categories.concat(data[i].name)});
      }
    });
  }

  renderCategories() {
    return (
      this.state.categories.map(name => (
        <li key={name} onClick={(e)=>this.props.updateCategory(e, name)}>{name}</li>
      ))
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