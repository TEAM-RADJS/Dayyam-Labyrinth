//javascript
mapData = {};

<<<<<<< Updated upstream
function gameOver(){
	//TODO: design what we want losing to look like, and then use DOM to set the page to look like that
	//Thoughts here?
	//TODO: set #containerDiv.innerHTML = '';
	//TODO: set #containerDiv.setAttribute('backgound-image', 'url(assets/captured.jpg)')
}

=======
var WALL = 0;
var FLOOR = 1;
var SAFE = 2;
var MONSTER = 4;
>>>>>>> Stashed changes

function makeNewMaze(){
	//Robert TODO: build a process by which a new array of arrays is created with the proper lengths, and to ensure that there IS a path to the end
	//Robert TODO: assign mapData these key value pairs {map: [ [], [], [], [] ],  playerPosition: [y, x], mosterNOrigin: [y, x]}
	var mapSize = 50;
	var mapMargin = mapSize / 3;

	mapData.map = [];

	for (let i = 0; i < mapSize; i++) {
		mapData.map.push([]);
		for (let j = 0; j < mapSize; j++) {
			mapData.map[i].push(0);
		}
	}

	function generateMap(){

		mapData.playerPosition = [];
		mapData.playerPosition.push(Math.ceil(Math.random()*(mapSize-2*mapMargin)+mapMargin));
		mapData.playerPosition.push(Math.ceil(Math.random()*(mapSize-2*mapMargin)+mapMargin));

		mapData.map[mapData.playerPosition[0]][mapData.playerPosition[1]] = 1;

		curY = mapData.playerPosition[0];
		curX = mapData.playerPosition[1];

		var triedToStep = 0;
		var madeAStep = 0;
		var monsterCount = 0;

		do {
			var upRand = Math.random()*10;
			var downRand = Math.random()*10;
			var rightRand = Math.random()*10;
			var leftRand = Math.random()*10;

			if (upRand > downRand && upRand > rightRand && upRand > leftRand) {
				triedToStep++;
				if (mapData.map[curY-1][curX] == 0 && (mapData.map[curY-1][curX+1] != 1 || mapData.map[curY-1][curX-1] != 1)){
					triedToStep = 0;
					madeAStep++;
					curY-=1;
					if (madeAStep%120 == 0){
						monsterCount++;
						mapData.map[curY][curX] = parseInt('4'+String(monsterCount));
						eval('mapData.monster'+monsterCount+'Origin = []');
						eval('mapData.monster'+monsterCount+'Origin.push(curY)');
						eval('mapData.monster'+monsterCount+'Origin.push(curX)');
					} else if (madeAStep%20 == 0){
						mapData.map[curY][curX] = 2;
					} else {
						mapData.map[curY][curX] = 1;
					}
				}
			} else if (downRand > rightRand && downRand > leftRand) {
				triedToStep++;
				if (mapData.map[curY+1][curX] == 0 && (mapData.map[curY+1][curX+1] != 1 || mapData.map[curY+1][curX-1] != 1)){
					triedToStep = 0;
					madeAStep++;
					curY+=1;
					if (madeAStep%120 == 0){
						monsterCount++;
						mapData.map[curY][curX] = parseInt('4'+String(monsterCount));
						eval('mapData.monster'+monsterCount+'Origin = []');
						eval('mapData.monster'+monsterCount+'Origin.push(curY)');
						eval('mapData.monster'+monsterCount+'Origin.push(curX)');
					} else if (madeAStep%20 == 0){
						mapData.map[curY][curX] = 2;
					} else {
						mapData.map[curY][curX] = 1;
					}
				}
			} else if (rightRand > leftRand) {
				triedToStep++;
				if (mapData.map[curY][curX+1] == 0 && (mapData.map[curY+1][curX+1] != 1 || mapData.map[curY-1][curX+1] != 1)){
					triedToStep = 0;
					madeAStep++;
					curX+=1;
					if (madeAStep%120 == 0){
						monsterCount++;
						mapData.map[curY][curX] = parseInt('4'+String(monsterCount));
						eval('mapData.monster'+monsterCount+'Origin = []');
						eval('mapData.monster'+monsterCount+'Origin.push(curY)');
						eval('mapData.monster'+monsterCount+'Origin.push(curX)');
					} else if (madeAStep%20 == 0){
						mapData.map[curY][curX] = 2;
					} else {
						mapData.map[curY][curX] = 1;
					}
				}
			} else {
				triedToStep++;
				if (mapData.map[curY][curX-1] == 0 && (mapData.map[curY+1][curX-1] != 1 || mapData.map[curY-1][curX-1] != 1)){
					triedToStep = 0;
					madeAStep++;
					curX-=1;
					if (madeAStep%120 == 0){
						monsterCount++;
						mapData.map[curY][curX] = parseInt('4'+String(monsterCount));
						eval('mapData.monster'+monsterCount+'Origin = []');
						eval('mapData.monster'+monsterCount+'Origin.push(curY)');
						eval('mapData.monster'+monsterCount+'Origin.push(curX)');
					} else if (madeAStep%20 == 0){
						mapData.map[curY][curX] = 2;
					} else {
						mapData.map[curY][curX] = 1;
					}
				}
			} 
			if (triedToStep == 10) {
				madeAStep++;
				if (upRand > downRand && upRand > rightRand && upRand > leftRand) {
					curY--;
				} else if (downRand > rightRand && downRand > leftRand) {
					curY++;
				} else if (rightRand > leftRand) {
					curX++;
				} else {
					curX--;
				}
				if (mapData.map[curY][curX] != 2 && mapData.map[curY][curX] != 4 && mapData.map[curY][curX] != 1 && madeAStep%20 != 0){
					mapData.map[curY][curX] = 1;
				} else {

					if (madeAStep%120 == 0){
						monsterCount++;
						mapData.map[curY][curX] = parseInt('4'+String(monsterCount));
						eval('mapData.monster'+monsterCount+'Origin = []');
						eval('mapData.monster'+monsterCount+'Origin.push(curY)');
						eval('mapData.monster'+monsterCount+'Origin.push(curX)');
					} else if (madeAStep%20 == 0){
						mapData.map[curY][curX] = 2;
					}

				}
				triedToStep = 0;
			}
		} while ((curY != 0 && curY != mapSize-1) && (curX != 0 && curX != mapSize-1));
		return madeAStep;
	}


	var goodMap = false;

	while (!goodMap) {
		var stepsCounted = generateMap();
		if (stepsCounted > mapSize*8) {
			goodMap = true;
		}
	}
}

