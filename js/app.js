//javascript
mapData = {};
selfGender = true;
selfImage = 'assets/img/self.jpg';

function gameOver(){
	//TODO: design what we want losing to look like, and then use DOM to set the page to look like that
	//Thoughts here?
	var theTable = document.getElementById('containerDiv')
	theTable.innerHTML = '';
	theTable.setAttribute('class', 'lostScreen');
	// theTable.setAttribute('style', 'background-image:url(assets/img/trapped_person.jpeg);');
	var gameOverLink = document.createElement('a');
	theTable.append(gameOverLink);
	gameOverLink.setAttribute('href', 'game.html')
	var gameOverText = document.createElement('span');
	gameOverLink.append(gameOverText);
	gameOverText.textContent = 'You\'ve been captured!';
}

function escapedScreen() {
	var theTable = document.getElementById('containerDiv')
	theTable.innerHTML = '';
	theTable.setAttribute('class', 'victoryScreen');
	// theTable.setAttribute('background-image', 'url(assets/img/scary_house.jpeg)');
	var gameOverLink = document.createElement('a');
	theTable.append(gameOverLink);
	gameOverLink.setAttribute('href', 'game.html')
	var gameOverText = document.createElement('span');
	gameOverLink.append(gameOverText);
	gameOverText.textContent = 'You escaped!';
}

 // May we add comments throughout this code project? yes :?


const WALL = 0;
const FLOOR = 1;
const SAFE = 2;

