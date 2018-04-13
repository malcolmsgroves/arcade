import React, { Component } from 'react';
import './Minesweeper.css';

class Minesweeper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameInProgress: true,
            grid: buildBoard(40, 10)
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (r, c) {

    }
    render() {
        const boardElement = this.state.grid.map((row, r) => {
            const rowElement = row.map((sqr, c) => {
                
                return (
                    <div key={c}
                    className="square" onClick={() => this.handleClick(r, c)}>
                        {sqr.uncovered && sqr.contents}
                    </div>);
            });
            return <div key={r} className="row">{ rowElement }</div>;
        });

        return (
            <div className="minesweeper">
                {boardElement}
            </div>
        );
    }
}

const rand = number =>  Math.floor(Math.random() * number);

function buildBoard(dim, bombs) {
    let grid = [];
    for (let i = 0; i < dim; ++i) {
        let row = [];
        for (let j = 0; j < dim; ++j) {
            row.push(Square());
        }
        grid.push(row);
    }
    for (let k = 0; k < bombs; ++k) {
        let r = rand(dim),
            c = rand(dim);
        while(grid[r][c].bomb) {
            r = rand(dim);
            c = rand(dim);
        }
        grid[r][c].bomb = true;
    }
    return grid;
}

function Square() {
    return {
        number: null,
        uncovered: false,
        flagged: false,
        bomb: false,
    };
}


export default Minesweeper;

