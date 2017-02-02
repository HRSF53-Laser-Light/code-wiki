import React from 'react';
import ReactDOM from 'react-dom'

export default class Post extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <li>
        <div className="row mb10">
          <div className="col-sm-6">
            <span className="username">Kay</span>
            <span className="posted-details">posted yesterday</span>
          </div>
          <div className="col-sm-6 text-right">
            <ul className="tag-list">
              <li>Debugging</li>
            </ul>
          </div>
        </div>
        <div className="row mb10">
          <div className="col-sm-1 text-center">
            <div className="votes">
              <a><i className="fa fa-arrow-circle-up fa-2x" aria-hidden="true"></i></a>
              <span className="votes-numb">12</span>
              <a><i className="fa fa-arrow-circle-down fa-2x" aria-hidden="true"></i></a>
            </div>
          </div>
          <div className="col-sm-2 text-center">
            <div className="post-img">
              <img src="assets/img/angular.png" />
            </div>
          </div>
          <div className="col-sm-9">
            <div className="post-content">
              <h4>How to start your server with npm</h4>
              <p>Here is how to start a server. You’ll learn how to start a server in this tutorial. You’ll learn how to debug things in this tutorial. This tutorial was written by a very advanced, senior engineer from a highly respected company. He has been writing code and starting servers for over 2 decades and still writes tutorials because he loves it.</p>
            </div>
          </div>
        </div>
        <div className="divider-full mb10"></div>
        <div className="row">
          <div className="col-sm-12">
            <p>TL;DR - The solution is easy. Start the server with npm start. This will fix it.</p>
          </div>
        </div>
      </li>
    );
  }
}