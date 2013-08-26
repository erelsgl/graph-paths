var util = require("util");
var sylvester = require('sylvester');

var argmax = function(array, iterator) {
	var max = -Infinity;
	var arg = -1;
	for (var i=0; i<array.length; ++i) {
		var element = (iterator? iterator(array[i]): array[i]);
		if (element>max) {
			max = element;
			arg = i;
		}
	}
	return arg;
}

var argmin = function(array, iterator) {
	var min = Infinity;
	var arg = -1;
	for (var i=0; i<array.length; ++i) {
		var element = (iterator? iterator(array[i]): array[i]);
		if (element<min) {
			min = element;
			arg = i;
		}
	}
	return arg;
}

/**
 * @param distances a square matrix, n-by-n, where element (i,j) is the direct distance from node i to node j.
 * All distances are assumed to be non-negative.
 * @param start one of the nodes (1...n).
 * @return an array, where element j is: 
 * 	{ best_distance_from_i, best_path_from_i }
 * Uses a simple dynamic programming algorithm. 
 */
var best_paths = function(distances, start) {
	var numnodes = distances.cols();
	if (numnodes != distances.rows())
		throw new Error("distances matrix must be square");

	// initialization:
	var numsteps = 1;
	var distances_from_start_using_numsteps = [];
	for (var targetnode=1; targetnode<=numnodes; ++targetnode) {
		distances_from_start_using_numsteps[targetnode-1] = {
			distance: distances.e(start, targetnode),
			path: targetnode==start? [start]: [start, targetnode]
		}
	}
	console.dir(distances_from_start_using_numsteps);
	
	for (++numsteps; numsteps<numnodes; ++numsteps) {
		var distances_from_start_using_numsteps_plus_1 = [];
		for (var targetnode=1; targetnode<=numnodes; ++targetnode) {
			var distance_from_start_through_middle_using_numsteps_plus_1 = [];
			for (var middlenode=1; middlenode<=numnodes; ++middlenode) {
				distance_from_start_through_middle_using_numsteps_plus_1[middlenode-1] = 
					distances_from_start_using_numsteps[middlenode-1].distance +
					distances.e(middlenode, targetnode);
			}
			var bestMiddlenode = argmin(distance_from_start_through_middle_using_numsteps_plus_1)+1;
			var bestDistance =   distance_from_start_through_middle_using_numsteps_plus_1[bestMiddlenode-1];
			if (bestDistance != distances_from_start_using_numsteps[targetnode-1].distance) {
				distances_from_start_using_numsteps_plus_1[targetnode-1] = {
					distance: distance_from_start_through_middle_using_numsteps_plus_1[bestMiddlenode-1],
					path: distances_from_start_using_numsteps[bestMiddlenode-1].path.concat([targetnode])
				}
			} else {
				distances_from_start_using_numsteps_plus_1[targetnode-1] = distances_from_start_using_numsteps[targetnode-1]
			}
		}
		distances_from_start_using_numsteps = distances_from_start_using_numsteps_plus_1;
		console.dir(distances_from_start_using_numsteps);
	}
	
	return distances_from_start_using_numsteps_plus_1;
}

module.exports = {
	best_paths: best_paths
}


if (process.argv[1] === __filename) {
	console.log("graph-paths.js demo start");

	var distances = $M([
        [0,1,7,20],
	    [Infinity,0,4,19],
	    [Infinity,Infinity,0,7],
	    [Infinity,Infinity,Infinity,0],
	]);
	
	console.dir(distances);
	
	console.dir(best_paths(distances, 1)); 
	
	console.log("graph-paths.js demo end");
}
