import React from 'react'

export default class PostButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href="#" onClick={(e)=>this.props.setCreatePost(e, true)}>Post</a>
    );
  }
}