function showEnvironment(){
	function show(increments){
		var checkPosition = mapData.map[(mapData['playerPosition'][0])+increments[0]][(mapData['playerPosition'][1])+increments[1]]
		//TODO: use DOM to assign the image with id String((mapData['playerPosition'][0])+increments[0])+'-'+String((mapData['playerPosition'][1])+increments[1]) a source attribute dependant on the value of checkPosition
		var tileImage = document.getElementById(String(mapData['playerPosition'][0]+increments[0])+'-'+String(mapData['playerPosition'][1]+increments[1]))
		if (checkPosition == 1) {
			tileImage.setAttribute('src', 'assets/floor.jpg');
		} else if (checkPosition == 0) {
			tileImage.setAttribute('src', 'assets/wall.jpg');
		} else if (checkPosition == 2) {
			tileImage.setAttribute('src', 'assets/safe.jpg');
		} else {
			tileImage.setAttribute('src', 'assets/monster.jpg');
		}
	}
	var map = mapData.map;
	var curY = mapData.playerPosition[0];
	var curX = mapData.playerPosition[1];
	var lastCol = mapData.map.length-1;
	var lastRow = mapData.map[0].length-1;
	//TODO: write a for loop to iterate over all image id's and assign the empty image source
	for (let i = 0; i < map.length; i++){
		for (let j = 0; j < map[i].length; j++){
			var tileImage = document.getElementById(String(i)+'-'+String(j));
			tileImage.setAttribute('src', 'assets/empty.jpg');
		}
	}
	//Robert TODO: translate the printEnvironment function from Dungeon_Game into javaScript here
	var selfTile = document.getElementById(String(curY)+'-'+String(curX));
	selfTile.setAttribute('src', 'assets/self.jpg')

	if (curX != 0){
		show([0, -1]);
		if (map[curY][curX-1] != 0){
			if (curY != lastRow){
				show([1, -1]);

				if (map[curY+1][curX-1] != 0){
					if (curY != lastRow-1){
						show([2, -1]);
						
						if (map[curY+2][curX-1] != 0){
							if (curX != 1){
								show([2, -2]);
							}
							if (curY != lastRow-2){
								show([3, -1]);
							}
						}
					}
					if (curX != 1){
						show([1, -2]);
						
						if (map[curY+1][curX-2] != 0){
							if (curX != 2){
								show([1, -3]);
							}
							if (curY != lastRow-1){
								show([2, -2]);
							}
						}
					}
				}
			}
			if (curY != 0){	
				show([-1, -1]);
				
				if (map[curY-1][curX-1] != 0){
					if (curY != 1){
						show([-2, -1]);
						if (map[curY-2][curX-1] != 0 && curX != 2){
							if (curX != 1){
								show([-2, -2]);
							}
							if (curY != 2){
								show([-3, -1]);
							}
						}
					}
					if (curX != 1){
						show([-1, -2]);
						if (map[curY-1][curX-2] != 0){
							if (curY != 1){
								show([-2, -2]);
							}
							if (curX != 2){
								show([-1, -3]);
							}
						}
					}
				}
			}
			if (curX != 1){
				show([0, -2]);

				if (map[curY][curX-2] != 0){
					if (curY != lastRow){
						show([1, -2]);
						if (map[curY+1][curX-2] != 0 && curX != 3){
							show([1, -3]);
						}
					}
					if (curY != 0){	
						show([-1, -2]);
						if (map[curY-1][curX-2] != 0 && curX != 3){
							show([-1, -3]);
						}
					}
					if (curX != 2){
						show([0, -3]);
						if (map[curY][curX-3] != 0){
							if (curY != lastRow){
								show([1, -3]);
							}
							if (curY != 0){	
								show([-1, -3]);
							}
							if (curX != 3){
								show([0, -4]);
							}
						}
					}
				}
			}
		}
	}
	if (curX != lastCol){
		show([0, 1]);

		if (map[curY][curX+1] != 0){
			if (curY != lastRow){
				show([1, 1]);

				if (map[curY+1][curX+1] != 0){
					if (curY != lastRow-1){
						show([2, 1]);

						if (map[curY+2][curX+1] != 0){
							if (curX != lastCol-1){
								show([2, 2]);
							}
							if (curY != lastRow-2){
								show([3, 1]);
							}
						}
					}
					if (curX != lastCol-1){
						show([1, 2]);
						if (map[curY+1][curX+2] != 0){
							if (curX != lastCol-2){
								show([1, 3]);
							}
							if (curY != lastRow-1){
								show([2, 2]);
							}
						}
					}
				}
			}
			if (curY != 0){	
				show([-1, 1]);

				if (map[curY-1][curX+1] != 0){
					if (curY != 1){
						show([-2, 1]);

						if (map[curY-2][curX+1] != 0){
							if (curX != lastCol-1){
								show([-2, 2]);
							}
							if (curY != 2){
								show([-3, 1]);
							}
						}
					}
					if (curX != lastCol-1){
						show([-1, 2]);
						if (map[curY-1][curX+2] != 0 && curY != 1){
							show([-2, 2]);
						}
					}
				}
			}
			if (curX != lastCol-1){
				show([0, 2]);

				if (map[curY][curX+2] != 0){
					if (curY != lastRow){
						show([1, 2]);

						if (map[curY+1][curX+2] != 0 && curX != lastCol-2){
							show([1, 3]);
						}
					}
					if (curY != 0){	
						show([-1, 2]);
						if (map[curY-1][curX+2] != 0 && curX != lastCol-2){
							show([-1, 3]);
						}
					}
					if (curX != lastCol-2){
						show([0, 3]);
						if (map[curY][curX+3] != 0){
							if (curY != lastRow){
								show([1, 3]);
							}
							if (curY != 0){	
								show([-1, 3]);
							}
							if (curX != lastCol-3){
								show([0, 4]);
							}
						}
					}
				}
			}
		}
	}
	if (curY != 0){
		show([-1, 0]);

		if (map[curY-1][curX] != 0){
			if (curX != lastCol){
				show([-1, 1]);

				if (map[curY-1][curX+1] != 0){
					if (curX != lastCol-1){
						show([-1, 2]);

						if (map[curY-1][curX+2] != 0){
							if (curY != 1){
								show([-2, 2]);
							}
							if (curX != lastCol-2){
								show([-1, 3]);
							}
						}
					}
					if (curY != 1){
						show([-2, 1]);
						if (map[curY-2][curX+1] != 0 && curX != lastCol-1){
							show([-2, 2]);
						}
					}
				}
			}
			if (curX != 0){	
				show([-1, -1]);

				if (map[curY-1][curX-1] != 0){
					if (curY != 1){
						show([-2, -1]);
						if (map[curY-2][curX-1] != 0 && curX != 2){
							show([-2, -2]);
						}
					}
					if (curX != 1){
						show([-1, -2]);
						if (map[curY-1][curX-2] != 0){
							if (curY != 1){
								show([-2, -2]);
							}
							if (curX != 2){
								show([-1, -3]);
							}
						}
					}
				}
			}
			if (curY != 1){
				show([-2, 0]);

				if (map[curY-2][curX] != 0){
					if (curX != lastCol){
						show([-2, 1]);

						if (map[curY-2][curX+1] != 0 && curY != 2){
							show([-3, 1]);
						}
					}
					if (curX != 0){	
						show([-2, -1]);
						if (map[curY-2][curX-1] != 0 && curY != 2){
							show([-3, -1]);
						}
					}
					if (curY != 2){
						show([-3, 0]);
						if (map[curY-3][curX] != 0){
							if (curX != lastCol){
								show([-3, 1]);
							}
							if (curX != 0){	
								show([-3, -1]);
							}
							if (curY != 3){
								show([-4, 0]);
							}
						}
					}
				}
			}
		}
	}	
	if (curY != lastRow){
		show([1, 0]);

		if (map[curY+1][curX] != 0){
			if (curX != lastCol){
				show([1, 1]);

				if (map[curY+1][curX+1] != 0){
					if (curX != lastCol-1){
						show([1, 2]);

						if (map[curY+1][curX+2] != 0){
							if (curY != lastRow-1){
								show([2, 2]);
							}
							if (curX != lastCol-2){
								show([1, 3]);
							}
						}
					}
					if (curY != lastRow-1){
						show([2, 1]);

						if (map[curY+2][curX+1] != 0 && curX != lastCol-1){
							show([2, 2]);
						}
					}
				}
			}
			if (curX != 0){	
				show([1, -1]);

				if (map[curY+1][curX-1] != 0){
					if (curY != lastRow-1){
						show([2, -1]);
						if (map[curY+2][curX-1] != 0 && curX != 2){
							show([2, -2]);
						}
					}
					if (curX != 1){
						show([1, -2]);

						if (map[curY+1][curX-2] != 0 && curY != lastRow-1){
							if (curY != lastRow-1){
								show([2, -2]);
							}
							if (curX != 2){
								show([1, -3]);
							}
						}
					}
				}
			}
			if (curY != lastRow-1){
				show([2, 0]);

				if (map[curY+2][curX] != 0){
					if (curX != lastCol){
						show([2, 1]);

						if (map[curY+2][curX+1] != 0 && curY != lastRow-2){
							show([3, 1]);
						}
					}
					if (curX != 0){	
						show([2, -1]);

						if (map[curY+2][curX-1] != 0 && curY != lastRow-2){
							show([3, -1]);
						}
					}
					if (curY != lastRow-2){
						show([3, 0]);

						if (map[curY+3][curX] != 0){
							if (curX != lastCol){
								show([3, 1]);
							}
							if (curX != 0){	
								show([3, -1]);
							}
							if (curY != lastRow-3){
								show([4, 0]);
							}
						}
					}
				}
			}
		}
	}
}

