import React, { Component } from 'react';
import './Tic.css';

class Tic extends Component {
    constructor(props) {
	super(props);
	this.state = newGame();
    }

    move(row, col) {
	if(this.state.board[row][col] === null) {
	    let newBoard = this.state.board;
	    const turn = this.state.turn;
	    newBoard[row][col] = this.state.turn;
	    this.setState((prev) => {
		board: newBoard,
		turn: prev.turn === 'X' ? 'O' : 'X',
		})
		this.win?(row, col, turn);
		}
    }

    win?(row, col, turn) {
	let rowWin = true;
	let colWin = true;
	for(let i = 0; i < 3; ++i) {
	    if(this.state.board[row][i] !== turn) rowWin = false;
	    if(this.state.board[i][col] !== turn) colWin = false;
	}
	let leftDiag = true;
	let rightDiag = true;
	if(row === col) {
	    for(let i = 0; i < 3; ++i) {
		if(this.state.board[i][i] !== turn) leftDiag = false;
	    }
	}
	if(row === (2 - col)) {
	    for(let i = 0; i < 3; ++i) {
		if(this.state.board[i][2-i] !== turn) rightDiag = false;
	    }
	}
	return rowWin || colWin || leftDiag || rightDiag;
    }

    render() {
	let boardElement = this.state.board.map((row, r) => {
		return row.map((square, c) => {
			return (
			    <li
			    key=`${r}${c}`>
				{square}
			    </li>
			    )})
	    });
	    return <div className="tic"> { boardElement } </div>;
		 
	    }

		
	      

function newGame() {
    const board = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
	];
    return {
            board: board,
	    turn: 'X',
	    winner: null,
	    }
}

/*
const game = (() => {
	let grid, turn;
	const $container = $('.container');
  
  
  
	const render = () => {
	    console.log('rendering');
	    $container.children().remove('.row');
	    for(let r = 0; r < 3; ++r) {
		let $row = $container.append('<div class="row"></div>').children().last();
		for(let c = 0; c < 3; ++c) {
		    let square = `<div class="square" id="${r}${c}">${grid[r][c]}</div>`;
		    let $square = $row.append(square).children().last();
		    if(c === 2) $square.css( { 'border-right-width': 0 } );
		    if(r === 2) $square.css( { 'border-bottom-width': 0 } );
		}
	    }
	};
  
	const switchTurn = () => {
	    if(turn === 'X') {
		turn = 'O';
	    }
	    else {
		turn = 'X';
	    }
	};
  
	const checkWin= () => {
	    
	    let leftDiagonalMark = grid[0][0];
	    let leftDiagonalWin = (leftDiagonalMark !== '');
	    let rightDiagonalMark = grid[0][2];
	    let rightDiagonalWin = (rightDiagonalMark !== '');
	    let straightWin = false;
    
	    for(let i = 0; i < 3; ++i) {
		if(grid[i][i] !== leftDiagonalMark) {
		    leftDiagonalWin = false;
		}
		if(grid[i][2 - i] !== rightDiagonalMark) {
		    rightDiagonalWin = false;
		}
		let colMark = grid[0][i];
		let colWin = colMark !== '';
		let rowMark = grid[i][0];
		let rowWin = rowMark !== '';
   
		for(let j = 1; j < 3; ++j) {
		    if(grid[j][i] !== colMark) {
			console.log(grid[j][i]);
			console.log(colMark);
			console.log('here');
			colWin = false;
		    }
		    if(grid[i][j] !== rowMark) {
			rowWin = false;
		    }
		}
		if(colWin || rowWin) {
		    straightWin = true;
		}
	    }
	    if(leftDiagonalWin || rightDiagonalWin || straightWin) {
		$container.off();
		let button = '<button>Play Again?</button>';
		$container.append(`<div class="win">${turn} wins${button}</div>`);
		$('button').on('click', function() {
			
			$container.children().remove();
			construct();
		    });
	    }
	}
  
	const checkDraw = () => {
	    
	    let leftDiagonalMark = grid[0][0];
	    let leftDiagonalOpen = true;
	    let rightDiagonalMark = grid[0][2];
	    let rightDiagonalOpen = true;
	    let straightOpen = false;
    
	    for(let i = 0; i < 3; ++i) {
		if(grid[i][i] !== leftDiagonalMark) {
		    if(leftDiagonalMark === '') {
			leftDiagonalMark = grid[i][i];
		    }
		    else if(grid[i][i] !== '') { 
			leftDiagonalOpen = false; 
		    }
		}
		if(grid[i][2 - i] !== rightDiagonalMark) {
		    if(rightDiagonalMark === '') {
			rightDiagonalMark = grid[i][2 - i];
		    }
		    else if(grid[i][2 - i] !== '') { 
			rightDiagonalOpen = false; 
		    }
		}
		let colMark = grid[0][i];
		let colOpen = true;
		let rowMark = grid[i][0];
		let rowOpen = true;
   
		for(let j = 1; j < 3; ++j) {
		    if(grid[j][i] !== colMark) {
			if(colMark === '') {
			    colMark = grid[j][i];
			}
			else if(grid[j][i] !== '') { 
			    colOpen = false;
			}
		    }
		    if(grid[i][j] !== rowMark) {
			if(rowMark === '') {
			    rowMark = grid[i][j];
			}
			else if(grid[i][j] !== '') { 
			    rowOpen = false;
			}
		    }
		}
		if(colOpen || rowOpen) {
		    straightOpen = true;
		}
	    }
	    console.log(leftDiagonalOpen);
	    console.log(rightDiagonalOpen);
	    console.log(straightOpen);
	    console.log('end');
	    if(!(leftDiagonalOpen || rightDiagonalOpen || straightOpen)) {
		$container.off();
		let button = '<button>Play Again?</button>';
		$container.append(`<div class="win">It's a draw!${button}</div>`);
     $('button').on('click', function() {
      
      $container.children().remove();
        construct();
      });
    }
  }
  
  const mark = (id) => {
  let r = parseInt(id.charAt(0));
    let c = parseInt(id.charAt(1));
    if(!grid[r][c]) {
    grid[r][c] = turn;
      checkWin();
      checkDraw();
      switchTurn();
      render();
    }
  }; 
  
  const makeGrid = () => {
  grid = [];
    for(let i = 0; i < 3; ++i) {
    grid.push(new Array(3).fill(''));
    }
  };
  
const construct = () => {
  makeGrid();
    render();
    turn = 'X';
    $container.on('click', function(event) {
    let id = $(event.target).attr('id');
      mark(id);
    });
  } 
  
  return {construct: construct};
})();

game.construct();
*/