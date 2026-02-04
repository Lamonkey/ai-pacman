// Copyright 2012 Shaun Williams
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License Version 3 as 
//  published by the Free Software Foundation.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.

// ==========================================================================
import { chooseTargetTile, getNextPellets, maybeShufflePreference } from "./utility-agent.js";
// PAC-MAN
// an accurate remake of the original arcade game

// Based on original works by Namco, GCC, and Midway.
// Research by Jamey Pittman and Bart Grantham
// Developed by Shaun Williams

// ==========================================================================
// const csvWriter = createCsvWriter({
//     path: 'out.csv',
//     header: [{
//             id: 'name',
//             title: 'Name'
//         },
//         {
//             id: 'surname',
//             title: 'Surname'
//         },
//         {
//             id: 'age',
//             title: 'Age'
//         },
//         {
//             id: 'gender',
//             title: 'Gender'
//         },
//     ]
// });
// 
let death_penalty = [[
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 2, 4, 0, 2, 1, 1, 1, 2, 0, 0, 4, 2, 0, 0, 2, 3, 0, 0, 2, 1, 1, 0, 2, 1, 4, 3, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 2, 0, 0, 6, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 2, 2, 0, 2, 3, 0, 2, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 2, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 7, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 1, 4, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 1, 2, 2, 0, 2, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 1, 0, 3, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 1, 0, 3, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 1, 0, 1, 0, 0, 2, 2, 2, 0, 0, 2, 1, 0, 0, 1, 0, 0, 2, 1, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 0, 0, 1, 0, 0, 3, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 6, 1, 2, 0, 4, 1, 0, 0, 2, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
    0, 1, 5, 0, 5, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 6, 5, 5, 2, 2, 0, 0, 0, 0, 0, 0
    ]]
    

let ai_frame_count = 0;
let death_location = {
    "x": -1,
    "y": -1
};
let pellet_reward = 20;
let preference = [0.4, 0.3, 0.2, 0.1];
const data = [{
    name: 'John',
    surname: 'Snow',
    age: 26,
    gender: 'M'
}, {
    name: 'Clair',
    surname: 'White',
    age: 33,
    gender: 'F',
}, {
    name: 'Fancy',
    surname: 'Brown',
    age: 78,
    gender: 'F'
}];

