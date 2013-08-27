var cheapest_paths = require('./graph-paths').cheapest_paths;

console.log("graph-paths.js demo start");

/*
 * The network is defined by a matrix describing the cost of getting from node i to node j.
 * If there is no way from node i to node j, then the cost is infinite.
 */
var costs = [
    [0,1,7,20],
    [Infinity,0,4,19],
    [Infinity,Infinity,0,7],
    [Infinity,Infinity,Infinity,0],
];

console.log("costs matrix: ");
console.dir(costs);

console.log("cheapest paths from node #0:");
console.dir(cheapest_paths(costs, 0)); 

console.log("graph-paths.js demo end");
