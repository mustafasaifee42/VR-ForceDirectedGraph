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
          data: this.props.data,  
          backgroundColor: (this.props.backgroundColor == null ? '#fff' : this.props.backgroundColor),
          nodeFill: (this.props.nodeFill == null ? '#000' : this.props.nodeFill),
          nodeRadius: (this.props.nodeRadius == null ? 0.25 : this.props.nodeRadius),
          nodeRadiusScale: (this.props.nodeRadiusScale == null ? false : this.props.nodeRadiusScale),
          nodeRadiusColumn: this.props.nodeRadiusColumn,
          nodeRadiusRange: (this.props.nodeRadiusRange == null ? [0.1,0.5] : this.props.nodeRadiusRange),
          nodeFillScale: (this.props.nodeFillScale == null ? false : this.props.nodeFillScale),
          nodeFillColumn: this.props.nodeFillColumn,
          nodeFillDomain: this.props.nodeFillDomain,
          nodeFillRange: (this.props.nodeFillRange == null ? 'schemeCategory20': this.props.width),
          linkColor: (this.props.linkColor == null ? '#000' : this.props.linkColor),
          linkColorScale: (this.props.linkColorScale == null ? false : this.props.linkColorScale),
          linkColorColumn: this.props.linkColorColumn,
          linkColorDomain: this.props.linkColorDomain,
          linkColorRange: (this.props.linkColorRange == null ? 'schemeCategory20' : this.props.linkColorRange),
          linkStroke: (this.props.linkStroke == null ? 0.05 : this.props.linkStroke),
          linkStrokeScale: (this.props.linkStrokeScale == null ? false : this.props.linkStrokeScale),
          linkStrokeColumn: this.props.linkStrokeColumn,
          linkStrokeRange: (this.props.linkStrokeRange == null ? [0.01,0.05] : this.props.linkStrokeRange),
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
    let nodeColorScale, radiusScale, linkColorScale, linkRadiusScale;
    // scales
    if(this.state.nodeFillScale){
      nodeColorScale = d3.scaleOrdinal(d3.schemeCategory20)
        .domain(this.state.nodeFillDomain);
      if(this.state.nodeFillRange != 'schemeCategory20'){
        nodeColorScale = d3.scaleOrdinal()
        .domain(this.state.nodeFillDomain)
        .range(this.stata.nodeFillRange)
      }
    } 
    if(this.state.nodeRadiusScale){
      radiusScale = d3.scaleSqrt()
        .domain([d3.min(this.state.data.nodes, (d) =>  d[this.state.nodeRadiusColumn]), d3.max(this.state.data.nodes, (d) =>  d[this.state.nodeRadiusColumn])])
        .range(this.state.nodeRadiusRange)
    } 
    if(this.state.linkColorScale){
      linkColorScale = d3.scaleOrdinal(d3.schemeCategory20)
        .domain(this.state.linkColorDomain);
      if(this.state.linkColorScale != 'schemeCategory20'){
        linkColorScale = d3.scaleOrdinal()
        .domain(this.state.linkColorDomain)
        .range(this.stata.linkColorRange)
      }
    } 
    if(this.state.linkStrokeScale){
      linkRadiusScale = d3.scaleLinear()
        .domain([d3.min(this.state.data.links, (d) =>  d[this.state.linkStrokeColumn]), d3.max(this.state.data.links, (d) =>  d[this.state.linkStrokeColumn])])
        .range(this.state.linkStrokeRange)
    } 
   //-----------------------//

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
        .attr('color',(d) => {
          if(this.state.nodeFillScale){
            return `${nodeColorScale(d[this.state.nodeFillColumn])}`
          } else
            return `${this.state.nodeFill}`
        })
        .attr('radius', d => {
          if(this.state.nodeRadiusScale)
            return radiusScale(d[this.state.nodeRadiusColumn]).toString()
          else
            return this.state.nodeRadius.toString()
        })
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
              return `${(d.source.x/10)} ${(d.source.y/10)} ${(d.source.z/10)}, ${(d.target.x/10)} ${(d.target.y/10)} ${(d.target.z/10)}`
            })
            .attr('material',(d) => {
              if(this.state.linkColorScale){
                return `color:${linkColorScale(d[this.state.linkColorColumn])}`
              } else
                return `color:${this.state.linkColor}`
            })
            .attr('radius', d => {
              if(this.state.linkStrokeScale)
                return linkRadiusScale(d[this.state.linkStrokeColumn]).toString()
              else
                return this.state.linkStroke.toString()
            })
            .attr('visible', true)
        });
    console.log(d3.min(this.state.data.nodes, (d) =>  d.x),d3.max(this.state.data.nodes, (d) =>  d.x))

    simulation.force("link")
        .links(this.state.data.links);
    
    let nodeRad = this.state.nodeRadius + 0.05

    function ticked() {
     node
          .attr("position", (d,i) => {
            return `${d.x/10} ${(d.y/10)} ${(d.z/10)}`
          })
     nodeName
        .attr('position',(d,i) => {
            return `${(d.x/10) + nodeRad} ${(d.y/10)} ${d.z/10}`
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

        
         <Entity primitive="a-sky" color={this.state.backgroundColor} height="100" width="100" />

        <Entity primitive="a-camera">
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 15000}}/>
        </Entity>
      </Scene>)
  }
}
export default Graph
