import React, { Component } from 'react';
import './Tic.css';

class Tic extends Component {
    constructor(props) {
	super(props);
	this.state = newGame();
	this.isWin = this.isWin.bind(this);
	this.move = this.move.bind(this);
    }

    move(row, col) {
	if(!this.state.winner && this.state.board[row][col] === null) {
	    let newBoard = this.state.board;
	    const turn = this.state.turn;
	    newBoard[row][col] = this.state.turn;
	    this.setState((prev) => {
		    return {
		    board: newBoard,
		    turn: prev.turn === 'X' ? 'O' : 'X'
		    };
		});
	    this.isWin(row, col, turn);
	}
    };

    isWin(row, col, turn) {
	let rowWin = true;
	let colWin = true;
	for(let i = 0; i < 3; ++i) {
	    if(this.state.board[row][i] !== turn) rowWin = false;
	    if(this.state.board[i][col] !== turn) colWin = false;
	}
	let leftDiag = false;
	let rightDiag = false;
	if(row === col) {
	    leftDiag = true;
	    for(let i = 0; i < 3; ++i) {
		if(this.state.board[i][i] !== turn) leftDiag = false;
	    }
	}
	if(row === (2 - col)) {
	    rightDiag = true;
	    for(let i = 0; i < 3; ++i) {
		if(this.state.board[i][2-i] !== turn) rightDiag = false;
	    }
	}
	console.log(rowWin);
	console.log(colWin);
	console.log(leftDiag);
	console.log(rightDiag);
	if(rowWin || colWin || leftDiag || rightDiag) {
	    this.setState({ winner: turn });
	}
    }

    render() {
	let boardElement = this.state.board.map((row, r) => {
		let rowElement = row.map((square, c) => {
			return ( 
			    <li
			    key={c}
			    className="square"
			    onClick={() => this.move(r, c)}>
			    {square}
			    </li>
			    ); });
		return <div key={r} className="row">{ rowElement }</div>;
	    });
	return (
	    <div className="tic">
	    <div className="header">{this.state.winner ? `${this.state.winner} wins!` : null}</div>
		{ boardElement }
	    </div>);
	
    }

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
	    winner: null
	    };
}

export default Tic;
