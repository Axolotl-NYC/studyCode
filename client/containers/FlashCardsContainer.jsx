import React, { Component } from 'react';


class FlashCardsContainer extends Component {

  render() {

    console.log("ID for current FlashCardsContainer:", this.props.id);

    const flashCardsArr = [];

    for (let i = 0; i < this.props.flashCards.length; i+= 1) {

      const { id, unit_id, question, answer} = this.props.flashCards[i];

      flashCardsArr.push(<li>{question}</li>);
    }


    return (
      <div className="innerbox">
        <h3>FlashCardsContainers</h3>
        <h4>Stack of Flash Cards</h4>

        <ul>
          {flashCardsArr}
        </ul>
        <input type="text" placeholder="question" id="question" ></input>
        <input type="text" placeholder="answer" id="answer"></input>
        <button onClick={() => this.props.addFlashCard()}>Add Card</button>
        <button>Delete Card</button>
      </div>
    );
  }

}

export default FlashCardsContainer;
