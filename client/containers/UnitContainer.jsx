import React from 'react';
import FlashCardsContainer from './FlashCardsContainer.jsx';
import Description from '../components/Description.jsx';
import Resources from '../components/Resources.jsx';

class UnitContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      flashCards: [],
      resources: [],
      didLoad: false,
    }

    this.addFlashCard = this.addFlashCard.bind(this);
    this.reRender = this.reRender.bind(this);
  }

  reRender() {
    //fetch from sever the flash cards data
    const unitId = this.props.id;

    const flashCardsURL = `/units/${unitId}`;

    fetch(flashCardsURL)
    .then(res => res.json())
    .then(data => {
      // console.log('ARR OF FLASHCARDS:',data);
      this.setState({
        flashCards: data,
        didLoad: true,
      }, () => console.log('STATE AFTER SETTING STATE',this.state));
    })
    .catch(err => console.log('ERROR IN FLASHCARDS:', err));
  }


  addFlashCard(e) {
    //be able to add a new flashCard

    // post request to the unit we are currently on
    // this.props.id


    // need to grab question, answer, and created_by as keys

    const addFlashCardURL = `/units/${this.props.id}`

    fetch(addFlashCardURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: document.getElementById('question').value,
        answer: document.getElementById('answer').value,
      }),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.reRender();
  })
    .catch(err => console.log('err:', err));
  }

  componentDidMount() {
    //fetch from sever the flash cards data
    const unitId = this.props.id;

    const flashCardsURL = `/units/${unitId}`;

    fetch(flashCardsURL)
    .then(res => res.json())
    .then(data => {
      // console.log('ARR OF FLASHCARDS:',data);
      this.setState({
        flashCards: data,
        didLoad: true,
      }, () => console.log('STATE AFTER SETTING STATE',this.state));
    })
    .catch(err => console.log('ERROR IN FLASHCARDS:', err));

  }

  render() {
    //conditonally render to get state
    if (!this.state.didLoad) {
      return <h1>WE LOADING BABY</h1>
    }

    return (
      <div className="container">
        <div className="outerBox">
        
          {/* Description Component */}
          <Description description={this.props.description}
          sub_units={this.props.sub_units} />
          <FlashCardsContainer flashCards={this.state.flashCards} id={this.props.id} addFlashCard={this.addFlashCard}/>
          {/* Resources Component */}
          <Resources />
        </div>
      </div>
    );
  }
}

export default UnitContainer;