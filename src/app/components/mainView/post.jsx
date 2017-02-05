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
      <li>
        <div className="row mb10">
          <div className="col-sm-10">
            <span className="username">Kay</span>
            <span className="posted-details">posted {this.props.data.comment} at {this.props.data.createdAt}</span>
          </div>
          <div className="col-sm-2 text-right">
            <ul className="tag-list">
              {this.state.tags.map(tag => (<li>{tag}</li>))}
            </ul>
          </div>
        </div>
        <div className="row mb10">
          <div className="col-sm-1 text-center">
            <div className="votes">
              <a><i className="fa fa-arrow-circle-up fa-2x" aria-hidden="true"></i></a>
              <span className="votes-numb">{this.props.data.vote_count}</span>
              <a><i className="fa fa-arrow-circle-down fa-2x" aria-hidden="true"></i></a>
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
      </li>
    );
  }
}