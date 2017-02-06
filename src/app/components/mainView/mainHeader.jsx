import React from 'react';

export default class MainHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <span>Viewing <span className="current-category">{this.props.currentCategory}</span></span>
          <span className="filtering-by">Filtering by: </span>
          <ul className="tag-list">
            <li>Debugging</li>
          </ul>
          <span className="add-filter"><a href="#"><i className="fa fa-plus-circle"></i> add filter</a></span>
        </div>
      </div>
    );
  }
}