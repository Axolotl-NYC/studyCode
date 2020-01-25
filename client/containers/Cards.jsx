/**
 * ************************************
 *
 * @module  MarketsContainer
 * @author
 * @date
 * @description stateful component that renders MarketCreator and MarketDisplay
 *
 * ************************************
 */

import React, { Component } from 'react';
// import child components...
// import MarketCreator from '../components/MarketCreator.jsx'
// import MarketsDisplay from '../components/MarketsDisplay.jsx';


class Cards extends Component {

  render() {
    return (
      <div className="innerbox">
        { /* add components here... */}
        {/* <MarketCreator marketAdder={this.marketAdder} />
        <MarketsDisplay totalCards={this.props.totalCards} marketList= {this.props.marketList}/> */}

        <h3>Cards</h3>


      </div>
    );
  }

}

export default Cards;
