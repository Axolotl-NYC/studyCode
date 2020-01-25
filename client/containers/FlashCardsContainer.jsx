import React, { Component } from 'react';


class FlashCardsContainer extends Component {

  render() {
    return (
      <div className="innerbox">
        <h3>Stack of Flash Cards</h3>
        <ul>
          <li>Example flashCard one</li>
        </ul>
        <input type="text" placeholder="keyword"></input>
        <input type="text" placeholder="description"></input>
        <button>Add Card</button>
        <button>Delete Card</button>
      </div>
    );
  }

}

export default FlashCardsContainer;
