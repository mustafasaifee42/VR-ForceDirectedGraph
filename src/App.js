import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './Graph';
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import data from './data.json';

class App extends Component {
  render() {
        return <Graph 
        data = {data}
        />
  }
}

export default App;
