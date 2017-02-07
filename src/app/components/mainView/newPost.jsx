import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      category: 'Choose a category',
      tags: '',
      errorMsg: '',
      errors: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  handleErrors() {
    if (this.state.comment === '') {
      this.setState({errorMsg: 'Please enter a comment!'});
      return true;
    }
    if (this.state.category === 'Choose a category') {
      this.setState({errorMsg: 'Please choose a category!'});
      return true;
    }
    return false;
  }

  handleSubmit(e) {
    e.preventDefault();
    var _this = this;
    // Check if post has errors
    if (this.handleErrors()) {
      this.setState({errors: true});
    } else {
      // If post has no errors...
      this.setState({errors: false});
      // Send the server raw post data
      axios.post('/api/submit', {
        comment: this.state.comment,
        category: this.state.category,
        tags: this.state.tags,
        userId: this.props.userId
      })
      .then(function(response) {
        _this.props.setCreatePost(e, false);
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }

  //this keeps state in-sync with the form
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  renderCategories(){
    
    return this.props.allCategories.map(category=> {
      category = category === 'All' ? 'Choose a category' : category;

      return(
        <option key={category} value={category}>{category}</option>
      );
    });
  }

  render() {
    let errorMsg = this.state.errors ? <span className="error-msg">{this.state.errorMsg}</span> : <span></span>;

    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Comment</label>
              <textarea
              value={this.state.comment} onChange={this.handleChange} name="comment" className="form-control" id="comment" rows="3"></textarea>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={this.state.category} onChange={this.handleChange} name="category" className="form-control" id="exampleSelect1">
                {this.renderCategories()}
              </select>
            </div>
            <div className="form-group">
              <label>Tags</label>
              <input value={this.state.tags} onChange={this.handleChange} name="tags" className="form-control" type="text" id="tags"/>
              <small id="tagsHelp" className="form-text text-muted">Separate multiple tags with commas</small>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            {errorMsg}
            <a href="#" className="pull-right" onClick={(e)=>this.props.setCreatePost(e, false)}>cancel</a>
          </form>
        </div>
      </div>
    );
  }
}






