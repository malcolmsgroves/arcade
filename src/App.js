import React, { Component } from 'react';
import Snake from './games/Snake';
import Tic from './games/Tic';
import Minesweeper from './games/Minesweeper';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
            <Snake />
	    <Tic />
            <Minesweeper />
      </div>
    );
  }
}

export default App;
