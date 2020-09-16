import React from 'react';
import Square from './square';
import './index.css';

class Board extends React.Component {
    
    renderSquare(i) {
      return <Square onClick={() => this.props.onClick(i)} value = {this.props.squares[i]}/>;
    }

    // function calls renderSquare function for each square and organizes them
    callSquares() {
      let squaresContainer = [];
      // keep track of the square indexs or the argument to be sent to renderSquare 
      let count = 0;

      for(let i = 0; i <= 2; i++) {
        // holds columns on each row
        let columns = [];
        for(let j = 0; j <= 2; j++) {
          columns.push(this.renderSquare(count));
          count++;
        }
        // push each row to the container
        squaresContainer.push(<div key={i} className="board-row"> {columns} </div>);
      }

      return squaresContainer;
    }

    render() {
      return (
        <div>
          {this.callSquares()}
        </div>
      );
    }
  }

  export default Board;

 