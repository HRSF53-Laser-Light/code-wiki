import React from 'react';
import axios from 'axios';

export default class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //get the categories the first time the sideNav mounts
    this.props.getCategories();  
  }  

  renderCategories() {
    return (
      this.props.allCategories.map(name => {
        
        //Sets the class to active (purely for styling) based on the App's state
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
          <div className="divider-full"></div>
          <ul className="category-list">
            {this.renderCategories()}
          </ul>
          <img className="nav-spaceman" height="125px" src="/assets/img/astronaut.gif"/>
          <div className="side-footer text-center">Made with <i className="fa fa-heart"></i> at Hack Reactor</div>
        </div>
      </div>
    );
  }
}