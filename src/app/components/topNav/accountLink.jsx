import React from 'react'

export default class AccountLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href="#" >{this.props.username}</a>
    );
  }
}