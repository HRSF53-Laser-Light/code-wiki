import React from 'react';
import axios from 'axios';

export default class SideNav extends React.Component {
  constructor() {
    super();
    this.state = {
      test: false,
      categories : []
    }
    console.log('SideNav constructing');
  }

  componentDidMount() {
    console.log('SideNav mounting');
    this.getCategories();
  }

  //@QUESTION should we be using for loops, or ForEach, by importing underscore? or .map?
  getCategories() {
    console.log('getting categories');
    axios.get('/api/categories')
    .then(response => {
      var data = response.data;
      console.log(data);
      this.state.categories = [];
      for(var i = 0; i < data.length; i++) {
        this.setState({categories: this.state.categories.concat(data[i].name)});
      }
    });
  }

  // renderCategories() {

  //   var categoryHTML = this.state.categories.map(item => {
  //     console.log(item);
  //   });
  //   console.log(categoryHTML)
  //   return categoryHTML;
  // }

  render() {

    console.log('SideNav rendering');
    return (
      <div className="col-sm-2 navbar-side-container">
        <div className="navbar-side">
          <span>Categories</span>
          <ul className="category-list">
            {
              this.state.categories.map(name => (
                <li key={name}>{name}</li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

//{/*<li className="active"><a href="#">Angular</a></li>*/}

{/*        <li key={item}>
          <a href="#">{item}</a>
        </li>*/}