import React from 'react';
import ReactDOM from 'react-dom'

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li>
        <div className="row mb10">
          <div className="col-sm-10">
            <span className="username">Kay</span>
            <span className="posted-details">posted {this.props.data.comment} at {this.props.data.createdAt}</span>
          </div>
          <div className="col-sm-2 text-right">
            <ul className="tag-list">
              <li>Debugging</li>
            </ul>
          </div>
        </div>
        <div className="row mb10">
          <div className="col-sm-1 text-center">
            <div className="votes">
              <a><i
              className="fa fa-arrow-circle-up fa-2x"
              aria-hidden="true"
              onClick={()=>this.props.upVotePost(this.props.data.id)}>
              </i></a>
              <span className="votes-numb">{this.props.data.vote_count}</span>
              <a><i
              className="fa fa-arrow-circle-down fa-2x"
              aria-hidden="true"
              onClick={()=>this.props.downVotePost(this.props.data.id)}>
              </i></a>
            </div>
          </div>
          <div className="col-sm-2 text-center">
            <div className="post-img">
              <img src={this.props.data.link_image} />
            </div>
          </div>
          <div className="col-sm-9">
            <div className="post-content">
              <a href={this.props.data.link_url} target="_blank">
                <h4>{this.props.data.link_title}</h4>
              </a>
              <p>{this.props.data.link_description}</p>
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