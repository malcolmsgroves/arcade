import React, { Component } from 'react';
import Snake from './games/Snake';
import Tic from './games/Tic';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
            <Snake />
	    <Tic />
      </div>
    );
  }
}

export default App;
