# Software Requirements

For this project the vision is to build a puzzle solving game where you have to escape a procedurally generated maze, while only seeing up to 4 tiles away from where you currently are. Along the path there will be monsters hunting you down and hiding spots to stay safe. Each turn you stay in a safe spot the monsters will move one step closer back to their starting position.

The pain point addressed by this project is boredom and puzzle solving skills. Obviously as a game it is intended to be entertaining and help people put other things out of mind and relax, but it is also a good puzzle solving challenge trying to safely navigate the map and plot things out as you go. Also towards the end of the maze you may have to find a way to draw a monster away from the path to the exit and use an open space to get past it.

IN:

- The game will make a new map each time you play, with user input sizes of 25-100 (50 recommended)
- The game will have limited visibility so you can only see 4 tiles away from yourself; stretch goal turn lights on button to help learn the game that reveals all tiles
- The game will have have monsters that move one tile closer to you through the maze each time you move to an open tile, and one tile back to their initial position when you end a round in a safe spot
- The product will have a home page explaining how to play the game, a brief overview of the tech involved, a link to the Git repo, and a button to move to the game page
- Their will be horror themed ambient noises looped, and imagery rendered through a DOM generated table to see the map

OUT:

- The game will never include combat or the ability to slay a monster
- The game will never be ported to mobile devices because the screen would be sized too small for the way data is rendered in this app

Minimum Viability:

- A procedurally generated maze with one exit
- limited vision
- movable character from keyboard inputs

Stretch:

- Horror theming
- Hunting monsters and safe spots
- Lights on button to reveal the whole map

Functionality:

- A user can load the game and see the map
- The user can move their character
- The game is always winnable

Dataflow:

- The user opens to the home page with information on the project and how to play, as well as a button to send you to the game
- when the button is pressed the game page is loaded which will render one large splash art, some forms for setting options, and then a start game button to begin
- when the button is pressed startGame function is called, which first calls the generateMap function wherein a map is generated through a series of predefined methods.
- then event listeners are added for keyboard inputs
- when a key release is detected it will check if that key is in a predefined set of acceptable key inputs (w, a, s, d, and the space bar)
- If the key was in the list, a series of conditionals will determine which of them specifically was called and then a function for player movement will be called
- then the function for monster movement will be called
- if the monsters make contact with the player, a game over page is rendered, else the game continues
- if the player makes it to the end without being captured, a winner screen will be rendered