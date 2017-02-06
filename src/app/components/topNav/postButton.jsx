import React from 'react'

export default class PostButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a className="post-btn" href="#" onClick={(e)=>this.props.setCreatePost(e, true)}>Add post</a>
    );
  }
}



