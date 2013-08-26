var cheapest_paths = require('./graph-paths').cheapest_paths;

console.log("graph-paths.js demo start");

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