(function () {


    let newChildObject = function (parentObj, newObj) {

        // equivalent to: let resultObj = { __proto__: paentObj };
        let x = function () {};
        x.prototype = parentObj;
        let resultObj = new x();

        // store new members in resultObj
        if (newObj) {
            let hasProp = {}.hasOwnProperty;
            for (let name in newObj) {
                if (hasProp.call(newObj, name)) {
                    resultObj[name] = newObj[name];
                }
            }
        }

        return resultObj;
    };

    let DEBUG = false;

    //@line 1 "src/game.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // Game

    // game modes
    let GAME_PACMAN = 0;

    let practiceMode = false;
    let turboMode = false;

    // current game mode
    let gameMode = GAME_PACMAN;


    let getGhostDrawFunc = function (mode) {
        if (mode == undefined) {
            mode = gameMode;
        }

        return atlas.drawGhostSprite;
    };

    let getPlayerDrawFunc = function (mode) {
        if (mode == undefined) {
            mode = gameMode;
        }
        return atlas.drawPacmanSprite;
    };


    // current level, lives, and score
    let level = 1;
    let extraLives = 0;

    /// SCORING
    // (manages scores and high scores for each game type)

    let scores = [
        0, 0, // pacman
        0
    ];
    let highScores = [
        10000, 10000, // pacman
    ];

    let getScoreIndex = function () {
        if (practiceMode) {
            return 8;
        }
        return gameMode * 2 + (turboMode ? 1 : 0);
    };

    // handle a score increment
    let addScore = function (p) {

        // get current scores
        let score = getScore();

        // handle extra life at 10000 points
        if (score < 10000 && score + p >= 10000) {
            extraLives++;
            renderer.drawMap();
        }

        score += p;
        setScore(score);

        if (!practiceMode) {
            if (score > getHighScore()) {
                setHighScore(score);
            }
        }
    };

    let getScore = function () {
        return scores[getScoreIndex()];
    };
    let setScore = function (score) {
        scores[getScoreIndex()] = score;
    };

    let getHighScore = function () {
        return highScores[getScoreIndex()];
    };
    let setHighScore = function (highScore) {
        highScores[getScoreIndex()] = highScore;
        saveHighScores();
    };
    // High Score Persistence

    let loadHighScores = function () {
        let hs;
        let hslen;
        let i;
        if (localStorage && localStorage.highScores) {
            hs = JSON.parse(localStorage.highScores);
            hslen = hs.length;
            for (let i = 0; i < hslen; i++) {
                highScores[i] = Math.max(highScores[i], hs[i]);
            }
        }
    };
    let saveHighScores = function () {
        if (localStorage) {
            localStorage.highScores = JSON.stringify(highScores);
        }
    };
    //@line 1 "src/direction.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // Directions
    // (variables and utility functions for representing actor heading direction)

    // direction enums (in counter-clockwise order)
    // NOTE: changing the order of these enums may effect the enums.
    //       I've tried abstracting away the uses by creating functions to rotate them.
    // NOTE: This order determines tie-breakers in the shortest distance turn logic.
    //       (i.e. higher priority turns have lower enum values)
    let DIR_UP = 0;
    let DIR_LEFT = 1;
    let DIR_DOWN = 2;
    let DIR_RIGHT = 3;

    let getClockwiseAngleFromTop = function (dirEnum) {
        return -dirEnum * Math.PI / 2;
    };

    let rotateLeft = function (dirEnum) {
        return (dirEnum + 1) % 4;
    };

    let rotateRight = function (dirEnum) {
        return (dirEnum + 3) % 4;
    };

    let rotateAboutFace = function (dirEnum) {
        return (dirEnum + 2) % 4;
    };

    // set direction vector from a direction enum
    let setDirFromEnum = function (dir, dirEnum) {
        if (dirEnum == DIR_UP) {
            dir.x = 0;
            dir.y = -1;
        } else if (dirEnum == DIR_RIGHT) {
            dir.x = 1;
            dir.y = 0;
        } else if (dirEnum == DIR_DOWN) {
            dir.x = 0;
            dir.y = 1;
        } else if (dirEnum == DIR_LEFT) {
            dir.x = -1;
            dir.y = 0;
        }
    };
    // predict the next tile ghost will travel based on targetTile and open_actions
    let get_tile_closet_to_target = function (tile, targetTile, open_actions) {
        let dx, dy, dist; // variables used for euclidean distance
        let minDist = Infinity; // variable used for finding minimum distance path
        let dir = {};
        let dirEnum = 0;
        let closet_tile;
        for (const action of open_actions) {
            setDirFromEnum(dir, action);
            dx = dir.x + tile.x - targetTile.x;
            dy = dir.y + tile.y - targetTile.y;
            dist = dx * dx + dy * dy;
            if (dist < minDist) {
                closet_tile = {
                    'x': dir.x + tile.x,
                    'y': dir.y + tile.y
                }
                minDist = dist;
                dirEnum = action;
            }
        }
        return closet_tile;
    };
    // return the direction of the open, surrounding tile closest to our target
    let getTurnClosestToTarget = function (tile, targetTile, openTiles) {

        let dx, dy, dist; // variables used for euclidean distance
        let minDist = Infinity; // variable used for finding minimum distance path
        let dir = {};
        let dirEnum = 0;
        let i;
        for (let i = 0; i < 4; i++) {
            if (openTiles[i]) {
                setDirFromEnum(dir, i);
                dx = dir.x + tile.x - targetTile.x;
                dy = dir.y + tile.y - targetTile.y;
                dist = dx * dx + dy * dy;
                if (dist < minDist) {
                    minDist = dist;
                    dirEnum = i;
                }
            }
        }
        return dirEnum;
    };

    // retrieve four surrounding tiles and indicate whether they are open
    let getOpenTiles = function (tile, dirEnum) {

        // get open passages
        let openTiles = {};
        openTiles[DIR_UP] = map.isFloorTile(tile.x, tile.y - 1);
        openTiles[DIR_RIGHT] = map.isFloorTile(tile.x + 1, tile.y);
        openTiles[DIR_DOWN] = map.isFloorTile(tile.x, tile.y + 1);
        openTiles[DIR_LEFT] = map.isFloorTile(tile.x - 1, tile.y);

        let numOpenTiles = 0;
        let i;
        if (dirEnum != undefined) {

            // count number of open tiles
            for (let i = 0; i < 4; i++)
                if (openTiles[i])
                    numOpenTiles++;

            // By design, no mazes should have dead ends,
            // but allow player to turn around if and only if it's necessary.
            // Only close the passage behind the player if there are other openings.
            let oppDirEnum = rotateAboutFace(dirEnum); // current opposite direction enum
            if (numOpenTiles > 1)
                openTiles[oppDirEnum] = false;
        }

        return openTiles;
    };

    // returns if the given tile coordinate plus the given direction vector has a walkable floor tile
    let isNextTileFloor = function (tile, dir) {
        let new_x = tile.x + dir.x;
        let new_y = tile.y + dir.y;
        // return map.isFloorTile(new_x, new_y) && new_x > 0 && new_x < map.numCols && new_y > 0 && new_y < map.numRows;
        return map.isFloorTile(tile.x + dir.x, tile.y + dir.y);
    };

    //@line 1 "src/Map.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // Map
    // (an ascii map of tiles representing a level maze)

    // size of a square tile in pixels
    let tileSize = 8;

    // the center pixel of a tile
    let midTile = {
        x: 3,
        y: 4
    };

    // constructor
    let Map = function (numCols, numRows, tiles) {

        // sizes
        this.numCols = numCols;
        this.numRows = numRows;
        this.numTiles = numCols * numRows;
        this.widthPixels = numCols * tileSize;
        this.heightPixels = numRows * tileSize;

        // ascii map
        this.tiles = tiles;

        // ghost home location
        this.doorTile = {
            x: 13,
            y: 14
        };
        this.doorPixel = {
            x: (this.doorTile.x + 1) * tileSize - 1,
            y: this.doorTile.y * tileSize + midTile.y
        };
        this.homeTopPixel = 17 * tileSize;
        this.homeBottomPixel = 18 * tileSize;

        this.timeEaten = {};

        this.resetCurrent();
        this.parseDots();
        this.parseTunnels();
        this.parseWalls();
    };

    Map.prototype.save = function () {};

    Map.prototype.eraseFuture = function (t) {
        // current state at t.
        // erase all states after t.
        let i;
        for (let i = 0; i < this.numTiles; i++) {
            if (t <= this.timeEaten[i]) {
                delete this.timeEaten[i];
            }
        }
    };

    Map.prototype.load = function (t, abs_t) {
        let firstTile;
        let refresh = function (i) {
            let x, y;
            x = i % this.numCols;
            y = Math.floor(i / this.numCols);
            renderer.refreshPellet(x, y);
        };
        let i;
        for (let i = 0; i < this.numTiles; i++) {
            firstTile = this.startTiles[i];
            if (firstTile == '.' || firstTile == 'o') {
                if (abs_t <= this.timeEaten[i]) { // dot should be present
                    if (this.currentTiles[i] != firstTile) {
                        this.dotsEaten--;
                        this.currentTiles[i] = firstTile;
                        refresh.call(this, i);
                    }
                } else if (abs_t > this.timeEaten[i]) { // dot should be missing
                    if (this.currentTiles[i] != ' ') {
                        this.dotsEaten++;
                        this.currentTiles[i] = ' ';
                        refresh.call(this, i);
                    }
                }
            }
        }
    };

    Map.prototype.resetTimeEaten = function () {
        this.startTiles = this.currentTiles.slice(0);
        this.timeEaten = {};
    };

    // reset current tiles
    Map.prototype.resetCurrent = function () {
        this.currentTiles = this.tiles.split(""); // create a mutable list copy of an immutable string
        this.dotsEaten = 0;
    };

    // This is a procedural way to generate original-looking maps from a simple ascii tile
    // map without a spritesheet.
    Map.prototype.parseWalls = function () {

        let that = this;

        // creates a list of drawable canvas paths to render the map walls
        this.paths = [];

        // a map of wall tiles that already belong to a built path
        let visited = {};

        // we extend the x range to suggest the continuation of the tunnels
        let toIndex = function (x, y) {
            if (x >= -2 && x < that.numCols + 2 && y >= 0 && y < that.numRows)
                return (x + 2) + y * (that.numCols + 4);
        };

        // a map of which wall tiles that are not completely surrounded by other wall tiles
        let edges = {};
        let i = 0,
            x, y;
        for (let y = 0; y < this.numRows; y++) {
            for (let x = -2; x < this.numCols + 2; x++, i++) {
                if (this.getTile(x, y) == '|' &&
                    (this.getTile(x - 1, y) != '|' ||
                        this.getTile(x + 1, y) != '|' ||
                        this.getTile(x, y - 1) != '|' ||
                        this.getTile(x, y + 1) != '|' ||
                        this.getTile(x - 1, y - 1) != '|' ||
                        this.getTile(x - 1, y + 1) != '|' ||
                        this.getTile(x + 1, y - 1) != '|' ||
                        this.getTile(x + 1, y + 1) != '|')) {
                    edges[i] = true;
                }
            }
        }

        // walks along edge wall tiles starting at the given index to build a canvas path
        let makePath = function (tx, ty) {

            // get initial direction
            let dir = {};
            let dirEnum;
            if (toIndex(tx + 1, ty) in edges)
                dirEnum = DIR_RIGHT;
            else if (toIndex(tx, ty + 1) in edges)
                dirEnum = DIR_DOWN;
            else
                throw "tile shouldn't be 1x1 at " + tx + "," + ty;
            setDirFromEnum(dir, dirEnum);

            // increment to next tile
            tx += dir.x;
            ty += dir.y;

            // backup initial location and direction
            let init_tx = tx;
            let init_ty = ty;
            let init_dirEnum = dirEnum;

            let path = [];
            let pad; // (persists for each call to getStartPoint)
            let point;
            let lastPoint;

            let turn, turnAround;

            /*

               We employ the 'right-hand rule' by keeping our right hand in contact
               with the wall to outline an individual wall piece.

               Since we parse the tiles in row major order, we will always start
               walking along the wall at the leftmost tile of its topmost row.  We
               then proceed walking to the right.  

               When facing the direction of the walk at each tile, the outline will
               hug the left side of the tile unless there is a walkable tile to the
               left.  In that case, there will be a padding distance applied.
               
            */
            let getStartPoint = function (tx, ty, dirEnum) {
                let dir = {};
                setDirFromEnum(dir, dirEnum);
                if (!(toIndex(tx + dir.y, ty - dir.x) in edges))
                    pad = that.isFloorTile(tx + dir.y, ty - dir.x) ? 5 : 0;
                let px = -tileSize / 2 + pad;
                let py = tileSize / 2;
                let a = getClockwiseAngleFromTop(dirEnum);
                let c = Math.cos(a);
                let s = Math.sin(a);
                return {
                    // the first expression is the rotated point centered at origin
                    // the second expression is to translate it to the tile
                    x: (px * c - py * s) + (tx + 0.5) * tileSize,
                    y: (px * s + py * c) + (ty + 0.5) * tileSize,
                };
            };
            while (true) {

                visited[toIndex(tx, ty)] = true;

                // determine start point
                point = getStartPoint(tx, ty, dirEnum);

                if (turn) {
                    // if we're turning into this tile, create a control point for the curve
                    //
                    // >---+  <- control point
                    //     |
                    //     V
                    lastPoint = path[path.length - 1];
                    if (dir.x == 0) {
                        point.cx = point.x;
                        point.cy = lastPoint.y;
                    } else {
                        point.cx = lastPoint.x;
                        point.cy = point.y;
                    }
                }

                // update direction
                turn = false;
                turnAround = false;
                if (toIndex(tx + dir.y, ty - dir.x) in edges) { // turn left
                    dirEnum = rotateLeft(dirEnum);
                    turn = true;
                } else if (toIndex(tx + dir.x, ty + dir.y) in edges) { // continue straight
                } else if (toIndex(tx - dir.y, ty + dir.x) in edges) { // turn right
                    dirEnum = rotateRight(dirEnum);
                    turn = true;
                } else { // turn around
                    dirEnum = rotateAboutFace(dirEnum);
                    turnAround = true;
                }
                setDirFromEnum(dir, dirEnum);

                // commit path point
                path.push(point);

                // special case for turning around (have to connect more dots manually)
                if (turnAround) {
                    path.push(getStartPoint(tx - dir.x, ty - dir.y, rotateAboutFace(dirEnum)));
                    path.push(getStartPoint(tx, ty, dirEnum));
                }

                // advance to the next wall
                tx += dir.x;
                ty += dir.y;

                // exit at full cycle
                if (tx == init_tx && ty == init_ty && dirEnum == init_dirEnum) {
                    that.paths.push(path);
                    break;
                }
            }
        };

        // iterate through all edges, making a new path after hitting an unvisited wall edge
        i = 0;
        for (let y = 0; y < this.numRows; y++)
            for (let x = -2; x < this.numCols + 2; x++, i++)
                if (i in edges && !(i in visited)) {
                    visited[i] = true;
                    makePath(x, y);
                }
    };

    // count pellets and store energizer locations
    Map.prototype.parseDots = function () {

        this.numDots = 0;
        this.numEnergizers = 0;
        this.energizers = [];

        let x, y;
        let i = 0;
        let tile;
        for (let y = 0; y < this.numRows; y++)
            for (let x = 0; x < this.numCols; x++) {
                tile = this.tiles[i];
                if (tile == '.') {
                    this.numDots++;
                } else if (tile == 'o') {
                    this.numDots++;
                    this.numEnergizers++;
                    this.energizers.push({
                        'x': x,
                        'y': y
                    });
                }
                i++;
            }
    };

    // get remaining dots left
    Map.prototype.dotsLeft = function () {
        return this.numDots - this.dotsEaten;
    };

    // determine if all dots have been eaten
    Map.prototype.allDotsEaten = function () {
        return this.dotsLeft() == 0;
    };

    // create a record of tunnel locations
    Map.prototype.parseTunnels = (function () {

        // starting from x,y and increment x by dx...
        // determine where the tunnel entrance begins
        let getTunnelEntrance = function (x, y, dx) {
            while (!this.isFloorTile(x, y - 1) && !this.isFloorTile(x, y + 1) && this.isFloorTile(x, y))
                x += dx;
            return x;
        };

        // the number of margin tiles outside of the map on one side of a tunnel
        // There are (2*marginTiles) tiles outside of the map per tunnel.
        let marginTiles = 2;

        return function () {
            this.tunnelRows = {};
            let y;
            for (let y = 0; y < this.numRows; y++)
                // a map row is a tunnel if opposite ends are both walkable tiles
                if (this.isFloorTile(0, y) && this.isFloorTile(this.numCols - 1, y))
                    this.tunnelRows[y] = {
                        'leftEntrance': getTunnelEntrance.call(this, 0, y, 1),
                        'rightEntrance': getTunnelEntrance.call(this, this.numCols - 1, y, -1),
                        'leftExit': -marginTiles * tileSize,
                        'rightExit': (this.numCols + marginTiles) * tileSize - 1,
                    };
        };
    })();

    // teleport actor to other side of tunnel if necessary
    Map.prototype.teleport = function (actor) {
        let t = this.tunnelRows[actor.tile.y];
        if (t) {
            if (actor.pixel.x < t.leftExit) actor.pixel.x = t.rightExit;
            else if (actor.pixel.x > t.rightExit) actor.pixel.x = t.leftExit;
        }
    };

    Map.prototype.posToIndex = function (x, y) {
        if (x >= 0 && x < this.numCols && y >= 0 && y < this.numRows)
            return x + y * this.numCols;
    };

    // define which tiles are inside the tunnel
    Map.prototype.isTunnelTile = function (x, y) {
        let tunnel = this.tunnelRows[y];
        return tunnel && (x < tunnel.leftEntrance || x > tunnel.rightEntrance);
    };

    // retrieves tile character at given coordinate
    // extended to include offscreen tunnel space
    Map.prototype.getTile = function (x, y) {
        if (x >= 0 && x < this.numCols && y >= 0 && y < this.numRows)
            return this.currentTiles[this.posToIndex(x, y)];
        if ((x < 0 || x >= this.numCols) && (this.isTunnelTile(x, y - 1) || this.isTunnelTile(x, y + 1)))
            return '|';
        if (this.isTunnelTile(x, y))
            return ' ';
    };

    // determines if the given character is a walkable floor tile
    Map.prototype.isFloorTileChar = function (tile) {
        return tile == ' ' || tile == '.' || tile == 'o';
    };

    // determines if the given tile coordinate has a walkable floor tile
    Map.prototype.isFloorTile = function (x, y) {
        return this.isFloorTileChar(this.getTile(x, y));
    };

    // mark the dot at the given coordinate eaten
    Map.prototype.onDotEat = function (x, y) {
        this.dotsEaten++;
        let i = this.posToIndex(x, y);
        this.currentTiles[i] = ' ';
        renderer.erasePellet(x, y);
    };
    //@line 1 "src/colors.js"
    // source: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript


    //@line 1 "src/mapgen.js"
    //@line 1 "src/atlas.js"

    let atlas = (function () {

        let canvas, ctx;
        let size = 22;
        let cols = 14; // has to be ONE MORE than intended to fix some sort of CHROME BUG (last cell always blank?)
        let rows = 22;

        let creates = 0;

        let drawGrid = function () {
            // draw grid overlay
            let canvas = document.getElementById('gridcanvas');
            if (!canvas) {
                return;
            }
            let w = size * cols * renderScale;
            let h = size * rows * renderScale;
            canvas.width = w;
            canvas.height = h;
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, w, h);
            let x, y;
            let step = size * renderScale;
            ctx.beginPath();
            for (let x = 0; x <= w; x += step) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
            }
            for (let y = 0; y <= h; y += step) {
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
            }
            ctx.lineWidth = "1px";
            ctx.lineCap = "square";
            ctx.strokeStyle = "rgba(255,255,255,0.5)";
            ctx.stroke();
        };

        let create = function () {
            drawGrid();
            canvas = document.getElementById('atlas');
            ctx = canvas.getContext("2d");
            /*
            canvas.style.left = 0;
            canvas.style.top = 0;
            canvas.style.position = "absolute";
            */

            let w = size * cols * renderScale;
            let h = size * rows * renderScale;
            canvas.width = w;
            canvas.height = h;

            if (creates > 0) {
                ctx.restore();
            }
            creates++;

            ctx.save();
            ctx.clearRect(0, 0, w, h);
            ctx.scale(renderScale, renderScale);

            let drawAtCell = function (f, row, col) {
                let x = col * size + size / 2;
                let y = row * size + size / 2;
                f(x, y);
            };

            let row = 0;
            drawAtCell(function (x, y) {
                drawCherry(ctx, x, y);
            }, row, 0);
            drawAtCell(function (x, y) {
                drawStrawberry(ctx, x, y);
            }, row, 1);
            drawAtCell(function (x, y) {
                drawOrange(ctx, x, y);
            }, row, 2);
            drawAtCell(function (x, y) {
                drawApple(ctx, x, y);
            }, row, 3);
            drawAtCell(function (x, y) {
                drawMelon(ctx, x, y);
            }, row, 4);
            drawAtCell(function (x, y) {
                drawGalaxian(ctx, x, y);
            }, row, 5);
            drawAtCell(function (x, y) {
                drawBell(ctx, x, y);
            }, row, 6);
            drawAtCell(function (x, y) {
                drawKey(ctx, x, y);
            }, row, 7);
            drawAtCell(function (x, y) {
                drawPretzel(ctx, x, y);
            }, row, 8);
            drawAtCell(function (x, y) {
                drawPear(ctx, x, y);
            }, row, 9);
            drawAtCell(function (x, y) {
                drawBanana(ctx, x, y);
            }, row, 10);

            let drawGhostCells = function (row, color) {
                let i, f;
                let col = 0;
                for (let i = 0; i < 4; i++) { // dirEnum
                    for (f = 0; f < 2; f++) { // frame
                        drawAtCell(function (x, y) {
                            drawGhostSprite(ctx, x, y, f, i, false, false, false, color);
                        }, row, col);
                        col++;
                    }
                }
            };

            row++;
            drawGhostCells(row, "#FF0000");
            row++;
            drawGhostCells(row, "#FFB8FF");
            row++;
            drawGhostCells(row, "#00FFFF");
            row++;
            drawGhostCells(row, "#FFB851");

            row++;
            // draw disembodied eyes
            (function () {
                let i;
                let col = 0;
                for (let i = 0; i < 4; i++) { // dirEnum
                    drawAtCell(function (x, y) {
                        drawGhostSprite(ctx, x, y, 0, i, false, false, true, "#fff");
                    }, row, col);
                    col++;
                }
            })();

            // draw ghosts scared
            drawAtCell(function (x, y) {
                drawGhostSprite(ctx, x, y, 0, DIR_UP, true, false, false, "#fff");
            }, row, 4);
            drawAtCell(function (x, y) {
                drawGhostSprite(ctx, x, y, 1, DIR_UP, true, false, false, "#fff");
            }, row, 5);
            drawAtCell(function (x, y) {
                drawGhostSprite(ctx, x, y, 0, DIR_UP, true, true, false, "#fff");
            }, row, 6);
            drawAtCell(function (x, y) {
                drawGhostSprite(ctx, x, y, 1, DIR_UP, true, true, false, "#fff");
            }, row, 7);

            let drawPacCells = function (row, col, dir) {
                drawAtCell(function (x, y) {
                    drawPacmanSprite(ctx, x, y, dir, Math.PI / 6);
                }, row, col);
                drawAtCell(function (x, y) {
                    drawPacmanSprite(ctx, x, y, dir, Math.PI / 3);
                }, row, col + 1);
            };
            row++;

            // draw pacman mouth closed
            drawAtCell(function (x, y) {
                drawPacmanSprite(ctx, x, y, DIR_RIGHT, 0);
            }, row, 0);

            // draw pacman directions
            (function () {
                let i;
                let col = 1;
                for (let i = 0; i < 4; i++) {
                    drawPacCells(row, col, i);
                    col += 2;
                }
            })();


            row++;
            (function () {
                let i;
                let col = 0;
                for (let i = 0; i < 4; i++) {
                    // drawMsPacCells(row, col, i);
                    col += 3;
                }
            })();


            let drawMonsterCells = function (row, color) {
                let i, f;
                let col = 0;
                for (let i = 0; i < 4; i++) { // dirEnum
                    for (f = 0; f < 2; f++) { // frame
                        drawAtCell(function (x, y) {
                            drawMonsterSprite(ctx, x, y, f, i, false, false, false, color);
                        }, row, col);
                        col++;
                    }
                }
            };

            row++;
            drawMonsterCells(row, "#FF0000");
            row++;
            drawMonsterCells(row, "#FFB8FF");
            row++;
            drawMonsterCells(row, "#00FFFF");
            row++;
            drawMonsterCells(row, "#FFB851");

            row++;
            (function () {
                let i;
                let col = 0;
                for (let i = 0; i < 4; i++) { // dirEnum
                    drawAtCell(function (x, y) {
                        drawMonsterSprite(ctx, x, y, 0, i, false, false, true, "#fff");
                    }, row, col);
                    col++;
                }
            })();
            drawAtCell(function (x, y) {
                drawMonsterSprite(ctx, x, y, 0, DIR_UP, true, false, false, "#fff");
            }, row, 4);
            drawAtCell(function (x, y) {
                drawMonsterSprite(ctx, x, y, 1, DIR_UP, true, false, false, "#fff");
            }, row, 5);
            drawAtCell(function (x, y) {
                drawMonsterSprite(ctx, x, y, 0, DIR_UP, true, true, false, "#fff");
            }, row, 6);
            drawAtCell(function (x, y) {
                drawMonsterSprite(ctx, x, y, 1, DIR_UP, true, true, false, "#fff");
            }, row, 7);


            row++;
            row++;

            row++;

            row++;


            row++;
            drawAtCell(function (x, y) {
                drawSnail(ctx, x, y, "#0ff");
            }, row, 0);
            drawAtCell(function (x, y) {
                drawSnail(ctx, x, y, "#FFF");
            }, row, 1);

            row++;
            row++;

        };

        let copyCellTo = function (row, col, destCtx, x, y, display) {
            let sx = col * size * renderScale;
            let sy = row * size * renderScale;
            let sw = renderScale * size;
            let sh = renderScale * size;

            let dx = x - size / 2;
            let dy = y - size / 2;
            let dw = size;
            let dh = size;

            if (display) {
                console.log(sx, sy, sw, sh, dw, dy, dw, dh);
            }

            destCtx.drawImage(canvas, sx, sy, sw, sh, dx, dy, dw, dh);
        };

        let copyGhostPoints = function (destCtx, x, y, points) {
            let row = 16;
            let col = {
                200: 0,
                400: 1,
                800: 2,
                1600: 3,
            } [points];
            if (col != undefined) {
                copyCellTo(row, col, destCtx, x, y);
            }
        };

        let copyPacFruitPoints = function (destCtx, x, y, points) {
            let row = 16;
            let col = {
                100: 4,
                300: 5,
                500: 6,
                700: 7,
                1000: 8,
                2000: 9,
                3000: 10,
                5000: 11,
            } [points];
            if (col != undefined) {
                copyCellTo(row, col, destCtx, x, y);
            }
        };



        let copyGhostSprite = function (destCtx, x, y, frame, dirEnum, scared, flash, eyes_only, color) {
            let row, col;
            if (eyes_only) {
                row = 5;
                col = dirEnum;
            } else if (scared) {
                row = 5;
                col = flash ? 6 : 4;
                col += frame;
            } else {
                col = dirEnum * 2 + frame;
                if (color == blinky.color) {
                    row = 1;
                } else if (color == pinky.color) {
                    row = 2;
                } else if (color == inky.color) {
                    row = 3;
                } else if (color == clyde.color) {
                    row = 4;
                } else {
                    row = 5;
                }
            }

            copyCellTo(row, col, destCtx, x, y);
        };


        let copyMonsterSprite = function (destCtx, x, y, frame, dirEnum, scared, flash, eyes_only, color) {
            let row, col;
            if (eyes_only) {
                row = 13;
                col = dirEnum;
            } else if (scared) {
                row = 13;
                col = flash ? 6 : 4;
                col += frame;
            } else {
                col = dirEnum * 2 + frame;
                if (color == blinky.color) {
                    row = 9;
                } else if (color == pinky.color) {
                    row = 10;
                } else if (color == inky.color) {
                    row = 11;
                } else if (color == clyde.color) {
                    row = 12;
                } else {
                    row = 13;
                }
            }

            copyCellTo(row, col, destCtx, x, y);
        };



        let copySnail = function (destCtx, x, y, frame) {
            let row = 18;
            let col = frame;
            copyCellTo(row, col, destCtx, x, y);
        };

        let copyPacmanSprite = function (destCtx, x, y, dirEnum, frame) {
            let row = 6;
            let col;
            if (frame == 0) {
                col = 0;
            } else {
                col = dirEnum * 2 + 1 + (frame - 1);
            }
            copyCellTo(row, col, destCtx, x, y);
        };



        let copyFruitSprite = function (destCtx, x, y, name) {
            let row = 0;
            let col = {
                "cherry": 0,
                "strawberry": 1,
                "orange": 2,
                "apple": 3,
                "melon": 4,
                "galaxian": 5,
                "bell": 6,
                "key": 7,
                "pretzel": 8,
                "pear": 9,
                "banana": 10,
                "cookie": 11,
                "cookieface": 12,
            } [name];

            copyCellTo(row, col, destCtx, x, y);
        };

        return {
            create: create,
            getCanvas: function () {
                return canvas;
            },
            drawGhostSprite: copyGhostSprite,
            drawMonsterSprite: copyMonsterSprite,
            drawPacmanSprite: copyPacmanSprite,
            drawFruitSprite: copyFruitSprite,
            drawGhostPoints: copyGhostPoints,
            drawPacFruitPoints: copyPacFruitPoints,
            drawSnail: copySnail,
        };
    })();
    //@line 1 "src/renderers.js"
    //////////////////////////////////////////////////////////////
    // Renderers

    // Draws everything in the game using swappable renderers
    // to enable to different front-end displays for Pac-Man.

    // list of available renderers

    // current renderer
    let renderer;

    let renderScale;

    let mapMargin = 4 * tileSize; // margin between the map and the screen
    let mapPad = tileSize / 8; // padding between the map and its clipping

    let mapWidth = 28 * tileSize + mapPad * 2;
    let mapHeight = 36 * tileSize + mapPad * 2;

    let screenWidth = mapWidth + mapMargin * 2;
    let screenHeight = mapHeight + mapMargin * 2;

    // all rendering will be shown on this canvas
    let canvas;

    let getDevicePixelRatio = function () {
        // Only consider the device pixel ratio for devices that are <= 320 pixels in width.
        // This is necessary for the iPhone4's retina display; otherwise the game would be blurry.
        // The iPad3's retina display @ 2048x1536 starts slowing the game down.
        return 1;
    };

    let initRenderer = function () {

        let bgCanvas;
        let ctx, bgCtx;

        // drawing scale
        let scale = 2; // scale everything by this amount

        // (temporary global version of scale just to get things quickly working)
        renderScale = scale;

        let resets = 0;

        // rescale the canvases
        let resetCanvasSizes = function () {

            // set the size of the canvas in actual pixels
            canvas.width = screenWidth * scale;
            canvas.height = screenHeight * scale;

            // set the size of the canvas in browser pixels
            let ratio = getDevicePixelRatio();
            canvas.style.width = canvas.width / ratio;
            canvas.style.height = canvas.height / ratio;

            if (resets > 0) {
                ctx.restore();
            }
            ctx.save();
            ctx.scale(scale, scale);

            bgCanvas.width = mapWidth * scale;
            bgCanvas.height = mapHeight * scale;
            if (resets > 0) {
                bgCtx.restore();
            }
            bgCtx.save();
            bgCtx.scale(scale, scale);

            resets++;
        };

        // get the target scale that will cause the canvas to fit the window
        let getTargetScale = function () {
            let sx = (window.innerWidth - 10) / screenWidth;
            let sy = (window.innerHeight - 10) / screenHeight;
            let s = Math.min(sx, sy);
            s *= getDevicePixelRatio();
            return s;
        };

        // maximize the scale to fit the window
        let fullscreen = function () {
            // NOTE: css-scaling alternative at https://gist.github.com/1184900
            renderScale = scale = getTargetScale();
            resetCanvasSizes();
            atlas.create();
            if (renderer) {
                renderer.drawMap();
            }
            center();
        };

        // center the canvas in the window
        let center = function () {
            let s = getTargetScale() / getDevicePixelRatio();
            let w = screenWidth * s;
            /*
            canvas.style.position = "absolute";
            canvas.style.left = x;
            canvas.style.top = y;
            console.log(canvas.style.left);
            */
            document.body.style.marginLeft = (window.innerWidth - w) / 2 + "px";
        };

        // create foreground and background canvases
        canvas = document.getElementById('canvas');
        bgCanvas = document.createElement('canvas');
        ctx = canvas.getContext("2d");
        bgCtx = bgCanvas.getContext("2d");

        // initialize placement and size
        fullscreen();

        // adapt placement and size to window resizes
        let resizeTimeout;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(fullscreen, 100);
        }, false);

        //////////////////////

        let beginMapFrame = function () {
            bgCtx.fillStyle = "#000";
            bgCtx.fillRect(0, 0, mapWidth, mapHeight);
            bgCtx.translate(mapPad, mapPad);
        };

        let endMapFrame = function () {
            bgCtx.translate(-mapPad, -mapPad);
        };

        //////////////////////////////////////////////////////////////
        // Common Renderer
        // (attributes and functionality that are currently common to all renderers)

        // constructor
        let CommonRenderer = function () {
            this.actorSize = (tileSize - 1) * 2;
            this.energizerSize = tileSize + 2;
            this.pointsEarnedTextSize = tileSize;

            this.energizerColor = "#FFF";
            this.pelletColor = "#888";

            this.flashLevel = false;
        };

        CommonRenderer.prototype = {

            setOverlayColor: function (color) {
                this.overlayColor = color;
            },

            beginMapClip: function () {
                ctx.save();
                ctx.beginPath();

                // subtract one from size due to shift done for sprite realignment?
                // (this fixes a bug that leaves unerased artifacts after actors use right-side tunnel
                ctx.rect(-mapPad, -mapPad, mapWidth - 1, mapHeight - 1);

                ctx.clip();
            },

            endMapClip: function () {
                ctx.restore();
            },

            beginFrame: function () {
                this.setOverlayColor(undefined);
                ctx.save();

                // clear margin area
                ctx.fillStyle = "#000";
                (function (w, h, p) {
                    ctx.fillRect(0, 0, w, p + 1);
                    ctx.fillRect(0, p, p, h - 2 * p);
                    ctx.fillRect(w - p - 2, p, p + 2, h - 2 * p);
                    ctx.fillRect(0, h - p - 2, w, p + 2);
                })(screenWidth, screenHeight, mapMargin);

                // draw fps
                if (DEBUG) {
                    ctx.font = (tileSize - 2) + "px ArcadeR";
                    ctx.textBaseline = "bottom";
                    ctx.textAlign = "right";
                    ctx.fillStyle = "#333";
                    ctx.fillText(Math.floor(executive.getFps()) + " FPS", screenWidth, screenHeight);
                }

                // translate to map space
                ctx.translate(mapMargin + mapPad, mapMargin + mapPad);
            },

            endFrame: function () {
                ctx.restore();
                if (this.overlayColor != undefined) {
                    ctx.fillStyle = this.overlayColor;
                    ctx.fillRect(0, 0, screenWidth, screenHeight);
                }
            },

            clearMapFrame: function () {
                ctx.fillStyle = "#000";
                ctx.fillRect(-1, -1, mapWidth + 1, mapHeight + 1);
            },

            renderFunc: function (f, that) {
                if (that) {
                    f.call(that, ctx);
                } else {
                    f(ctx);
                }
            },

            // scaling the canvas can incur floating point roundoff errors
            // which manifest as "grout" between tiles that are otherwise adjacent in integer-space
            // This function extends the width and height of the tile if it is adjacent to equivalent tiles
            // that are to the bottom or right of the given tile
            drawNoGroutTile: function (ctx, x, y) {
                let tileChar = map.getTile(x, y);
                this.drawCenterTileSq(ctx, x, y, tileSize,
                    map.getTile(x + 1, y) == tileChar,
                    map.getTile(x, y + 1) == tileChar,
                    map.getTile(x + 1, y + 1) == tileChar);
            },

            // draw square centered at the given tile with optional "floating point grout" filling
            drawCenterTileSq: function (ctx, tx, ty, w, rightGrout, downGrout, downRightGrout) {
                this.drawCenterPixelSq(ctx, tx * tileSize + midTile.x, ty * tileSize + midTile.y, w,
                    rightGrout, downGrout, downRightGrout);
            },

            // draw square centered at the given pixel
            drawCenterPixelSq: function (ctx, px, py, w, rightGrout, downGrout) {
                ctx.fillRect(px - w / 2, py - w / 2, w, w);

                // fill "floating point grout" gaps between tiles
                let gap = 1;
                if (rightGrout) ctx.fillRect(px - w / 2, py - w / 2, w + gap, w);
                if (downGrout) ctx.fillRect(px - w / 2, py - w / 2, w, w + gap);
                //if (rightGrout && downGrout && downRightGrout) ctx.fillRect(px-w/2, py-w/2,w+gap,w+gap);
            },

            // this flag is used to flash the level upon its successful completion
            toggleLevelFlash: function () {
                this.flashLevel = !this.flashLevel;
            },

            setLevelFlash: function (on) {
                if (on != this.flashLevel) {
                    this.flashLevel = on;
                    this.drawMap();
                }
            },

            // draw the target visualizers for each actor
            drawTargets: function (ghost_name, x, y) {
                let i;
                //give each ghost different color
                let color = "rgba(255,255,255,0.5)";
                if (ghost_name == "pinky") color = "rgba(255,192,203,0.5)";
                else if (ghost_name == 'blinky') color = "rgba(255,0,0,0.5)";
                else if (ghost_name == 'inky') color = "rgba(173,216,230,0.5)";
                else if (ghost_name == 'clyde') color = "rgba(255,140,0,0.5)";
                ctx.strokeStyle = "rgba(255,255,255,0.5)";
                ctx.fillStyle = color;
                ctx.lineWidth = "1.5";
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                this.drawNoGroutTile(ctx, x, y, 10);
            },

            // draw a predicted path for the actor if it continues pursuing current target
            drawPath: function (actor) {
                if (!actor.targetting) return;

                // current state of the predicted path
                let tile = {
                    x: actor.tile.x,
                    y: actor.tile.y
                };
                let target = actor.targetTile;
                let dir = {
                    x: actor.dir.x,
                    y: actor.dir.y
                };
                let dirEnum = actor.dirEnum;
                let openTiles;

                // exit if we're already on the target
                if (tile.x == target.x && tile.y == target.y) {
                    return;
                }

                // if we are past the center of the tile, we cannot turn here anymore, so jump to next tile
                if ((dirEnum == DIR_UP && actor.tilePixel.y <= midTile.y) ||
                    (dirEnum == DIR_DOWN && actor.tilePixel.y >= midTile.y) ||
                    (dirEnum == DIR_LEFT && actor.tilePixel.x <= midTile.x) ||
                    (dirEnum == DIR_RIGHT & actor.tilePixel.x >= midTile.x)) {
                    tile.x += dir.x;
                    tile.y += dir.y;
                }
                let pixel = {
                    x: tile.x * tileSize + midTile.x,
                    y: tile.y * tileSize + midTile.y
                };

                // dist keeps track of how far we're going along this path, stopping at maxDist
                // distLeft determines how long the last line should be
                let dist = Math.abs(tile.x * tileSize + midTile.x - actor.pixel.x + tile.y * tileSize + midTile.y - actor.pixel.y);
                let maxDist = actorPathLength * tileSize;
                let distLeft;

                // add the first line
                ctx.strokeStyle = actor.pathColor;
                ctx.lineWidth = "2.0";
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.beginPath();
                ctx.moveTo(
                    actor.pixel.x + actor.pathCenter.x,
                    actor.pixel.y + actor.pathCenter.y);
                ctx.lineTo(
                    pixel.x + actor.pathCenter.x,
                    pixel.y + actor.pathCenter.y);

                if (tile.x == target.x && tile.y == target.y) {
                    // adjust the distance left to create a smoothly interpolated path end
                    distLeft = actor.getPathDistLeft(pixel, dirEnum);
                } else
                    while (true) {

                        // predict next turn from current tile
                        openTiles = getOpenTiles(tile, dirEnum);
                        if (actor != pacman && map.constrainGhostTurns)
                            map.constrainGhostTurns(tile, openTiles, dirEnum);
                        dirEnum = getTurnClosestToTarget(tile, target, openTiles);
                        setDirFromEnum(dir, dirEnum);

                        // if the next tile is our target, determine how mush distance is left and break loop
                        if (tile.x + dir.x == target.x && tile.y + dir.y == target.y) {

                            // adjust the distance left to create a smoothly interpolated path end
                            distLeft = actor.getPathDistLeft(pixel, dirEnum);

                            // cap distance left
                            distLeft = Math.min(maxDist - dist, distLeft);

                            break;
                        }

                        // exit if we're going past the max distance
                        if (dist + tileSize > maxDist) {
                            distLeft = maxDist - dist;
                            break;
                        }

                        // move to next tile and add a line to its center
                        tile.x += dir.x;
                        tile.y += dir.y;
                        pixel.x += tileSize * dir.x;
                        pixel.y += tileSize * dir.y;
                        dist += tileSize;
                        ctx.lineTo(
                            tile.x * tileSize + midTile.x + actor.pathCenter.x,
                            tile.y * tileSize + midTile.y + actor.pathCenter.y);
                    }

                // calculate final endpoint
                let px = pixel.x + actor.pathCenter.x + distLeft * dir.x;
                let py = pixel.y + actor.pathCenter.y + distLeft * dir.y;

                // add an arrow head
                ctx.lineTo(px, py);
                let s = 3;
                if (dirEnum == DIR_LEFT || dirEnum == DIR_RIGHT) {
                    ctx.lineTo(px - s * dir.x, py + s * dir.x);
                    ctx.moveTo(px, py);
                    ctx.lineTo(px - s * dir.x, py - s * dir.x);
                } else {
                    ctx.lineTo(px + s * dir.y, py - s * dir.y);
                    ctx.moveTo(px, py);
                    ctx.lineTo(px - s * dir.y, py - s * dir.y);
                }

                // draw path    
                ctx.stroke();
            },

            // erase pellet from background
            erasePellet: function (x, y) {
                bgCtx.translate(mapPad, mapPad);
                bgCtx.fillStyle = this.floorColor;
                this.drawNoGroutTile(bgCtx, x, y, tileSize);

                // fill in adjacent floor tiles
                if (map.getTile(x + 1, y) == ' ') this.drawNoGroutTile(bgCtx, x + 1, y, tileSize);
                if (map.getTile(x - 1, y) == ' ') this.drawNoGroutTile(bgCtx, x - 1, y, tileSize);
                if (map.getTile(x, y + 1) == ' ') this.drawNoGroutTile(bgCtx, x, y + 1, tileSize);
                if (map.getTile(x, y - 1) == ' ') this.drawNoGroutTile(bgCtx, x, y - 1, tileSize);

                // TODO: fill in adjacent wall tiles?

                bgCtx.translate(-mapPad, -mapPad);
            },

            // draw a center screen message (e.g. "start", "ready", "game over")
            drawMessage: function (text, color, x, y) {
                ctx.font = tileSize + "px ArcadeR";
                ctx.textBaseline = "top";
                ctx.textAlign = "right";
                ctx.fillStyle = color;
                x += text.length;
                ctx.fillText(text, x * tileSize, y * tileSize);
            },

            drawReadyMessage: function () {
                this.drawMessage("READY ", "#FF0", 11, 20);
                drawExclamationPoint(ctx, 16 * tileSize + 3, 20 * tileSize + 3);
            },

            // draw the points earned from the most recently eaten ghost
            drawEatenPoints: function () {
                atlas.drawGhostPoints(ctx, pacman.pixel.x, pacman.pixel.y, energizer.getPoints());
            },

            // draw each actor (ghosts and pacman)
            drawActors: function () {
                let i;
                // draw such that pacman appears on top
                if (energizer.isActive()) {
                    for (let i = 0; i < 4; i++) {
                        this.drawGhost(ghosts[i]);
                    }
                    if (!energizer.showingPoints())
                        this.drawPlayer();
                    else
                        this.drawEatenPoints();
                }
                // draw such that pacman appears on bottom
                else {
                    this.drawPlayer();
                    for (let i = 3; i >= 0; i--) {
                        if (ghosts[i].isVisible) {
                            this.drawGhost(ghosts[i]);
                        }
                    }
                    if (inky.isVisible && !blinky.isVisible) {
                        this.drawGhost(blinky, 0.5);
                    }
                }
            },

        };

        //////////////////////////////////////////////////////////////
        // Simple Renderer
        // (render a minimal Pac-Man display using nothing but squares)

        // // constructor
        // let SimpleRenderer = function () {

        //     // inherit attributes from Common Renderer
        //     CommonRenderer.call(this, ctx, bgCtx);

        //     this.messageRow = 21.7;
        //     this.pointsEarnedTextSize = 1.5 * tileSize;

        //     this.backColor = "#222";
        //     this.floorColor = "#444";
        //     this.flashFloorColor = "#999";

        //     this.name = "Minimal";
        // };

        // SimpleRenderer.prototype = newChildObject(CommonRenderer.prototype, {

        //     drawMap: function () {

        //         beginMapFrame();

        //         let x, y;
        //         let i;
        //         let tile;

        //         // draw floor tiles
        //         bgCtx.fillStyle = (this.flashLevel ? this.flashFloorColor : this.floorColor);
        //         i = 0;
        //         for (let y = 0; y < map.numRows; y++)
        //             for (let x = 0; x < map.numCols; x++) {
        //                 tile = map.currentTiles[i++];
        //                 if (tile == ' ')
        //                     this.drawNoGroutTile(bgCtx, x, y, tileSize);
        //             }

        //         // draw pellet tiles
        //         bgCtx.fillStyle = this.pelletColor;
        //         i = 0;
        //         for (let y = 0; y < map.numRows; y++)
        //             for (let x = 0; x < map.numCols; x++) {
        //                 tile = map.currentTiles[i++];
        //                 if (tile == '.')
        //                     this.drawNoGroutTile(bgCtx, x, y, tileSize);
        //             }

        //         endMapFrame();
        //     },

        //     refreshPellet: function (x, y) {
        //         let i = map.posToIndex(x, y);
        //         let tile = map.currentTiles[i];
        //         if (tile == ' ') {
        //             this.erasePellet(x, y);
        //         } else if (tile == '.') {
        //             bgCtx.fillStyle = this.pelletColor;
        //             this.drawNoGroutTile(bgCtx, x, y, tileSize);
        //         }
        //     },


        //     // draw the current score and high score
        //     drawScore: function () {
        //         ctx.font = 1.5 * tileSize + "px sans-serif";
        //         ctx.textBaseline = "top";
        //         ctx.textAlign = "left";
        //         ctx.fillStyle = "#FFF";
        //         ctx.fillText(getScore(), tileSize, tileSize * 2);

        //         ctx.font = "bold " + 1.5 * tileSize + "px sans-serif";
        //         ctx.textBaseline = "top";
        //         ctx.textAlign = "center";
        //         // ctx.fillText("high score", tileSize * map.numCols / 2, 3);
        //         ctx.fillText(getHighScore(), tileSize * map.numCols / 2, tileSize * 2);


        //         ctx.font = 1.5 * tileSize + "px sans-serif";
        //         ctx.textBaseline = "top";
        //         ctx.textAlign = "right";
        //         ctx.fillStyle = "#FFF";
        //         ctx.fillText("Num Iter", tileSize * map.numCols / 2, 3);
        //         ctx.fillText(num_iter, tileSize, tileSize * 3);
        //     },

        //     // draw the extra lives indicator
        //     drawExtraLives: function () {
        //         let i;
        //         ctx.fillStyle = "rgba(255,255,0,0.6)";
        //         for (let i = 0; i < extraLives; i++)
        //             this.drawCenterPixelSq(ctx, (2 * i + 3) * tileSize, (map.numRows - 2) * tileSize + midTile.y, this.actorSize);
        //     },

        //     // draw the current level indicator
        //     drawLevelIcons: function () {
        //         let i;
        //         ctx.fillStyle = "rgba(255,255,255,0.5)";
        //         let w = 2;
        //         let h = this.actorSize;
        //         for (let i = 0; i < level; i++)
        //             ctx.fillRect((map.numCols - 2) * tileSize - i * 2 * w, (map.numRows - 2) * tileSize + midTile.y - h / 2, w, h);
        //     },

        //     // draw energizer items on foreground
        //     drawEnergizers: function () {
        //         ctx.fillStyle = this.energizerColor;
        //         let e;
        //         let i;
        //         for (let i = 0; i < map.numEnergizers; i++) {
        //             e = map.energizers[i];
        //             if (map.currentTiles[e.x + e.y * map.numCols] == 'o')
        //                 this.drawCenterTileSq(ctx, e.x, e.y, this.energizerSize);
        //         }
        //     },

        //     // draw pacman
        //     drawPlayer: function (scale, opacity) {
        //         if (scale == undefined) scale = 1;
        //         if (opacity == undefined) opacity = 1;
        //         ctx.fillStyle = "rgba(255,255,0," + opacity + ")";
        //         this.drawCenterPixelSq(ctx, pacman.pixel.x, pacman.pixel.y, this.actorSize * scale);
        //     },



        //     // draw ghost
        //     drawGhost: function (g) {
        //         if (g.mode == GHOST_EATEN)
        //             return;
        //         let color = g.color;
        //         if (g.scared)
        //             color = energizer.isFlash() ? "#FFF" : "#2121ff";
        //         else if (g.mode == GHOST_GOING_HOME || g.mode == GHOST_ENTERING_HOME)
        //             color = "rgba(255,255,255,0.3)";
        //         ctx.fillStyle = color;
        //         this.drawCenterPixelSq(ctx, g.pixel.x, g.pixel.y, this.actorSize);
        //     },

        //     drawFruit: function () {
        //         if (fruit.isPresent()) {
        //             ctx.fillStyle = "#0F0";
        //             this.drawCenterPixelSq(ctx, fruit.pixel.x, fruit.pixel.y, tileSize + 2);
        //         } else if (fruit.isScorePresent()) {
        //             ctx.font = this.pointsEarnedTextSize + "px sans-serif";
        //             ctx.textBaseline = "middle";
        //             ctx.textAlign = "center";
        //             ctx.fillStyle = "#FFF";
        //             ctx.fillText(fruit.getPoints(), fruit.pixel.x, fruit.pixel.y);
        //         }
        //     },

        // });


        //////////////////////////////////////////////////////////////
        // Arcade Renderer
        // (render a display close to the original arcade)

        // constructor
        let ArcadeRenderer = function (ctx, bgCtx) {

            // inherit attributes from Common Renderer
            CommonRenderer.call(this, ctx, bgCtx);

            this.messageRow = 20;
            this.pelletSize = 2;
            this.energizerSize = tileSize;

            this.backColor = "#000";
            this.floorColor = "#000";
            this.flashWallColor = "#FFF";

            this.name = "Arcade";
        };

        ArcadeRenderer.prototype = newChildObject(CommonRenderer.prototype, {

            // copy background canvas to the foreground canvas
            blitMap: function () {
                ctx.scale(1 / scale, 1 / scale);
                ctx.drawImage(bgCanvas, -1 - mapPad * scale, -1 - mapPad * scale); // offset map to compenstate for misalignment
                ctx.scale(scale, scale);
                //ctx.clearRect(-mapPad,-mapPad,mapWidth,mapHeight);
            },

            drawMap: function (isCutscene) {

                // fill background
                beginMapFrame();

                if (map) {

                    // Sometimes pressing escape during a flash can cause flash to be permanently enabled on maps.
                    // so just turn it off when not in the finish state.
                    if (state != finishState) {
                        this.flashLevel = false;
                    }

                    let x, y;
                    let i, j;

                    // ghost house door
                    i = 0;
                    for (let y = 0; y < map.numRows; y++)
                        for (let x = 0; x < map.numCols; x++) {
                            if (map.currentTiles[i] == '-' && map.currentTiles[i + 1] == '-') {
                                bgCtx.fillStyle = "#ffb8de";
                                bgCtx.fillRect(x * tileSize, y * tileSize + tileSize - 2, tileSize * 2, 2);
                            }
                            i++;
                        }

                    if (this.flashLevel) {
                        bgCtx.fillStyle = "#000";
                        bgCtx.strokeStyle = "#fff";
                    } else {
                        bgCtx.fillStyle = map.wallFillColor;
                        bgCtx.strokeStyle = map.wallStrokeColor;
                    }
                    for (let i = 0; i < map.paths.length; i++) {
                        let path = map.paths[i];
                        bgCtx.beginPath();
                        bgCtx.moveTo(path[0].x, path[0].y);
                        for (let j = 1; j < path.length; j++) {
                            if (path[j].cx != undefined)
                                bgCtx.quadraticCurveTo(path[j].cx, path[j].cy, path[j].x, path[j].y);
                            else
                                bgCtx.lineTo(path[j].x, path[j].y);
                        }
                        let lastPath = path[path.length - 1];
                        bgCtx.quadraticCurveTo(lastPath.x, path[0].y, path[0].x, path[0].y);
                        bgCtx.fill();
                        bgCtx.stroke();
                    }

                    // draw pellet tiles
                    bgCtx.fillStyle = map.pelletColor;
                    i = 0;
                    for (let y = 0; y < map.numRows; y++)
                        for (let x = 0; x < map.numCols; x++) {
                            this.refreshPellet(x, y, true);
                        }

                    if (map.onDraw) {
                        map.onDraw(bgCtx);
                    }

                    if (map.shouldDrawMapOnly) {
                        endMapFrame();
                        return;
                    }
                }
                if (level > 0) {

                    let numRows = 36;
                    let numCols = 28;

                    if (!isCutscene) {
                        // draw extra lives
                        let i;
                        bgCtx.fillStyle = pacman.color;

                        bgCtx.save();
                        bgCtx.translate(3 * tileSize, (numRows - 1) * tileSize);
                        bgCtx.scale(0.85, 0.85);
                        let lives = extraLives == Infinity ? 1 : extraLives;

                        for (let i = 0; i < lives; i++) {
                            drawPacmanSprite(bgCtx, 0, 0, DIR_LEFT, Math.PI / 6);
                            bgCtx.translate(2 * tileSize, 0);
                        }

                        if (extraLives == Infinity) {
                            bgCtx.translate(-4 * tileSize, 0);

                            // draw X
                            /*
                            bgCtx.translate(-s*2,0);
                            let s = 2; // radius of each stroke
                            bgCtx.beginPath();
                            bgCtx.moveTo(-s,-s);
                            bgCtx.lineTo(s,s);
                            bgCtx.moveTo(-s,s);
                            bgCtx.lineTo(s,-s);
                            bgCtx.lineWidth = 1;
                            bgCtx.strokeStyle = "#777";
                            bgCtx.stroke();
                            */

                            // draw Infinity symbol
                            let r = 2; // radius of each half-circle
                            let d = 3; // distance between the two focal points
                            bgCtx.beginPath();
                            bgCtx.moveTo(-d - r, 0);
                            bgCtx.quadraticCurveTo(-d - r, -r, -d, -r);
                            bgCtx.bezierCurveTo(-(d - r), -r, d - r, r, d, r);
                            bgCtx.quadraticCurveTo(d + r, r, d + r, 0);
                            bgCtx.quadraticCurveTo(d + r, -r, d, -r);
                            bgCtx.bezierCurveTo(d - r, -r, -(d - r), r, -d, r);
                            bgCtx.quadraticCurveTo(-d - r, r, -d - r, 0);
                            bgCtx.lineWidth = 1;
                            bgCtx.strokeStyle = "#FFF";
                            bgCtx.stroke();
                        }
                        bgCtx.restore();
                    }

                    // draw level fruit
                    let fruits = fruit.fruitHistory;
                    let i, j;
                    let f, drawFunc;
                    let numFruit = 7;
                    let startLevel = Math.max(numFruit, level);
                    if (gameMode != GAME_PACMAN) {
                        // for the Pac-Man game, display the last 7 fruit
                        // for the Ms Pac-Man game, display stop after the 7th fruit
                        startLevel = Math.min(numFruit, startLevel);
                    }
                    let scale = 0.85;
                    for (let i = 0, j = startLevel - numFruit + 1; i < numFruit && j <= level; j++, i++) {
                        f = fruits[j];
                        if (f) {
                            drawFunc = getSpriteFuncFromFruitName(f.name);
                            if (drawFunc) {
                                bgCtx.save();
                                bgCtx.translate((numCols - 3) * tileSize - i * 16 * scale, (numRows - 1) * tileSize);
                                bgCtx.scale(scale, scale);
                                drawFunc(bgCtx, 0, 0);
                                bgCtx.restore();
                            }
                        }
                    }
                    if (!isCutscene) {
                        if (level >= 100) {
                            bgCtx.font = (tileSize - 3) + "px ArcadeR";
                        } else {
                            bgCtx.font = (tileSize - 1) + "px ArcadeR";
                        }
                        bgCtx.textBaseline = "middle";
                        bgCtx.fillStyle = "#777";
                        bgCtx.textAlign = "left";
                        bgCtx.fillText(level, (numCols - 2) * tileSize, (numRows - 1) * tileSize);
                    }
                }
                endMapFrame();
            },

            erasePellet: function (x, y, isTranslated) {
                if (!isTranslated) {
                    bgCtx.translate(mapPad, mapPad);
                }
                bgCtx.fillStyle = "#000";
                let i = map.posToIndex(x, y);
                let size = map.tiles[i] == 'o' ? this.energizerSize : this.pelletSize;
                this.drawCenterTileSq(bgCtx, x, y, size + 2);
                if (!isTranslated) {
                    bgCtx.translate(-mapPad, -mapPad);
                }
            },

            refreshPellet: function (x, y, isTranslated) {
                if (!isTranslated) {
                    bgCtx.translate(mapPad, mapPad);
                }
                let i = map.posToIndex(x, y);
                let tile = map.currentTiles[i];
                if (tile == ' ') {
                    this.erasePellet(x, y, isTranslated);
                } else if (tile == '.') {
                    bgCtx.fillStyle = map.pelletColor;
                    bgCtx.translate(0.5, 0.5);
                    this.drawCenterTileSq(bgCtx, x, y, this.pelletSize);
                    bgCtx.translate(-0.5, -0.5);
                } else if (tile == 'o') {
                    bgCtx.fillStyle = map.pelletColor;
                    bgCtx.beginPath();
                    bgCtx.arc(x * tileSize + midTile.x + 0.5, y * tileSize + midTile.y, this.energizerSize / 2, 0, Math.PI * 2);
                    bgCtx.fill();
                }
                if (!isTranslated) {
                    bgCtx.translate(-mapPad, -mapPad);
                }
            },

            // draw the current score and high score
            drawScore: function () {
                ctx.font = tileSize + "px ArcadeR";
                ctx.textBaseline = "top";
                ctx.fillStyle = "#FFF";

                ctx.textAlign = "right";
                ctx.fillText("1UP", 6 * tileSize, 0);
                ctx.fillText(practiceMode ? "PRACTICE" : "HIGH SCORE", 19 * tileSize, 0);
                ctx.fillText("ITER", 29 * tileSize, 0);
                //ctx.fillText("2UP", 25*tileSize, 0);

                // TODO: player two score
                let score = getScore();
                if (score == 0) {
                    score = "00";
                }
                let y = tileSize + 1;
                ctx.fillText(score, 7 * tileSize, y);

                if (!practiceMode) {
                    let highScore = getHighScore();
                    if (highScore == 0) {
                        highScore = "00";
                    }
                    ctx.fillText(highScore, 17 * tileSize, y);
                }
                ctx.fillText(num_iter, 27 * tileSize, y);
            },

            // draw ghost
            drawGhost: function (g, alpha) {
                let backupAlpha;
                if (alpha) {
                    backupAlpha = ctx.globalAlpha;
                    ctx.globalAlpha = alpha;
                }

                let draw = function (mode, pixel, frames, faceDirEnum, scared, isFlash, color, dirEnum) {
                    if (mode == GHOST_EATEN)
                        return;
                    let frame = g.getAnimFrame(frames);
                    let eyes = (mode == GHOST_GOING_HOME || mode == GHOST_ENTERING_HOME);
                    let func = getGhostDrawFunc();
                    let y = g.getBounceY(pixel.x, pixel.y, dirEnum);
                    let x = (g == blinky && scared) ? pixel.x + 1 : pixel.x; // blinky's sprite is shifted right when scared

                    func(ctx, x, y, frame, faceDirEnum, scared, isFlash, eyes, color);
                };

                draw(g.mode, g.pixel, g.frames, g.faceDirEnum, g.scared, energizer.isFlash(), g.color, g.dirEnum);
                if (alpha) {
                    ctx.globalAlpha = backupAlpha;
                }
            },

            // draw pacman
            drawPlayer: function () {
                if (pacman.invincible) {
                    ctx.globalAlpha = 0.6;
                }

                let draw = function (pixel, dirEnum, steps) {
                    let frame = pacman.getAnimFrame(pacman.getStepFrame(steps));
                    let func = getPlayerDrawFunc();
                    func(ctx, pixel.x, pixel.y, dirEnum, frame, true);
                };
                draw(pacman.pixel, pacman.dirEnum, pacman.steps);
                if (pacman.invincible) {
                    ctx.globalAlpha = 1;
                }
            },

            // draw fruit
            drawFruit: function () {

                if (fruit.getCurrentFruit()) {
                    let name = fruit.getCurrentFruit().name;


                    if (fruit.isPresent()) {
                        atlas.drawFruitSprite(ctx, fruit.pixel.x, fruit.pixel.y, name);
                    } else if (fruit.isScorePresent()) {
                        if (gameMode == GAME_PACMAN) {
                            atlas.drawPacFruitPoints(ctx, fruit.pixel.x, fruit.pixel.y, fruit.getPoints());
                        }
                    }
                }
            },

        });

        renderer = new ArcadeRenderer();
    };
    //@line 1 "src/hud.js"

    let hud = (function () {

        let on = false;

        return {

            update: function () {
                let valid = this.isValidState();
                if (valid != on) {
                    on = valid;
                }
            },
            draw: function () {},
            isValidState: function () {
                return (
                    state == playState ||
                    state == newGameState ||
                    state == readyNewState ||
                    state == readyRestartState ||
                    state == finishState ||
                    state == deadState ||
                    state == overState);
            },
        };

    })();

    //@line 1 "src/sprites.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // Sprites
    // (sprites are created using canvas paths)

    let drawGhostSprite = (function () {

        // add top of the ghost head to the current canvas path
        let addHead = (function () {

            // pixel coordinates for the top of the head
            // on the original arcade ghost sprite

            return function (ctx) {
                ctx.save();

                // translate by half a pixel to the right
                // to try to force centering
                ctx.translate(0.5, 0);

                ctx.moveTo(0, 6);
                ctx.quadraticCurveTo(1.5, 0, 6.5, 0);
                ctx.quadraticCurveTo(11.5, 0, 13, 6);

                // draw lines between pixel coordinates
                /*
                ctx.moveTo(coords[0],coords[1]);
                for (i=2; i<coords.length; i+=2)
                    ctx.lineTo(coords[i],coords[i+1]);
                */

                ctx.restore();
            };
        })();

        // add first ghost animation frame feet to the current canvas path
        let addFeet1 = (function () {

            // pixel coordinates for the first feet animation
            // on the original arcade ghost sprite
            let coords = [
                13, 13,
                11, 11,
                9, 13,
                8, 13,
                8, 11,
                5, 11,
                5, 13,
                4, 13,
                2, 11,
                0, 13,
            ];

            return function (ctx) {
                let i;
                ctx.save();

                // translate half a pixel right and down
                // to try to force centering and proper height
                ctx.translate(0.5, 0.5);

                // continue previous path (assuming ghost head)
                // by drawing lines to each of the pixel coordinates
                for (let i = 0; i < coords.length; i += 2)
                    ctx.lineTo(coords[i], coords[i + 1]);

                ctx.restore();
            };

        })();

        // add second ghost animation frame feet to the current canvas path
        let addFeet2 = (function () {

            // pixel coordinates for the second feet animation
            // on the original arcade ghost sprite
            let coords = [
                13, 12,
                12, 13,
                11, 13,
                9, 11,
                7, 13,
                6, 13,
                4, 11,
                2, 13,
                1, 13,
                0, 12,
            ];

            return function (ctx) {
                let i;
                ctx.save();

                // translate half a pixel right and down
                // to try to force centering and proper height
                ctx.translate(0.5, 0.5);

                // continue previous path (assuming ghost head)
                // by drawing lines to each of the pixel coordinates
                for (let i = 0; i < coords.length; i += 2)
                    ctx.lineTo(coords[i], coords[i + 1]);

                ctx.restore();
            };

        })();

        // draw regular ghost eyes
        let addEyes = function (ctx, dirEnum) {
            let i;

            ctx.save();
            ctx.translate(2, 3);

            let coords = [
                0, 1,
                1, 0,
                2, 0,
                3, 1,
                3, 3,
                2, 4,
                1, 4,
                0, 3
            ];

            let drawEyeball = function () {
                ctx.translate(0.5, 0.5);
                ctx.beginPath();
                ctx.moveTo(coords[0], coords[1]);
                for (let i = 2; i < coords.length; i += 2)
                    ctx.lineTo(coords[i], coords[i + 1]);
                ctx.closePath();
                ctx.fill();
                ctx.lineJoin = 'round';
                ctx.stroke();
                ctx.translate(-0.5, -0.5);
                //ctx.fillRect(1,0,2,5); // left
                //ctx.fillRect(0,1,4,3);
            };

            // translate eye balls to correct position
            if (dirEnum == DIR_LEFT) ctx.translate(-1, 0);
            else if (dirEnum == DIR_RIGHT) ctx.translate(1, 0);
            else if (dirEnum == DIR_UP) ctx.translate(0, -1);
            else if (dirEnum == DIR_DOWN) ctx.translate(0, 1);

            // draw eye balls
            ctx.fillStyle = "#FFF";
            ctx.strokeStyle = "#FFF";
            ctx.lineWidth = 1.0;
            ctx.lineJoin = 'round';
            drawEyeball();
            ctx.translate(6, 0);
            drawEyeball();

            // translate pupils to correct position
            if (dirEnum == DIR_LEFT) ctx.translate(0, 2);
            else if (dirEnum == DIR_RIGHT) ctx.translate(2, 2);
            else if (dirEnum == DIR_UP) ctx.translate(1, 0);
            else if (dirEnum == DIR_DOWN) ctx.translate(1, 3);

            // draw pupils
            ctx.fillStyle = "#00F";
            ctx.fillRect(0, 0, 2, 2); // right
            ctx.translate(-6, 0);
            ctx.fillRect(0, 0, 2, 2); // left

            ctx.restore();
        };

        // draw scared ghost face
        let addScaredFace = function (ctx, flash) {
            ctx.strokeStyle = ctx.fillStyle = flash ? "#F00" : "#FF0";

            // eyes
            ctx.fillRect(4, 5, 2, 2);
            ctx.fillRect(8, 5, 2, 2);

            // mouth
            let coords = [
                1, 10,
                2, 9,
                3, 9,
                4, 10,
                5, 10,
                6, 9,
                7, 9,
                8, 10,
                9, 10,
                10, 9,
                11, 9,
                12, 10,
            ];
            ctx.translate(0.5, 0.5);
            ctx.beginPath();
            ctx.moveTo(coords[0], coords[1]);
            for (let i = 2; i < coords.length; i += 2)
                ctx.lineTo(coords[i], coords[i + 1]);
            ctx.lineWidth = 1.0;
            ctx.stroke();
            ctx.translate(-0.5, -0.5);
            /*
            ctx.fillRect(1,10,1,1);
            ctx.fillRect(12,10,1,1);
            ctx.fillRect(2,9,2,1);
            ctx.fillRect(6,9,2,1);
            ctx.fillRect(10,9,2,1);
            ctx.fillRect(4,10,2,1);
            ctx.fillRect(8,10,2,1);
            */
        };


        return function (ctx, x, y, frame, dirEnum, scared, flash, eyes_only, color) {
            ctx.save();
            ctx.translate(x - 7, y - 7);

            if (scared)
                color = flash ? "#FFF" : "#2121ff";

            if (!eyes_only) {
                // draw body
                ctx.beginPath();
                addHead(ctx);
                if (frame == 0)
                    addFeet1(ctx);
                else
                    addFeet2(ctx);
                ctx.closePath();
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                ctx.lineWidth = 0.5;
                ctx.strokeStyle = color;
                ctx.stroke();
                ctx.lineWidth = 1;
                ctx.fillStyle = color;
                ctx.fill();
            }

            // draw face
            if (scared)
                addScaredFace(ctx, flash);
            else
                addEyes(ctx, dirEnum);

            ctx.restore();
        };
    })();


    let drawMonsterSprite = (function () {
        let ctx;
        let color;

        let plotOutline = function (points, color) {
            let len = points.length;
            let i;
            ctx.beginPath();
            ctx.moveTo(points[0], points[1]);
            for (let i = 2; i < len; i += 2) {
                ctx.lineTo(points[i], points[i + 1]);
            }
            ctx.closePath();
            ctx.lineWidth = 1.0;
            ctx.lineCap = ctx.lineJoin = "round";
            ctx.strokeStyle = color;
            ctx.stroke();
        };

        let plotLine = function (points, color) {
            let len = points.length;
            let i;
            ctx.beginPath();
            ctx.moveTo(points[0], points[1]);
            for (let i = 2; i < len; i += 2) {
                ctx.lineTo(points[i], points[i + 1]);
            }
            ctx.lineWidth = 1.0;
            ctx.lineCap = ctx.lineJoin = "round";
            ctx.strokeStyle = color;
            ctx.stroke();
        };

        let plotSolid = function (points, color) {
            let len = points.length;
            let i;
            ctx.beginPath();
            ctx.moveTo(points[0], points[1]);
            for (let i = 2; i < len; i += 2) {
                ctx.lineTo(points[i], points[i + 1]);
            }
            ctx.closePath();
            ctx.lineWidth = 1.0;
            ctx.lineJoin = "round";
            ctx.fillStyle = ctx.strokeStyle = color;
            ctx.fill();
            ctx.stroke();
        };


        // draw regular ghost eyes
        let drawEye = function (dirEnum, x, y) {

            ctx.save();
            ctx.translate(x, y);

            plotSolid([
                0, 1,
                1, 0,
                2, 0,
                3, 1,
                3, 3,
                2, 4,
                1, 4,
                0, 3
            ], "#FFF");

            // translate pupil to correct position
            if (dirEnum == DIR_LEFT) ctx.translate(0, 2);
            else if (dirEnum == DIR_RIGHT) ctx.translate(2, 2);
            else if (dirEnum == DIR_UP) ctx.translate(1, 0);
            else if (dirEnum == DIR_DOWN) ctx.translate(1, 3);

            // draw pupil
            plotSolid([
                0, 0,
                1, 0,
                1, 1,
                0, 1,
            ], "#00F");

            ctx.restore();
        };

        let drawRightBody = function () {
            plotSolid([
                -7, -3,
                -3, -7,
                -1, -7,
                -2, -6,
                0, -4,
                3, -7,
                5, -7,
                4, -7,
                3, -6,
                6, -3,
                6, 1,
                5, 3,
                2, 6,
                -4, 6,
                -5, 5,
                -7, 1,
            ], color);
        };

        let drawRightShoe = function (x, y) {
            ctx.save();
            ctx.translate(x, y);
            plotSolid([
                0, 0,
                3, -3,
                4, -3,
                5, -2,
                5, -1,
                4, 0,
            ], "#00F");
            ctx.restore();
        };

        let drawRight0 = function () {
            // antenna tips
            plotLine([-1, -7, 0, -6], "#FFF");
            plotLine([5, -7, 6, -6], "#FFF");

            drawRightBody();

            drawRightShoe(1, 6);
            plotLine([-4, 6, -1, 6], "#00F");

            drawEye(DIR_RIGHT, -4, -4);
            drawEye(DIR_RIGHT, 2, -4);
        };

        let drawRight1 = function () {
            // antenna tips
            plotLine([-1, -7, 0, -7], "#FFF");
            plotLine([5, -7, 6, -7], "#FFF");

            drawRightBody();

            drawRightShoe(-4, 6);
            plotLine([2, 6, 5, 6], "#00F");

            drawEye(DIR_RIGHT, -4, -4);
            drawEye(DIR_RIGHT, 2, -4);
        };

        let drawLeft0 = function () {
            ctx.scale(-1, 1);
            ctx.translate(1, 0);
            drawRight0();
        };

        let drawLeft1 = function () {
            ctx.scale(-1, 1);
            ctx.translate(1, 0);
            drawRight1();
        };

        let drawUpDownBody0 = function () {
            plotLine([-6, -7, -7, -6], "#FFF");
            plotLine([5, -7, 6, -6], "#FFF");
            plotSolid([
                -7, -3,
                -4, -6,
                -5, -7,
                -6, -7,
                -4, -7,
                -3, -6,
                -2, -6,
                -1, -5,
                0, -5,
                1, -6,
                2, -6,
                3, -7,
                5, -7,
                4, -7,
                3, -6,
                6, -3,
                6, 1,
                5, 3,
                4, 5,
                3, 6,
                -4, 6,
                -5, 5,
                -6, 3,
                -7, 1,
            ], color);
        };

        let drawUpDownBody1 = function () {
            plotLine([-6, -6, -7, -5], "#FFF");
            plotLine([5, -6, 6, -5], "#FFF");
            plotSolid([
                -7, -3,
                -4, -6,
                -5, -7,
                -6, -6,
                -5, -7,
                -4, -7,
                -3, -6,
                -2, -6,
                -1, -5,
                0, -5,
                1, -6,
                2, -6,
                3, -7,
                4, -7,
                5, -6,
                4, -7,
                3, -6,
                6, -3,
                6, 1,
                5, 3,
                4, 5,
                3, 6,
                -4, 6,
                -5, 5,
                -6, 3,
                -7, 1,
            ], color);
        };

        let drawUp0 = function () {
            drawUpDownBody0();
            drawEye(DIR_UP, -5, -5);
            drawEye(DIR_UP, 1, -5);
            plotSolid([
                -4, 6,
                -3, 5,
                -2, 5,
                -1, 6,
            ], "#00F");
        };

        let drawUp1 = function () {
            drawUpDownBody1();
            drawEye(DIR_UP, -5, -5);
            drawEye(DIR_UP, 1, -5);
            plotSolid([
                0, 6,
                1, 5,
                2, 5,
                3, 6,
            ], "#00F");
        };

        let drawDown0 = function () {
            drawUpDownBody0();
            drawEye(DIR_DOWN, -5, -4);
            drawEye(DIR_DOWN, 1, -4);
            plotSolid([
                0, 6,
                1, 4,
                2, 3,
                3, 3,
                4, 4,
                4, 5,
                3, 6,
            ], "#00F");
            plotLine([-4, 6, -2, 6], "#00F");
        };

        let drawDown1 = function () {
            drawUpDownBody1();
            drawEye(DIR_DOWN, -5, -4);
            drawEye(DIR_DOWN, 1, -4);
            plotSolid([
                -1, 6,
                -2, 4,
                -3, 3,
                -4, 3,
                -5, 4,
                -5, 5,
                -4, 6,
            ], "#00F");
            plotLine([1, 6, 3, 6], "#00F");
        };

        let borderColor;
        let faceColor;

        let drawScaredBody = function () {
            plotOutline([
                -6, -2,
                -2, -5,
                -3, -6,
                -5, -6,
                -3, -6,
                -1, -4,
                1, -4,
                3, -6,
                5, -6,
                3, -6,
                2, -5,
                6, -2,
                6, 4,
                5, 6,
                4, 7,
                -4, 7,
                -5, 6,
                -6, 4
            ], borderColor);

            plotLine([
                -2, 4,
                -1, 3,
                1, 3,
                2, 4
            ], faceColor);
        };


        let drawScared0 = function () {
            plotLine([-2, -2, -2, 0], faceColor);
            plotLine([-3, -1, -1, -1], faceColor);
            plotLine([2, -2, 2, 0], faceColor);
            plotLine([3, -1, 1, -1], faceColor);
            plotLine([-5, -6, -6, -7], "#FFF");
            plotLine([5, -6, 6, -7], "#FFF");
            drawScaredBody();
        };

        let drawScared1 = function () {
            plotLine([-3, -2, -1, 0], faceColor);
            plotLine([-3, 0, -1, -2], faceColor);
            plotLine([1, -2, 3, 0], faceColor);
            plotLine([1, 0, 3, -2], faceColor);
            plotLine([-5, -6, -6, -5], "#FFF");
            plotLine([5, -6, 6, -5], "#FFF");
            drawScaredBody();
        };

        return function (_ctx, x, y, frame, dirEnum, scared, flash, eyes_only, _color) {
            if (eyes_only) {
                return; // invisible
            }

            ctx = _ctx;
            color = _color;

            ctx.save();
            ctx.translate(x + 0.5, y + 0.5);

            if (scared) {
                ctx.translate(0, -1); // correct alignment error from my chosen coordinates
                borderColor = flash ? "#FFF" : "#00F";
                faceColor = flash ? "#F00" : "#FF0";
                [drawScared0, drawScared1][frame]();
            } else if (dirEnum == DIR_RIGHT) {
                [drawRight0, drawRight1][frame]();
            } else if (dirEnum == DIR_LEFT) {
                [drawLeft0, drawLeft1][frame]();
            } else if (dirEnum == DIR_DOWN) {
                [drawDown0, drawDown1][frame]();
            } else if (dirEnum == DIR_UP) {
                [drawUp0, drawUp1][frame]();
            }

            ctx.restore();
        };
    })();


    // draw pacman body
    let drawPacmanSprite = function (ctx, x, y, dirEnum, angle, mouthShift, scale, centerShift, alpha, color, rot_angle) {

        if (mouthShift == undefined) mouthShift = 0;
        if (centerShift == undefined) centerShift = 0;
        if (scale == undefined) scale = 1;
        if (alpha == undefined) alpha = 1;

        if (color == undefined) {
            color = "rgba(255,255,0," + alpha + ")";
        }

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        if (rot_angle) {
            ctx.rotate(rot_angle);
        }

        // rotate to current heading direction
        let d90 = Math.PI / 2;
        if (dirEnum == DIR_UP) ctx.rotate(3 * d90);
        else if (dirEnum == DIR_RIGHT) ctx.rotate(0);
        else if (dirEnum == DIR_DOWN) ctx.rotate(d90);
        else if (dirEnum == DIR_LEFT) ctx.rotate(2 * d90);

        // plant corner of mouth
        ctx.beginPath();
        ctx.moveTo(-3 + mouthShift, 0);

        // draw head outline
        ctx.arc(centerShift, 0, 6.5, angle, 2 * Math.PI - angle);
        ctx.closePath();

        //ctx.strokeStyle = color;
        //ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();

        ctx.restore();
    };


    ////////////////////////////////////////////////////////////////////
    // FRUIT SPRITES

    let drawCherry = function (ctx, x, y) {

        // cherry
        let cherry = function (x, y) {
            ctx.save();
            ctx.translate(x, y);

            // red fruit
            ctx.beginPath();
            ctx.arc(2.5, 2.5, 3, 0, Math.PI * 2);
            ctx.lineWidth = 1.0;
            ctx.strokeStyle = "#000";
            ctx.stroke();
            ctx.fillStyle = "#ff0000";
            ctx.fill();

            // white shine
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(1, 3);
            ctx.lineTo(2, 4);
            ctx.strokeStyle = "#fff";
            ctx.stroke();
            ctx.restore();
        };

        ctx.save();
        ctx.translate(x, y);

        // draw both cherries
        cherry(-6, -1);
        cherry(-1, 1);

        // draw stems
        ctx.beginPath();
        ctx.moveTo(-3, 0);
        ctx.bezierCurveTo(-1, -2, 2, -4, 5, -5);
        ctx.lineTo(5, -4);
        ctx.bezierCurveTo(3, -4, 1, 0, 1, 2);
        ctx.strokeStyle = "#ff9900";
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.restore();
    };

    let drawStrawberry = function (ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);

        // red body
        ctx.beginPath();
        ctx.moveTo(-1, -4);
        ctx.bezierCurveTo(-3, -4, -5, -3, -5, -1);
        ctx.bezierCurveTo(-5, 3, -2, 5, 0, 6);
        ctx.bezierCurveTo(3, 5, 5, 2, 5, 0);
        ctx.bezierCurveTo(5, -3, 3, -4, 0, -4);
        ctx.fillStyle = "#f00";
        ctx.fill();
        ctx.strokeStyle = "#f00";
        ctx.stroke();

        // white spots
        let spots = [{
                x: -4,
                y: -1
            },
            {
                x: -3,
                y: 2
            },
            {
                x: -2,
                y: 0
            },
            {
                x: -1,
                y: 4
            },
            {
                x: 0,
                y: 2
            },
            {
                x: 0,
                y: 0
            },
            {
                x: 2,
                y: 4
            },
            {
                x: 2,
                y: -1
            },
            {
                x: 3,
                y: 1
            },
            {
                x: 4,
                y: -2
            }
        ];

        ctx.fillStyle = "#fff";
        let i, len;
        for (let i = 0, len = spots.length; i < len; i++) {
            let s = spots[i];
            ctx.beginPath();
            ctx.arc(s.x, s.y, 0.75, 0, 2 * Math.PI);
            ctx.fill();
        }

        // green leaf
        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.lineTo(-3, -4);
        ctx.lineTo(0, -4);
        ctx.lineTo(-2, -3);
        ctx.lineTo(-1, -3);
        ctx.lineTo(0, -4);
        ctx.lineTo(0, -2);
        ctx.lineTo(0, -4);
        ctx.lineTo(1, -3);
        ctx.lineTo(2, -3);
        ctx.lineTo(0, -4);
        ctx.lineTo(3, -4);
        ctx.closePath();
        ctx.strokeStyle = "#00ff00";
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // stem
        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.lineTo(0, -5);
        ctx.lineCap = 'round';
        ctx.strokeStyle = "#fff";
        ctx.stroke();
        ctx.restore();
    };

    let drawOrange = function (ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);

        // orange body
        ctx.beginPath();
        ctx.moveTo(-2, -2);
        ctx.bezierCurveTo(-3, -2, -5, -1, -5, 1);
        ctx.bezierCurveTo(-5, 4, -3, 6, 0, 6);
        ctx.bezierCurveTo(3, 6, 5, 4, 5, 1);
        ctx.bezierCurveTo(5, -1, 3, -2, 2, -2);
        ctx.closePath();
        ctx.fillStyle = "#ffcc33";
        ctx.fill();
        ctx.strokeStyle = "#ffcc33";
        ctx.stroke();

        // stem
        ctx.beginPath();
        ctx.moveTo(-1, -1);
        ctx.quadraticCurveTo(-1, -2, -2, -2);
        ctx.quadraticCurveTo(-1, -2, -1, -4);
        ctx.quadraticCurveTo(-1, -2, 0, -2);
        ctx.quadraticCurveTo(-1, -2, -1, -1);
        ctx.strokeStyle = "#ff9900";
        ctx.lineJoin = 'round';
        ctx.stroke();

        // green leaf
        ctx.beginPath();
        ctx.moveTo(-0.5, -4);
        ctx.quadraticCurveTo(0, -5, 1, -5);
        ctx.bezierCurveTo(2, -5, 3, -4, 4, -4);
        ctx.bezierCurveTo(3, -4, 3, -3, 2, -3);
        ctx.bezierCurveTo(1, -3, 1, -4, -0.5, -4);
        ctx.strokeStyle = "#00ff00";
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.fillStyle = "#00ff00";
        ctx.fill();

        ctx.restore();
    };

    let drawApple = function (ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);

        // red fruit
        ctx.beginPath();
        ctx.moveTo(-2, -3);
        ctx.bezierCurveTo(-2, -4, -3, -4, -4, -4);
        ctx.bezierCurveTo(-5, -4, -6, -3, -6, 0);
        ctx.bezierCurveTo(-6, 3, -4, 6, -2.5, 6);
        ctx.quadraticCurveTo(-1, 6, -1, 5);
        ctx.bezierCurveTo(-1, 6, 0, 6, 1, 6);
        ctx.bezierCurveTo(3, 6, 5, 3, 5, 0);
        ctx.bezierCurveTo(5, -3, 3, -4, 2, -4);
        ctx.quadraticCurveTo(0, -4, 0, -3);
        ctx.closePath();
        ctx.fillStyle = "#ff0000";
        ctx.fill();

        // stem
        ctx.beginPath();
        ctx.moveTo(-1, -3);
        ctx.quadraticCurveTo(-1, -5, 0, -5);
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#ff9900';
        ctx.stroke();

        // shine
        ctx.beginPath();
        ctx.moveTo(2, 3);
        ctx.quadraticCurveTo(3, 3, 3, 1);
        ctx.lineCap = 'round';
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        ctx.restore();
    };

    let drawMelon = function (ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);

        // draw body
        ctx.beginPath();
        ctx.arc(0, 2, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = "#7bf331";
        ctx.fill();

        // draw stem
        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.lineTo(0, -5);
        ctx.moveTo(2, -5);
        ctx.quadraticCurveTo(-3, -5, -3, -6);
        ctx.strokeStyle = "#69b4af";
        ctx.lineCap = "round";
        ctx.stroke();

        // dark lines
        /*
        ctx.beginPath();
        ctx.moveTo(0,-2);
        ctx.lineTo(-4,2);
        ctx.lineTo(-1,5);
        ctx.moveTo(-3,-1);
        ctx.lineTo(-2,0);
        ctx.moveTo(-2,6);
        ctx.lineTo(1,3);
        ctx.moveTo(1,7);
        ctx.lineTo(3,5);
        ctx.lineTo(0,2);
        ctx.lineTo(3,-1);
        ctx.moveTo(2,0);
        ctx.lineTo(4,2);
        ctx.strokeStyle="#69b4af";
        ctx.lineCap = "round";
        ctx.lineJoin = 'round';
        ctx.stroke();
        */
        // dark spots
        let darkSpots = [
            0, -2,
            -1, -1,
            -2, 0,
            -3, 1,
            -4, 2,
            -3, 3,
            -2, 4,
            -1, 5,
            -2, 6,
            -3, -1,
            1, 7,
            2, 6,
            3, 5,
            2, 4,
            1, 3,
            0, 2,
            1, 1,
            2, 0,
            3, -1,
            3, 1,
            4, 2,
        ];

        ctx.fillStyle = "#69b4af";
        let i, len;
        for (let i = 0, len = darkSpots.length; i < len; i += 2) {
            let x = darkSpots[i];
            let y = darkSpots[i + 1];
            ctx.beginPath();
            ctx.arc(x, y, 0.65, 0, 2 * Math.PI);
            ctx.fill();
        }

        // white spots
        let whiteSpots = [{
                x: 0,
                y: -3
            },
            {
                x: -2,
                y: -1
            },
            {
                x: -4,
                y: 1
            },
            {
                x: -3,
                y: 3
            },
            {
                x: 1,
                y: 0
            },
            {
                x: -1,
                y: 2
            },
            {
                x: -1,
                y: 4
            },
            {
                x: 3,
                y: 2
            },
            {
                x: 1,
                y: 4
            },
        ];

        ctx.fillStyle = "#fff";
        for (let i = 0, len = whiteSpots.length; i < len; i++) {
            let s = whiteSpots[i];
            ctx.beginPath();
            ctx.arc(s.x, s.y, 0.65, 0, 2 * Math.PI);
            ctx.fill();
        }

        ctx.restore();
    };

    let drawGalaxian = function (ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);

        // draw yellow body
        ctx.beginPath();
        ctx.moveTo(-4, -2);
        ctx.lineTo(4, -2);
        ctx.lineTo(4, -1);
        ctx.lineTo(2, 1);
        ctx.lineTo(1, 0);
        ctx.lineTo(0, 0);
        ctx.lineTo(0, 5);
        ctx.lineTo(0, 0);
        ctx.lineTo(-1, 0);
        ctx.lineTo(-2, 1);
        ctx.lineTo(-4, -1);
        ctx.closePath();
        ctx.lineJoin = 'round';
        ctx.strokeStyle = ctx.fillStyle = '#fffa36';
        ctx.fill();
        ctx.stroke();

        // draw red arrow head
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.lineTo(-3, -2);
        ctx.lineTo(-2, -2);
        ctx.lineTo(-1, -3);
        ctx.lineTo(0, -3);
        ctx.lineTo(0, -1);
        ctx.lineTo(0, -3);
        ctx.lineTo(1, -3);
        ctx.lineTo(2, -2);
        ctx.lineTo(3, -2);
        ctx.closePath();
        ctx.lineJoin = 'round';
        ctx.strokeStyle = ctx.fillStyle = "#f00";
        ctx.fill();
        ctx.stroke();

        // draw blue wings
        ctx.beginPath();
        ctx.moveTo(-5, -4);
        ctx.lineTo(-5, -1);
        ctx.lineTo(-2, 2);
        ctx.moveTo(5, -4);
        ctx.lineTo(5, -1);
        ctx.lineTo(2, 2);
        ctx.strokeStyle = "#00f";
        ctx.lineJoin = 'round';
        ctx.stroke();

        ctx.restore();
    };

    let drawBell = function (ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);

        // bell body
        ctx.beginPath();
        ctx.moveTo(-1, -5);
        ctx.bezierCurveTo(-4, -5, -6, 1, -6, 6);
        ctx.lineTo(5, 6);
        ctx.bezierCurveTo(5, 1, 3, -5, 0, -5);
        ctx.closePath();
        ctx.fillStyle = ctx.strokeStyle = "#fffa37";
        ctx.stroke();
        ctx.fill();

        // marks
        ctx.beginPath();
        ctx.moveTo(-4, 4);
        ctx.lineTo(-4, 3);
        ctx.moveTo(-3, 1);
        ctx.quadraticCurveTo(-3, -2, -2, -2);
        ctx.moveTo(-1, -4);
        ctx.lineTo(0, -4);
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';
        ctx.stroke();

        // bell bottom
        ctx.beginPath();
        ctx.rect(-5.5, 6, 10, 2);
        ctx.fillStyle = "#68b9fc";
        ctx.fill();
        ctx.beginPath();
        ctx.rect(-0.5, 6, 2, 2);
        ctx.fillStyle = '#fff';
        ctx.fill();

        ctx.restore();
    };

    let drawKey = function (ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);

        // draw key metal
        ctx.beginPath();
        ctx.moveTo(-1, -2);
        ctx.lineTo(-1, 5);
        ctx.moveTo(0, 6);
        ctx.quadraticCurveTo(1, 6, 1, 3);
        ctx.moveTo(1, 4);
        ctx.lineTo(2, 4);
        ctx.moveTo(1, 1);
        ctx.lineTo(1, -2);
        ctx.moveTo(1, 0);
        ctx.lineTo(2, 0);
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#fff';
        ctx.stroke();

        // draw key top
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.quadraticCurveTo(-3, -6, -3, -4);
        ctx.lineTo(-3, -2);
        ctx.lineTo(3, -2);
        ctx.lineTo(3, -4);
        ctx.quadraticCurveTo(3, -6, 0, -6);
        ctx.strokeStyle = ctx.fillStyle = "#68b9fc";
        ctx.fill();
        ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(1, -5);
        ctx.lineTo(-1, -5);
        ctx.lineCap = 'round';
        ctx.strokeStyle = "#000";
        ctx.stroke();

        ctx.restore();
    };

    let drawPretzel = function (ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);

        // bread
        ctx.beginPath();
        ctx.moveTo(-2, -5);
        ctx.quadraticCurveTo(-4, -6, -6, -4);
        ctx.quadraticCurveTo(-7, -2, -5, 1);
        ctx.quadraticCurveTo(-3, 4, 0, 5);
        ctx.quadraticCurveTo(5, 5, 5, -1);
        ctx.quadraticCurveTo(6, -5, 3, -5);
        ctx.quadraticCurveTo(1, -5, 0, -2);
        ctx.quadraticCurveTo(-2, 3, -5, 5);
        ctx.moveTo(1, 1);
        ctx.quadraticCurveTo(3, 4, 4, 6);
        ctx.lineWidth = 2.0;
        ctx.lineCap = 'round';
        ctx.strokeStyle = "#ffcc33";
        ctx.stroke();

        // salt
        let spots = [
            -5, -6,
            1, -6,
            4, -4,
            -5, 0,
            -2, 0,
            6, 1,
            -4, 6,
            5, 5,
        ];

        ctx.fillStyle = "#fff";
        let i, len;
        for (let i = 0, len = spots.length; i < len; i += 2) {
            let x = spots[i];
            let y = spots[i + 1];
            ctx.beginPath();
            ctx.arc(x, y, 0.65, 0, 2 * Math.PI);
            ctx.fill();
        }

        ctx.restore();
    };

    let drawPear = function (ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);

        // body
        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.bezierCurveTo(-1, -4, -2, -3, -2, -1);
        ctx.bezierCurveTo(-2, 1, -4, 2, -4, 4);
        ctx.bezierCurveTo(-4, 6, -2, 7, 0, 7);
        ctx.bezierCurveTo(2, 7, 4, 6, 4, 4);
        ctx.bezierCurveTo(4, 2, 2, 1, 2, -1);
        ctx.bezierCurveTo(2, -3, 1, -4, 0, -4);
        ctx.fillStyle = ctx.strokeStyle = "#00ff00";
        ctx.stroke();
        ctx.fill();

        // blue shine
        ctx.beginPath();
        ctx.moveTo(-2, 3);
        ctx.quadraticCurveTo(-2, 5, -1, 5);
        ctx.strokeStyle = "#0033ff";
        ctx.lineCap = 'round';
        ctx.stroke();

        // white stem
        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.quadraticCurveTo(0, -6, 2, -6);
        ctx.strokeStyle = "#fff";
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.restore();
    };

    let drawBanana = function (ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);

        // body
        ctx.beginPath();
        ctx.moveTo(-5, 5);
        ctx.quadraticCurveTo(-4, 5, -2, 6);
        ctx.bezierCurveTo(2, 6, 6, 2, 6, -4);
        ctx.lineTo(3, -3);
        ctx.lineTo(3, -2);
        ctx.lineTo(-4, 5);
        ctx.closePath();
        ctx.fillStyle = ctx.strokeStyle = "#ffff00";
        ctx.stroke();
        ctx.fill();

        // stem
        ctx.beginPath();
        ctx.moveTo(4, -5);
        ctx.lineTo(5, -6);
        ctx.strokeStyle = "#ffff00";
        ctx.lineCap = 'round';
        ctx.stroke();

        // black mark
        ctx.beginPath();
        ctx.moveTo(3, -1);
        ctx.lineTo(-2, 4);
        ctx.strokeStyle = "#000";
        ctx.lineCap = 'round';
        ctx.stroke();

        // shine
        ctx.beginPath();
        ctx.moveTo(2, 3);
        ctx.lineTo(0, 5);
        ctx.strokeStyle = "#fff";
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.restore();
    };

    let getSpriteFuncFromFruitName = function (name) {
        let funcs = {
            'cherry': drawCherry,
            'strawberry': drawStrawberry,
            'orange': drawOrange,
            'apple': drawApple,
            'melon': drawMelon,
            'galaxian': drawGalaxian,
            'bell': drawBell,
            'key': drawKey,
            'pretzel': drawPretzel,
            'pear': drawPear,
            'banana': drawBanana,
        };

        return funcs[name];
    };





    let drawSnail = (function () {
        return function (ctx, x, y, color) {
            ctx.save();
            ctx.translate(x, y);
            ctx.beginPath();
            ctx.moveTo(-7, 3);
            ctx.lineTo(-5, 3);
            ctx.bezierCurveTo(-6, 0, -5, -3, -2, -3);
            ctx.bezierCurveTo(0, -3, 2, -2, 2, 2);
            ctx.bezierCurveTo(3, -1, 3, -2, 5, -2);
            ctx.bezierCurveTo(6, -2, 6, 0, 5, 0);
            ctx.bezierCurveTo(4, 1, 4, 3, 2, 3);
            ctx.closePath();

            ctx.lineWidth = 1.0;
            ctx.lineCap = ctx.lineJoin = "round";
            ctx.fillStyle = ctx.strokeStyle = color;
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(4, -2);
            ctx.lineTo(3, -5);
            ctx.moveTo(5, -1);
            ctx.lineTo(7, -5);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(3, -5, 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(7, -5, 1, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(-4, 1);
            ctx.bezierCurveTo(-5, -1, -3, -3, -1, -2);
            ctx.bezierCurveTo(0, -1, 0, 0, -1, 1);
            ctx.bezierCurveTo(-2, 1, -3, 0, -2, -0.5);
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = "#000";
            ctx.stroke();

            ctx.restore();
        };
    })();


    let drawExclamationPoint = function (ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = ctx.fillStyle = "#ff0";
        ctx.beginPath();
        ctx.moveTo(-1, 1);
        ctx.bezierCurveTo(-1, 0, -1, -3, 0, -3);
        ctx.lineTo(2, -3);
        ctx.bezierCurveTo(2, -2, 0, 0, -1, 1);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-2, 3, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    };
    //@line 1 "src/Actor.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // The actor class defines common data functions for the ghosts and pacman
    // It provides everything for updating position and direction.

    // "Ghost" and "Player" inherit from this "Actor"

    // Actor constructor
    let Actor = function () {

        this.dir = {}; // facing direction vector
        this.pixel = {}; // pixel position
        this.tile = {}; // tile position
        this.tilePixel = {}; // pixel location inside tile
        this.distToMid = {}; // pixel distance to mid-tile

        this.targetTile = {}; // tile position used for targeting

        this.frames = 0; // frame count
        this.steps = 0; // step count


        this.savedSteps = {};
        this.savedFrames = {};
        this.savedDirEnum = {};
        this.savedPixel = {};
        this.savedTargetting = {};
        this.savedTargetTile = {};
    };

    // save state at time t
    Actor.prototype.save = function (t) {
        this.savedSteps[t] = this.steps;
        this.savedFrames[t] = this.frames;
        this.savedDirEnum[t] = this.dirEnum;
        this.savedPixel[t] = {
            x: this.pixel.x,
            y: this.pixel.y
        };
        this.savedTargetting[t] = this.targetting;
        this.savedTargetTile[t] = {
            x: this.targetTile.x,
            y: this.targetTile.y
        };
    };

    // load state at time t
    Actor.prototype.load = function (t) {
        this.steps = this.savedSteps[t];
        this.frames = this.savedFrames[t];
        this.setDir(this.savedDirEnum[t]);
        this.setPos(this.savedPixel[t].x, this.savedPixel[t].y);
        this.targetting = this.savedTargetting[t];
        this.targetTile.x = this.savedTargetTile[t].x;
        this.targetTile.y = this.savedTargetTile[t].y;
    };


    // reset to initial position and direction
    Actor.prototype.reset = function () {
        this.setDir(this.startDirEnum);
        this.setPos(this.startPixel.x, this.startPixel.y);
        this.frames = 0;
        this.steps = 0;
        this.targetting = false;
    };

    // sets the position and updates its dependent variables
    Actor.prototype.setPos = function (px, py) {
        this.pixel.x = px;
        this.pixel.y = py;
        this.commitPos();
    };

    // returns the relative pixel inside a tile given a map pixel
    Actor.prototype.getTilePixel = function (pixel, tilePixel) {
        if (pixel == undefined) {
            pixel = this.pixel;
        }
        if (tilePixel == undefined) {
            tilePixel = {};
        }
        tilePixel.x = pixel.x % tileSize;
        tilePixel.y = pixel.y % tileSize;
        if (tilePixel.x < 0) {
            tilePixel.x += tileSize;
        }
        if (tilePixel.y < 0) {
            tilePixel.y += tileSize;
        }
        return tilePixel;
    };

    // updates the position's dependent variables
    Actor.prototype.commitPos = function () {

        // use map-specific tunnel teleport
        if (map) {
            map.teleport(this);
        }

        this.tile.x = Math.floor(this.pixel.x / tileSize);
        this.tile.y = Math.floor(this.pixel.y / tileSize);
        this.getTilePixel(this.pixel, this.tilePixel);
        this.distToMid.x = midTile.x - this.tilePixel.x;
        this.distToMid.y = midTile.y - this.tilePixel.y;
    };

    // sets the direction and updates its dependent variables
    Actor.prototype.setDir = function (dirEnum) {
        setDirFromEnum(this.dir, dirEnum);
        this.dirEnum = dirEnum;
    };

    // used as "pattern" parameter in getStepSizeFromTable()
    let STEP_PACMAN = 0;
    let STEP_GHOST = 1;
    let STEP_PACMAN_FRIGHT = 2;
    let STEP_GHOST_FRIGHT = 3;
    let STEP_GHOST_TUNNEL = 4;
    let STEP_ELROY1 = 5;
    let STEP_ELROY2 = 6;

    // getter function to extract a step size from speed control table
    Actor.prototype.getStepSizeFromTable = (function () {

        // Actor speed is controlled by a list of 16 values.
        // Each value is the number of steps to take in a specific frame.
        // Once the end of the list is reached, we cycle to the beginning.
        // This method allows us to represent different speeds in a low-resolution space.

        // speed control table (from Jamey Pittman)
        let stepSizes = (
            // LEVEL 1
            "1111111111111111" + // pac-man (normal)
            "0111111111111111" + // ghosts (normal)
            "1111211111112111" + // pac-man (fright)
            "0110110101101101" + // ghosts (fright)
            "0101010101010101" + // ghosts (tunnel)
            "1111111111111111" + // elroy 1
            "1111111121111111" + // elroy 2

            // LEVELS 2-4
            "1111211111112111" + // pac-man (normal)
            "1111111121111111" + // ghosts (normal)
            "1111211112111121" + // pac-man (fright)
            "0110110110110111" + // ghosts (fright)
            "0110101011010101" + // ghosts (tunnel)
            "1111211111112111" + // elroy 1
            "1111211112111121" + // elroy 2

            // LEVELS 5-20
            "1121112111211121" + // pac-man (normal)
            "1111211112111121" + // ghosts (normal)
            "1121112111211121" + // pac-man (fright) (N/A for levels 17, 19 & 20)
            "0111011101110111" + // ghosts (fright)  (N/A for levels 17, 19 & 20)
            "0110110101101101" + // ghosts (tunnel)
            "1121112111211121" + // elroy 1
            "1121121121121121" + // elroy 2

            // LEVELS 21+
            "1111211111112111" + // pac-man (normal)
            "1111211112111121" + // ghosts (normal)
            "0000000000000000" + // pac-man (fright) N/A
            "0000000000000000" + // ghosts (fright)  N/A
            "0110110101101101" + // ghosts (tunnel)
            "1121112111211121" + // elroy 1
            "1121121121121121"); // elroy 2

        return function (level, pattern) {
            let entry;
            if (level < 1) return;
            else if (level == 1) entry = 0;
            else if (level >= 2 && level <= 4) entry = 1;
            else if (level >= 5 && level <= 20) entry = 2;
            else if (level >= 21) entry = 3;
            return stepSizes[entry * 7 * 16 + pattern * 16 + this.frames % 16];
        };
    })();

    // updates the actor state
    Actor.prototype.update = function (j) {

        // get number of steps to advance in this frame
        let numSteps = this.getNumSteps();
        if (j >= numSteps)
            return;

        // request to advance one step, and increment count if step taken
        this.steps += this.step();

        // update head direction
        this.steer();
    };
    //@line 1 "src/Ghost.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // Ghost class

    // modes representing the ghost's current state
    let GHOST_OUTSIDE = 0;
    let GHOST_EATEN = 1;
    let GHOST_GOING_HOME = 2;
    let GHOST_ENTERING_HOME = 3;
    let GHOST_PACING_HOME = 4;
    let GHOST_LEAVING_HOME = 5;

    // Ghost constructor
    let Ghost = function () {
        // inherit data from Actor
        Actor.apply(this);

        this.randomScatter = false;
        this.faceDirEnum = this.dirEnum;
    };

    // inherit functions from Actor class
    Ghost.prototype = newChildObject(Actor.prototype);

    // displacements for ghost bouncing
    Ghost.prototype.getBounceY = (function () {

        // NOTE: The bounce animation assumes an actor is moving in straight
        // horizontal or vertical lines between the centers of each tile.
        //
        // When moving horizontal, bounce height is a function of x.
        // When moving vertical, bounce height is a function of y.

        let bounceY = {};

        // map y tile pixel to new y tile pixel
        bounceY[DIR_UP] = [-4, -2, 0, 2, 4, 3, 2, 3];
        bounceY[DIR_DOWN] = [3, 5, 7, 5, 4, 5, 7, 8];

        // map x tile pixel to y tile pixel
        bounceY[DIR_LEFT] = [2, 3, 3, 4, 3, 2, 2, 2];
        bounceY[DIR_RIGHT] = [2, 2, 3, 4, 3, 3, 2, 2];

        return function (px, py, dirEnum) {
            if (px == undefined) {
                px = this.pixel.x;
            }
            if (py == undefined) {
                py = this.pixel.y;
            }
            if (dirEnum == undefined) {
                dirEnum = this.dirEnum;
            }

            // if (this.mode != GHOST_OUTSIDE || !this.scared || gameMode != GAME_COOKIE) {
            return py;
        };
    })();

    Ghost.prototype.getAnimFrame = function (frames) {
        if (frames == undefined) {
            frames = this.frames;
        }
        return Math.floor(frames / 8) % 2; // toggle frame every 8 ticks
    };

    // reset the state of the ghost on new level or level restart
    Ghost.prototype.reset = function () {

        // signals
        this.sigReverse = false;
        this.sigLeaveHome = false;

        // modes
        this.mode = this.startMode;
        this.scared = false;

        this.savedSigReverse = {};
        this.savedSigLeaveHome = {};
        this.savedMode = {};
        this.savedScared = {};
        this.savedElroy = {};
        this.savedFaceDirEnum = {};

        // call Actor's reset function to reset position and direction
        Actor.prototype.reset.apply(this);

        // faceDirEnum  = direction the ghost is facing
        // dirEnum      = direction the ghost is moving
        // (faceDirEnum represents what dirEnum will be once the ghost reaches the middle of the tile)
        this.faceDirEnum = this.dirEnum;
    };

    Ghost.prototype.save = function (t) {
        this.savedSigReverse[t] = this.sigReverse;
        this.savedSigLeaveHome[t] = this.sigLeaveHome;
        this.savedMode[t] = this.mode;
        this.savedScared[t] = this.scared;
        if (this == blinky) {
            this.savedElroy[t] = this.elroy;
        }
        this.savedFaceDirEnum[t] = this.faceDirEnum;
        Actor.prototype.save.call(this, t);
    };

    Ghost.prototype.load = function (t) {
        this.sigReverse = this.savedSigReverse[t];
        this.sigLeaveHome = this.savedSigLeaveHome[t];
        this.mode = this.savedMode[t];
        this.scared = this.savedScared[t];
        if (this == blinky) {
            this.elroy = this.savedElroy[t];
        }
        this.faceDirEnum = this.savedFaceDirEnum[t];
        Actor.prototype.load.call(this, t);
    };

    // indicates if we slow down in the tunnel
    Ghost.prototype.isSlowInTunnel = function () {
        return false;
    };

    // gets the number of steps to move in this frame
    Ghost.prototype.getNumSteps = function () {

        let pattern = STEP_GHOST;

        if (this.mode == GHOST_GOING_HOME || this.mode == GHOST_ENTERING_HOME)
            return 2;
        else if (this.mode == GHOST_LEAVING_HOME || this.mode == GHOST_PACING_HOME)
            return this.getStepSizeFromTable(1, STEP_GHOST_TUNNEL);
        else if (map.isTunnelTile(this.tile.x, this.tile.y) && this.isSlowInTunnel())
            pattern = STEP_GHOST_TUNNEL;
        else if (this.scared)
            pattern = STEP_GHOST_FRIGHT;
        else if (this.elroy == 1)
            pattern = STEP_ELROY1;
        else if (this.elroy == 2)
            pattern = STEP_ELROY2;

        return this.getStepSizeFromTable(level ? level : 1, pattern);
    };

    // signal ghost to reverse direction after leaving current tile
    Ghost.prototype.reverse = function () {
        this.sigReverse = true;
    };

    // signal ghost to go home
    // It is useful to have this because as soon as the ghost gets eaten,
    // we have to freeze all the actors for 3 seconds, except for the
    // ones who are already traveling to the ghost home to be revived.
    // We use this signal to change mode to GHOST_GOING_HOME, which will be
    // set after the update() function is called so that we are still frozen
    // for 3 seconds before traveling home uninterrupted.
    Ghost.prototype.goHome = function () {
        this.mode = GHOST_EATEN;
    };

    // Following the pattern that state changes be made via signaling (e.g. reversing, going home)
    // the ghost is commanded to leave home similarly.
    // (not sure if this is correct yet)
    Ghost.prototype.leaveHome = function () {
        this.sigLeaveHome = true;
    };



    // function called when pacman eats an energizer
    Ghost.prototype.onEnergized = function () {

        this.reverse();

        // only scare me if not already going home
        if (this.mode != GHOST_GOING_HOME && this.mode != GHOST_ENTERING_HOME) {
            this.scared = true;
            this.targetting = undefined;
        }
    };

    // function called when this ghost gets eaten
    Ghost.prototype.onEaten = function () {
        this.goHome(); // go home
        this.scared = false; // turn off scared
    };

    // move forward one step
    Ghost.prototype.step = function () {
        this.setPos(this.pixel.x + this.dir.x, this.pixel.y + this.dir.y);
        return 1;
    };

    // ghost home-specific path steering
    Ghost.prototype.homeSteer = (function () {

        // steering functions to execute for each mode
        let steerFuncs = {};

        steerFuncs[GHOST_GOING_HOME] = function () {
            // at the doormat
            if (this.tile.x == map.doorTile.x && this.tile.y == map.doorTile.y) {
                this.faceDirEnum = DIR_DOWN;
                this.targetting = false;
                // walk to the door, or go through if already there
                if (this.pixel.x == map.doorPixel.x) {
                    this.mode = GHOST_ENTERING_HOME;

                    this.setDir(DIR_DOWN);
                    this.faceDirEnum = this.dirEnum;
                } else {
                    this.setDir(DIR_RIGHT);
                    this.faceDirEnum = this.dirEnum;
                }
            }
        };

        steerFuncs[GHOST_ENTERING_HOME] = function () {
            if (this.pixel.y == map.homeBottomPixel) {
                // revive if reached its seat
                if (this.pixel.x == this.startPixel.x) {
                    this.setDir(DIR_UP);
                    this.mode = this.arriveHomeMode;
                }
                // sidestep to its seat
                else {
                    this.setDir(this.startPixel.x < this.pixel.x ? DIR_LEFT : DIR_RIGHT);
                }
                this.faceDirEnum = this.dirEnum;
            }
        };

        steerFuncs[GHOST_PACING_HOME] = function () {
            // head for the door
            if (this.sigLeaveHome) {
                this.sigLeaveHome = false;
                this.mode = GHOST_LEAVING_HOME;
                if (this.pixel.x == map.doorPixel.x)
                    this.setDir(DIR_UP);
                else
                    this.setDir(this.pixel.x < map.doorPixel.x ? DIR_RIGHT : DIR_LEFT);
            }
            // pace back and forth
            else {
                if (this.pixel.y == map.homeTopPixel)
                    this.setDir(DIR_DOWN);
                else if (this.pixel.y == map.homeBottomPixel)
                    this.setDir(DIR_UP);
            }
            this.faceDirEnum = this.dirEnum;
        };

        steerFuncs[GHOST_LEAVING_HOME] = function () {
            if (this.pixel.x == map.doorPixel.x) {
                // reached door
                if (this.pixel.y == map.doorPixel.y) {
                    this.mode = GHOST_OUTSIDE;
                    this.setDir(DIR_LEFT); // always turn left at door?
                }
                // keep walking up to the door
                else {
                    this.setDir(DIR_UP);
                }
                this.faceDirEnum = this.dirEnum;
            }
        };

        // return a function to execute appropriate steering function for a given ghost
        return function () {
            let f = steerFuncs[this.mode];
            if (f)
                f.apply(this);
        };

    })();

    // special case for Ms. Pac-Man game that randomly chooses a corner for blinky and pinky when scattering
    Ghost.prototype.isScatterBrain = function () {
        let scatter = false;
        return scatter;
    };

    // determine direction
    Ghost.prototype.steer = function () {

        let dirEnum; // final direction to update to
        let openTiles; // list of four booleans indicating which surrounding tiles are open
        let oppDirEnum = rotateAboutFace(this.dirEnum); // current opposite direction enum
        let actor; // actor whose corner we will target

        // special map-specific steering when going to, entering, pacing inside, or leaving home
        this.homeSteer();

        // current opposite direction enum
        oppDirEnum = rotateAboutFace(this.dirEnum);

        // only execute rest of the steering logic if we're pursuing a target tile
        if (this.mode != GHOST_OUTSIDE && this.mode != GHOST_GOING_HOME) {
            this.targetting = false;
            return;
        }

        // AT MID-TILE (update movement direction)
        if (this.distToMid.x == 0 && this.distToMid.y == 0) {

            // trigger reversal
            if (this.sigReverse) {
                this.faceDirEnum = oppDirEnum;
                this.sigReverse = false;
            }

            // commit previous direction
            this.setDir(this.faceDirEnum);
        }
        // JUST PASSED MID-TILE (update face direction)
        else if (
            this.dirEnum == DIR_RIGHT && this.tilePixel.x == midTile.x + 1 ||
            this.dirEnum == DIR_LEFT && this.tilePixel.x == midTile.x - 1 ||
            this.dirEnum == DIR_UP && this.tilePixel.y == midTile.y - 1 ||
            this.dirEnum == DIR_DOWN && this.tilePixel.y == midTile.y + 1) {

            // get next tile
            let nextTile = {
                x: this.tile.x + this.dir.x,
                y: this.tile.y + this.dir.y,
            };

            // get tiles surrounding next tile and their open indication
            openTiles = getOpenTiles(nextTile, this.dirEnum);

            if (this.scared) {
                // choose a random turn
                dirEnum = Math.floor(Math.random() * 4);
                while (!openTiles[dirEnum])
                    dirEnum = (dirEnum + 1) % 4; // look at likelihood of random turns
                this.targetting = false;
            } else {

                /* SET TARGET */

                // target ghost door
                if (this.mode == GHOST_GOING_HOME) {
                    this.targetTile.x = map.doorTile.x;
                    this.targetTile.y = map.doorTile.y;
                }
                // target corner when scattering
                else if (!this.elroy && ghostCommander.getCommand() == GHOST_CMD_SCATTER) {

                    actor = this.isScatterBrain() ? actors[Math.floor(Math.random() * 4)] : this;

                    this.targetTile.x = actor.cornerTile.x;
                    this.targetTile.y = actor.cornerTile.y;
                    this.targetting = 'corner';
                }
                // use custom function for each ghost when in attack mode
                else {
                    this.setTarget();
                }

                /* CHOOSE TURN */

                let dirDecided = false;
                if (this.mode == GHOST_GOING_HOME && map.getExitDir) {
                    // If the map has a 'getExitDir' function, then we are using
                    // a custom algorithm to choose the next direction.
                    // Currently, procedurally-generated maps use this function
                    // to ensure that ghosts can return home without looping forever.
                    let exitDir = map.getExitDir(nextTile.x, nextTile.y);
                    if (exitDir != undefined && exitDir != oppDirEnum) {
                        dirDecided = true;
                        dirEnum = exitDir;
                    }
                }

                if (!dirDecided) {
                    // Do not constrain turns for ghosts going home. (thanks bitwave)
                    if (this.mode != GHOST_GOING_HOME) {
                        if (map.constrainGhostTurns) {
                            // edit openTiles to reflect the current map's special contraints
                            map.constrainGhostTurns(nextTile, openTiles, this.dirEnum);
                        }
                    }

                    // choose direction that minimizes distance to target
                    dirEnum = getTurnClosestToTarget(nextTile, this.targetTile, openTiles);
                }
            }

            // Point eyeballs to the determined direction.
            this.faceDirEnum = dirEnum;
        }
    };

    Ghost.prototype.getPathDistLeft = function (fromPixel, dirEnum) {
        let distLeft = tileSize;
        let pixel = this.getTargetPixel();
        if (this.targetting == 'pacman') {
            if (dirEnum == DIR_UP || dirEnum == DIR_DOWN)
                distLeft = Math.abs(fromPixel.y - pixel.y);
            else {
                distLeft = Math.abs(fromPixel.x - pixel.x);
            }
        }
        return distLeft;
    };

    Ghost.prototype.setTarget = function () {
        // This sets the target tile when in chase mode.
        // The "target" is always Pac-Man when in this mode,
        // except for Clyde.  He runs away back home sometimes,
        // so the "targetting" parameter is set in getTargetTile
        // for Clyde only.

        this.targetTile = this.getTargetTile();

        if (this != clyde) {
            this.targetting = 'pacman';
        }
    };
    //@line 1 "src/Player.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // Player is the controllable character (Pac-Man)

    // Player constructor
    let Player = function () {

        // inherit data from Actor
        Actor.apply(this);

        this.nextDir = {};
        this.lastMeal = {
            x: -1,
            y: -1
        };

        // determines if this player should be AI controlled
        this.ai = false;
        this.invincible = false;

        this.savedNextDirEnum = {};
        this.savedStopped = {};
        this.savedEatPauseFramesLeft = {};
    };

    // inherit functions from Actor
    Player.prototype = newChildObject(Actor.prototype);

    Player.prototype.save = function (t) {
        this.savedEatPauseFramesLeft[t] = this.eatPauseFramesLeft;
        this.savedNextDirEnum[t] = this.nextDirEnum;
        this.savedStopped[t] = this.stopped;

        Actor.prototype.save.call(this, t);
    };

    Player.prototype.load = function (t) {
        this.eatPauseFramesLeft = this.savedEatPauseFramesLeft[t];
        this.setNextDir(this.savedNextDirEnum[t]);
        this.stopped = this.savedStopped[t];

        Actor.prototype.load.call(this, t);
    };

    // reset the state of the player on new level or level restart
    Player.prototype.reset = function () {

        this.setNextDir(this.startDirEnum);
        this.stopped = false;
        this.inputDirEnum = undefined;

        this.eatPauseFramesLeft = 0; // current # of frames left to pause after eating

        // call Actor's reset function to reset to initial position and direction
        Actor.prototype.reset.apply(this);

    };

    // sets the next direction and updates its dependent variables
    Player.prototype.setNextDir = function (nextDirEnum) {
        setDirFromEnum(this.nextDir, nextDirEnum);
        this.nextDirEnum = nextDirEnum;
    };

    // gets the number of steps to move in this frame
    Player.prototype.getNumSteps = function () {
        if (turboMode)
            return 2;

        let pattern = energizer.isActive() ? STEP_PACMAN_FRIGHT : STEP_PACMAN;
        return this.getStepSizeFromTable(level, pattern);
    };

    Player.prototype.getStepFrame = function (steps) {
        if (steps == undefined) {
            steps = this.steps;
        }
        return Math.floor(steps / 2) % 4;
    };

    Player.prototype.getAnimFrame = function (frame) {
        if (frame == undefined) {
            frame = this.getStepFrame();
        }
        return frame;
    };

    Player.prototype.setInputDir = function (dirEnum) {
        this.inputDirEnum = dirEnum;
    };

    Player.prototype.clearInputDir = function (dirEnum) {
        if (dirEnum == undefined || this.inputDirEnum == dirEnum) {
            this.inputDirEnum = undefined;
        }
    };

    // move forward one step
    Player.prototype.step = (function () {

        // return sign of a number
        let sign = function (x) {
            if (x < 0) return -1;
            if (x > 0) return 1;
            return 0;
        };

        return function () {

            // just increment if we're not in a map
            if (!map) {
                this.setPos(this.pixel.x + this.dir.x, this.pixel.y + this.dir.y);
                return 1;
            }

            // identify the axes of motion
            let a = (this.dir.x != 0) ? 'x' : 'y'; // axis of motion
            let b = (this.dir.x != 0) ? 'y' : 'x'; // axis perpendicular to motion

            // Don't proceed past the middle of a tile if facing a wall
            this.stopped = this.stopped || (this.distToMid[a] == 0 && !isNextTileFloor(this.tile, this.dir));
            if (!this.stopped) {
                // Move in the direction of travel.
                this.pixel[a] += this.dir[a];

                // Drift toward the center of the track (a.k.a. cornering)
                this.pixel[b] += sign(this.distToMid[b]);
            }


            this.commitPos();
            return this.stopped ? 0 : 1;
        };
    })();

    // determine direction
    Player.prototype.steer = function () {

        // if AI-controlled, only turn at mid-tile
        if (this.ai) {
            if (this.distToMid.x != 0 || this.distToMid.y != 0)
                return;

            // make turn that is closest to target
            let openTiles = getOpenTiles(this.tile, this.dirEnum);
            this.setTarget();
            this.setNextDir(getTurnClosestToTarget(this.tile, this.targetTile, openTiles));
        } else {
            this.targetting = undefined;
        }

        if (this.inputDirEnum == undefined) {
            if (this.stopped) {
                this.setDir(this.nextDirEnum);
            }
        } else {
            // Determine if input direction is open.
            let inputDir = {};
            setDirFromEnum(inputDir, this.inputDirEnum);
            let inputDirOpen = isNextTileFloor(this.tile, inputDir);

            if (inputDirOpen) {
                this.setDir(this.inputDirEnum);
                this.setNextDir(this.inputDirEnum);
                this.stopped = false;
            } else {
                if (!this.stopped) {
                    this.setNextDir(this.inputDirEnum);
                }
            }
        }
    };


    // update this frame
    Player.prototype.update = function (j) {

        let numSteps = this.getNumSteps();
        if (j >= numSteps)
            return;

        // skip frames
        if (this.eatPauseFramesLeft > 0) {
            if (j == numSteps - 1)
                this.eatPauseFramesLeft--;
            return;
        }

        // call super function to update position and direction
        Actor.prototype.update.call(this, j);

        // eat something
        if (map) {
            let t = map.getTile(this.tile.x, this.tile.y);
            if (t == '.' || t == 'o') {
                this.lastMeal.x = this.tile.x;
                this.lastMeal.y = this.tile.y
                // apply eating drag (unless in turbo mode)
                if (!turboMode) {
                    this.eatPauseFramesLeft = (t == '.') ? 1 : 3;
                }
                map.onDotEat(this.tile.x, this.tile.y);
                ghostReleaser.onDotEat();
                fruit.onDotEat();
                addScore((t == '.') ? 10 : 50);

                if (t == 'o')
                    energizer.activate();
            }
        }
    };
    //@line 1 "src/actors.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // create all the actors

    let blinky = new Ghost();
    blinky.name = "blinky";
    blinky.color = "#FF0000";
    blinky.pathColor = "rgba(255,0,0,0.8)";
    blinky.isVisible = true;

    let pinky = new Ghost();
    pinky.name = "pinky";
    pinky.color = "#FFB8FF";
    pinky.pathColor = "rgba(255,184,255,0.8)";
    pinky.isVisible = true;

    let inky = new Ghost();
    inky.name = "inky";
    inky.color = "#00FFFF";
    inky.pathColor = "rgba(0,255,255,0.8)";
    inky.isVisible = true;

    let clyde = new Ghost();
    clyde.name = "clyde";
    clyde.color = "#FFB851";
    clyde.pathColor = "rgba(255,184,81,0.8)";
    clyde.isVisible = true;

    let pacman = new Player();
    pacman.name = "pacman";
    pacman.color = "#FFFF00";
    pacman.pathColor = "rgba(255,255,0,0.8)";

    // order at which they appear in original arcade memory
    // (suggests drawing/update order)
    let actors = [blinky, pinky, inky, clyde, pacman];
    let ghosts = [blinky, pinky, inky, clyde];
    //@line 1 "src/targets.js"
    /////////////////////////////////////////////////////////////////
    // Targetting
    // (a definition for each actor's targetting algorithm and a draw function to visualize it)
    // (getPathDistLeft is used to obtain a smoothly interpolated path endpoint)

    // the tile length of the path drawn toward the target
    let actorPathLength = 16;

    (function () {

        // the size of the square rendered over a target tile (just half a tile)
        let targetSize = midTile.y;

        // when drawing paths, use these offsets so they don't completely overlap each other
        pacman.pathCenter = {
            x: 0,
            y: 0
        };
        blinky.pathCenter = {
            x: -2,
            y: -2
        };
        pinky.pathCenter = {
            x: -1,
            y: -1
        };
        inky.pathCenter = {
            x: 1,
            y: 1
        };
        clyde.pathCenter = {
            x: 2,
            y: 2
        };

        /////////////////////////////////////////////////////////////////
        // blinky directly targets pacman

        blinky.getTargetTile = function () {
            return {
                x: pacman.tile.x,
                y: pacman.tile.y
            };
        };

        blinky.getTargetPixel = function () {
            return {
                x: pacman.pixel.x,
                y: pacman.pixel.y
            };
        };
        blinky.drawTarget = function (ctx) {
            if (!this.targetting) return;
            ctx.fillStyle = this.color;
            if (this.targetting == 'pacman')
                renderer.drawCenterPixelSq(ctx, pacman.pixel.x, pacman.pixel.y, targetSize);
            else
                renderer.drawCenterTileSq(ctx, this.targetTile.x, this.targetTile.y, targetSize);
        };

        /////////////////////////////////////////////////////////////////
        // pinky targets four tiles ahead of pacman
        pinky.getTargetTile = function () {
            let px = pacman.tile.x + 4 * pacman.dir.x;
            let py = pacman.tile.y + 4 * pacman.dir.y;
            if (pacman.dirEnum == DIR_UP) {
                px -= 4;
            }
            return {
                x: px,
                y: py
            };
        };
        pinky.getTargetPixel = function () {
            let px = pacman.pixel.x + 4 * pacman.dir.x * tileSize;
            let py = pacman.pixel.y + 4 * pacman.dir.y * tileSize;
            if (pacman.dirEnum == DIR_UP) {
                px -= 4 * tileSize;
            }
            return {
                x: px,
                y: py
            };
        };
        pinky.drawTarget = function (ctx) {
            if (!this.targetting) return;
            ctx.fillStyle = this.color;

            let pixel = this.getTargetPixel();

            if (this.targetting == 'pacman') {
                ctx.beginPath();
                ctx.moveTo(pacman.pixel.x, pacman.pixel.y);
                if (pacman.dirEnum == DIR_UP) {
                    ctx.lineTo(pacman.pixel.x, pixel.y);
                }
                ctx.lineTo(pixel.x, pixel.y);
                ctx.stroke();
                renderer.drawCenterPixelSq(ctx, pixel.x, pixel.y, targetSize);
            } else
                renderer.drawCenterTileSq(ctx, this.targetTile.x, this.targetTile.y, targetSize);
        };

        /////////////////////////////////////////////////////////////////
        // inky targets twice the distance from blinky to two tiles ahead of pacman
        inky.getTargetTile = function () {
            let px = pacman.tile.x + 2 * pacman.dir.x;
            let py = pacman.tile.y + 2 * pacman.dir.y;
            if (pacman.dirEnum == DIR_UP) {
                px -= 2;
            }
            return {
                x: blinky.tile.x + 2 * (px - blinky.tile.x),
                y: blinky.tile.y + 2 * (py - blinky.tile.y),
            };
        };

        inky.getTargetTile = function (tile, dir, dirEnum) {
            let px = pacman.tile.x + 2 * pacman.dir.x;
            let py = pacman.tile.y + 2 * pacman.dir.y;
            if (pacman.dirEnum == DIR_UP) {
                px -= 2;
            }
            return {
                x: blinky.tile.x + 2 * (px - blinky.tile.x),
                y: blinky.tile.y + 2 * (py - blinky.tile.y),
            };
        };

        inky.getJointPixel = function () {
            let px = pacman.pixel.x + 2 * pacman.dir.x * tileSize;
            let py = pacman.pixel.y + 2 * pacman.dir.y * tileSize;
            if (pacman.dirEnum == DIR_UP) {
                px -= 2 * tileSize;
            }
            return {
                x: px,
                y: py
            };
        };
        inky.getTargetPixel = function () {
            let px = pacman.pixel.x + 2 * pacman.dir.x * tileSize;
            let py = pacman.pixel.y + 2 * pacman.dir.y * tileSize;
            if (pacman.dirEnum == DIR_UP) {
                px -= 2 * tileSize;
            }
            return {
                x: blinky.pixel.x + 2 * (px - blinky.pixel.x),
                y: blinky.pixel.y + 2 * (py - blinky.pixel.y),
            };
        };
        inky.drawTarget = function (ctx) {
            if (!this.targetting) return;
            let pixel;

            let joint = this.getJointPixel();

            if (this.targetting == 'pacman') {
                pixel = this.getTargetPixel();
                ctx.beginPath();
                ctx.moveTo(pacman.pixel.x, pacman.pixel.y);
                if (pacman.dirEnum == DIR_UP) {
                    ctx.lineTo(pacman.pixel.x, joint.y);
                }
                ctx.lineTo(joint.x, joint.y);
                ctx.moveTo(blinky.pixel.x, blinky.pixel.y);
                ctx.lineTo(pixel.x, pixel.y);
                ctx.closePath();
                ctx.stroke();

                // draw seesaw joint
                ctx.beginPath();
                ctx.arc(joint.x, joint.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = ctx.strokeStyle;
                ctx.fill();

                ctx.fillStyle = this.color;
                renderer.drawCenterPixelSq(ctx, pixel.x, pixel.y, targetSize);
            } else {
                ctx.fillStyle = this.color;
                renderer.drawCenterTileSq(ctx, this.targetTile.x, this.targetTile.y, targetSize);
            }
        };

        /////////////////////////////////////////////////////////////////
        // clyde targets pacman if >=8 tiles away, otherwise targets home

        clyde.getTargetTile = function () {
            let dx = pacman.tile.x - (this.tile.x + this.dir.x);
            let dy = pacman.tile.y - (this.tile.y + this.dir.y);
            let dist = dx * dx + dy * dy;
            if (dist >= 64) {
                this.targetting = 'pacman';
                return {
                    x: pacman.tile.x,
                    y: pacman.tile.y
                };
            } else {
                this.targetting = 'corner';
                return {
                    x: this.cornerTile.x,
                    y: this.cornerTile.y
                };
            }
        };
        clyde.getTargetPixel = function () {
            // NOTE: won't ever need this function for corner tile because it is always outside
            return {
                x: pacman.pixel.x,
                y: pacman.pixel.y
            };
        };
        clyde.drawTarget = function (ctx) {
            if (!this.targetting) return;
            ctx.fillStyle = this.color;

            if (this.targetting == 'pacman') {
                ctx.beginPath();
                if (true) {
                    // draw a radius
                    ctx.arc(pacman.pixel.x, pacman.pixel.y, tileSize * 8, 0, 2 * Math.PI);
                    ctx.closePath();
                } else {}
                ctx.stroke();
                renderer.drawCenterPixelSq(ctx, pacman.pixel.x, pacman.pixel.y, targetSize);
            } else {
                // draw a radius
                if (ghostCommander.getCommand() == GHOST_CMD_CHASE) {
                    ctx.beginPath();
                    ctx.arc(pacman.pixel.x, pacman.pixel.y, tileSize * 8, 0, 2 * Math.PI);
                    ctx.strokeStyle = "rgba(255,255,255,0.25)";
                    ctx.stroke();
                }
                renderer.drawCenterTileSq(ctx, this.targetTile.x, this.targetTile.y, targetSize);
            }
        };


        /////////////////////////////////////////////////////////////////
        // pacman targets twice the distance from pinky to pacman or target pinky

        pacman.setTarget = function () {
            if (blinky.mode == GHOST_GOING_HOME || blinky.scared) {
                this.targetTile.x = pinky.tile.x;
                this.targetTile.y = pinky.tile.y;
                this.targetting = 'pinky';
            } else {
                this.targetTile.x = pinky.tile.x + 2 * (pacman.tile.x - pinky.tile.x);
                this.targetTile.y = pinky.tile.y + 2 * (pacman.tile.y - pinky.tile.y);
                this.targetting = 'flee';
            }
        };
        pacman.drawTarget = function (ctx) {
            if (!this.ai) return;
            ctx.fillStyle = this.color;
            let px, py;

            if (this.targetting == 'flee') {
                px = pacman.pixel.x - pinky.pixel.x;
                py = pacman.pixel.y - pinky.pixel.y;
                px = pinky.pixel.x + 2 * px;
                py = pinky.pixel.y + 2 * py;
                ctx.beginPath();
                ctx.moveTo(pinky.pixel.x, pinky.pixel.y);
                ctx.lineTo(px, py);
                ctx.closePath();
                ctx.stroke();
                renderer.drawCenterPixelSq(ctx, px, py, targetSize);
            } else {
                renderer.drawCenterPixelSq(ctx, pinky.pixel.x, pinky.pixel.y, targetSize);
            };

        };
        pacman.getPathDistLeft = function (fromPixel, dirEnum) {
            let distLeft = tileSize;
            let px, py;
            if (this.targetting == 'pinky') {
                if (dirEnum == DIR_UP || dirEnum == DIR_DOWN)
                    distLeft = Math.abs(fromPixel.y - pinky.pixel.y);
                else
                    distLeft = Math.abs(fromPixel.x - pinky.pixel.x);
            } else { // 'flee'
                px = pacman.pixel.x - pinky.pixel.x;
                py = pacman.pixel.y - pinky.pixel.y;
                px = pinky.pixel.x + 2 * px;
                py = pinky.pixel.y + 2 * py;
                if (dirEnum == DIR_UP || dirEnum == DIR_DOWN)
                    distLeft = Math.abs(py - fromPixel.y);
                else
                    distLeft = Math.abs(px - fromPixel.x);
            }
            return distLeft;
        };

    })();
    //@line 1 "src/ghostCommander.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // Ghost Commander
    // Determines when a ghost should be chasing a target

    // modes representing the ghosts' current command
    let GHOST_CMD_CHASE = 0;
    let GHOST_CMD_SCATTER = 1;

    let ghostCommander = (function () {

        // determine if there is to be a new command issued at the given time
        let getNewCommand = (function () {
            let t;
            let times = [{}, {}, {}];
            // level 1
            times[0][t = 7 * 60] = GHOST_CMD_CHASE;
            times[0][t += 20 * 60] = GHOST_CMD_SCATTER;
            times[0][t += 7 * 60] = GHOST_CMD_CHASE;
            times[0][t += 20 * 60] = GHOST_CMD_SCATTER;
            times[0][t += 5 * 60] = GHOST_CMD_CHASE;
            times[0][t += 20 * 60] = GHOST_CMD_SCATTER;
            times[0][t += 5 * 60] = GHOST_CMD_CHASE;
            // level 2-4
            times[1][t = 7 * 60] = GHOST_CMD_CHASE;
            times[1][t += 20 * 60] = GHOST_CMD_SCATTER;
            times[1][t += 7 * 60] = GHOST_CMD_CHASE;
            times[1][t += 20 * 60] = GHOST_CMD_SCATTER;
            times[1][t += 5 * 60] = GHOST_CMD_CHASE;
            times[1][t += 1033 * 60] = GHOST_CMD_SCATTER;
            times[1][t += 1] = GHOST_CMD_CHASE;
            // level 5+
            times[2][t = 5 * 60] = GHOST_CMD_CHASE;
            times[2][t += 20 * 60] = GHOST_CMD_SCATTER;
            times[2][t += 5 * 60] = GHOST_CMD_CHASE;
            times[2][t += 20 * 60] = GHOST_CMD_SCATTER;
            times[2][t += 5 * 60] = GHOST_CMD_CHASE;
            times[2][t += 1037 * 60] = GHOST_CMD_SCATTER;
            times[2][t += 1] = GHOST_CMD_CHASE;

            return function (frame) {
                let i;
                if (level == 1)
                    i = 0;
                else if (level >= 2 && level <= 4)
                    i = 1;
                else
                    i = 2;
                let newCmd = times[i][frame];

                if (gameMode == GAME_PACMAN) {
                    return newCmd;
                }
            };
        })();

        let frame; // current frame
        let command; // last command given to ghosts

        let savedFrame = {};
        let savedCommand = {};

        // save state at time t
        let save = function (t) {
            savedFrame[t] = frame;
            savedCommand[t] = command;
        };

        // load state at time t
        let load = function (t) {
            frame = savedFrame[t];
            command = savedCommand[t];
        };

        return {
            save: save,
            load: load,
            reset: function () {
                command = GHOST_CMD_SCATTER;
                frame = 0;
            },
            update: function () {
                let newCmd;
                if (!energizer.isActive()) {
                    newCmd = getNewCommand(frame);
                    if (newCmd != undefined) {
                        command = newCmd;
                        for (let i = 0; i < 4; i++)
                            ghosts[i].reverse();
                    }
                    frame++;
                }
            },
            getCommand: function () {
                return command;
            },
            setCommand: function (cmd) {
                command = cmd;
            },
        };
    })();
    //@line 1 "src/ghostReleaser.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // Ghost Releaser

    // Determines when to release ghosts from home

    let ghostReleaser = (function () {
        // two separate counter modes for releasing the ghosts from home
        let MODE_PERSONAL = 0;
        let MODE_GLOBAL = 1;

        // ghost enumerations
        let PINKY = 1;
        let INKY = 2;
        let CLYDE = 3;

        // this is how many frames it will take to release a ghost after pacman stops eating
        let getTimeoutLimit = function () {
            return (level < 5) ? 4 * 60 : 3 * 60;
        };

        // dot limits used in personal mode to release ghost after # of dots have been eaten
        let personalDotLimit = {};
        personalDotLimit[PINKY] = function () {
            return 0;
        };
        personalDotLimit[INKY] = function () {
            return (level == 1) ? 30 : 0;
        };
        personalDotLimit[CLYDE] = function () {
            if (level == 1) return 60;
            if (level == 2) return 50;
            return 0;
        };

        // dot limits used in global mode to release ghost after # of dots have been eaten
        let globalDotLimit = {};
        globalDotLimit[PINKY] = 7;
        globalDotLimit[INKY] = 17;
        globalDotLimit[CLYDE] = 32;

        let framesSinceLastDot; // frames elapsed since last dot was eaten
        let mode; // personal or global dot counter mode
        let ghostCounts = {}; // personal dot counts for each ghost
        let globalCount; // global dot count

        let savedGlobalCount = {};
        let savedFramesSinceLastDot = {};
        let savedGhostCounts = {};

        // save state at time t
        let save = function (t) {
            savedFramesSinceLastDot[t] = framesSinceLastDot;
            if (mode == MODE_GLOBAL) {
                savedGlobalCount[t] = globalCount;
            } else if (mode == MODE_PERSONAL) {
                savedGhostCounts[t] = {};
                savedGhostCounts[t][PINKY] = ghostCounts[PINKY];
                savedGhostCounts[t][INKY] = ghostCounts[INKY];
                savedGhostCounts[t][CLYDE] = ghostCounts[CLYDE];
            }
        };

        // load state at time t
        let load = function (t) {
            framesSinceLastDot = savedFramesSinceLastDot[t];
            if (mode == MODE_GLOBAL) {
                globalCount = savedGlobalCount[t];
            } else if (mode == MODE_PERSONAL) {
                ghostCounts[PINKY] = savedGhostCounts[t][PINKY];
                ghostCounts[INKY] = savedGhostCounts[t][INKY];
                ghostCounts[CLYDE] = savedGhostCounts[t][CLYDE];
            }
        };

        return {
            save: save,
            load: load,
            onNewLevel: function () {
                mode = MODE_PERSONAL;
                framesSinceLastDot = 0;
                ghostCounts[PINKY] = 0;
                ghostCounts[INKY] = 0;
                ghostCounts[CLYDE] = 0;
            },
            onRestartLevel: function () {
                mode = MODE_GLOBAL;
                framesSinceLastDot = 0;
                globalCount = 0;
            },
            onDotEat: function () {
                let i;

                framesSinceLastDot = 0;

                if (mode == MODE_GLOBAL) {
                    globalCount++;
                } else {
                    for (let i = 1; i < 4; i++) {
                        if (ghosts[i].mode == GHOST_PACING_HOME) {
                            ghostCounts[i]++;
                            break;
                        }
                    }
                }

            },
            update: function () {
                let g;

                // use personal dot counter
                if (mode == MODE_PERSONAL) {
                    for (let i = 1; i < 4; i++) {
                        g = ghosts[i];
                        if (g.mode == GHOST_PACING_HOME) {
                            if (ghostCounts[i] >= personalDotLimit[i]()) {
                                g.leaveHome();
                                return;
                            }
                            break;
                        }
                    }
                }
                // use global dot counter
                else if (mode == MODE_GLOBAL) {
                    if (globalCount == globalDotLimit[PINKY] && pinky.mode == GHOST_PACING_HOME) {
                        pinky.leaveHome();
                        return;
                    } else if (globalCount == globalDotLimit[INKY] && inky.mode == GHOST_PACING_HOME) {
                        inky.leaveHome();
                        return;
                    } else if (globalCount == globalDotLimit[CLYDE] && clyde.mode == GHOST_PACING_HOME) {
                        globalCount = 0;
                        mode = MODE_PERSONAL;
                        clyde.leaveHome();
                        return;
                    }
                }

                // also use time since last dot was eaten
                if (framesSinceLastDot > getTimeoutLimit()) {
                    framesSinceLastDot = 0;
                    for (let i = 1; i < 4; i++) {
                        g = ghosts[i];
                        if (g.mode == GHOST_PACING_HOME) {
                            g.leaveHome();
                            break;
                        }
                    }
                } else
                    framesSinceLastDot++;
            },
        };
    })();
    //@line 1 "src/elroyTimer.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // Elroy Timer

    // Determines when to put blinky into faster elroy modes

    let elroyTimer = (function () {

        // get the number of dots left that should trigger elroy stage #1 or #2
        let getDotsEatenLimit = (function () {
            let dotsLeft = [
                [20, 30, 40, 40, 40, 50, 50, 50, 60, 60, 60, 70, 70, 70, 100, 100, 100, 100, 120, 120, 120], // elroy1
                [10, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30, 40, 40, 40, 50, 50, 50, 50, 60, 60, 60]
            ]; // elroy2
            return function (stage) {
                let i = level;
                if (i > 21) i = 21;
                let pacman_max_pellets = 244;
                return pacman_max_pellets - dotsLeft[stage - 1][i - 1];
            };
        })();

        // when level restarts, blinky must wait for clyde to leave home before resuming elroy mode
        let waitForClyde;

        let savedWaitForClyde = {};

        // save state at time t
        let save = function (t) {
            savedWaitForClyde[t] = waitForClyde;
        };

        // load state at time t
        let load = function (t) {
            waitForClyde = savedWaitForClyde[t];
        };

        return {
            onNewLevel: function () {
                waitForClyde = false;
            },
            onRestartLevel: function () {
                waitForClyde = true;
            },
            update: function () {

                // stop waiting for clyde when clyde leaves home
                if (waitForClyde && clyde.mode != GHOST_PACING_HOME)
                    waitForClyde = false;

                if (waitForClyde) {
                    blinky.elroy = 0;
                } else {
                    if (map.dotsEaten >= getDotsEatenLimit(2)) {
                        blinky.elroy = 2;
                    } else if (map.dotsEaten >= getDotsEatenLimit(1)) {
                        blinky.elroy = 1;
                    } else {
                        blinky.elroy = 0;
                    }
                }
            },
            save: save,
            load: load,
        };
    })();
    //@line 1 "src/energizer.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // Energizer

    // This handles how long the energizer lasts as well as how long the
    // points will display after eating a ghost.

    let energizer = (function () {

        // how many seconds to display points when ghost is eaten

        // how long to stay energized based on current level
        let getDuration = (function () {
            let seconds = [6, 5, 4, 3, 2, 5, 2, 2, 1, 5, 2, 1, 1, 3, 1, 1, 0, 1];
            return function () {
                let i = level;
                return (i > 18) ? 0 : 60 * seconds[i - 1];
            };
        })();

        // how many ghost flashes happen near the end of frightened mode based on current level
        let getFlashes = (function () {
            let flashes = [5, 5, 5, 5, 5, 5, 5, 5, 3, 5, 5, 3, 3, 5, 3, 3, 0, 3];
            return function () {
                let i = level;
                return (i > 18) ? 0 : flashes[i - 1];
            };
        })();

        // "The ghosts change colors every 14 game cycles when they start 'flashing'" -Jamey Pittman
        let flashInterval = 14;

        let count; // how long in frames energizer has been active
        let active; // indicates if energizer is currently active
        let points; // points that the last eaten ghost was worth
        let pointsFramesLeft; // number of frames left to display points earned from eating ghost

        let savedCount = {};
        let savedActive = {};
        let savedPoints = {};
        let savedPointsFramesLeft = {};

        // save state at time t
        let save = function (t) {
            savedCount[t] = count;
            savedActive[t] = active;
            savedPoints[t] = points;
            savedPointsFramesLeft[t] = pointsFramesLeft;
        };

        // load state at time t
        let load = function (t) {
            count = savedCount[t];
            active = savedActive[t];
            points = savedPoints[t];
            pointsFramesLeft = savedPointsFramesLeft[t];
        };

        return {
            save: save,
            load: load,
            reset: function () {
                count = 0;
                active = false;
                points = 100;
                pointsFramesLeft = 0;
                for (let i = 0; i < 4; i++)
                    ghosts[i].scared = false;
            },
            update: function () {
                if (active) {
                    if (count == getDuration())
                        this.reset();
                    else
                        count++;
                }
            },
            activate: function () {
                active = true;
                count = 0;
                points = 100;
                for (let i = 0; i < 4; i++) {
                    ghosts[i].onEnergized();
                }
                if (getDuration() == 0) { // if no duration, then immediately reset
                    this.reset();
                }
            },
            isActive: function () {
                return active;
            },
            isFlash: function () {
                let i = Math.floor((getDuration() - count) / flashInterval);
                return (i <= 2 * getFlashes() - 1) ? (i % 2 == 0) : false;
            },

            getPoints: function () {
                return points;
            },
            addPoints: function () {
                addScore(points *= 2);
                // pointsFramesLeft = pointsDuration * 60;
            },
            showingPoints: function () {
                return pointsFramesLeft > 0;
            },
            updatePointsTimer: function () {
                if (pointsFramesLeft > 0) pointsFramesLeft--;
            },
        };
    })();
    //@line 1 "src/fruit.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // Fruit

    let BaseFruit = function () {
        // pixel
        this.pixel = {
            x: 0,
            y: 0
        };

        this.fruitHistory = {};

        this.scoreDuration = 2; // number of seconds that the fruit score is on the screen
        this.scoreFramesLeft; // frames left until the picked-up fruit score is off the screen
        this.savedScoreFramesLeft = {};
    };

    BaseFruit.prototype = {
        isScorePresent: function () {
            return this.scoreFramesLeft > 0;
        },
        onNewLevel: function () {
            this.buildFruitHistory();
        },
        setCurrentFruit: function (i) {
            this.currentFruitIndex = i;
        },
        onDotEat: function () {
            if (!this.isPresent() && (map.dotsEaten == this.dotLimit1 || map.dotsEaten == this.dotLimit2)) {
                this.initiate();
            }
        },
        save: function (t) {
            this.savedScoreFramesLeft[t] = this.scoreFramesLeft;
        },
        load: function (t) {
            this.scoreFramesLeft = this.savedScoreFramesLeft[t];
        },
        reset: function () {
            this.scoreFramesLeft = 0;
        },
        getCurrentFruit: function () {
            return this.fruits[this.currentFruitIndex];
        },
        getPoints: function () {
            return this.getCurrentFruit().points;
        },
        update: function () {
            if (this.scoreFramesLeft > 0)
                this.scoreFramesLeft--;
        },
        isCollide: function () {
            return Math.abs(pacman.pixel.y - this.pixel.y) <= midTile.y && Math.abs(pacman.pixel.x - this.pixel.x) <= midTile.x;
        },
        testCollide: function () {
            if (this.isPresent() && this.isCollide()) {
                addScore(this.getPoints());
                this.reset();
                this.scoreFramesLeft = this.scoreDuration * 60;
            }
        },
    };

    // PAC-MAN FRUIT

    let PacFruit = function () {
        BaseFruit.call(this);
        this.fruits = [{
                name: 'cherry',
                points: 100
            },
            {
                name: 'strawberry',
                points: 300
            },
            {
                name: 'orange',
                points: 500
            },
            {
                name: 'apple',
                points: 700
            },
            {
                name: 'melon',
                points: 1000
            },
            {
                name: 'galaxian',
                points: 2000
            },
            {
                name: 'bell',
                points: 3000
            },
            {
                name: 'key',
                points: 5000
            },
        ];

        this.order = [
            0, // level 1
            1, // level 2 
            2, // level 3
            2, // level 4
            3, // level 5
            3, // level 6
            4, // level 7
            4, // level 8
            5, // level 9
            5, // level 10
            6, // level 11
            6, // level 12
            7
        ]; // level 13+

        this.dotLimit1 = 70;
        this.dotLimit2 = 170;

        this.duration = 9; // number of seconds that the fruit is on the screen
        this.framesLeft; // frames left until fruit is off the screen

        this.savedFramesLeft = {};
    };

    PacFruit.prototype = newChildObject(BaseFruit.prototype, {

        onNewLevel: function () {
            this.setCurrentFruit(this.getFruitIndexFromLevel(level));
            BaseFruit.prototype.onNewLevel.call(this);
        },

        getFruitFromLevel: function (i) {
            return this.fruits[this.getFruitIndexFromLevel(i)];
        },

        getFruitIndexFromLevel: function (i) {
            if (i > 13) {
                i = 13;
            }
            return this.order[i - 1];
        },

        buildFruitHistory: function () {
            this.fruitHistory = {};
            let i;
            for (let i = 1; i <= level; i++) {
                this.fruitHistory[i] = this.fruits[this.getFruitIndexFromLevel(i)];
            }
        },

        initiate: function () {
            let x = 13;
            let y = 20;
            this.pixel.x = tileSize * (1 + x) - 1;
            this.pixel.y = tileSize * y + midTile.y;
            this.framesLeft = 60 * this.duration;
        },

        isPresent: function () {
            return this.framesLeft > 0;
        },

        reset: function () {
            BaseFruit.prototype.reset.call(this);

            this.framesLeft = 0;
        },

        update: function () {
            BaseFruit.prototype.update.call(this);

            if (this.framesLeft > 0)
                this.framesLeft--;
        },

        save: function (t) {
            BaseFruit.prototype.save.call(this, t);
            this.savedFramesLeft[t] = this.framesLeft;
        },
        load: function (t) {
            BaseFruit.prototype.load.call(this, t);
            this.framesLeft = this.savedFramesLeft[t];
        },
    });



    let fruit;
    let setFruitFromGameMode = (function () {
        let pacfruit = new PacFruit();
        fruit = pacfruit;
        return function () {
            if (gameMode == GAME_PACMAN) {
                fruit = pacfruit;
            }
        };
    })();
    //@line 1 "src/executive.js"
    let executive = (function () {
        //for observing
        const baseFramePeriod = 1000 / 60;
        let speedMultiplier = 1.0; // updates per render frame
        let framePeriod = baseFramePeriod / speedMultiplier; // derived for compatibility
        let updateAccumulator = 0;

        let paused = false; // flag for pausing the state updates, while still drawing
        let running = false; // flag for truly stopping everything

        /**********/
        // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

        // requestAnimationFrame polyfill by Erik Möller
        // fixes from Paul Irish and Tino Zijdel

        (function () {
            let lastTime = 0;
            let vendors = ['ms', 'moz', 'webkit', 'o'];
            for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                    window[vendors[x] + 'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function (callback) {
                    let currTime = new Date().getTime();
                    let timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    let id = window.setTimeout(function () {
                            callback(currTime + timeToCall);
                        },
                        timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function (id) {
                    clearTimeout(id);
                };
        }());
        /**********/

        let fps;
        let updateFps = (function () {
            // TODO: fix this to reflect the average rate of the last n frames, where 0 < n < 60
            let length = 60;
            let times = [];
            let startIndex = 0;
            let endIndex = -1;
            let filled = false;

            return function (now) {
                if (filled) {
                    startIndex = (startIndex + 1) % length;
                }
                endIndex = (endIndex + 1) % length;
                if (endIndex == length - 1) {
                    filled = true;
                }

                times[endIndex] = now;

                let seconds = (now - times[startIndex]) / 1000;
                let frames = endIndex - startIndex;
                if (frames < 0) {
                    frames += length;
                }
                fps = frames / seconds;
            };
        })();


        let reqFrame; // id of requestAnimationFrame object
        let tick = function (now) {
            // Update fps counter.
            updateFps(now);

            // Prevent any updates from being called when paused.
            if (paused) {
                renderer.beginFrame();
                state.draw();
                if (hud.isValidState()) {
                    renderer.renderFunc(hud.draw);
                }
                renderer.endFrame();
                reqFrame = requestAnimationFrame(tick);
                return;
            }

            hud.update();

            updateAccumulator += speedMultiplier;
            let updates = Math.floor(updateAccumulator);
            updateAccumulator -= updates;
            for (let i = 0; i < updates; i++) {
                state.update();
            }

            // Draw.
            renderer.beginFrame();
            state.draw();
            if (hud.isValidState()) {
                renderer.renderFunc(hud.draw);
            }
            renderer.endFrame();

            // Schedule the next tick.
            reqFrame = requestAnimationFrame(tick);
        };

        return {

            getFramePeriod: function () {
                return framePeriod;
            },
            getSpeedMultiplier: function () {
                return speedMultiplier;
            },
            setSpeedMultiplier: function (multiplier) {
                let next = Math.max(0.25, multiplier);
                speedMultiplier = next;
                framePeriod = baseFramePeriod / speedMultiplier;
            },
            //here to change frame rate
            setUpdatesPerSecond: function () {
                framePeriod = 100000;
                //gameTime = undefined;
            },
            init: function () {
                let that = this;
                that.start();
                window.addEventListener('focus', function () {
                    that.start();
                });
                window.addEventListener('blur', function () {});
                this.start();
            },
            start: function () {
                if (!running) {
                    reqFrame = requestAnimationFrame(tick);
                    running = true;

                }
            },
            stop: function () {
                if (running) {
                    cancelAnimationFrame(reqFrame);
                    running = false;
                }
            },
            togglePause: function () {
                paused = !paused;
            },
            isPaused: function () {
                return paused;
            },
            getFps: function () {
                return fps;
            },
        };
    })();
    //@line 1 "src/states.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // States
    // (main loops for each state of the game)
    // state is set to any of these states, each containing an init(), draw(), and update()

    // current game state
    let state;

    // switches to another game state
    let switchState = function (nextState) {
        state = nextState;
        state.init();
        if (executive.isPaused()) {
            executive.togglePause();
        }
    };

    //////////////////////////////////////////////////////////////////////////////////////
    // Fade state

    // Creates a state that will fade from a given state to another in the given amount of time.
    // if continueUpdate1 is true, then prevState.update will be called while fading out
    // if continueUpdate2 is true, then nextState.update will be called while fading in    

    ////////////////////////////////////////////////////
    // New Game state
    // (state when first starting a new game)

    let newGameState = (function () {
        let frames;
        let duration = 0;
        let startLevel = 1;

        return {
            init: function () {
                frames = 0;
                level = startLevel - 1;
                extraLives = practiceMode ? Infinity : 3;
                setScore(0);
                setFruitFromGameMode();
                readyNewState.init();
            },
            setStartLevel: function (i) {
                startLevel = i;
            },
            draw: function () {
                if (!map)
                    return;
                renderer.blitMap();
                renderer.drawScore();
                renderer.drawMessage("PLAYER ONE", "#0FF", 9, 14);
                renderer.drawReadyMessage();
            },
            update: function () {
                if (frames == duration * 60) {
                    extraLives--;
                    state = readyNewState;
                    renderer.drawMap();
                } else
                    frames++;
            },
        };
    })();

    ////////////////////////////////////////////////////
    // Ready state
    // (state when map is displayed and pausing before play)

    let readyState = (function () {

        return {
            init: function () {
                let i;
                for (let i = 0; i < 5; i++)
                    actors[i].reset();
                ghostCommander.reset();
                fruit.reset();
                energizer.reset();
                map.resetTimeEaten();
            },
            draw: function () {
                if (!map)
                    return;
                renderer.blitMap();
                renderer.drawScore();
                renderer.drawActors();
                renderer.drawReadyMessage();
            },
            update: function () {
                switchState(playState);
            },
        };
    })();

    ////////////////////////////////////////////////////
    // Ready New Level state
    // (ready state when pausing before new level)

    let readyNewState = newChildObject(readyState, {

        init: function () {

            // increment level and ready the next map
            level++;
            if (gameMode == GAME_PACMAN) {
                map = mapPacman;
            }
            map.resetCurrent();
            fruit.onNewLevel();
            renderer.drawMap();

            // notify other objects of new level
            ghostReleaser.onNewLevel();
            elroyTimer.onNewLevel();

            // inherit attributes from readyState
            readyState.init.call(this);
        },
    });

    ////////////////////////////////////////////////////
    // Ready Restart Level state
    // (ready state when pausing before restarted level)

    let readyRestartState = newChildObject(readyState, {

        init: function () {
            extraLives--;
            ghostReleaser.onRestartLevel();
            elroyTimer.onRestartLevel();
            renderer.drawMap();

            // inherit attributes from readyState
            readyState.init.call(this);
        },
    });
    //get avaiable action at given position
    let get_ava_action = function (current_tile, cur_dir = null, is_ghost = false) {
        let available_tiles = [];
        let turn_back = (cur_dir + 2) % 4
        let dir = {
            'x': 0,
            'y': 0
        }
        //check surouding
        for (let action of [DIR_UP, DIR_RIGHT, DIR_DOWN, DIR_LEFT]) {
            setDirFromEnum(dir, action)
            if (isNextTileFloor(current_tile, dir)) {
                let tile_x = current_tile.x + dir.x;
                let tile_y = current_tile.y + dir.y;
                //hard code to prevent teleport TODO enable teleportation
                if (tile_x < 0 || tile_x > map.numCols || tile_y < 0 || tile_y > map.numRows) continue;
                // if (tile_y == 17) {
                //     if (tile_x <= 3 && tile_x >= 24) {
                //         continue;
                //     }
                // }
                let valid_action = true;
                //if is ghost can turn 180
                if (is_ghost) {
                    if (action == turn_back) valid_action = false;
                }
                //if not ghost can collide with other ghost
                if (!is_ghost) {
                    for (let ghost of ghosts) {
                        if ((ghost.scared) && ghost.tile.x == tile_x && ghost.tile.y == tile_y) not_collide_with_ghost = false;
                    }
                }
                if (valid_action) available_tiles.push(
                    action
                );
            }
        }
        //available_tiles.sort(() => (Math.random() > .5) ? 1 : -1);
        return available_tiles;
    }
    let left = {
        x: -1,
        y: 0
    };
    let right = {
        x: 1,
        y: 0
    };
    let down = {
        x: 0,
        y: 1
    };
    let up = {
        x: 0,
        y: -1
    };
    //get_ava_tiles(ghosts[0].tile,ghosts[0])
    let get_dirEnum_from_direction = function (dir) {
        if (dir.x == up.x & dir.y == up.y) return DIR_UP;
        if (dir.x == down.x & dir.y == down.y) return DIR_DOWN;
        if (dir.x == left.x & dir.y == left.y) return DIR_LEFT;
        if (dir.x == right.x & dir.y == right.y) return DIR_RIGHT;
    }
    let actions = [left, right, down, up];
    //get available tiles
    let get_ava_tiles = function (current_tile, ghost) {
        let available_tiles = [];
        //check surouding
        for (let action of actions) {
            if (isNextTileFloor(current_tile, action)) {
                //ghost can't go back
                if (ghost != null) {
                    if (ghost.dirEnum != null)
                        if ((ghost.dirEnum + 2) % 4 == get_dirEnum_from_direction(action)) continue;
                }
                let tile_x = current_tile.x + action.x;
                let tile_y = current_tile.y + action.y;
                //alow ghsot for teleportation
                if (tile_x == 4 & tile_y == 17 & ghost == null) {
                    continue;
                    //tile_x = map.numCols + 1;
                } //|| tile_x > map.numCols || tile_y < 0 || tile_y > map.numRows
                else if (tile_x == 23 & tile_y == 17 & ghost == null) continue;
                
                if (tile_x < -2) tile_x = map.numCols + 1;
                else if(tile_x > map.numCols + 1) tile_x = -2;
                //allow teleportation for ghost not for agent 
                // //hard code to check boundry, TODO find smarter way to do this
                // if (tile_x < 0 && tile_x >= map.numCols){
                //     if(tile_y < 0 && tile_y >= map.numRows)
                //     {
                //         continue
                //     }
                // }
                //check if it is ghost
                let not_collide_with_ghost = true;
                //ghost can go though other ghost
                if (ghost == null) {
                    for (let ghost of ghosts) {
                        if ((!ghost.scared) && ghost.tile.x == tile_x && ghost.tile.y == tile_y) not_collide_with_ghost = false;
                    }
                }
                if (not_collide_with_ghost) available_tiles.push({
                    x: tile_x,
                    y: tile_y
                });
            }
        }
        //available_tiles.sort(() => (Math.random() > .5) ? 1 : -1);
        return available_tiles;
    }
    //calculate manhattan distance
    let manhattan_distance = function (tile1, tile2) {
        return (Math.abs(tile2.x - tile1.x) + Math.abs(tile2.y - tile1.y));
    }

    //convert tile to  string 
    let tile_to_string = function (tile) {
        return `${tile.x} ${tile.y}`;
    }
    //convert string to tile
    let string_to_tile = function (tileString) {
        let list = tileString.split(' ');
        return {
            x: parseInt(list[0]),
            y: parseInt(list[1])
        };
    }
    //compare if two tile equal
    let compare_tile = function (tile1, tile2) {
        return (tile1.x == tile2.x && tile1.y == tile2.y);
    }
    //a* to find path, f = g+h, g is action cost h is huristic
    let a_star_search = function (current_tile, target, huristic_function, ghost) {
        let tmp_ghost = {
            "dirEnum": null
        };
        if (ghost != null) tmp_ghost = {
            "dirEnum": ghost.dirEnum
        };
        //change to string
        target = tile_to_string(target);
        current_tile = tile_to_string(current_tile);
        //set to store opened tile
        let open = {};
        let close = {};
        //init
        open[current_tile] = {
            h: huristic_function(string_to_tile(current_tile), string_to_tile(target)),
            g: 0,
            dir: tmp_ghost.dirEnum,
            predicessor: null
        };
        while (Object.keys(open).length != 0) {
            //create open list
            let open_list = Object.keys(open).map(function (key) {
                return [key, open[key]];
            });
            //sort list by f = h+g
            open_list.sort(function (first, second) {
                return first[1]['h'] + first[1]['g'] < second[1]['h'] + second[1]['g'] ? -1 : (first[1]['h'] + first[1]['g'] > second[1]['g'] + second[1]['h'] ? 1 : 0);
            });
            current_tile = open_list[0][0];
            tmp_ghost.dirEnum = open_list[0][1].dir;
            //if found solution then break
            if (current_tile == target) break;
            let next_available_tiles = get_ava_tiles(string_to_tile(current_tile), tmp_ghost);
            //add next available tile to open
            for (let t of next_available_tiles) {
                let tile = tile_to_string(t);
                let current_cost = open[current_tile]['g'] + 1;
                let current_dir = generate_action(string_to_tile(current_tile), t);
                if (tile in open) {
                    // if successor has lower already skip this one
                    if (open[tile]['g'] <= current_cost) continue;
                } else if (tile in close) {
                    // if successor has lower already in close skip
                    if (close[tile]['g'] <= current_cost) continue;
                    //else move the node from close to opens
                    open[tile] = close[tile];
                    delete close[tile];
                } else {
                    open[tile] = {
                        h: huristic_function(string_to_tile(tile), string_to_tile(target))
                    };
                }
                //update h and g
                open[tile]['g'] = current_cost;
                open[tile]['predicessor'] = current_tile;
                if (ghost == null) open[tile]['dir'] = null;
                else open[tile]['dir'] = generate_action(string_to_tile(current_tile), string_to_tile(tile));
            }
            //add current tile to closed list
            close[current_tile] = open[current_tile];
            delete open[current_tile];
        }
        //not found 
        if (current_tile != target) return [];
        else {
            //retrive path
            let path = [];
            path.unshift(string_to_tile(current_tile));
            current_tile = open[current_tile]['predicessor'];
            while (current_tile != null) {
                path.unshift(string_to_tile(current_tile));
                current_tile = close[current_tile]['predicessor'];
            }
            return path;
        }
    }

    //convert heading tile to action
    let generate_action = function (cur, heading) {
        let dir_x = heading.x - cur.x;
        let dir_y = heading.y - cur.y;
        //left
        if (dir_x == -1) return DIR_LEFT;
        else if (dir_x == 1) return DIR_RIGHT;
        if (dir_y == -1) return DIR_UP;
        else if (dir_y == 1) return DIR_DOWN;
    }
    //true if in home false ow
    //TODO currently this is hard coded, but latter change to checking if ghost are moving to tell
    let is_ghost_in_home = function (ghost) {
        let x = ghost.tile.x;
        let y = ghost.tile.y
        if (x <= 9 || x >= 18) return false;
        else if (y <= 14 || y >= 20) return false;
        return true;
    }
    //return ghost within distance, empty list if none
    let get_approaching_ghost = function (tile, distance) {
        let approaching_ghost = [];
        //for all ghost 
        for (let ghost of ghosts) {
            //if ghost is  scared or in home then continue
            if (ghost.scared || is_ghost_in_home(ghost)) continue;
            //if within distance
            if (manhattan_distance(ghost.tile, tile) < distance) approaching_ghost.push(ghost);
        }
        //return approaching ghost
        return approaching_ghost;

    }

    //bfs find a tile using depth_limit as radius that is furthest from closest ghost 
    let evade_ghost = function (distance, depth_limit) {
        //bfs with depth limit found path to run
        let depth = 0;
        let visited = {};
        let ava_tiles = get_ava_tiles(pacman.tile, false);
        let optional_tile = [];
        while (depth < depth_limit) {
            //if any new tile is distance+1 away from all apporch ghost
            for (let tile of ava_tiles) {
                if (tile_to_string(tile) in visited) continue;
                visited[tile_to_string(tile)] = true;
                //approaching_ghost = get_appraching_ghost(tile,distance);
                let real_distances = [];
                for (let ghost of ghosts) {
                    if (ghost.scared || is_ghost_in_home(ghost)) {
                        real_distances.push(Infinity);
                        continue;
                    }
                    let real_distance = (a_star_search(ghost.tile, tile, manhattan_distance, true)).length - 1;
                    //let real_distance = manhattan_distance(tile,ghost.tile);
                    real_distances.push(real_distance);
                }
                //just error handling 
                if (real_distances.length == 4) optional_tile.push([tile, Math.min(...real_distances)]);
                else console.log("Something is wrong")

            }
            //expend 
            ava_tiles = ava_tiles.flatMap(function (tile) {
                return get_ava_tiles(tile, false)
            });
            depth += 1;
        }

        let best_tile = null;
        let max_dis = Number.NEGATIVE_INFINITY;
        for (const tile of optional_tile) {
            if (tile[1] > max_dis) {
                max_dis = tile[1];
                best_tile = tile[0];
            }
        }
        return best_tile;

    }
    //predict each ghost's target given a fake pacman tile
    let get_ghosts_target = function (x, y, dir, dirEnum, ghosts) {
        //ghosts target
        const targets = {};
        for (const ghost of ghosts) {
            if (is_ghost_in_home(ghost) || ghost.scared) continue;
            if (ghost.name == 'blinky') targets['blinky'] = {
                'x': x,
                'y': y,
                'pre_x': ghost.tile.x,
                'pre_y': ghost.tile.y
            } // target directly pacman

            else if (ghost.name == "pinky") { // target four tile ahead of pacman
                let px = x + 4 * dir.x;
                let py = y + 4 * dir.y;
                if (dirEnum == DIR_UP) px -= 4;
                targets['pinky'] = {
                    'x': px,
                    'y': py,
                    'pre_x': ghost.tile.x,
                    'pre_y': ghost.tile.y
                }
            } else if (ghost.name == "inky") { //inky targets twice the distance from blinky to two tiles ahead of pacman
                let px = x + 2 * dir.x;
                let py = y + 2 * dir.y;
                if (dirEnum == DIR_UP) {
                    px -= 2;
                }
                targets['inky'] = {
                    "x": targets['blinky'].pre_x + 2 * (px - targets['blinky'].pre_x),
                    "y": targets['blinky'].pre_y + 2 * (py - targets['blinky'].pre_y),
                    'pre_x': ghost.tile.x,
                    'pre_y': ghost.tile.y
                }
            } else if (ghost.name == 'clyde') //clyde targets pacman if >=8 tiles away, otherwise targets home
            {
                let dx = x - (ghost.tile.x + ghost.dir.x);
                let dy = x - (ghost.tile.y + ghost.dir.y);
                let dist = dx * dx + dy * dy;
                if (dist >= 64) {
                    targets['clyde'] = {
                        'x': x,
                        'y': y,
                        'pre_x': ghost.tile.x,
                        'pre_y': ghost.tile.y
                    };
                } else {
                    targets['clyde'] = {
                        'x': 0,
                        'y': 34,
                        'pre_x': ghost.tile.x,
                        'pre_y': ghost.tile.y
                    };
                }
            }


        }
        return targets
    }
    //select best grid by predicting exact how each ghost will move 
    let evade_ghost2 = function () {
        //initia
        let ghosts_copy = [];
        for (const ghost of ghosts) {
            if (is_ghost_in_home(ghost) || ghost.scared) continue;
            const ghost_copy = {
                'name': ghost.name,
                'dir': ghost.dir,
                'dirEnum': ghost.dirEnum,
                'x': ghost.tile[0],
                'y': ghost.tile[1]
            }
            ghosts_copy.push(ghost);
        }
        let predictions = []
        let pacman_copy = {
            'x': pacman.tile.x,
            'y': pacman.tile.x,
            'dir': pacman.dir,
            'dirEnum': pacman.dirEnum
        }
        //predict the next position
        let actions = get_ava_action(pacman.tile);
        for (const action of actions) {
            //update pacman location based on action
            let dir = {
                'x': 0,
                'y': 0
            };
            setDirFromEnum(dir, action);
            let x = pacman_copy.x + dir.x;
            let y = pacman_copy.y + dir.y;
            //predict target
            let prediction = get_ghosts_target(x, y, dir, action, ghosts_copy);
            let prediction_tile = [];
            //get next tile, this need to use ghost next tile based on cur dir and pos
            for (let [k, v] of Object.entries(prediction)) {
                let tile = {
                    'x': v.pre_x,
                    'y': v.pre_y
                };
                let target_tile = {
                    'x': v.x,
                    'y': v.y
                };
                let open_tiles = get_ava_tiles(tile, true);
                let next_tile = {
                    x: v.pre_x.x + dir.x,
                    y: v.pre_y.y + dir.y,
                }
                prediction_tile.push(get_tile_closet_to_target(next_tile, target_tile, open_tiles))
            }
            predictions.push(prediction_tile);
        }
        //found the best one use furtherest closest real distance from prediction
        let choose = -1;
        let count = 0;
        let max = -1;
        for (let prediction of predictions) {
            let minimum = Infinity;
            for (const tile of prediction) {
                if (tile == null) continue;
                let x = tile.x;
                let y = tile.y;
                //let distance = a_star_search({'x':pacman.tile.x,"y":pacman.tile.y},{'x':x,'y':y},manhattan_distance,true);
                const distance = manhattan_distance({
                    'x': pacman.tile.x,
                    "y": pacman.tile.y
                }, {
                    'x': x,
                    'y': y
                });
                minimum = minimum > distance ? distance : minimum;
            }
            choose = minimum > max ? count : choose;
            max = minimum > max ? minimum : max;
            count += 1;

        }
        return actions[choose];




    }


    let flee_mode = false;
    let food_locations = [];
    let get_pellets_location = function () {
        for (let y = 0; y < map.numRows; y++) {
            for (let x = 0; x < map.numCols; x++) {
                let tile = map.getTile(x, y);
                if (tile == '.' || tile == 'o') food_locations.push({
                    "x": x,
                    "y": y
                })
            }
        }
    }
    //debug method get the first pellet found left in the map
    // let get_any_pellets = function(cur_tile){
    //     let closest_pellet = null;
    //     //iterate the whole map
    //     for (let y = 0; x < map.numRows; x++){
    //         for (let x = 0; y < map.numCols; y++){
    //             if (map.getTile(x,y) == '.' || map.getTile(x,y) == "o"){
    //                  closest_pellet = {"x":x,"y":y};
    //                  break;
    //                 }
    //             }
    //         }
    //         return closest_pellet;
    //     }
    let euclidean_distance = function (cur_tile, target_tile) {
        let delta_x = cur_tile.x - target_tile.x;
        let delta_y = cur_tile.y - target_tile.y;
        return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
    }

    let print_direction = function (input_dir) {
        if (input_dir == DIR_DOWN) console.log("DOWN\n");
        else if (input_dir == DIR_UP) console.log("UP\n");
        else if (input_dir == DIR_LEFT) console.log("LEFT\n");
        else if (input_dir == DIR_RIGHT) console.log("RIGHT\n");
        else console.log("ERROR");
    }

    //use tile with food
    let frame_count = 0;
    let score_result = 0;
    let target = null;
    let food_target = pacman.tile;
    let evade_target = null;
    let target_tile = null;
    ////////////////////////////////////////////////////
    // Play state
    // (state when playing the game)
    let playState = {
        init: function () {},
        draw: function () { // render section
            renderer.setLevelFlash(false);
            renderer.blitMap();
            renderer.drawScore();
            renderer.beginMapClip();
            renderer.drawFruit();
            // //render target here
            //  let predict_targets = get_ghosts_target(pacman.tile.x,pacman.tile.y,pacman.dir,pacman.dirEnum,ghosts);
            // for (const [ghost_name,target] of Object.entries(predict_targets)){
            //     renderer.drawTargets(ghost_name,target.x,target.y);
            // }

            // //testing render target tile
            // for (const ghost of ghosts){
            //     //renderer.drawTargets(ghost.name,ghost.targetTile.x,ghost.targetTile.y);
            //     let nex_tile = {
            //         x: ghost.tile.x + ghost.dir.x,
            //         y: ghost.tile.y + ghost.dir.y,
            //     }
            //     let open_action = get_ava_action(ghost.tile,ghost.dirEnum,true);
            //     let tile_prediction = get_tile_closet_to_target(ghost.tile,ghost.targetTile,open_action)
            //     if (tile_prediction == null) continue;
            //     renderer.drawTargets('none',tile_prediction.x,tile_prediction.y);

            // }

            // //test render prediction tile here
            // for (const [ghost_name,target] of Object.entries(predict_targets)){
            //     let open_action = get_ava_action({'x':target.pre_x,'y':target.pre_y},target.dirEnum,true);
            //     let tile = {'x':target.pre_x,'y':target.pre_y};
            //     let target_tile = {'x':target.x,'y':target.y};
            //     let tile_prediction = get_tile_closet_to_target(tile,target_tile,open_action)
            //     if (tile_prediction == null) continue;
            //     //renderer.drawTargets('none',tile_prediction.x,tile_prediction.y);
            // }

            //ghost are restricted from turning up on these tiles
            // let x = 26;
            // let y = 4;
            renderer.drawTargets('none', 4, 17);
            renderer.drawTargets('none', 23, 17);
            // //draw path from ghost to pacman
            // let path = a_star_search(ghosts[0].tile,pacman.tile,manhattan_distance,ghosts[0]);
            // for (let tile of path){
            //     renderer.drawTargets('none',tile.x,tile.y);
            // }
            // let pellet_tile = get_next_pellets(pacman.tile);
            // let path = a_star_search(ghosts[2].tile,pacman.tile,manhattan_distance,ghosts[2]);
            // for (let tile of path){
            //     renderer.drawTargets('none',tile.x,tile.y);
            // }
            //renderer.drawTargets('none', target_tile.x, target_tile.y);
            // // renderer.drawTargets('none',12,26);
            // // renderer.drawTargets('none',15,14);
            // // renderer.drawTargets('none',15,26);

            renderer.drawActors();
            renderer.endMapClip();
        },

        // handles collision between pac-man and ghosts
        // returns true if collision happened
        isPacmanCollide: function () {
            //return false;
            let i, g;
            for (let i = 0; i < 4; i++) {
                g = ghosts[i];
                if (g.tile.x == pacman.tile.x && g.tile.y == pacman.tile.y && g.mode == GHOST_OUTSIDE) {
                    if (g.scared) { // eat ghost
                        energizer.addPoints();
                        g.onEaten();
                    } else if (pacman.invincible) // pass through ghost
                        continue;
                    else // killed by ghost
                    {
                        death_location.x = pacman.tile.x;
                        death_location.y = pacman.tile.y;
                        switchState(deadState);
                    }
                    return true;
                }
            }
            return false;
        },



        //I think this function get updated in main game loop
        update: function () {

            //ai function
            //move set input here to reach shuffle, otherwise might never reached
            if (target_tile != null) {
                preference = maybeShufflePreference({
                    pacmanTile: pacman.tile,
                    targetTile: target_tile,
                    preference: preference
                });
                pacman.setInputDir(generate_action(pacman.tile, target_tile));
            }

            //check if teleportation work
            //if (pacman.tile.x != -1 & pacman.tile.y != 17){
                // let path = a_star_search(pacman.tile,{"x":24,"y":17},manhattan_distance,null);
                // if(pacman.tile.y == 17) pacman.setInputDir(DIR_RIGHT);
                // else {
                //     let dirEnum = generate_action(pacman.tile,path[1]);
                //     pacman.setInputDir(dirEnum);
                // }
            //s}
            
            if (true) {
                let utilityResult = chooseTargetTile({
                    pacmanTile: pacman.tile,
                    ghosts: ghosts,
                    map: map,
                    getAvailableTiles: get_ava_tiles,
                    getNextPellets: function (tile) {
                        return getNextPellets({
                            map: map,
                            manhattanDistance: manhattan_distance,
                            curTile: tile
                        });
                    },
                    aStarSearch: a_star_search,
                    manhattanDistance: manhattan_distance,
                    generateAction: generate_action,
                    isGhostInHome: is_ghost_in_home,
                    preference: preference
                });

                if (utilityResult.targetTile != null) {
                    target_tile = utilityResult.targetTile;
                }
            }
            ai_frame_count += 1;
            if (ai_frame_count == 5) ai_frame_count = 0;
            let i, j; // loop index
            let maxSteps = 2;
            let skip = false;

            // skip this frame if needed,
            // but updatfe ghosts running home
            if (energizer.showingPoints()) {
                for (let j = 0; j < maxSteps; j++)
                    for (let i = 0; i < 4; i++)
                        if (ghosts[i].mode == GHOST_GOING_HOME || ghosts[i].mode == GHOST_ENTERING_HOME)
                            ghosts[i].update(j);
                energizer.updatePointsTimer();
                skip = true;
            } else { // make ghosts go home immediately after points disappear
                for (let i = 0; i < 4; i++)
                    if (ghosts[i].mode == GHOST_EATEN) {
                        ghosts[i].mode = GHOST_GOING_HOME;
                        ghosts[i].targetting = 'door';
                    }
            }

            if (!skip) {

                // update counters
                ghostReleaser.update();
                ghostCommander.update();
                elroyTimer.update();
                fruit.update();
                energizer.update();

                // update actors one step at a time
                for (let j = 0; j < maxSteps; j++) {

                    // advance pacman
                    pacman.update(j);

                    // test collision with fruit
                    fruit.testCollide();

                    // finish level if all dots have been eaten
                    if (map.allDotsEaten()) {
                        //this.draw(); 
                        switchState(finishState);
                        break;
                    }

                    // test pacman collision before and after updating ghosts
                    // (redundant to prevent pass-throughs)
                    // (if collision happens, stop immediately.)
                    if (this.isPacmanCollide()) break;
                    for (let i = 0; i < 4; i++) actors[i].update(j);
                    if (this.isPacmanCollide()) break;
                }

                // update frame counts
                for (let i = 0; i < 5; i++)
                    actors[i].frames++;
            }

        },
    };

    ////////////////////////////////////////////////////
    // Script state
    // (a state that triggers functions at certain times)

    let scriptState = (function () {

        return {
            init: function () {
                this.frames = 0; // frames since state began
                this.triggerFrame = 0; // frames since last trigger

                let trigger = this.triggers[0];
                this.drawFunc = trigger ? trigger.draw : undefined; // current draw function
                this.updateFunc = trigger ? trigger.update : undefined; // current update function
            },
            update: function () {

                // if trigger is found for current time,
                // call its init() function
                // and store its draw() and update() functions
                let trigger = this.triggers[this.frames];
                if (trigger) {
                    if (trigger.init) trigger.init();
                    this.drawFunc = trigger.draw;
                    this.updateFunc = trigger.update;
                    this.triggerFrame = 0;
                }

                // call the last trigger's update function
                if (this.updateFunc)
                    this.updateFunc(this.triggerFrame);

                this.frames++;
                this.triggerFrame++;
            },
            draw: function () {
                // call the last trigger's draw function
                if (this.drawFunc)
                    this.drawFunc(this.triggerFrame);
            },
        };
    })();

    ////////////////////////////////////////////////////
    // Seekable Script state

    let seekableScriptState = newChildObject(scriptState, {

        init: function () {
            scriptState.init.call(this);
            this.savedFrames = {};
            this.savedTriggerFrame = {};
            this.savedDrawFunc = {};
            this.savedUpdateFunc = {};
        },

        save: function (t) {
            this.savedFrames[t] = this.frames;
            this.savedTriggerFrame[t] = this.triggerFrame;
            this.savedDrawFunc[t] = this.drawFunc;
            this.savedUpdateFunc[t] = this.updateFunc;
        },
        load: function (t) {
            this.frames = this.savedFrames[t];
            this.triggerFrame = this.savedTriggerFrame[t];
            this.drawFunc = this.savedDrawFunc[t];
            this.updateFunc = this.savedUpdateFunc[t];
        },
        update: function () {


            scriptState.update.call(this);

        },
        draw: function () {
            if (this.drawFunc) {
                scriptState.draw.call(this);
            }
        },
    });

    ////////////////////////////////////////////////////
    // Dead state
    // (state when player has lost a life)

    let deadState = (function () {

        // this state will always have these drawn
        let commonDraw = function () {
            renderer.blitMap();
            renderer.drawScore();
        };
        return newChildObject(seekableScriptState, {

            // script functions for each time
            triggers: {
                0: { // freeze
                    draw: function () {
                        commonDraw();
                        renderer.beginMapClip();
                        renderer.endMapClip();
                    },
                    init: function () { // leave
                        //for now update score here
                        const score = getScore();
                        if (extraLives == 0) {
                            console.log("uploading result...");
                            const socket = new WebSocket('ws://localhost:8000');
                            socket.addEventListener('open', function (event) {
                                socket.send(`${death_location.x},${death_location.y},${num_iter},${score}`);
                            });
                            console.log(score);
                            score_result = 0;
                        } else {
                            const socket = new WebSocket('ws://localhost:8000');
                            socket.addEventListener('open', function (event) {
                                socket.send(`${death_location.x},${death_location.y},${num_iter},NaN`);
                            });
                            console.log("die at " + death_location.x + " " + death_location.y)
                        }
                        //death_penalty[death_location.y][death_location.x] += 1;
                        //change to only one life
                        switchState(extraLives == 0 ? overState : readyRestartState);
                        //switchState(true ? overState : readyRestartState);

                    }
                }
            },
        });
    })();

    ////////////////////////////////////////////////////
    // Finish state
    // (state when player has completed a level)

    let finishState = (function () {

        // this state will always have these drawn

        // flash the floor and draw

        return newChildObject(seekableScriptState, {

            // script functions for each time
            triggers: {
                0: {
                    draw: function () {
                        renderer.setLevelFlash(false);
                        renderer.blitMap();
                        renderer.drawScore();
                        renderer.beginMapClip();
                        renderer.drawFruit();
                        renderer.drawActors();
                        renderer.drawTargets();
                        renderer.endMapClip();
                    },

                    init: function () {
                        switchState(readyNewState);

                    }
                }
            },
        });
    })();

    ////////////////////////////////////////////////////
    // Game Over state
    // (state when player has lost last life)
    let num_iter = 0;
    let overState = (function () {

        let frames;
        // csvWriter
        //     .writeRecords(data)
        //     .then(() => console.log('The CSV file was written successfully'));
        return {
            init: function () {
                frames = 0;
            },
            draw: function () {
                renderer.blitMap();
                renderer.drawScore();
                renderer.drawMessage("GAME  OVER", "#F00", 9, 20);
            },
            update: function () {
                if (num_iter != 200) {
                    practiceMode = false;
                    turboMode = false;
                    newGameState.setStartLevel(1);
                    switchState(newGameState);
                    num_iter += 1;
                }
            },
        };
    })();


    //@line 1 "src/maps.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // Maps

    // Definitions of playable maps

    // current map
    let map;

    // actor starting states

    blinky.startDirEnum = DIR_LEFT;
    blinky.startPixel = {
        x: 14 * tileSize - 1,
        y: 14 * tileSize + midTile.y
    };
    blinky.cornerTile = {
        x: 28 - 1 - 2,
        y: 0
    };
    blinky.startMode = GHOST_OUTSIDE;
    blinky.arriveHomeMode = GHOST_LEAVING_HOME;

    pinky.startDirEnum = DIR_DOWN;
    pinky.startPixel = {
        x: 14 * tileSize - 1,
        y: 17 * tileSize + midTile.y,
    };
    pinky.cornerTile = {
        x: 2,
        y: 0
    };
    pinky.startMode = GHOST_PACING_HOME;
    pinky.arriveHomeMode = GHOST_PACING_HOME;

    inky.startDirEnum = DIR_UP;
    inky.startPixel = {
        x: 12 * tileSize - 1,
        y: 17 * tileSize + midTile.y,
    };
    inky.cornerTile = {
        x: 28 - 1,
        y: 36 - 2,
    };
    inky.startMode = GHOST_PACING_HOME;
    inky.arriveHomeMode = GHOST_PACING_HOME;

    clyde.startDirEnum = DIR_UP;
    clyde.startPixel = {
        x: 16 * tileSize - 1,
        y: 17 * tileSize + midTile.y,
    };
    clyde.cornerTile = {
        x: 0,
        y: 36 - 2,
    };
    clyde.startMode = GHOST_PACING_HOME;
    clyde.arriveHomeMode = GHOST_PACING_HOME;

    pacman.startDirEnum = DIR_LEFT;
    pacman.startPixel = {
        x: 14 * tileSize - 1,
        y: 26 * tileSize + midTile.y,
    };

    // Learning Map
    let mapLearn = new Map(28, 36, (
        "____________________________" +
        "____________________________" +
        "____________________________" +
        "____________________________" +
        "____________________________" +
        "____________________________" +
        "____________________________" +
        "____________________________" +
        "____________________________" +
        "__||||||||||||||||||||||||__" +
        "__|                      |__" +
        "__| ||||| |||||||| ||||| |__" +
        "__| ||||| |||||||| ||||| |__" +
        "__| ||    ||    ||    || |__" +
        "__| || || || || || || || |__" +
        "||| || || || || || || || |||" +
        "       ||    ||    ||       " +
        "||| ||||| |||||||| ||||| |||" +
        "__| ||||| |||||||| ||||| |__" +
        "__|    ||          ||    |__" +
        "__| || || |||||||| || || |__" +
        "__| || || |||||||| || || |__" +
        "__| ||    ||    ||    || |__" +
        "__| || || || || || || || |__" +
        "||| || || || || || || || |||" +
        "       ||    ||    ||       " +
        "||| |||||||| || |||||||| |||" +
        "__| |||||||| || |||||||| |__" +
        "__|                      |__" +
        "__||||||||||||||||||||||||__" +
        "____________________________" +
        "____________________________" +
        "____________________________" +
        "____________________________" +
        "____________________________" +
        "____________________________"));

    mapLearn.name = "Pac-Man";
    mapLearn.wallStrokeColor = "#47b897"; // from Pac-Man Plus
    mapLearn.wallFillColor = "#000";
    mapLearn.pelletColor = "#ffb8ae";
    mapLearn.shouldDrawMapOnly = true;

    // Original Pac-Man map
    let mapPacman = new Map(28, 36, (
        "____________________________" +
        "____________________________" +
        "____________________________" +
        "||||||||||||||||||||||||||||" +
        "|............||............|" +
        "|.||||.|||||.||.|||||.||||.|" +
        "|o||||.|||||.||.|||||.||||o|" +
        "|.||||.|||||.||.|||||.||||.|" +
        "|..........................|" +
        "|.||||.||.||||||||.||.||||.|" +
        "|.||||.||.||||||||.||.||||.|" +
        "|......||....||....||......|" +
        "||||||.||||| || |||||.||||||" +
        "_____|.||||| || |||||.|_____" +
        "_____|.||          ||.|_____" +
        "_____|.|| |||--||| ||.|_____" +
        "||||||.|| |______| ||.||||||" +
        "      .   |______|   .      " +
        "||||||.|| |______| ||.||||||" +
        "_____|.|| |||||||| ||.|_____" +
        "_____|.||          ||.|_____" +
        "_____|.|| |||||||| ||.|_____" +
        "||||||.|| |||||||| ||.||||||" +
        "|............||............|" +
        "|.||||.|||||.||.|||||.||||.|" +
        "|.||||.|||||.||.|||||.||||.|" +
        "|o..||.......  .......||..o|" +
        "|||.||.||.||||||||.||.||.|||" +
        "|||.||.||.||||||||.||.||.|||" +
        "|......||....||....||......|" +
        "|.||||||||||.||.||||||||||.|" +
        "|.||||||||||.||.||||||||||.|" +
        "|..........................|" +
        "||||||||||||||||||||||||||||" +
        "____________________________" +
        "____________________________"));

    mapPacman.name = "Pac-Man";
    //mapPacman.wallStrokeColor = "#47b897"; // from Pac-Man Plus
    mapPacman.wallStrokeColor = "#2121ff"; // from original
    mapPacman.wallFillColor = "#000";
    mapPacman.pelletColor = "#ffb8ae";
    mapPacman.constrainGhostTurns = function (tile, openTiles) {
        // prevent ghost from turning up at these tiles
        if ((tile.x == 12 || tile.x == 15) && (tile.y == 14 || tile.y == 26)) {
            openTiles[DIR_UP] = false;
        }
    };
    //@line 1 "src/main.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // Entry Point

    window.addEventListener("load", function () {

        loadHighScores();
        initRenderer();
        atlas.create();
        // initSwipe();
        // let anchor = window.location.hash.substring(1);
        switchState(newGameState);
        executive.init();

        let speedLabel = document.getElementById("speed-label");
        let speedFaster = document.getElementById("speed-faster");
        let speedSlower = document.getElementById("speed-slower");
        let updateSpeedLabel = function () {
            if (speedLabel) {
                speedLabel.textContent = executive.getSpeedMultiplier().toFixed(2) + "x";
            }
        };

        if (speedFaster) {
            speedFaster.addEventListener("click", function () {
                executive.setSpeedMultiplier(executive.getSpeedMultiplier() * 1.25);
                updateSpeedLabel();
            });
        }
        if (speedSlower) {
            speedSlower.addEventListener("click", function () {
                executive.setSpeedMultiplier(executive.getSpeedMultiplier() / 1.25);
                updateSpeedLabel();
            });
        }
        updateSpeedLabel();


    });
})();