function makeNewMaze(mapSize){
	//Robert TODO: build a process by which a new array of arrays is created with the proper lengths, and to ensure that there IS a path to the end
	//Robert TODO: assign mapData these key value pairs {map: [ [], [], [], [] ],  playerPosition: [y, x], mosterNOrigin: [y, x]}
	var mapMargin = mapSize / 3;

	function generateMap(){

		var monsterCount = 0;

		mapData.map = [];
		mapData.viewMap = [];

		for (let i = 0; i < mapSize; i++) {
			mapData.map.push([]);
			for (let j = 0; j < mapSize; j++) {
				mapData.map[i].push(0);
			}
		}

		mapData.playerPosition = [];
		mapData.playerPosition.push(Math.ceil(Math.random()*(mapSize-2*mapMargin)+mapMargin));
		mapData.playerPosition.push(Math.ceil(Math.random()*(mapSize-2*mapMargin)+mapMargin));

		mapData.map[mapData.playerPosition[0]][mapData.playerPosition[1]] = FLOOR;

		curY = mapData.playerPosition[0];
		curX = mapData.playerPosition[1];

		var triedToStep = 0;
		var madeAStep = 0;
		

		while((curY != 0 && curY != mapSize-1) && (curX != 0 && curX != mapSize-1)) {
			var upRand = Math.random()*10;
			var downRand = Math.random()*10;
			var rightRand = Math.random()*10;
			var leftRand = Math.random()*10;

			if (upRand > downRand && upRand > rightRand && upRand > leftRand) {
				triedToStep++;
				if (mapData.map[curY-1][curX] == WALL && (mapData.map[curY-1][curX+1] != FLOOR || mapData.map[curY-1][curX-1] != FLOOR)){
					triedToStep = 0;
					madeAStep++;
					curY-=1;
					if (madeAStep%180 == 0){
						mapData.map[curY][curX] = parseInt('4'+String(monsterCount));
						eval('mapData.monster'+monsterCount+'Origin = ['+curY+','+curX+']');
						monsterCount+=1;
					} else if (madeAStep%20 == 0){
						mapData.map[curY][curX] = SAFE;
					} else {
						mapData.map[curY][curX] = FLOOR;
					}
				}
			} else if (downRand > rightRand && downRand > leftRand) {
				triedToStep++;
				if (mapData.map[curY+1][curX] == WALL && (mapData.map[curY+1][curX+1] != FLOOR || mapData.map[curY+1][curX-1] != FLOOR)){
					triedToStep = 0;
					madeAStep++;
					curY+=1;
					if (madeAStep%180 == 0){
						mapData.map[curY][curX] = parseInt('4'+String(monsterCount));
						eval('mapData.monster'+monsterCount+'Origin = ['+curY+','+curX+']');
						monsterCount+=1;
					} else if (madeAStep%20 == 0){
						mapData.map[curY][curX] = SAFE;
					} else {
						mapData.map[curY][curX] = FLOOR;
					}
				}
			} else if (rightRand > leftRand) {
				triedToStep++;
				if (mapData.map[curY][curX+1] == WALL && (mapData.map[curY+1][curX+1] != FLOOR || mapData.map[curY-1][curX+1] != FLOOR)){
					triedToStep = 0;
					madeAStep++;
					curX+=1;
					if (madeAStep%180 == 0){
						mapData.map[curY][curX] = parseInt('4'+String(monsterCount));
						eval('mapData.monster'+monsterCount+'Origin = ['+curY+','+curX+']');
						monsterCount+=1;
					} else if (madeAStep%20 == 0){
						mapData.map[curY][curX] = SAFE;
					} else {
						mapData.map[curY][curX] = FLOOR;
					}
				}
			} else {
				triedToStep+=1;
				if (mapData.map[curY][curX-1] == WALL && (mapData.map[curY+1][curX-1] != FLOOR || mapData.map[curY-1][curX-1] != FLOOR)){
					triedToStep = 0;
					madeAStep++;
					curX-=1;
					if (madeAStep%180 == 0){
						mapData.map[curY][curX] = parseInt('4'+String(monsterCount));
						eval('mapData.monster'+monsterCount+'Origin = ['+curY+','+curX+']');
						monsterCount+=1;
					} else if (madeAStep%20 == 0){
						mapData.map[curY][curX] = SAFE;
					} else {
						mapData.map[curY][curX] = FLOOR;
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
				if (mapData.map[curY][curX] != SAFE && String(mapData.map[curY][curX]).charAt(0) != '4' && mapData.map[curY][curX] != FLOOR && madeAStep%20 != 0){
					mapData.map[curY][curX] = FLOOR;
				} else {
					if (madeAStep%180 == 0){
						if (String(mapData.map[curY][curX]).charAt(0) != '4') {
							mapData.map[curY][curX] = parseInt('4'+String(monsterCount));
							eval('mapData.monster'+monsterCount+'Origin = ['+curY+','+curX+']');
							monsterCount+=1;
						} else {
							madeAStep--;
						}
					} else if (madeAStep%20 == 0){
						if (String(mapData.map[curY][curX]).charAt(0) != '4') {
							mapData.map[curY][curX] = SAFE;
						} else {
							madeAStep--;
						}
					}
				}
				triedToStep = 0;
			}
		}
		return madeAStep;
	}


	var goodMap = false;

	while (!goodMap) {
		var stepsCounted = generateMap();
		if (stepsCounted > mapSize*8) {
			goodMap = true;
		}
	}

	for (let i = 0; i < 9; i++) {
		mapData.viewMap.push([]);
		for (let j = 0; j < 9; j++) {
			mapData.viewMap[i].push(0);
		}
	}

	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (typeof(mapData.map[mapData.playerPosition[0]-(4-i)][mapData.playerPosition[0]-(4-j)]) != 'undefined'){
				mapData.viewMap[i].push((mapData.map[mapData.playerPosition[0]-(4-i)][mapData.playerPosition[0]-(4-j)]));
			} else {
				mapData.viewMap[i].push(0);
			}
		}
	}
}

