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
var death_penalty = [[
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
    

var ai_frame_count = 0;
var death_location = {
    "x": -1,
    "y": -1
};
var pellet_reward = 20;
var preference = [0.4, 0.3, 0.2, 0.1];
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


    var newChildObject = function (parentObj, newObj) {

        // equivalent to: var resultObj = { __proto__: paentObj };
        var x = function () {};
        x.prototype = parentObj;
        var resultObj = new x();

        // store new members in resultObj
        if (newObj) {
            var hasProp = {}.hasOwnProperty;
            for (var name in newObj) {
                if (hasProp.call(newObj, name)) {
                    resultObj[name] = newObj[name];
                }
            }
        }

        return resultObj;
    };

    var DEBUG = false;

    // Game logic moved to js/game.js
    //@line 1 "src/colors.js"
    // source: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript


    //@line 1 "src/mapgen.js"
    //@line 1 "src/actors.js"
    //////////////////////////////////////////////////////////////////////////////////////
    // create all the actors

    var blinky = new Ghost();
    blinky.name = "blinky";
    blinky.color = "#FF0000";
    blinky.pathColor = "rgba(255,0,0,0.8)";
    blinky.isVisible = true;

    var pinky = new Ghost();
    pinky.name = "pinky";
    pinky.color = "#FFB8FF";
    pinky.pathColor = "rgba(255,184,255,0.8)";
    pinky.isVisible = true;

    var inky = new Ghost();
    inky.name = "inky";
    inky.color = "#00FFFF";
    inky.pathColor = "rgba(0,255,255,0.8)";
    inky.isVisible = true;

    var clyde = new Ghost();
    clyde.name = "clyde";
    clyde.color = "#FFB851";
    clyde.pathColor = "rgba(255,184,81,0.8)";
    clyde.isVisible = true;

    var pacman = new Player();
    pacman.name = "pacman";
    pacman.color = "#FFFF00";
    pacman.pathColor = "rgba(255,255,0,0.8)";

    // order at which they appear in original arcade memory
    // (suggests drawing/update order)
    var actors = [blinky, pinky, inky, clyde, pacman];
    var ghosts = [blinky, pinky, inky, clyde];
    //@line 1 "src/targets.js"
    /////////////////////////////////////////////////////////////////
    // Targetting
    // (a definition for each actor's targetting algorithm and a draw function to visualize it)
    // (getPathDistLeft is used to obtain a smoothly interpolated path endpoint)

    // the tile length of the path drawn toward the target
    var actorPathLength = 16;

    (function () {

        // the size of the square rendered over a target tile (just half a tile)
        var targetSize = midTile.y;

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
            var px = pacman.tile.x + 4 * pacman.dir.x;
            var py = pacman.tile.y + 4 * pacman.dir.y;
            if (pacman.dirEnum == DIR_UP) {
                px -= 4;
            }
            return {
                x: px,
                y: py
            };
        };
        pinky.getTargetPixel = function () {
            var px = pacman.pixel.x + 4 * pacman.dir.x * tileSize;
            var py = pacman.pixel.y + 4 * pacman.dir.y * tileSize;
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

            var pixel = this.getTargetPixel();

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
            var px = pacman.tile.x + 2 * pacman.dir.x;
            var py = pacman.tile.y + 2 * pacman.dir.y;
            if (pacman.dirEnum == DIR_UP) {
                px -= 2;
            }
            return {
                x: blinky.tile.x + 2 * (px - blinky.tile.x),
                y: blinky.tile.y + 2 * (py - blinky.tile.y),
            };
        };

        inky.getTargetTile = function (tile, dir, dirEnum) {
            var px = pacman.tile.x + 2 * pacman.dir.x;
            var py = pacman.tile.y + 2 * pacman.dir.y;
            if (pacman.dirEnum == DIR_UP) {
                px -= 2;
            }
            return {
                x: blinky.tile.x + 2 * (px - blinky.tile.x),
                y: blinky.tile.y + 2 * (py - blinky.tile.y),
            };
        };

        inky.getJointPixel = function () {
            var px = pacman.pixel.x + 2 * pacman.dir.x * tileSize;
            var py = pacman.pixel.y + 2 * pacman.dir.y * tileSize;
            if (pacman.dirEnum == DIR_UP) {
                px -= 2 * tileSize;
            }
            return {
                x: px,
                y: py
            };
        };
        inky.getTargetPixel = function () {
            var px = pacman.pixel.x + 2 * pacman.dir.x * tileSize;
            var py = pacman.pixel.y + 2 * pacman.dir.y * tileSize;
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
            var pixel;

            var joint = this.getJointPixel();

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
            var dx = pacman.tile.x - (this.tile.x + this.dir.x);
            var dy = pacman.tile.y - (this.tile.y + this.dir.y);
            var dist = dx * dx + dy * dy;
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
            var px, py;

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
            var distLeft = tileSize;
            var px, py;
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
    var GHOST_CMD_CHASE = 0;
    var GHOST_CMD_SCATTER = 1;

    var ghostCommander = (function () {

        // determine if there is to be a new command issued at the given time
        var getNewCommand = (function () {
            var t;
            var times = [{}, {}, {}];
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
                var i;
                if (level == 1)
                    i = 0;
                else if (level >= 2 && level <= 4)
                    i = 1;
                else
                    i = 2;
                var newCmd = times[i][frame];

                if (gameMode == GAME_PACMAN) {
                    return newCmd;
                }
            };
        })();

        var frame; // current frame
        var command; // last command given to ghosts

        var savedFrame = {};
        var savedCommand = {};

        // save state at time t
        var save = function (t) {
            savedFrame[t] = frame;
            savedCommand[t] = command;
        };

        // load state at time t
        var load = function (t) {
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
                var newCmd;
                if (!energizer.isActive()) {
                    newCmd = getNewCommand(frame);
                    if (newCmd != undefined) {
                        command = newCmd;
                        for (i = 0; i < 4; i++)
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

    var ghostReleaser = (function () {
        // two separate counter modes for releasing the ghosts from home
        var MODE_PERSONAL = 0;
        var MODE_GLOBAL = 1;

        // ghost enumerations
        var PINKY = 1;
        var INKY = 2;
        var CLYDE = 3;

        // this is how many frames it will take to release a ghost after pacman stops eating
        var getTimeoutLimit = function () {
            return (level < 5) ? 4 * 60 : 3 * 60;
        };

        // dot limits used in personal mode to release ghost after # of dots have been eaten
        var personalDotLimit = {};
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
        var globalDotLimit = {};
        globalDotLimit[PINKY] = 7;
        globalDotLimit[INKY] = 17;
        globalDotLimit[CLYDE] = 32;

        var framesSinceLastDot; // frames elapsed since last dot was eaten
        var mode; // personal or global dot counter mode
        var ghostCounts = {}; // personal dot counts for each ghost
        var globalCount; // global dot count

        var savedGlobalCount = {};
        var savedFramesSinceLastDot = {};
        var savedGhostCounts = {};

        // save state at time t
        var save = function (t) {
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
        var load = function (t) {
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
                var i;

                framesSinceLastDot = 0;

                if (mode == MODE_GLOBAL) {
                    globalCount++;
                } else {
                    for (i = 1; i < 4; i++) {
                        if (ghosts[i].mode == GHOST_PACING_HOME) {
                            ghostCounts[i]++;
                            break;
                        }
                    }
                }

            },
            update: function () {
                var g;

                // use personal dot counter
                if (mode == MODE_PERSONAL) {
                    for (i = 1; i < 4; i++) {
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
                    for (i = 1; i < 4; i++) {
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

    var elroyTimer = (function () {

        // get the number of dots left that should trigger elroy stage #1 or #2
        var getDotsEatenLimit = (function () {
            var dotsLeft = [
                [20, 30, 40, 40, 40, 50, 50, 50, 60, 60, 60, 70, 70, 70, 100, 100, 100, 100, 120, 120, 120], // elroy1
                [10, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30, 40, 40, 40, 50, 50, 50, 50, 60, 60, 60]
            ]; // elroy2
            return function (stage) {
                var i = level;
                if (i > 21) i = 21;
                var pacman_max_pellets = 244;
                return pacman_max_pellets - dotsLeft[stage - 1][i - 1];
            };
        })();

        // when level restarts, blinky must wait for clyde to leave home before resuming elroy mode
        var waitForClyde;

        var savedWaitForClyde = {};

        // save state at time t
        var save = function (t) {
            savedWaitForClyde[t] = waitForClyde;
        };

        // load state at time t
        var load = function (t) {
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

    var energizer = (function () {

        // how many seconds to display points when ghost is eaten

        // how long to stay energized based on current level
        var getDuration = (function () {
            var seconds = [6, 5, 4, 3, 2, 5, 2, 2, 1, 5, 2, 1, 1, 3, 1, 1, 0, 1];
            return function () {
                var i = level;
                return (i > 18) ? 0 : 60 * seconds[i - 1];
            };
        })();

        // how many ghost flashes happen near the end of frightened mode based on current level
        var getFlashes = (function () {
            var flashes = [5, 5, 5, 5, 5, 5, 5, 5, 3, 5, 5, 3, 3, 5, 3, 3, 0, 3];
            return function () {
                var i = level;
                return (i > 18) ? 0 : flashes[i - 1];
            };
        })();

        // "The ghosts change colors every 14 game cycles when they start 'flashing'" -Jamey Pittman
        var flashInterval = 14;

        var count; // how long in frames energizer has been active
        var active; // indicates if energizer is currently active
        var points; // points that the last eaten ghost was worth
        var pointsFramesLeft; // number of frames left to display points earned from eating ghost

        var savedCount = {};
        var savedActive = {};
        var savedPoints = {};
        var savedPointsFramesLeft = {};

        // save state at time t
        var save = function (t) {
            savedCount[t] = count;
            savedActive[t] = active;
            savedPoints[t] = points;
            savedPointsFramesLeft[t] = pointsFramesLeft;
        };

        // load state at time t
        var load = function (t) {
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
                for (i = 0; i < 4; i++)
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
                for (i = 0; i < 4; i++) {
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
                var i = Math.floor((getDuration() - count) / flashInterval);
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

    var BaseFruit = function () {
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

    var PacFruit = function () {
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
            var i;
            for (i = 1; i <= level; i++) {
                this.fruitHistory[i] = this.fruits[this.getFruitIndexFromLevel(i)];
            }
        },

        initiate: function () {
            var x = 13;
            var y = 20;
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



    var fruit;
    var setFruitFromGameMode = (function () {
        var pacfruit = new PacFruit();
        fruit = pacfruit;
        return function () {
            if (gameMode == GAME_PACMAN) {
                fruit = pacfruit;
            }
        };
    })();
    //@line 1 "src/executive.js"
    var executive = (function () {
        //for observing
        var framePeriod = 0.0000001; // length of each frame at 60Hz (updates per second)
        //var framePeriod = 20.0;
        //for data collection
        //var framePeriod = 0.0000000001;
        var gameTime; // virtual time of the last game update

        var paused = false; // flag for pausing the state updates, while still drawing
        var running = false; // flag for truly stopping everything

        /**********/
        // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

        // requestAnimationFrame polyfill by Erik Möller
        // fixes from Paul Irish and Tino Zijdel

        (function () {
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                    window[vendors[x] + 'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function (callback) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function () {
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

        var fps;
        var updateFps = (function () {
            // TODO: fix this to reflect the average rate of the last n frames, where 0 < n < 60
            var length = 60;
            var times = [];
            var startIndex = 0;
            var endIndex = -1;
            var filled = false;

            return function (now) {
                if (filled) {
                    startIndex = (startIndex + 1) % length;
                }
                endIndex = (endIndex + 1) % length;
                if (endIndex == length - 1) {
                    filled = true;
                }

                times[endIndex] = now;

                var seconds = (now - times[startIndex]) / 1000;
                var frames = endIndex - startIndex;
                if (frames < 0) {
                    frames += length;
                }
                fps = frames / seconds;
            };
        })();


        var reqFrame; // id of requestAnimationFrame object
        var tick = function (now) {
            if (gameTime == undefined) {
                gameTime = now;
            }

            // Update fps counter.
            updateFps(now);

            // Control frame-skipping by only allowing gameTime to lag behind the current time by some amount.
            var maxFrameSkip = 3;
            gameTime = Math.max(gameTime, now - maxFrameSkip * framePeriod);

            // Prevent any updates from being called when paused.
            if (paused) {
                gameTime = now;
            }

            hud.update();

            // Update the game until the gameTime surpasses the current time.
            while (gameTime < now) {
                state.update();
                gameTime += framePeriod;
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
            //here to change frame rate
            setUpdatesPerSecond: function () {
                framePeriod = 100000;
                //gameTime = undefined;
            },
            init: function () {
                var that = this;
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
    var state;

    // switches to another game state
    var switchState = function (nextState) {
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

    var newGameState = (function () {
        var frames;
        var duration = 0;
        var startLevel = 1;

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

    var readyState = (function () {

        return {
            init: function () {
                var i;
                for (i = 0; i < 5; i++)
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

    var readyNewState = newChildObject(readyState, {

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

    var readyRestartState = newChildObject(readyState, {

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
    var get_ava_action = function (current_tile, cur_dir = null, is_ghost = false) {
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
    var left = {
        x: -1,
        y: 0
    };
    var right = {
        x: 1,
        y: 0
    };
    var down = {
        x: 0,
        y: 1
    };
    var up = {
        x: 0,
        y: -1
    };
    //get_ava_tiles(ghosts[0].tile,ghosts[0])
    var get_dirEnum_from_direction = function (dir) {
        if (dir.x == up.x & dir.y == up.y) return DIR_UP;
        if (dir.x == down.x & dir.y == down.y) return DIR_DOWN;
        if (dir.x == left.x & dir.y == left.y) return DIR_LEFT;
        if (dir.x == right.x & dir.y == right.y) return DIR_RIGHT;
    }
    var actions = [left, right, down, up];
    //get available tiles
    var get_ava_tiles = function (current_tile, ghost) {
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
    var manhattan_distance = function (tile1, tile2) {
        return (Math.abs(tile2.x - tile1.x) + Math.abs(tile2.y - tile1.y));
    }

    //convert tile to  string 
    var tile_to_string = function (tile) {
        return `${tile.x} ${tile.y}`;
    }
    //convert string to tile
    var string_to_tile = function (tileString) {
        let list = tileString.split(' ');
        return {
            x: parseInt(list[0]),
            y: parseInt(list[1])
        };
    }
    //compare if two tile equal
    var compare_tile = function (tile1, tile2) {
        return (tile1.x == tile2.x && tile1.y == tile2.y);
    }
    //a* to find path, f = g+h, g is action cost h is huristic
    var a_star_search = function (current_tile, target, huristic_function, ghost) {
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
    var generate_action = function (cur, heading) {
        dir_x = heading.x - cur.x;
        dir_y = heading.y - cur.y;
        //left
        if (dir_x == -1) return DIR_LEFT;
        else if (dir_x == 1) return DIR_RIGHT;
        if (dir_y == -1) return DIR_UP;
        else if (dir_y == 1) return DIR_DOWN;
    }
    //true if in home false ow
    //TODO currently this is hard coded, but latter change to checking if ghost are moving to tell
    var is_ghost_in_home = function (ghost) {
        let x = ghost.tile.x;
        let y = ghost.tile.y
        if (x <= 9 || x >= 18) return false;
        else if (y <= 14 || y >= 20) return false;
        return true;
    }
    //return ghost within distance, empty list if none
    var get_approaching_ghost = function (tile, distance) {
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
    var evade_ghost = function (distance, depth_limit) {
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
        for (tile of optional_tile) {
            if (tile[1] > max_dis) {
                max_dis = tile[1];
                best_tile = tile[0];
            }
        }
        return best_tile;

    }
    //predict each ghost's target given a fake pacman tile
    var get_ghosts_target = function (x, y, dir, dirEnum, ghosts) {
        //ghosts target
        targets = {};
        for (ghost of ghosts) {
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
    var evade_ghost2 = function () {
        //initia
        let ghosts_copy = [];
        for (ghost of ghosts) {
            if (is_ghost_in_home(ghost) || ghost.scared) continue;
            ghost_copy = {
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
        for (action of actions) {
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
                distance = manhattan_distance({
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


    var flee_mode = false;
    var food_locations = [];
    var get_pellets_location = function () {
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
    // var get_any_pellets = function(cur_tile){
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
    var euclidean_distance = function (cur_tile, target_tile) {
        delta_x = cur_tile.x - target_tile.x;
        delta_y = cur_tile.y - target_tile.y;
        return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
    }

    //return closest given a location
    var get_next_pellets = function (cur_tile) {
        let min_distance = Infinity;
        let closest_pellet = null;
        //let dist_to_target = manhattan_distance(location,target);
        var index = food_locations.length;
        //iterate the whole map
        for (let y = 4; y < 33; y++) {
            for (let x = 1; x < 27; x++) {
                if (map.getTile(x, y) == '.' || map.getTile(x, y) == "o") {
                    let distance_to_food = manhattan_distance(cur_tile, {
                        "x": x,
                        "y": y
                    });
                    if (min_distance > distance_to_food) {
                        min_distance = distance_to_food;
                        closest_pellet = {
                            "x": x,
                            "y": y
                        };
                    }
                }
            }
        }
        return closest_pellet;
        // //iterate every pellet while remove eaten one from food_locations
        // while (index--) {
        //     let x = food_locations[index].x;
        //     let y = food_locations[index].y;
        //     if (map.getTile(x, y) == ' ') {
        //         //remove from food_locations
        //         food_locations.splice(index, 1);
        //         continue;
        //     }
        //     let distance_to_food = manhattan_distance(cur_tile, food_locations[index]);
        //     if (min_distance > distance_to_food) {
        //         min_distance = distance_to_food;
        //         closest_pellet = food_locations[index];
        //     }
        // }
        //update food locations if current one is empty then return the funciton
        // if (closest_pellet == null) {
        //     get_pellets_location();
        //     return get_next_pellets(cur_tile);
        // } else {
        //     return closest_pellet;
        // }
    }

    var print_direction = function (input_dir) {
        if (input_dir == DIR_DOWN) console.log("DOWN\n");
        else if (input_dir == DIR_UP) console.log("UP\n");
        else if (input_dir == DIR_LEFT) console.log("LEFT\n");
        else if (input_dir == DIR_RIGHT) console.log("RIGHT\n");
        else console.log("ERROR");
    }

    //use tile with food
    var frame_count = 0;
    var score_result = 0;
    var target = null;
    var food_target = pacman.tile;
    var evade_target = null;
    var target_tile = null;
    ////////////////////////////////////////////////////
    // Play state
    // (state when playing the game)
    var playState = {
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
            var i, g;
            for (i = 0; i < 4; i++) {
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
                // shuffle the preference for every step
                if (pacman.tile.x == target_tile.x & pacman.tile.y == target_tile.y) {
                   preference.sort(() => Math.random() - 0.5);
                }
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
                //get_any_pellets(pacman.tile);
                // utility function is sum(ghost distance) + distance to collest pellets
                let max_utility = -Infinity;
                let ava_tiles = get_ava_tiles(pacman.tile, null);
                let pellet_tile;
                for (let tile of ava_tiles) {
                    let utility = 0;
                    let tile_value = 0;
                    let distance_to_pellet = 0;
                    //if current tile is not pellet find closet one
                    if (map.getTile(tile.x, tile.y) == ' ') {
                        pellet_tile = get_next_pellets(tile);
                        //TODO don't use real distance
                        //distance_to_pellet = manhattan_distance(tile,pellets_tile);
                        distance_to_pellet = (a_star_search(tile, pellet_tile, manhattan_distance, null)).length - 1;
                        //distance_to_pellet = manhattan_distance(tile,pellets_tile);
                        //distance_to_pellet = manhattan_distance(pellets_tile,tile);
                    } else {
                        distance_to_pellet = 0;
                    }
                    //linear scale pellets_reward based on distance, -1 is the ratio can be tunned
                    tile_value = -0.5 * distance_to_pellet + preference[generate_action(pacman.tile, tile)];
                    //tile_value = pellet_reward /  (1+distance_to_pellet);
                    //tile_value = distance_to_pellet == 0 ? pellet_reward : pellet_reward / (1+distance_to_pellet);
                    //going back will -1
                    //if ((pacman.dirEnum + 2) % 4 == generate_action(pacman.tile, tile)) tile_value -= 0.5;
                    //calculate level of safety  
                    let safety_values = [];
                    for (let ghost of ghosts) {
                        let distance_to_ghost = 0;
                        let value = 1;
                        let sign = 1;
                        let k = 0;
                        if (is_ghost_in_home(ghost)) continue;
                        if (ghost.scared) {
                            sign = -1;
                            k = 0.43;//safe distancce about 5
                            distance_to_ghost = (a_star_search(ghost.tile, tile, manhattan_distance, ghost)).length - 1;
                        }
                        else{
                            //k = 1.05; // safe distance about 5
                            k=2.0
                            distance_to_ghost = (a_star_search(ghost.tile, tile, manhattan_distance, ghost)).length - 1;
                        }
                        //give a safe distance about 8
                        value = sign * 100 / (1 + Math.exp(k * (distance_to_ghost-1.7)))
                        //safety_values.push(value);
                        if (sign * value > 0.48) safety_values.push(value); // behond safe distance just ignore
                    }
                    //utility =  tile_value;
                    if (safety_values.length == 0) {
                        utility = tile_value;
                        console.log("no ghost");
                    } else {
                        
                        //console.log("Ghost!")
                        utility = tile_value - (safety_values.reduce((a, b) => a + b, 0)) / safety_values.length;
                    }

                    // console.log("utilty: " + utility);
                    // safety_values.sort(function(a, b){return b-a});
                    // utility = tile_value + (safety_values[0]+safety_values[1]) / 2;

                    //find best tile 
                    if (utility > max_utility) {
                        target_tile = tile;
                        max_utility = utility;
                    }
                }
            }
            ai_frame_count += 1;
            if (ai_frame_count == 5) ai_frame_count = 0;
            var i, j; // loop index
            var maxSteps = 2;
            var skip = false;

            // skip this frame if needed,
            // but updatfe ghosts running home
            if (energizer.showingPoints()) {
                for (j = 0; j < maxSteps; j++)
                    for (i = 0; i < 4; i++)
                        if (ghosts[i].mode == GHOST_GOING_HOME || ghosts[i].mode == GHOST_ENTERING_HOME)
                            ghosts[i].update(j);
                energizer.updatePointsTimer();
                skip = true;
            } else { // make ghosts go home immediately after points disappear
                for (i = 0; i < 4; i++)
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
                for (j = 0; j < maxSteps; j++) {

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
                    for (i = 0; i < 4; i++) actors[i].update(j);
                    if (this.isPacmanCollide()) break;
                }

                // update frame counts
                for (i = 0; i < 5; i++)
                    actors[i].frames++;
            }

        },
    };

    ////////////////////////////////////////////////////
    // Script state
    // (a state that triggers functions at certain times)

    var scriptState = (function () {

        return {
            init: function () {
                this.frames = 0; // frames since state began
                this.triggerFrame = 0; // frames since last trigger

                var trigger = this.triggers[0];
                this.drawFunc = trigger ? trigger.draw : undefined; // current draw function
                this.updateFunc = trigger ? trigger.update : undefined; // current update function
            },
            update: function () {

                // if trigger is found for current time,
                // call its init() function
                // and store its draw() and update() functions
                var trigger = this.triggers[this.frames];
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

    var seekableScriptState = newChildObject(scriptState, {

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

    var deadState = (function () {

        // this state will always have these drawn
        var commonDraw = function () {
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

    var finishState = (function () {

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
    var num_iter = 0;
    var overState = (function () {

        var frames;
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
    var map;

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
    var mapLearn = new Map(28, 36, (
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
    var mapPacman = new Map(28, 36, (
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
        // var anchor = window.location.hash.substring(1);
        switchState(newGameState);
        executive.init();



    });
})();