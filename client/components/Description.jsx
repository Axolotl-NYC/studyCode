import React, { Component } from 'react';
import UnitChecklist from './UnitChecklist.jsx';

// add paragraph and checklist components here

class Description extends Component {

  render() {
    // ideally be able to fetch the database description here
    return (
      <div className="innerbox">
        <article>
          <p>Fetch database description here</p>
        </article>
        <UnitChecklist />
      </div>
    )
  };
}

export default Description;