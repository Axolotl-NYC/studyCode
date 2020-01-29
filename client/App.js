import React, { Component } from 'react';
import { render } from 'react-dom';

import './style/index.css';

import NavBar from './components/NavBar.jsx';
import UnitContainer from './containers/UnitContainer.jsx';

// creating a router component here that will be rendered to
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      units: [],
      postDidMount: false,
      currentUnitData: null,
      currentUnitIndex: null,
      currentFlashCards: null,
      currentResources: null,
      question: true,
      questionsArray: [],
    }

    this.updateCurrentUnit = this.updateCurrentUnit.bind(this);
    this.updateDrilledState = this.updateDrilledState.bind(this);
    this.addFlashCard = this.addFlashCard.bind(this);
    this.deleteFlashCard = this.deleteFlashCard.bind(this);
    this.flipFlashCard = this.flipFlashCard.bind(this);
    this.flashCardQuestionAnswers = this.flashCardQuestionAnswers.bind(this);
  }

  // Nav Bar functionality

  updateCurrentUnit(event) {
    // Updates the state with the current selection of units. Slices off the dynamically
    // generated ID from the NavBar component at the last index of the string. This ID
    // will be used to render the info comps below our nav based on selection -mp
    const currentUnitId = Number(event.target.id.slice(event.target.id.length - 1)) - 1;
    const currentUnitData = this.state.units[currentUnitId];

    this.setState({
      currentUnitIndex: currentUnitId,
      currentUnitData: currentUnitData,
    });
  }

  // Flashcard Functionality -- Add / Delete / Flip

  addFlashCard() {
    // Function to add a new flashCard to our database
    const addFlashCardURL = `/units/${ this.state.currentUnitData.id.toString() }`

    fetch(addFlashCardURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: document.getElementById('question').value,
        answer: document.getElementById('answer').value,
      }),
    }).then(response => response.json())
      .then((flashCardResponse) => {
        const { flashCards, resources } = flashCardResponse;
        console.log('currentFlashCards', flashCards )
        const questionAnswerArray = this.flashCardQuestionAnswers(flashCards.length);

        this.setState({
          currentFlashCards: flashCards,
          currentResources: resources,
          questionsArray: questionAnswerArray,
        })
      })
      .catch(err => console.log('err:', err));
  }

  deleteFlashCard(e) {
    /// Function to delete a flashCard in our database
    const deleteFlashCardURL = `/units/${ this.state.currentUnitData.id.toString() }`

    fetch(deleteFlashCardURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: e.target.value,
      }),
      }).then(response => response.json())
      .then((flashCardResponse) => {
        const { flashCards, resources } = flashCardResponse;
        const questionAnswerArray = this.flashCardQuestionAnswers(flashCards.length);

        this.setState({
          currentFlashCards: flashCards,
          currentResources: resources,
          questionsArray: questionAnswerArray,
        })
      })
        .catch(err => console.log('err:', err));
  }

  flashCardQuestionAnswers(cardLength) {
    const returnedArray = [];
    for (let i = 0; i < cardLength; i += 1) {
      returnedArray.push(true);
    }
    return returnedArray;
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

  updateDrilledState(updateObject){
    this.setState(updateObject);
  }

  componentDidMount() {
    // fetching state after component mounts
    const unitsURL = '/units'
    fetch(unitsURL)
      .then(data => data.json())
      .then(data => {
        this.setState({
          units: data,
          postDidMount: true,
        })
      })
      .catch(err => console.log('ERROR:', err));
  }

  render() {

    if (!this.state.postDidMount) {
      return ( <h1>We LOADING BABY!</h1> )
    }

    /**
     * Need to find a better way of modularizing each of the renders
     * Each of the specific pages are the same
     * Breaking the DRY principle
     * Would need to make a Page component that would be a route path
     */

    return (
      <section className='app-container'>
        <NavBar
          units={ this.state.units }
          updateCurrentUnit= { this.updateCurrentUnit }
        />
        { // conditional render precluded on if a NavBar selection was made, default is null.
          // Updates on NavBar selection
          this.state.currentUnitIndex !== null ?
          <UnitContainer
            // this.state.currentUnit is a string, needs hard set to Number
            // for the currentUnit index
            currentUnitData={ this.state.currentUnitData }
            updateDrilledState={ this.updateDrilledState }
            currentFlashCards={ this.state.currentFlashCards }
            currentResources={ this.state.currentResources }
            addFlashCard={ this.addFlashCard }
            deleteFlashCard={ this.deleteFlashCard }
            flipFlashCard={ this.flipFlashCard }
            flashCardQuestionAnswers={ this.flashCardQuestionAnswers }
            question={ this.state.question } />
          : <div></div>
        }
      </section>
    )
  }
}

render(<App />, document.getElementById('app'));