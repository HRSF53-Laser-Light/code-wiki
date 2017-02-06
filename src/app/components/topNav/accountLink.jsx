import React from 'react'

export default class AccountLink extends React.Component {
  constructor(props) {
    super(props);
  }

  //clicking on this doesn't do anything for now
  render() {
    return (
      <a href="#" >{this.props.username}</a>
    );
  }
}