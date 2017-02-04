import React from 'react'

export default class SignoutButton extends React.Component {
  constructor() {
    super();
  }

  //@TODO delete session
  render() {
    return (
      <a href="#" onClick={()=>this.props.updateUser(false, null)}>Sign out</a>
    );
  }
}