import React, { Component } from 'react';
import './Snake.css';

class Snake extends Component {
  constructor(props) {
    super(props);
    this.state = newGame();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.reverseSnake = this.reverseSnake.bind(this);
    this.makeNextMove = this.makeNextMove.bind(this);
    this.toggle = this.toggle.bind(this);
    this.placeFood = this.placeFood.bind(this);
    this.to = this.to.bind(this);
    this.tick = this.tick.bind(this);
    this.reset = this.reset.bind(this);
  }
    componentDidMount() {
	this.placeFood();
	this.tickID = setInterval(
	    () => this.tick(),
	    1000
	);
	this.makeNextMove();
    }
    
    reset() {
	// use callback function to force sync
	this.setState( newGame(), () => {
	    this.placeFood();
       	    this.tickID = setInterval(
		() => this.tick(),
		1000);
	    this.makeNextMove();
	    });
    }
    tick() {
	if(!this.state.gameInProgress) {
	    clearInterval(this.tickID);
	    return;
	}
	this.setState((prev) => {
		      return { time: prev.time + 1 };
	    });
    }
    componentWillUnmount() {
	clearInterval(this.tickID);
    }

  reverseSnake() {
    let newPosition = [];
    this.state.position.forEach(function(element) {
      newPosition.unshift(element);
    })
    this.setState({ position: newPosition })
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
    // if the snake hits a dot, check if it is part of the snake
    else if(this.state.grid[position[0]][position[1]]) {
	let obj = this;
      this.state.position.forEach(function(element) {
        if(element[0] === position[0] && element[1] === position[1]) {
	    obj.setState({ gameInProgress: false })
        }
      });

      if(this.state.gameInProgress) {
	  let newSnake = this.state.position;
	  newSnake.unshift(position);
	  this.setState((prev) => { 
	      return {
		  position: newSnake,
		  speed: prev.speed * 0.8,
		  count: prev.count + 1,
	      }
	  });
	  this.placeFood();
      }
    }
    else {
	let newSnake = this.state.position;
	this.toggle(newSnake.pop());
	newSnake.unshift(position);
	this.toggle(position);
    }
    if(this.state.gameInProgress) {
	setTimeout(() => this.makeNextMove(), this.state.speed);
    }
}

    placeFood() {
	let pos = [rand(40), rand(40)];
	while(this.state.grid[pos[0]][pos[1]]) {
       	    pos = [rand(40), rand(40)];
	}
	this.toggle(pos);
    }

    toggle(position) {
	let grid = this.state.grid;
	grid[position[0]][position[1]] = !grid[position[0]][position[1]];
	this.setState({ grid: grid });
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
      let gridElement = [];
      for(let row = 0; row < this.state.dimension; ++row) {
	  for(let col = 0; col < this.state.dimension; ++col) {
	      gridElement.push(<li key={`${row},${col}`} className={this.state.grid[row][col] ? "filled" : undefined} />);
	  }
      }
      return (
	  <div className="snake-wrapper">
	  <div className="snake-header">
	      {`${this.state.count} points`}
	  <Clock seconds={this.state.time} />
	      {!this.state.gameInProgress &&
	          <button onClick={this.reset}>New Game?</button>
	      }
	  </div>
	  <div className="snake"
	  onKeyDown={this.handleKeyDown}
	  tabIndex="0">
	      {gridElement}
	  </div>

	  </div>
    );
  }
}

function Clock(props) {
    const sec = props.seconds % 60;
    const paddedSec = sec < 10 ? `0${sec}` : sec;
    const min = (props.seconds - sec) / 60;
    return (
	<div className="clock">
	    {`${min}:${paddedSec}`}
	</div>
	)
}
function newGrid(dimension) {
  let grid = [];
  for(let i = 0; i < dimension; ++i) {
    grid.push(new Array(dimension).fill(false));
  }
  const center = Math.floor(dimension / 2);
  grid[center][center] = true;
  return grid;
}

function newGame() {
    return {
    position: [[20, 20]],
    grid: newGrid(40),
    dimension: 40,
    direction: 'r',
    gameInProgress: true,
    speed: 150,
    count: 0,
    time: 0,
    }
}

function rand(max) {
    return Math.floor(Math.random() * max);
}
export default Snake;
