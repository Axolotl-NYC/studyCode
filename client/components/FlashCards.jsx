import React, {Component} from 'react'

class FlashCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      question: true,
    }
  }

  render() {
    // we are passed in id, unit_id, question, answer
    console.log(`flash card ${this.props.arrayId} props`, this.props)

    // need a deleteCard function that is conditonal on only being able to delete if created_by is the current user

    // also only display cards from the stock cards and the ones created by the user
    return (
      <div>
      {
        this.props.questionAnswered ?
        <div className="flashCard_question" onClick={ () => this.props.flipFlashCard(this.props.arrayId) }>
          <a id='questionP'>{ this.props.question }</a>
          <button onClick={ this.props.deleteFlashCard } value={ this.props.id } className="deleteCard" type="button">x</button>
        </div> :
        <div className="flashCard_question" onClick={ () => this.props.flipFlashCard(this.props.arrayId) }>
          <a id='questionP'>{ this.props.answer }</a>
          <button onClick={ this.props.deleteFlashCard } value={ this.props.id } className="deleteCard" type="button">x</button>
        </div>
      }
      </div>
      );
  }
}


export default FlashCard;