import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

// axios.post('/api/submit', {
//   post: 'thispost'
// })
// .then(function(response) {
//   console.log(response);
// })
// .catch(function(error) {
//   console.log(error);
// });

export default class Posts extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <form>
            <div className="form-group">
              <label>Comment</label>
              <textarea className="form-control" id="comment" rows="3"></textarea>
              <small id="commentHelp" className="form-text text-muted">0/140 characters</small>
            </div>
            <div className="form-group">
              <label>Link</label>
              <input className="form-control" type="text" value="" id="link"/>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select className="form-control" id="exampleSelect1">
                <option>React</option>
                <option>Angular</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tags</label>
              <input className="form-control" type="text" value="" id="tags"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}