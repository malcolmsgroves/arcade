import React, { Component } from 'react';
import { newGame } from './snake_module';
import './Snake.css';

class Snake extends Component {
  constructor(props) {
    super(props);
    this.state = newGame();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.reverseSnake = this.reverseSnake.bind(this);
    this.makeNextMove = this.makeNextMove.bind(this);
  }

  reverseSnake() {
    let newPosition = [];
    this.state.position.forEach(function(element) {
      newPosition.unshift(element);
    })
    this.setState({
      position: newPosition,
    })
  }

  makeNextMove() {
    let head = this.state.position[0];
    switch(this.state.direction) {
      case 'u':
        this.to([head[0] - 1, head[1]]);
        break;
      case 'd':
        this.to([head[0] + 1, head[1]]);
        break;
      case 'l':
        this.to([head[0], head[1] - 1]);
        break;
      case 'r':
        this.to([head[0], head[1] + 1]);
        break;
    }
  }

  to(position) {
    if(position[0] >= this.state.dimension ||
       position[0] < 0 ||
       position[1] >= this.state.dimension ||
       position[1] < 0) {
      this.setState({
        gameInProgress: false,
      })
    }
    else if(this.state.grid[position[0]][position[1]]) {
      this.state.position.forEach(function(element) {
        if(element[0] === position[0] && element[1] === position[1]) {
          this.setState({ gameInProgress: false })
        }
      });

      if(this.state.gameInProgress) {
        this.state.position.unshift(position);
        this.makeNextMove();
        this.placeFood();
        this.speed *= 0.9;
        ++this.count;
        score(this.count);
      }
    }
    else {
      this.toggleSquare(this.position.pop());
      this.position.unshift(position);
      this.toggleSquare(position);
    }
	}

  handleKeyDown(e) {
    switch(e.keyCode) {
    	case 38:
      	if(this.state.direction === 'd') {
        	this.reverseSnake();
        }
      	this.setState({ direction: 'u' })
        break;
      case 40:
      	if(this.state.direction === 'u') {
        	this.reverseSnake();
        }
      	this.setState({ direction: 'd' })
        break;
      case 37:
      	if(this.state.direction === 'r') {
        	this.reverseSnake();
        }
      	this.setState({ direction: 'l' });
        break;
      case 39:
      	if(this.state.direction === 'l') {
        	this.reverseSnake();
        }
      	this.setState({ direction: 'r' })
        break;
    }
  }

  render() {
    return (
      <div className="Snake"
           onKeyDown={this.handleKeyDown}
           tabIndex="0">
        Hi
      </div>
    );
  }
}

export default Snake;