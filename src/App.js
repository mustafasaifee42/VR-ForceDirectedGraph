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
          width = {10}
          height = {10}
          depth = {10}
          data = {data}
          backgroundColor = {'#eee'}
          nodeFill = {'#ccc'}
          nodeRadius = {0.5}
          nodeRadiusScale = {false}
          nodeFillScale = {true}
          nodeFillColumn = {'group'}
          nodeFillDomain = {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]}
          linkColor = {'#aaa'}
          linkColorScale = {false}
          linkStroke = {0.1}
          linkStrokeScale = {true}
          linkStrokeColumn = {'value'}
          linkStrokeRange = {[0.01,0.05]}
        />
  }
}

export default App;