/*
}
class Minesweeper {
	constructor(boardSize) {
  	this.size = boardSize;
    this.grid = [];
    this.buildBoard();
    this.placeBombs();
    this.inProgress = true; 
  }
  
  buildBoard() {
  	for(let i = 0; i < this.size; ++i) {
    	let row = [];
      for(let j = 0; j < this.size; ++j) {
      	row.push(new Square());
      }
      this.grid.push(row);
    }
  }
  
  render() {
  	$container.children().remove();
  	let $board = $container.append('<div class="board"></div>').children().first();
    $board.outerWidth(boardWidth);
    
    for(let r = 0; r < this.grid.length; ++r) {
      for(let c = 0; c < this.grid[r].length; ++c) {
      	let isUncovered = '';
        let contents = '';
        let type = '';
        if(this.grid[r][c].uncovered) {
        	isUncovered = 'uncovered';
          type = this.grid[r][c].contents;
          if(this.grid[r][c].contents && this.grid[r][c].contents !== 'b') {
          	contents = this.grid[r][c].contents;
          }
        }
        if(this.grid[r][c].flagged) {
        	contents = 'f';
        }
        $board.append(`<div class="square ${isUncovered} ${type}" id="${r},${c}">${contents}</div>`);
      }
    }
    const squareWidth = boardWidth / this.size - 2;
    $('.square').css( { width: squareWidth, height: squareWidth } );
  }
  
  select(id) {
  	console.log(id);
  	const position = this.getPosition(id);
  	const r = position[0];
    const c = position[1];
    if(this.grid[r][c].contents === 'b') {
    	this.lose();
    }
    else {
      this.uncover(r, c);
      this.render();
      this.checkWin();
    }
  }
  
  uncover(r, c) {
  	if(!this.onBoard(r, c)) {
    	console.log('outside bounds');
    }
    
    else if(this.grid[r][c].contents === null) {
    	console.log(`${r}, ${c}`);
    	this.grid[r][c].contents = this.countBombs(r, c);
      this.grid[r][c].uncovered = true;
      if(this.grid[r][c].contents === 0) {
        for(let i = -1; i < 2; ++i) {
          for(let j = -1; j < 2; ++j) {
            if(!(j === 0 && i === 0)) {
              this.uncover(r + i, c + j);
            }
          }
        }
      }
    }
  }
  
  countBombs(r, c) {
  	console.log('counting');
  	let bombCount = 0;
    for(let i = -1; i < 2; ++i) {
    	for(let j = -1; j < 2; ++j) {
      	if(this.onBoard(r + i, c + j)) {
          if(this.grid[r + i][c + j].contents === 'b') {
            ++bombCount;
          }
        }
      }
    }
    console.log('bombs' + bombCount);
    return bombCount;
  }
  
  onBoard(r, c) {
  	return r < this.size && c < this.size && r >= 0 && c >= 0;
  }
  
  placeBombs() {
  	for(let i = 0; i < 10; ++i) {
    	const c = rand(this.size);
      const r = rand(this.size);
    	this.grid[r][c].contents = 'b';
    }
  }
  
  checkWin() {
  	let hasWin = true;
  	for(let r = 0; r < this.grid.length; ++r) {
    	for(let c = 0; c < this.grid[r].length; ++c) {
      	let square = this.grid[r][c];
        if(square.contents !== 'b' && !square.uncovered) {
        	hasWin = false;
        }
        else if(square.contents === 'b' && !square.flagged) {
        	hasWin = false;
        }
      }
    }
    if(hasWin) {
    	this.inProgress = false;
    	alert('win');
    }
  }
  
  lose() {
  	this.revealAll();
    this.inProgress = false;
  	alert('lose');
  }
  
  
  revealAll() {
  	for(let r = 0; r < this.grid.length; ++r) {
    	for(let c = 0; c < this.grid[r].length; ++c) {
      	this.grid[r][c].uncovered = true;
        this.grid[r][c].flagged = false;
      }
    }
    this.render();
  }
  
  flag(id) {
  	const position = this.getPosition(id);
  	const r = position[0];
    const c = position[1];
    this.grid[r][c].flagged = !this.grid[r][c].flagged;
    this.render();
    this.checkWin();
  }
  
  getPosition(id) {
  	let rStr = '', cStr = '', index = 0;
    while(id.charAt(index) !== ',') {
    	rStr += id.charAt(index);
      ++index;
    }
    ++index;
    while(id.charAt(index)) {
    	cStr += id.charAt(index);
      ++index;
    }
    return [parseInt(rStr), parseInt(cStr)];
  }
};


function alert(result) {
  let message = 'New Game';
  if(result !== 'new') {
  	message = `You ${result}`;
  }
  const numberField = '<input type="number" placeholder="Board Size">';
  const submitField = '<button id="submit">Play</button>'
  const form = `<div class="alert" id="${result}">${message} ${numberField} ${submitField} </div>`;
  $container.append(form);
  $container.off();
  $('#submit').on('click', function() {
    let dimension = $('input[type="number"]').val();
    minesweeper = new Minesweeper(dimension);
    minesweeper.render();
    $container.mousedown(function(event) {
    	handleMinesweeperPlay(event);
    });
    time();
  });
}
let minesweeper;
alert('new');

function handleMinesweeperPlay(event) {
	switch(event.which) {
  	case 1:
    	minesweeper.select($(event.target).attr('id'));
      break;
    case 3:
    	minesweeper.flag($(event.target).attr('id'));
      break;
  }
};

// turn off the annoying context menu for flagging
$container.contextmenu(function() {
    return false;
});

function add() {
	console.log('adding');
	++timeInSeconds;
  let seconds = timeInSeconds % 60, minutes = Math.floor(timeInSeconds / 60), padding = '';
  if(seconds < 10) {
  	padding = '0';
  }
  $timer.text(`${minutes}:${padding}${seconds}`);
  if(minesweeper.inProgress) {
  	setTimeout(add, 1000);
  }
  
}

const time = function() {
  timeInSeconds = -1;
  add();
};

$('.wrapper').contextmenu(function() {
    return false;
});






class Minesweeper {
	constructor(boardSize) {
  	this.size = boardSize;
    this.grid = [];
    this.buildBoard();
    this.placeBombs();
    this.inProgress = true; 
  }
  
  buildBoard() {
  	for(let i = 0; i < this.size; ++i) {
    	let row = [];
      for(let j = 0; j < this.size; ++j) {
      	row.push(new Square());
      }
      this.grid.push(row);
    }
  }
  
  render() {
  	$container.children().remove();
  	let $board = $container.append('<div class="board"></div>').children().first();
    $board.outerWidth(boardWidth);
    
    for(let r = 0; r < this.grid.length; ++r) {
      for(let c = 0; c < this.grid[r].length; ++c) {
      	let isUncovered = '';
        let contents = '';
        let type = '';
        if(this.grid[r][c].uncovered) {
        	isUncovered = 'uncovered';
          type = this.grid[r][c].contents;
          if(this.grid[r][c].contents && this.grid[r][c].contents !== 'b') {
          	contents = this.grid[r][c].contents;
          }
        }
        if(this.grid[r][c].flagged) {
        	contents = 'f';
        }
        $board.append(`<div class="square ${isUncovered} ${type}" id="${r},${c}">${contents}</div>`);
      }
    }
    const squareWidth = boardWidth / this.size - 2;
    $('.square').css( { width: squareWidth, height: squareWidth } );
  }
  
  select(id) {
  	console.log(id);
  	const position = this.getPosition(id);
  	const r = position[0];
    const c = position[1];
    if(this.grid[r][c].contents === 'b') {
    	this.lose();
    }
    else {
      this.uncover(r, c);
      this.render();
      this.checkWin();
    }
  }
  
  uncover(r, c) {
  	if(!this.onBoard(r, c)) {
    	console.log('outside bounds');
    }
    
    else if(this.grid[r][c].contents === null) {
    	console.log(`${r}, ${c}`);
    	this.grid[r][c].contents = this.countBombs(r, c);
      this.grid[r][c].uncovered = true;
      if(this.grid[r][c].contents === 0) {
        for(let i = -1; i < 2; ++i) {
          for(let j = -1; j < 2; ++j) {
            if(!(j === 0 && i === 0)) {
              this.uncover(r + i, c + j);
            }
          }
        }
      }
    }
  }
  
  countBombs(r, c) {
  	console.log('counting');
  	let bombCount = 0;
    for(let i = -1; i < 2; ++i) {
    	for(let j = -1; j < 2; ++j) {
      	if(this.onBoard(r + i, c + j)) {
          if(this.grid[r + i][c + j].contents === 'b') {
            ++bombCount;
          }
        }
      }
    }
    console.log('bombs' + bombCount);
    return bombCount;
  }
  
  onBoard(r, c) {
  	return r < this.size && c < this.size && r >= 0 && c >= 0;
  }
  
  placeBombs() {
  	for(let i = 0; i < 10; ++i) {
    	const c = rand(this.size);
      const r = rand(this.size);
    	this.grid[r][c].contents = 'b';
    }
  }
  
  checkWin() {
  	let hasWin = true;
  	for(let r = 0; r < this.grid.length; ++r) {
    	for(let c = 0; c < this.grid[r].length; ++c) {
      	let square = this.grid[r][c];
        if(square.contents !== 'b' && !square.uncovered) {
        	hasWin = false;
        }
        else if(square.contents === 'b' && !square.flagged) {
        	hasWin = false;
        }
      }
    }
    if(hasWin) {
    	this.inProgress = false;
    	alert('win');
    }
  }
  
  lose() {
  	this.revealAll();
    this.inProgress = false;
  	alert('lose');
  }
  
  
  revealAll() {
  	for(let r = 0; r < this.grid.length; ++r) {
    	for(let c = 0; c < this.grid[r].length; ++c) {
      	this.grid[r][c].uncovered = true;
        this.grid[r][c].flagged = false;
      }
    }
    this.render();
  }
  
  flag(id) {
  	const position = this.getPosition(id);
  	const r = position[0];
    const c = position[1];
    this.grid[r][c].flagged = !this.grid[r][c].flagged;
    this.render();
    this.checkWin();
  }
  
  getPosition(id) {
  	let rStr = '', cStr = '', index = 0;
    while(id.charAt(index) !== ',') {
    	rStr += id.charAt(index);
      ++index;
    }
    ++index;
    while(id.charAt(index)) {
    	cStr += id.charAt(index);
      ++index;
    }
    return [parseInt(rStr), parseInt(cStr)];
  }
};


function alert(result) {
  let message = 'New Game';
  if(result !== 'new') {
  	message = `You ${result}`;
  }
  const numberField = '<input type="number" placeholder="Board Size">';
  const submitField = '<button id="submit">Play</button>'
  const form = `<div class="alert" id="${result}">${message} ${numberField} ${submitField} </div>`;
  $container.append(form);
  $container.off();
  $('#submit').on('click', function() {
    let dimension = $('input[type="number"]').val();
    minesweeper = new Minesweeper(dimension);
    minesweeper.render();
    $container.mousedown(function(event) {
    	handleMinesweeperPlay(event);
    });
    time();
  });
}
let minesweeper;
alert('new');

function handleMinesweeperPlay(event) {
	switch(event.which) {
  	case 1:
    	minesweeper.select($(event.target).attr('id'));
      break;
    case 3:
    	minesweeper.flag($(event.target).attr('id'));
      break;
  }
};

// turn off the annoying context menu for flagging
$container.contextmenu(function() {
    return false;
});

function add() {
	console.log('adding');
	++timeInSeconds;
  let seconds = timeInSeconds % 60, minutes = Math.floor(timeInSeconds / 60), padding = '';
  if(seconds < 10) {
  	padding = '0';
  }
  $timer.text(`${minutes}:${padding}${seconds}`);
  if(minesweeper.inProgress) {
  	setTimeout(add, 1000);
  }
  
}

const time = function() {
  timeInSeconds = -1;
  add();
};

$('.wrapper').contextmenu(function() {
    return false;
});





*/
