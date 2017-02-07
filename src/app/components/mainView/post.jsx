import React from 'react';
import axios from 'axios';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    }
  }

  componentDidMount() {
    var _this = this;

    axios.get('api/tagId', {
      params: {
        postId: this.props.data.id
      }
    })
    .then(function(response) {
      _this.setState({
        tags: response.data
      });
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  render() {
    return (
      <li key={this.props.data.id}>
        <div className="row">
          <div className="col-sm-1 text-center">
            <div className="vote-container">
              <i className="fa fa-chevron-up" aria-hidden="true" onClick={()=>this.props.upVotePost(this.props.data.id)}></i>
              <div className="vote-count">{this.props.data.vote_count}</div>
              <i className="fa fa-chevron-down" aria-hidden="true" onClick={()=>this.props.downVotePost(this.props.data.id)}></i>
            </div>
          </div>
          <div className="col-sm-11">
            <div className="row mb5">
              <div className="col-sm-12">
                <span className="username">{this.props.data.user.username}</span>
                <span className="posted-time">{this.props.data.createdAt}</span>
              </div>
            </div>
            <div className="row mb10">
              <div className="col-sm-12">
                <p className="comment">{this.props.data.comment}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="link">
                  <a href={this.props.data.link_url} target="_blank">
                    <h4 className="mb5">{this.props.data.link_title}</h4>
                  </a>
                  <p className="mb5">{this.props.data.link_description}</p>
                  <img height="125" src={this.props.data.link_image} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}