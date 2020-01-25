import React from 'react';
import FlashCardsContainer from './FlashCardsContainer.jsx';
import Description from '../components/Description.jsx';
import Resources from '../components/Resources.jsx';

class UnitContainer extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="outerBox">
          <h3 >Unit name here</h3>
        
          {/* Description Component */}
          <Description />
          <FlashCardsContainer />
          {/* Resources Component */}
          <Resources />
        </div>
      </div>
    );
  }
}

export default UnitContainer;