function showEnvironment(){
	
	function show(valY, valX){
		try {
			var checkPosition = mapData.map[(mapData['playerPosition'][0])+valY][(mapData['playerPosition'][1])+valX];
		} catch {
			var checkPosition = 'empty';
		}
		
		//TODO: use DOM to assign the image with id String((mapData['playerPosition'][0])+increments[0])+'-'+String((mapData['playerPosition'][1])+increments[1]) a source attribute dependant on the value of checkPosition
		var tileImage = document.getElementById(String(4+valY)+'-'+String(4+valX));
		if (checkPosition=='empty') {
			tileImage.setAttribute('src', 'assets/img/empty.jpg');
		} else if (checkPosition == FLOOR) {
			tileImage.setAttribute('src', 'assets/img/floor.jpg');
		} else if (checkPosition == WALL) {
			tileImage.setAttribute('src', 'assets/img/wall.jpg');
		} else if (checkPosition == SAFE) {
			tileImage.setAttribute('src', 'assets/img/safe.jpg');
		} else {
			tileImage.setAttribute('src', 'assets/img/monster.png');
		}
		if (checkPosition == FLOOR || checkPosition == SAFE){
			if (mapData.playerPosition[0]+valY == 0 || mapData.playerPosition[0]+valY == mapData.map.length-1 || mapData.playerPosition[1]+valX == 0 || mapData.playerPosition[1]+valX == mapData.map.length-1){
				tileImage.setAttribute('src', 'assets/img/forrest.jpeg');
			}
		} 			
	}

	function left(){

		if (curX != 0){
			show(0, -1);
			if (map[curY][curX-1] != WALL){
				if (curY != lastRow){
					show(1, -1);

					if (map[curY+1][curX-1] != WALL){
						if (curY != lastRow-1){
							show(2, -1);
							
							if (map[curY+2][curX-1] != WALL){
								if (curX != 1){
									show(2, -2);
								}
								if (curY != lastRow-2){
									show(3, -1);
								}
							}
						}
						if (curX != 1){
							show(1, -2);
							
							if (map[curY+1][curX-2] != WALL){
								if (curX != 2){
									show(1, -3);
								}
								if (curY != lastRow-1){
									show(2, -2);
								}
							}
						}
					}
				}
				if (curY != 0){	
					show(-1, -1);
					
					if (map[curY-1][curX-1] != WALL){
						if (curY != 1){
							show(-2, -1);
							if (map[curY-2][curX-1] != WALL && curX != 2){
								if (curX != 1){
									show(-2, -2);
								}
								if (curY != 2){
									show(-3, -1);
								}
							}
						}
						if (curX != 1){
							show(-1, -2);
							if (map[curY-1][curX-2] != WALL){
								if (curY != 1){
									show(-2, -2);
								}
								if (curX != 2){
									show(-1, -3);
								}
							}
						}
					}
				}
				if (curX != 1){
					show(0, -2);

					if (map[curY][curX-2] != 0){
						if (curY != lastRow){
							show(1, -2);
							if (map[curY+1][curX-2] != WALL && curX != 3){
								show(1, -3);
							}
						}
						if (curY != 0){	
							show(-1, -2);
							if (map[curY-1][curX-2] != WALL && curX != 3){
								show(-1, -3);
							}
						}
						if (curX != 2){
							show(0, -3);
							if (map[curY][curX-3] != WALL){
								if (curY != lastRow){
									show(1, -3);
								}
								if (curY != 0){	
									show(-1, -3);
								}
								if (curX != 3){
									show(0, -4);
								}
							}
						}
					}
				}
			}
		}
	}

	function right(){
		if (curX != lastCol){
			show(0, 1);

			if (map[curY][curX+1] != WALL){
				if (curY != lastRow){
					show(1, 1);

					if (map[curY+1][curX+1] != WALL){
						if (curY != lastRow-1){
							show(2, 1);

							if (map[curY+2][curX+1] != WALL){
								if (curX != lastCol-1){
									show(2, 2);
								}
								if (curY != lastRow-2){
									show(3, 1);
								}
							}
						}
						if (curX != lastCol-1){
							show(1, 2);
							if (map[curY+1][curX+2] != WALL){
								if (curX != lastCol-2){
									show(1, 3);
								}
								if (curY != lastRow-1){
									show(2, 2);
								}
							}
						}
					}
				}
				if (curY != 0){	
					show(-1, 1);

					if (map[curY-1][curX+1] != WALL){
						if (curY != 1){
							show(-2, 1);

							if (map[curY-2][curX+1] != WALL){
								if (curX != lastCol-1){
									show(-2, 2);
								}
								if (curY != 2){
									show(-3, 1);
								}
							}
						}
						if (curX != lastCol-1){
							show(-1, 2);
							if (map[curY-1][curX+2] != WALL && curY != 1){
								show(-2, 2);
							}
						}
					}
				}
				if (curX != lastCol-1){
					show(0, 2);

					if (map[curY][curX+2] != 0){
						if (curY != lastRow){
							show(1, 2);

							if (map[curY+1][curX+2] != WALL && curX != lastCol-2){
								show(1, 3);
							}
						}
						if (curY != 0){	
							show(-1, 2);
							if (map[curY-1][curX+2] != WALL && curX != lastCol-2){
								show(-1, 3);
							}
						}
						if (curX != lastCol-2){
							show(0, 3);
							if (map[curY][curX+3] != WALL){
								if (curY != lastRow){
									show(1, 3);
								}
								if (curY != 0){	
									show(-1, 3);
								}
								if (curX != lastCol-3){
									show(0, 4);
								}
							}
						}
					}
				}
			}
		}
	}

	function up(){
		if (curY != 0){
			show(-1, 0);

			if (map[curY-1][curX] != WALL){
				if (curX != lastCol){
					show(-1, 1);

					if (map[curY-1][curX+1] != WALL){
						if (curX != lastCol-1){
							show(-1, 2);

							if (map[curY-1][curX+2] != WALL){
								if (curY != 1){
									show(-2, 2);
								}
								if (curX != lastCol-2){
									show(-1, 3);
								}
							}
						}
						if (curY != 1){
							show(-2, 1);
							if (map[curY-2][curX+1] != WALL && curX != lastCol-1){
								show(-2, 2);
							}
						}
					}
				}
				if (curX != 0){	
					show(-1, -1);

					if (map[curY-1][curX-1] != 0){
						if (curY != 1){
							show(-2, -1);
							if (map[curY-2][curX-1] != WALL && curX != 2){
								show(-2, -2);
							}
						}
						if (curX != 1){
							show(-1, -2);
							if (map[curY-1][curX-2] != WALL){
								if (curY != 1){
									show(-2, -2);
								}
								if (curX != 2){
									show(-1, -3);
								}
							}
						}
					}
				}
				if (curY != 1){
					show(-2, 0);

					if (map[curY-2][curX] != WALL){
						if (curX != lastCol){
							show(-2, 1);

							if (map[curY-2][curX+1] != WALL && curY != 2){
								show(-3, 1);
							}
						}
						if (curX != 0){	
							show(-2, -1);
							if (map[curY-2][curX-1] != WALL && curY != 2){
								show(-3, -1);
							}
						}
						if (curY != 2){
							show(-3, 0);
							if (map[curY-3][curX] != WALL){
								if (curX != lastCol){
									show(-3, 1);
								}
								if (curX != 0){	
									show(-3, -1);
								}
								if (curY != 3){
									show(-4, 0);
								}
							}
						}
					}
				}
			}
		}
	}

	function down(){

		if (curY != lastRow){
			show(1, 0);

			if (map[curY+1][curX] != WALL){
				if (curX != lastCol){
					show(1, 1);

					if (map[curY+1][curX+1] != WALL){
						if (curX != lastCol-1){
							show(1, 2);

							if (map[curY+1][curX+2] != WALL){
								if (curY != lastRow-1){
									show(2, 2);
								}
								if (curX != lastCol-2){
									show(1, 3);
								}
							}
						}
						if (curY != lastRow-1){
							show(2, 1);

							if (map[curY+2][curX+1] != 0 && curX != lastCol-1){
								show(2, 2);
							}
						}
					}
				}
				if (curX != 0){	
					show(1, -1);

					if (map[curY+1][curX-1] != WALL){
						if (curY != lastRow-1){
							show(2, -1);
							if (map[curY+2][curX-1] != WALL && curX != 2){
								show(2, -2);
							}
						}
						if (curX != 1){
							show(1, -2);

							if (map[curY+1][curX-2] != WALL && curY != lastRow-1){
								if (curY != lastRow-1){
									show(2, -2);
								}
								if (curX != 2){
									show(1, -3);
								}
							}
						}
					}
				}
				if (curY != lastRow-1){
					show(2, 0);

					if (map[curY+2][curX] != WALL){
						if (curX != lastCol){
							show(2, 1);

							if (map[curY+2][curX+1] != WALL && curY != lastRow-2){
								show(3, 1);
							}
						}
						if (curX != 0){	
							show(2, -1);

							if (map[curY+2][curX-1] != WALL && curY != lastRow-2){
								show(3, -1);
							}
						}
						if (curY != lastRow-2){
							show(3, 0);

							if (map[curY+3][curX] != WALL){
								if (curX != lastCol){
									show(3, 1);
								}
								if (curX != 0){	
									show(3, -1);
								}
								if (curY != lastRow-3){
									show(4, 0);
								}
							}
						}
					}
				}
			}
		}
	}



	var map = mapData.map;
	var curY = mapData.playerPosition[0];
	var curX = mapData.playerPosition[1];
	var lastCol = mapData.map.length-1;
	var lastRow = mapData.map[0].length-1;
	//TODO: write a for loop to iterate over all image id's and assign the empty image source
	for (let i = 0; i < mapData.viewMap.length; i++){
		for (let j = 0; j < mapData.viewMap.length; j++){
			var tileImage = document.getElementById(String(i)+'-'+String(j));
			tileImage.setAttribute('src', 'assets/img/empty.jpg');
		}
	}
	//Robert TODO: translate the printEnvironment function from Dungeon_Game into javaScript here
	var selfTile = document.getElementById(String(4)+'-'+String(4));
	if (mapData.map[mapData.playerPosition[0]][mapData.playerPosition[1]] == 2) {
		selfTile.setAttribute('src', 'assets/img/safe.jpg');
	} else {
		selfTile.setAttribute('src', selfImage);
	}


	left();
		
	right();

	up();
			
	down();
}

