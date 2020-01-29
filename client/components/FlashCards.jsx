import React, {Component} from 'react'

class FlashCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      question: true,
    }
    // this.deleteFlashCard = this.deleteFlashCard.bind(this);
    // this.flipFlashCard = this.flipFlashCard.bind(this);
  }

  // deleteFlashCard(e) {
  //   /*
  //     Function to delete a flashCard in our database
  //   */
  //   const deleteFlashCardURL = `/units/${this.props.unit_id}`

  //   fetch(deleteFlashCardURL, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id: e.target.value,
  //     }),
  //   }
  //   )
  //   .then(res => res.json())
  //   .then(() => this.props.reRender())
  //   .catch(err => console.log('err:', err));
  // }

  // // function to flip the flashcards value
  // // on click should change state false
  // flipFlashCard() {
  //   if (this.state.question) {
  //     this.setState({
  //       question: false,
  //     });
  //   }
  //   else {
  //     this.setState({
  //       question: true,
  //     })
  //   }
  // }

  render() {
    // we are passed in id, unit_id, question, answer

    // need a deleteCard function that is conditonal on only being able to delete if created_by is the current user

    // also only display cards from the stock cards and the ones created by the user

    if (this.props.question) {
      return (
        <div className="flashCard_question" onClick={this.props.flipFlashCard}>
          <a id='questionP'>{this.props.question}</a>
          <button onClick={this.props.deleteFlashCard} value={this.props.id} className="deleteCard" type="button">x</button>
        </div>
      );
    }

    return (
        <div className="flashCard_question" onClick={this.props.flipFlashCard}>
          <a id='questionP'>{this.props.answer}</a>
          <button className="deleteCard" type="button">x</button>
        </div>
      );
  }
}


export default FlashCard;