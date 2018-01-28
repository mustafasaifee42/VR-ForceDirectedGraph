# VR-ForceDirectedGraph

VR-ForceDirectedGraph is a reusable 3D force directed graph visualization components for Virtual Reality. It combines d3 with react and a-frame to generate the visualization.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This project also uses [3d-Force-d3](https://github.com/vasturiano/d3-force-3d) by [Vasco Asturiano](https://github.com/vasturiano)

### Installation

This project uses yarn. Install it as described here [https://yarnpkg.com/lang/en/](https://yarnpkg.com/lang/en/) if you haven't already.

To install this project, simply clone the repo and run yarn

### Local Development
In the project directory, you can run:
```
yarn start
```
Runs the app in the development mode.

```
<Graph 
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
```

#### Properties

Name|Default|Type|Description
--- | --- | --- | ---
width||Float|Width of the graph **(Required)**
height||Float|Height of the graph **(Required)**
depth||Float|Depth of the graph **(Required)**
data||Object|Data needs to be in json format **(Required)**
backgroundColor|`#fff`|String|Background color
nodeFill|`#000`|String|Color of the nodes
nodeRadius|`0.25`|Float|Radius of the nodes
nodeRadiusScale|`false`|Boolean|`true` or `false` depending upon if nodes needs to be scaled based on an attribute
nodeRadiusColumn||String|Attribute on basis of which the nodes are scaled **(Required only if `nodeRadiusScale` is `true`)**
nodeRadiusRange|`[0.1,0.5]`|Array|Range of possible output values for nodes' radius
nodeFillScale|`false`|Boolean|`true` or `false` depending upon if nodes needs to be colored categorically based on an attribute
nodeFillColumn||String|Attribute on basis of which the nodes are colored **(Required only if `nodeFillScale` is `true`)**
nodeFillDomain||Array|Array of all the possible values for the node category **(Required only if `nodeFillScale` is `true`)**
nodeFillRange|`Category20`|Array of String|All possible output value of colors in hex format in array
linkColor|`#000`|String|Color of the link
linkColorScale|`false`|Boolean|`true` or `false` depending upon if links needs to be colored categorically based on an attribute
linkColorColumn||String|Attribute on basis of which the link are colored categorically **(Required only if `linkColorScale` is `true`)**
linkColorDomain||Array|Array of all the possible values for the link category **(Required only if `linkColorScale` is `true`)**
linkColorRange|`Category20`|Array of String|All possible output value of colors in hex format in array
linkStroke|`0.05`|Float|Stroke width of the link
linkStrokeScale|`false`|Boolean|`true` or `false` depending upon if stroke of links needs to be scaled based on an attribute
linkStrokeColumn||String|Attribute on basis of which the stroke of links are scaled **(Required only if `linkStrokeScale` is `true`)**
linkStrokeRange|`[0.01,0.05]`|Array|Range of possible output stroke width

#### Data Format
```
{
  "nodes": [
    {"id": "Myriel", "group": 1},
    {"id": "Napoleon", "group": 1},
    {"id": "Mlle.Baptistine", "group": 1},
  ],
  "links": [
    {"source": "Napoleon", "target": "Myriel", "value": 1},
    {"source": "Mlle.Baptistine", "target": "Myriel", "value": 8},
    {"source": "Mme.Magloire", "target": "Myriel", "value": 10},
  ]
}
```
