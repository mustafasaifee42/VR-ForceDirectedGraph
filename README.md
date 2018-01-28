# VR-ForceDirectedGraph
[![Sponsored](https://img.shields.io/badge/chilicorn-sponsored-brightgreen.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAMAAADjyg5GAAABqlBMVEUAAAAzmTM3pEn%2FSTGhVSY4ZD43STdOXk5lSGAyhz41iz8xkz2HUCWFFhTFFRUzZDvbIB00Zzoyfj9zlHY0ZzmMfY0ydT0zjj92l3qjeR3dNSkoZp4ykEAzjT8ylUBlgj0yiT0ymECkwKjWqAyjuqcghpUykD%2BUQCKoQyAHb%2BgylkAyl0EynkEzmkA0mUA3mj86oUg7oUo8n0k%2FS%2Bw%2Fo0xBnE5BpU9Br0ZKo1ZLmFZOjEhesGljuzllqW50tH14aS14qm17mX9%2Bx4GAgUCEx02JySqOvpSXvI%2BYvp2orqmpzeGrQh%2Bsr6yssa2ttK6v0bKxMBy01bm4zLu5yry7yb29x77BzMPCxsLEzMXFxsXGx8fI3PLJ08vKysrKy8rL2s3MzczOH8LR0dHW19bX19fZ2dna2trc3Nzd3d3d3t3f39%2FgtZTg4ODi4uLj4%2BPlGxLl5eXm5ubnRzPn5%2Bfo6Ojp6enqfmzq6urr6%2Bvt7e3t7u3uDwvugwbu7u7v6Obv8fDz8%2FP09PT2igP29vb4%2BPj6y376%2Bu%2F7%2Bfv9%2Ff39%2Fv3%2BkAH%2FAwf%2FtwD%2F9wCyh1KfAAAAKXRSTlMABQ4VGykqLjVCTVNgdXuHj5Kaq62vt77ExNPX2%2Bju8vX6%2Bvr7%2FP7%2B%2FiiUMfUAAADTSURBVAjXBcFRTsIwHAfgX%2FtvOyjdYDUsRkFjTIwkPvjiOTyX9%2FAIJt7BF570BopEdHOOstHS%2BX0s439RGwnfuB5gSFOZAgDqjQOBivtGkCc7j%2B2e8XNzefWSu%2BsZUD1QfoTq0y6mZsUSvIkRoGYnHu6Yc63pDCjiSNE2kYLdCUAWVmK4zsxzO%2BQQFxNs5b479NHXopkbWX9U3PAwWAVSY%2FpZf1udQ7rfUpQ1CzurDPpwo16Ff2cMWjuFHX9qCV0Y0Ok4Jvh63IABUNnktl%2B6sgP%2BARIxSrT%2FMhLlAAAAAElFTkSuQmCC)](http://spiceprogram.org/oss-sponsorship)

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