function hunterMove(){
	//Robert TODO: translate aStar function from Dungeon_Game into javaScript here
	var setOfMonsters = Object.keys(mapData);
	setOfMonsters.splice(0, 3);

	for (let z = 0; z < setOfMonsters.length; z++) {
		
		var sampleMap = JSON.parse(JSON.stringify(mapData.map));


		for (let i = 0; i < sampleMap.length; i++){
			for (let j = 0; j < sampleMap[i].length; j++){
				if (sampleMap[i][j] == parseInt('4'+z)){
					var monsterY = i;
					var monsterX = j;
				}
				if (sampleMap[i][j] == FLOOR){
					sampleMap[i][j] = 'f';
				} else {
					sampleMap[i][j] = 'w';
				}
			}
		}

		var didSomething = true;
		var steps = 0;
		var monsterDataAccess = eval('mapData.monster'+z+'Origin');

		if (mapData.map[mapData.playerPosition[0]][mapData.playerPosition[1]] == 2) {
			
			sampleMap[monsterY][monsterX] = 'f';
			sampleMap[monsterDataAccess[0]][monsterDataAccess[1]] = steps;

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

		} else {

			sampleMap[monsterY][monsterX] = 'f';
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

		}

		if (sampleMap[monsterY+1][monsterX] == steps-1){
			mapData.map[monsterY][monsterX] = 1;
			monsterY += 1;
			mapData.map[monsterY][monsterX] = parseInt('4'+z);
		} else if (sampleMap[monsterY][monsterX+1] == steps-1) {
			mapData.map[monsterY][monsterX] = 1;
			monsterX += 1;
			mapData.map[monsterY][monsterX] = parseInt('4'+z);
		} else if (sampleMap[monsterY-1][monsterX] == steps-1) {
			mapData.map[monsterY][monsterX] = 1;
			monsterY -= 1;
			mapData.map[monsterY][monsterX] = parseInt('4'+z);
		} else if (sampleMap[monsterY][monsterX-1] == steps-1) {
			mapData.map[monsterY][monsterX] = 1;
			monsterX -= 1;
			mapData.map[monsterY][monsterX] = parseInt('4'+z);
		} 
		if (mapData.playerPosition[0] == monsterY && mapData.playerPosition[1] == monsterX) {
			gameOver();
		}
	}
}

