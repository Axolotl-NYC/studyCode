import React, { Component } from 'react';

class Resources extends Component {
  
  render() {
    const resourcesArr = [];

    for (let i = 0; i < this.props.resources.length; i += 1) {
      resourcesArr.push(<li id='resourcesList'><a href={this.props.resources[i].resources}>{this.props.resources[i].resources}</a></li>)
    }

    /**
     * need to clean up presentation and display of these resources
     */

    return (
      <div className="innerbox">
        <ul>
          {resourcesArr}
        </ul>
      </div>
    )
  };
}



export default Resources;