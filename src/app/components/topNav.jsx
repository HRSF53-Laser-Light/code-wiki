import React from 'react'

export default class TopNav extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='container top-nav'>
        <img className='logo' src='http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/magic-marker-icons-natural-wonders/115691-magic-marker-icon-natural-wonders-sun9-sc37.png'/>
        <span> Code-wiki </span>
      </div>
    );
  }
}