function navigateMe(){

	var helperMap = JSON.parse(JSON.stringify(mapData.map));

	for (let i = 0; i < helperMap.length; i++){
		for (let j = 0; j < helperMap[i].length; j++){
			if (mapData.map[i][j] == FLOOR || mapData.map[i][j] == SAFE){
				if (i == 0 || i == mapData.map.length-1 || j == 0 || j == mapData.map.length-1){
					var endGoalY = i;
					var endGoalX = j;
				}
			}
			if (helperMap[i][j] == FLOOR || helperMap[i][j] == SAFE || String(helperMap[i][j]).charAt(0) == '4'){
				helperMap[i][j] = 'f';
			} else {
				helperMap[i][j] = 'w';
			}
		}
	}

	var didSomething = true;
	var steps = 0;
		
	helperMap[endGoalY][endGoalX] = steps;

	while (helperMap[mapData.playerPosition[0]][mapData.playerPosition[1]] == "f") {
		if (didSomething == false) {
			break;
		}
		didSomething = false;
		for (let i = 0; i < helperMap.length; i++){
			for (let j = 0; j < helperMap[i].length; j++){
				if (helperMap[i][j] == steps){
					if (i != 0){
						if (helperMap[i-1][j] == 'f'){
							helperMap[i-1][j] = steps+1;
							didSomething = true;
						}
					}
					if (i != helperMap.length-1){
						if (helperMap[i+1][j] == 'f'){
							helperMap[i+1][j] = steps+1;
							didSomething = true;
						}
					}
					if (j != 0){
						if (helperMap[i][j-1] == 'f'){
							helperMap[i][j-1] = steps+1;
							didSomething = true;
						}
					}
					if (j != helperMap[0].length-1){
						if (helperMap[i][j+1] == 'f'){
							helperMap[i][j+1] = steps+1;
							didSomething = true;
						}
					}
				}
			}
		}
		steps++;
	}

	if (helperMap[mapData.playerPosition[0]+1][mapData.playerPosition[1]] == steps-1){
		console.log('down');
	} else if (helperMap[mapData.playerPosition[0]-1][mapData.playerPosition[1]] == steps-1) {
		console.log('up');
	} else if (helperMap[mapData.playerPosition[0]][mapData.playerPosition[1]+1] == steps-1) {
		console.log('right');
	} else if (helperMap[mapData.playerPosition[0]][mapData.playerPosition[1]-1] == steps-1) {
		console.log('left');
	}
}


