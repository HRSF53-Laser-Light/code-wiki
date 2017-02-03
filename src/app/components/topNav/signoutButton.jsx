import React from 'react'

export default class SignoutButton extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <a href="#" onClick={()=>this.props.updateUser(false)}>Sign out</a>
    );
  }
}