function hunterMove(){
	//Robert TODO: translate aStar function from Dungeon_Game into javaScript here
	var setOfMonsters = Object.keys(mapData);
	setOfMonsters.splice(0, 2);

	for (let z = 0; z < setOfMonsters.length; z++) {
		
		var sampleMap = JSON.parse(JSON.stringify(mapData.map));

		for (let i = 0; i < sampleMap.length; i++){
			for (let j = 0; j < sampleMap[i].length; j++){
				if (sampleMap[i][j] == 1){
					sampleMap[i][j] == 'f';
				} else {
					sampleMap[i][j] == 'w';
				}
			}
		}

		var didSomething = true;
		var steps = 0;
		var monsterY = mapData[setOfMonsters[z]][0];
		var monsterX = mapData[setOfMonsters[z]][0];
		sampleMap[mapData.playerPosition[0]][mapData.playerPosition[1]] = steps;

		while (sampleMap[monsterY][monsterX] == "f") {
			if (didSomething == false) {
				break;
			}
			didSomething = false;
			for (let i = 0; i < sampleMap.length; i++){
				for (let j = 0; j < sampleMap[i].length; j++){
					if (sampleMap[i][j] == steps){
						if (i != 0){
							if (sampleMap[i-1][j] == 'f'){
								sampleMap[i-1][j] = steps+1;
								didSomething = true;
							}
						}
						if (i != sampleMap.length-1){
							if (sampleMap[i+1][j] == 'f'){
								sampleMap[i+1][j] = steps+1;
								didSomething = true;
							}
						}
						if (j != 0){
							if (sampleMap[i][j-1] == 'f'){
								sampleMap[i][j-1] = steps+1;
								didSomething = true;
							}
						}
						if (j != sampleMap[0].length-1){
							if (sampleMap[i][j+1] == 'f'){
								sampleMap[i][j+1] = steps+1;
								didSomething = true;
							}
						}
					}
				}
			}
			steps++;
		}
		if (sampleMap[monsterY+1][monsterX] == steps-1){
			mapData.map[monsterY][monsterX] = 1;
			monsterY += 1;
			mapData.map[monsterY][monsterX] = parseInt('4'+z);
		} else if (sampleMap[monsterY-1][monsterX] == steps-1) {
			mapData.map[monsterY][monsterX] = 1;
			monsterY -= 1;
			mapData.map[monsterY][monsterX] = parseInt('4'+z);
		} else if (sampleMap[monsterY][monsterX+1] == steps-1) {
			mapData.map[monsterY][monsterX] = 1;
			monsterX += 1;
			mapData.map[monsterY][monsterX] = parseInt('4'+z);
		} else if (sampleMap[monsterY][monsterX-1] == steps-1) {
			mapData.map[monsterY][monsterX] = 1;
			monsterX -= 1;
			mapData.map[monsterY][monsterX] = parseInt('4'+z);
		}
		if (mapData[setOfMonsters[z]] == mapData.playerPosition) {
			gameOver();
		}
	}
}

