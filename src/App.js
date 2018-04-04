import React, { Component } from 'react';
import Snake from './games/Snake';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Snake />
      </div>
    );
  }
}

export default App;