function movePlayer(keyPressed) {

	var acceptedMoves = ['w', 'a', 's', 'd', ' '];
	var oldYPosition = mapData.playerPosition[0];
	var oldXPosition = mapData.playerPosition[1];
	var theMap = mapData.map;
	
	if (!acceptedMoves.includes(keyPressed)) {
		return;
	}

	if (keyPressed === 'w') {
		if (theMap[(oldYPosition)-1][(oldXPosition)] === FLOOR || theMap[(oldYPosition)-1][(oldXPosition)] === SAFE) { // is traversible
			oldYPosition -= 1;
			if (selfGender == true) {
				selfImage = 'assets/img/male_walk_up.png';
			} else {
				selfImage = 'assets/img/female_walk_up.png';
			}
		} else if (theMap[(oldYPosition)-1][(oldXPosition)] === WALL) {
			return;
		} else {
			gameOver();
		}
	}

	else if (keyPressed === 's') {
		if (theMap[(oldYPosition)+1][(oldXPosition)] === FLOOR || theMap[(oldYPosition)+1][(oldXPosition)] === SAFE) {
			oldYPosition += 1;
			if (selfGender == true) {
				selfImage = 'assets/img/male_walk_down.png';
			} else {
				selfImage = 'assets/img/female_walk_down.png';
			}
		} else if (theMap[(oldYPosition)+1][(oldXPosition)] === WALL) {
			return;
		} else {
			gameOver();
		}
	}

	else if (keyPressed === 'a') {
		if (theMap[(oldYPosition)][(oldXPosition)-1] === FLOOR || theMap[(oldYPosition)][(oldXPosition)-1] === SAFE) {
			oldXPosition -= 1;
			if (selfGender == true) {
				selfImage = 'assets/img/male_walk_left.png';
			} else {
				selfImage = 'assets/img/female_walk_left.png';
			}
		} else if (theMap[(oldYPosition)][(oldXPosition-1)] === WALL) {
			return;
		} else {
			gameOver();
		}
	}

	else if (keyPressed === 'd') {
		if (theMap[(oldYPosition)][(oldXPosition)+1] === FLOOR || theMap[(oldYPosition)][(oldXPosition)+1] === SAFE) {
			oldXPosition += 1;
			if (selfGender == true) {
				selfImage = 'assets/img/male_walk_right.png';
			} else {
				selfImage = 'assets/img/female_walk_right.png';
			}
		} else if (theMap[(oldYPosition)][(oldXPosition+1)] === WALL) {
			return;
		} else {
			gameOver();
		}
	}

	else {
		if (selfGender == true) {
			selfImage = 'assets/img/male_space_tile.png';
		} else {
			selfImage = 'assets/img/female_space_tile.png';
		}
	}

	mapData.playerPosition[0] = oldYPosition;
	mapData.playerPosition[1] = oldXPosition;

	if (mapData.playerPosition[0] == 0 || mapData.playerPosition[0] == mapData.map.length-1 || mapData.playerPosition[1] == 0 || mapData.playerPosition[1] == mapData.map.length-1){
		escapedScreen();
	}

	hunterMove();
	navigateMe();

	mapData.viewMap = [];

	for (let i = 0; i < 9; i++) {
		mapData.viewMap.push([]);
		for (let j = 0; j < 9; j++) {
			try {
				mapData.viewMap[i].push((mapData.map[mapData.playerPosition[0]-(4-i)][mapData.playerPosition[0]-(4-j)]));
			} catch {
				mapData.viewMap[i].push(0);
			}
		}
	}

	showEnvironment();
}

