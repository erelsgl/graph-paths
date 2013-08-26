var util = require("util");

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
 * @param start one of the nodes (0...n-1).
 * @return an array, where element j is: 
 * 	{ distance: best_distance_from_i, path: best_path_from_i }
 * Uses a simple dynamic programming algorithm. 
 */
var best_paths = function(distances, start) {
	var numnodes = distances.length;

	// initialization:
	var numsteps = 1;
	var distances_from_start_using_numsteps = [];
	for (var targetnode=0; targetnode<numnodes; ++targetnode) {
		distances_from_start_using_numsteps[targetnode] = {
			distance: distances[start][targetnode],
			path: targetnode==start? [start]: [start, targetnode]
		}
	}
	console.dir(distances_from_start_using_numsteps);
	
	for (++numsteps; numsteps<numnodes; ++numsteps) {
		var distances_from_start_using_numsteps_plus_1 = [];
		for (var targetnode=0; targetnode<numnodes; ++targetnode) {
			var distance_from_start_through_middle_using_numsteps_plus_1 = [];
			for (var middlenode=0; middlenode<numnodes; ++middlenode) {
				distance_from_start_through_middle_using_numsteps_plus_1[middlenode] = 
					distances_from_start_using_numsteps[middlenode].distance +
					distances[middlenode][targetnode];
			}
			var bestMiddlenode = argmin(distance_from_start_through_middle_using_numsteps_plus_1);
			var bestDistance =   distance_from_start_through_middle_using_numsteps_plus_1[bestMiddlenode];
			if (bestDistance != distances_from_start_using_numsteps[targetnode].distance) {
				distances_from_start_using_numsteps_plus_1[targetnode] = {
					distance: distance_from_start_through_middle_using_numsteps_plus_1[bestMiddlenode],
					path: distances_from_start_using_numsteps[bestMiddlenode].path.concat([targetnode])
				}
			} else {
				distances_from_start_using_numsteps_plus_1[targetnode] = distances_from_start_using_numsteps[targetnode]
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

	var distances = [
        [0,1,7,20],
	    [Infinity,0,4,19],
	    [Infinity,Infinity,0,7],
	    [Infinity,Infinity,Infinity,0],
	];
	
	console.dir(distances);
	
	console.dir(best_paths(distances, 0)); 
	
	console.log("graph-paths.js demo end");
}
