import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => {this.props.onClick()}}>
        {this.props.value === "0" ? '-' : this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(25).fill('-'),
      isWinOrLose: false,
      gameStatus : false, 
      opponentsShips : 3,
      yourShips : 0,
    };
  }

  renderSquare(i) {
    return <Square 
      value={this.state.squares[i]}
      onClick={()=>this.handleClickGame(i)} />;
  }

  handleClickGame(i){
    if(!this.state.gameStatus){
      const squares = this.state.squares.slice();
      if(squares[i] === '1'){
        return;
      }
      squares[i] = '1';
      this.setState({squares: squares});
      let yourShips = this.state.yourShips;
      yourShips++
      this.setState({yourShips: yourShips});
      if(yourShips === 3){
        for(let i=0; i<=2; i++){
          let tmpP = Math.floor(getRandomArbitrary(0,26));
          while(squares[tmpP] === '0' || squares[tmpP] === '1'){
            tmpP = Math.floor(getRandomArbitrary(0,26))
          }
          squares[tmpP] = '0';
          this.setState({squares: squares});
        }
        this.setState({gameStatus : true});
      }
    }
    else{
      const squares = this.state.squares.slice();
      if(this.state.isWinOrLose || squares[i] === '1' || squares[i] === 'X'){
        return;
      }
      if(squares[i] === '0'){
        let opponentsShips = this.state.opponentsShips;
        opponentsShips--;
        this.setState({opponentsShips: opponentsShips});
        if(opponentsShips === 0){
          this.setState({isWinOrLose: true});
        }
      }
      squares[i] = 'X';
      this.setState({squares: squares});
      const squares1 = squares.slice();
      let tmpP = Math.floor(getRandomArbitrary(0,26));
      while(squares1[tmpP] !== '-' && squares1[tmpP] !== '1'){
        tmpP = Math.floor(getRandomArbitrary(0,26));
      }
      if(squares[tmpP] === '1'){
        let yourShips = this.state.yourShips;
        yourShips--;
        this.setState({yourShips: yourShips});
        if(yourShips === 0){
          this.setState({isWinOrLose: true});
        }
      }
      squares1[tmpP] = 'X';
      this.setState({squares: squares1});
    }
  }

  render() {
    const yourShips = this.state.yourShips;
    const opponentsShips = this.state.opponentsShips;
    const isWinOrLose = this.state.isWinOrLose;
    let status = '';
    if(!this.state.gameStatus){
      status = 'Choose where to put 3 boats of 1x1';
    }
    else{
      status = "Try to find your opponent's ships: " + opponentsShips + ". Your ships: " + yourShips; 
    }     

    return (
      <div>
        <div className="game-info">
          <div>{isWinOrLose ? opponentsShips === 0 ? "You win!" : "You lose." : "The game is on"}</div>
        </div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </div>
        <div className="board-row">
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
        <div className="board-row">
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
        </div>
        <div className="board-row">
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
        </div>
        <div className="board-row">
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Game />
);


reportWebVitals();
