import React from 'react';
import FlashCardsContainer from './FlashCardsContainer.jsx';
import Description from '../components/Description.jsx';
import Resources from '../components/Resources.jsx';

class UnitContainer extends React.Component {

  //should be getting props as

  

  render() {

    return (
      <div className="container">
        <div className="outerBox">
        
          {/* Description Component */}
          <Description description={this.props.description}
          sub_units={this.props.sub_units} />
          <FlashCardsContainer />
          {/* Resources Component */}
          <Resources />
        </div>
      </div>
    );
  }
}

export default UnitContainer;