function startGame(){
	var askSize = document.getElementById('askSize');
	var mapSize = askSize.value;
	var genderCheck = document.getElementById('genderCheck');
	if (genderCheck.value == 'Female') {
		selfGender = false;
	}
	if (selfGender == true) {
		selfImage = 'assets/img/male_space_tile.png';
	} else {
		selfImage = 'assets/img/female_space_tile.png';
	}
	makeNewMaze(mapSize);
	var containerDiv = document.getElementById('containerDiv');
	containerDiv.setAttribute('class', 'gamePlay');
	containerDiv.innerHTML = '';
	//TODO: use DOM to start audio
	
	//TODO: Use DOM to identify #gamePlayTable and assign it to a variable
	var gameTable = document.createElement('table');
	containerDiv.append(gameTable);
	//TODO: write a loop to iterate over mapData['map'] and create a 'tr' element for each inner array, and then in a nested for loop a 'td' for each index inside of that array, and assign that td the innerHTML of an 'img' element. Assign the image  an id of String(i)+'-'+String(j)
	for (let i = 0; i < 9; i++) {
		var newRow = document.createElement('tr');
		gameTable.append(newRow);
		for(let j = 0; j < 9; j++){
			var newCell = document.createElement('td');
			newRow.append(newCell);
			var newImage = document.createElement('img');
			newCell.append(newImage);
			newImage.setAttribute('id', String(i)+'-'+String(j));
		}
	}
	showEnvironment();
	document.addEventListener("keyup", function(e){
		e.preventDefault();
		movePlayer(e.key);
	});
}

// Inline code relocated from script tag in game.html
var startButton = document.getElementById('formsHere'); 
// starts the game when a submit takes place (startButton clicked)
document.addEventListener('submit', function(e){
	e.preventDefault();
	var audio = new Audio('assets/ScaryHalloween.mp3');
	audio.addEventListener('ended', function(e){
		e.preventDefault();
		audio.play();
	});
	audio.play();
});

startButton.addEventListener('submit', function (e) {
	e.preventDefault();
	startGame();
});