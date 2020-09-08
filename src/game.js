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
      return <li key={index}> 
                <button onClick={ () => { this.setState({stepNumber: index, isXNext: index%2 == 0})} }> 
                    { index == 0? 'Go to Game start' : `Go to move # ${index}`}
                </button> 
              </li>
    });

    return list;
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
