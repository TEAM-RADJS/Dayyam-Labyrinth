//javascript
mapData = {};

function makeNewMaze(){
	//Robert TODO: build a process by which a new array of arrays is created with the proper lengths, and to ensure that there IS a path to the end
	//Robert TODO: assign mapData these key value pairs {map: [ [], [], [], [] ],  playerPosition: [y, x], mosterOnePosition: [y, x], monsterTwoPosition: [y, x]}
}

function showEnvironment(){
	function showTable(increments){
		//TODO: create a variable called checkPosition and assign it the value of mapData['map'][(mapData['playerPosition'][0])+increments[0]][(mapData['playerPosition'][1])+increments[1]]
		//TODO: use DOM to assign the image with id String((mapData['playerPosition'][0])+increments[0])+'-'+String((mapData['playerPosition'][1])+increments[1]) a source attribute dependant on the value of checkPosition
	}
	//TODO: write a for loop to iterate over all image id's and assign the empty image source
	//Robert TODO: translate the printEnvironment function from Dungeon_Game into javaScript here
}

function hunterMove(){
	//Robert TODO: translate aStar function from Dungeon_Game into javaScript here
}

function movePlayer(keyPressed){
	var acceptedMoves = ['w', 'a', 's', 'd', 'space'];
	//TODO: check if acceptedMoves.includes(keyPressed)
	//TODO: if not, return a null value
	//TODO: if yes create conditions for each key option other than space
	//TODO: for w, check if mapData['map'][(mapData['playerPosition'][0])-1][(mapData['playerPosition'][1])] is a traversible tile; if it is mapData['playerPosition'][0] -= 1;
	//TODO: for s, check if mapData['map'][(mapData['playerPosition'][0])+1][(mapData['playerPosition'][1])] is a traversible tile; if it is mapData['playerPosition'][0] += 1;
	//TODO: for a, check if mapData['map'][(mapData['playerPosition'][0])][(mapData['playerPosition'][1])-1] is a traversible tile; if it is mapData['playerPosition'][1] -= 1;
	//TODO: for d, check if mapData['map'][(mapData['playerPosition'][0])][(mapData['playerPosition'][1])+1] is a traversible tile; if it is mapData['playerPosition'][1] += 1;
	//TODO: outside of the key specific conditionals, call the hunterMove() function and then the showEnvironment function
}

function startGame(){
	//TODO: call the procedural generation function makeNewMaze()
	//TODO: Use DOM to change the background-image:url(assets/imagefile)); attribute of the container used in initial state, and add new elements to make up the new screen (including a table with a tbody to receive the map data), start audio
	//TODO: write a loop to iterate over mapData['map'] and create a 'tr' element for each inner array, and then in a nested for loop a 'td' for each index inside of that array, and assign that td the innerHTML of an 'img' element, assign the image a source attribute for a blank/monocolor block image and give it an id of String(i)+'-'+String(j)
	//TODO: call the showEnvironment() function
	//TODO: addEvent listeners for 'key-up' that triggers a movement; f.e. document.addEventListener("keyup", function(e){e.preventDefault(); moveUp(e.key);})
}


//TODO: identify form elements and attach eventListeners; assuming the initial state is just a splash art backdrop with a start game button just one eventListener to call the startGame() function and audio