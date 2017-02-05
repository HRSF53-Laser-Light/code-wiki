import React from 'react';
import axios from 'axios';

export default class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCategories();  
  }  

  renderCategories() {
    return (
      this.props.allCategories.map(name => {
        
        //Sets the class to active based on the App's state
        var activeStatus = (name === this.props.currentCategory ? 'active' : '');

        return (
          <li
          className={activeStatus}
          key={name}
          onClick={(e)=>this.props.updateCategory(e, name)}>
          {name}
          </li>
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