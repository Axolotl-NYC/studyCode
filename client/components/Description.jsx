import React, { Component } from 'react';
import UnitChecklist from './UnitChecklist.jsx';

// add paragraph and checklist components here

class Description extends Component {

  render() {



    return (
      <div className="innerbox">
        <article>
          <p>{this.props.description}</p>
        </article>
        <h4>Sub Topics</h4>
        <p>{this.props.sub_units}</p>
        
      {/* checklist is stretch */ }
        
      </div>
    )
  };
}

export default Description;