function movePlayer(keyPressed) {

	var acceptedMoves = ['w', 'a', 's', 'd', 'space'];
	var oldYPosition = mapData.playerPosition[0];
	var oldXPosition = mapData.playerPosition[1];
	var theMap = mapData.map;
	var newYPosition;
	var newXPosition;
	
	if (!acceptedMoves.includes(keyPressed)) {
		return;
	}

	if (keyPressed === 'w') {
		if (theMap[(oldYPosition)-1][(oldXPosition)] === FLOOR || theMap[(oldYPosition)-1][(oldXPosition)] === SAFE) { // is traversible
			newYPosition = oldYPosition - 1;
		} else if (theMap[(oldYPosition)-1][(oldXPosition)] === WALL) {
			return;
		} else {
			gameOver();
		}
	}

	if (keyPressed === 's') {
		if (theMap[(oldYPosition)+1][(oldXPosition)] === FLOOR || theMap[(oldYPosition)+1][(oldXPosition)] === SAFE) {
			newYPosition = oldYPosition + 1;
		} else if (theMap[(oldYPosition)+1][(oldXPosition)] === WALL) {
			return;
		} else {
			gameOver();
		}
	}

	if (keyPressed === 'a') {
		if (theMap[(oldYPosition)][(oldXPosition)-1] === FLOOR || theMap[(oldYPosition)][(oldXPosition)-1] === SAFE) {
			newYPosition = oldYPosition + 1;
		} else if (theMap[(oldYPosition)][(oldXPosition-1)] === WALL) {
			return;
		} else {
			gameOver();
		}
	}

	if (keyPressed === 'd') {
		if (theMap[(oldYPosition)][(oldXPosition)+1] === FLOOR || theMap[(oldYPosition)][(oldXPosition)+1] === SAFE) {
			newYPosition = oldYPosition + 1;
		} else if (theMap[(oldYPosition)][(oldXPosition+1)] === WALL) {
			return;
		} else {
			gameOver();
		}
	}

	mapData.playerPosition[0] = newYPosition;
	mapData.playerPosition[1] = newXPosition;

	hunterMove();
	showEnvironment();
}

function startGame(){
	var askSize = document.getElementById('askSize');
	var mapSize = askSize.value;
	makeNewMaze(mapSize);
	var containerDiv = document.getElementById('containerDiv');
	containerDiv.innerHTML = '';
	//TODO: use DOM to start audio
	//TODO: Use DOM to identify #gamePlayTable and assign it to a variable
	//TODO: write a loop to iterate over mapData['map'] and create a 'tr' element for each inner array, and then in a nested for loop a 'td' for each index inside of that array, and assign that td the innerHTML of an 'img' element. Assign the image  an id of String(i)+'-'+String(j)
	showEnvironment();
	document.addEventListener("keyup", function(e){
		e.preventDefault();
		movePlayer(e.key);
	});
<<<<<<< HEAD
}

//DONE: identify #startButton element and attach an eventListener; eventListener will launch startGame 
=======
}
>>>>>>> c119bc14cc4526dc1293bd9522c3fee319e35803
