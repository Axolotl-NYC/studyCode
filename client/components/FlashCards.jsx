import React, {Component} from 'react'

class FlashCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      question: true,
    }

    this.flipFlashCard = this.flipFlashCard.bind(this);
  }

  // function to flip the flashcards value
  // on click should change state false
  flipFlashCard() {
    if (this.state.question) {
      this.setState({
        question: false,
      });
    }
    else {
      this.setState({
        question: true,
      })
    }
  }

  render() {
    // we are passed in id, unit_id, question, answer

    // need a deleteCard function that is conditonal on only being able to delete if created_by is the current user

    // also only display cards from the stock cards and the ones created by the user

    if (this.state.question) {
      return (
        <div className="flashCard_question" onClick={this.flipFlashCard}>
          <a id='questionP'>{this.props.question}</a>
          <button className="deleteCard" type="button">x</button>
        </div>
      );
    }

    return (
        <div className="flashCard_question" onClick={this.flipFlashCard}>
          <a id='questionP'>{this.props.answer}</a>
          <button className="deleteCard" type="button">x</button>
        </div>
      );
  }
}


export default FlashCard;