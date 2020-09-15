import React from 'react';
import Board from './board';


class Game extends React.Component {
  constructor() {
    super();
    // history holds the game/step states on every move. this is used for time travel
    // stepNumber keep track of the current step. 
  
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      isXNext: true
    }
  }

  handleClick = (i) => {
    let stepNumber = this.state.stepNumber + 1;
    let history = this.state.history.slice(0, stepNumber);
    let squares = history[this.state.stepNumber].squares.slice();

    if(squares[i] || this.checkWinner()) {
      return;
    }    
    
    squares[i] = this.state.isXNext? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: stepNumber,
      isXNext: !this.state.isXNext 
    });
    
  }

  // checks if there is a winner on every move
  checkWinner = () => {
    const squares = this.state.history[this.state.stepNumber].squares;
    
    // all possible win positions 
    const winPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [2, 5, 8],
      [1, 4, 7],
      [0, 4, 8],
      [2, 4, 6]
    ];
    
    for(let i=0; i<winPositions.length; i++) {
      const [p1, p2, p3] = winPositions[i];
      // if any of the possible win positions has the same value except null value
      if( squares[p1] && squares[p1] === squares[p2] && squares[p2] === squares[p3]) {
        // return the win value, either X or O
        return squares[p1];
      }
    }
    // return null if there is no winner 
    return null;
  }

  // this function the time travel, to go back and forth on the moves 
  // if the stepNumber is even, it's X's turn and vice versa
  handleHistory = () => {
    const list = this.state.history.map((move, index) => {
      let buttonStyle = {
        fontWeight: 'bold',
        border: '2px dotted red',
        outline: 'none'
      };
      
      if(this.state.stepNumber !== index) buttonStyle=null;

      return <li key={index}> 
                <button style={buttonStyle} onClick={ () => { this.setState({stepNumber: index, isXNext: index%2 == 0})} }> 
                    { index == 0? 'Go to Game start' : `Go to move #${index} ${this.determineMoveLocation(index)}`}
                </button> 
              </li>
    });

    return list;
  }

  // this function determines the coordinates of the latest move
  // it does by comparing the current and previous squares in the history
  determineMoveLocation = (index) => {
    const currentSquare = this.state.history[index].squares;
    const prevSquare = this.state.history[index-1].squares;
    let locationIndex; 

    for(let i = 0; i <= 8; i++) {
      // If currentSquare has value, but the previous square has not.
      // This indicates that the index is where the latest move happened
      if(currentSquare[i] && !prevSquare[i]) {  
        locationIndex=i;
      }
    }

    // returns the coordinates according to the moves
    switch(locationIndex) {
      case 0: return '(0,0)';
      case 1: return '(1,0)';
      case 2: return '(2,0)';
      case 3: return '(0,1)';
      case 4: return '(1,1)';
      case 5: return '(2,1)';
      case 6: return '(0,2)';
      case 7: return '(1,2)';
      case 8: return '(2,2)';
    }
  }

  render() {
    const winner = this.checkWinner();
    const status = winner? `Winner is ${winner}` : `Next player: ${this.state.isXNext? 'X' : 'O'}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={this.handleClick} squares={this.state.history[this.state.stepNumber].squares}/>
        </div>
        <div className="game-info">
          <div>{status }</div>
            <ol>{this.handleHistory()}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
