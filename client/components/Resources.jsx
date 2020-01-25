import React, { Component } from 'react';


// might be stateless so try to make into a functional component
class Resources extends Component {
  render() {
    // ideally be able to fetch resources here description here
    return (
      <div className="innerbox">
        <ul>
          <li>Resource Link 1 </li>
          <li>Resource Link 2</li>
        </ul>
      </div>
    )
  };
}



export default Resources;