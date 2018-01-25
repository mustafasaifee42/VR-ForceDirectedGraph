import React, { Component } from 'react';
import './App.css';
import { select } from 'd3-selection';
import { csv } from 'd3-request';
import * as d3 from 'd3';
import * as d3_force from 'd3-force-3d'; 
import * as d3Force from 'd3-force'; 
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';

let aframeExtrasTube = require("aframe-extras")
 
// Register everything.
aframeExtrasTube.registerAll();

class Graph extends Component {
   constructor(props){
      super(props)
      this.state = {
          width: this.props.width,
          height: this.props.height,
          data: this.props.data,  
        }
      this.createForceDirected = this.createForceDirected.bind(this)
    }
  componentDidUpdate() {
      this.createForceDirected()
    }
  componentDidMount() {
      this.createForceDirected()
    }
  createForceDirected(){
   let color = d3.scaleOrdinal(d3.schemeCategory20);
   let dataTemp = this.state.data;
   let simulation = d3_force.forceSimulation()
        .numDimensions(3)
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(0,0,-3));
    
    function getNeighbors(node) {
      return dataTemp.links.reduce(function (neighbors, link) {
          if (link.target.id === node.id) {
            neighbors.push(link.source.id)
          } else if (link.source.id === node.id) {
            neighbors.push(link.target.id)
          }
          return neighbors
        },
        [node.id]
      )
    }

    function isNeighborLink(node, link) {
      return link.target.id === node.id || link.source.id === node.id
    }


    function getNodeOpacity(node, neighbors) {
      if (Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1) {
        return node.level === 1 ? 1 : 1
      }

      return node.level === 1 ? 0.3 : 0.3
    }


    function getLinkVisibility(node, link) {
      return isNeighborLink(node, link) ? true : false
    }

    function getTextOpacity(node, neighbors) {
      if (Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1) {
        return node.level === 1 ? 1 : 1
      }

      return node.level === 1 ? 0.3 : 0.3
    }
  
    function selectNode(selectedNode) {
      let neighbors = getNeighbors(selectedNode)
      node.attr('opacity', d => getNodeOpacity(d, neighbors))
      d3.selectAll('.links').attr('visible', d => getLinkVisibility(selectedNode, d));
      nodeName.attr('text',d => `value: ${d.id}; anchor: left; width: 5; color: #7e7e7e; opacity:${getTextOpacity(d, neighbors)}`);
    }
  
    function deselectNode(selectedNode) {
      let neighbors = getNeighbors(selectedNode)
      node.attr('opacity', d => 1)
      d3.selectAll('.links').attr('visible', true)
      nodeName.attr('text',d => `value: ${d.id}; anchor: left; width: 5; color: #7e7e7e; opacity:0.8`);
    }

    let node = d3.selectAll('a-scene')
	      .selectAll('a-sphere')
        .data(this.state.data.nodes)
        .enter()
        .append("a-sphere")
        .attr('color',d => color(d.group))
        .attr('radius','0.25')
        .attr('opacity',1)
        .on('mouseenter', selectNode)
        .on('mouseleave', deselectNode);
        

    let nodeName = d3.selectAll('a-scene')
	      .selectAll('a-entity.names')
        .data(this.state.data.nodes)
        .enter()
        .append("a-entity")
        .attr('class','names')
        .attr('text',d => `value: ${d.id}; anchor: left; width: 5; color: #7e7e7e; opacity:0.8`);
    simulation
        .nodes(this.state.data.nodes)
        .on("tick", ticked)
        .on('end',() => {
          d3.selectAll('a-scene')
            .selectAll('a-tube.links')
            .data(this.state.data.links)
            .enter()
            .append("a-tube")
            .attr('class','links')
            .attr('path', (d,i) => {
              return `${xScale(d.source.x)} ${yScale(d.source.y)} ${zScale(d.source.z)}, ${xScale(d.target.x)} ${yScale(d.target.y)} ${zScale(d.target.z)}`
            })
            .attr('material','color:#ccc')
            .attr('radius', d => radiusScale(d.value).toString())
            .attr('visible', true)
        });
    console.log(d3.min(this.state.data.nodes, (d) =>  d.x),d3.max(this.state.data.nodes, (d) =>  d.x))
    let xScale = d3.scaleLinear()
      .domain([d3.min(this.state.data.nodes, (d) =>  d.x), d3.max(this.state.data.nodes, (d) =>  d.x)])
      .range([0,10])
    let yScale = d3.scaleLinear()
      .domain([d3.min(this.state.data.nodes, (d) =>  d.y), d3.max(this.state.data.nodes, (d) =>  d.y)])
      .range([0,10])
    let zScale = d3.scaleLinear()
      .domain([d3.min(this.state.data.nodes, (d) =>  d.z), d3.max(this.state.data.nodes, (d) =>  d.z)])
      .range([-10,0])
    let radiusScale = d3.scaleLinear()
      .domain([d3.min(this.state.data.links, (d) =>  d.value), d3.max(this.state.data.links, (d) =>  d.value)])
      .range([0.01,0.05])
    simulation.force("link")
        .links(this.state.data.links);

    function ticked() {
     node
          .attr("position", (d,i) => {
            return `${xScale(d.x)} ${yScale(d.y)} ${zScale(d.z)}`
          })
     nodeName
        .attr('position',(d,i) => {
            return `${xScale(d.x) + 0.3} ${yScale(d.y)} ${zScale(d.z)}`
          })
    }
}
  
  render() {
  
console.log(aframeExtrasTube)
  return(

      <Scene class = {'scene'} ref={node => this.node = node}>
        <a-assets>
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
          <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
        </a-assets>

        
         <Entity primitive="a-sky" color="#ccc" height="100" width="100" />

        <Entity primitive="a-camera">
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 15000}}/>
        </Entity>
      </Scene>)
  }
}
export default Graph
