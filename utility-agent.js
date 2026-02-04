// Utility-based Pac-Man agent extracted from pacman.js
"use strict";

export const getNextPellets = function (opts) {
    const map = opts.map;
    const manhattanDistance = opts.manhattanDistance;
    const curTile = opts.curTile;
    let minDistance = Infinity;
    let closestPellet = null;

    for (let y = 4; y < 33; y++) {
        for (let x = 1; x < 27; x++) {
            if (map.getTile(x, y) == "." || map.getTile(x, y) == "o") {
                const distanceToFood = manhattanDistance(curTile, { x: x, y: y });
                if (minDistance > distanceToFood) {
                    minDistance = distanceToFood;
                    closestPellet = { x, y };
                }
            }
        }
    }
    return closestPellet;
};

export const chooseTargetTile = function (opts) {
    const pacmanTile = opts.pacmanTile;
    const ghosts = opts.ghosts;
    const map = opts.map;
    const getAvailableTiles = opts.getAvailableTiles;
    const aStarSearch = opts.aStarSearch;
    const manhattanDistance = opts.manhattanDistance;
    const generateAction = opts.generateAction;
    const isGhostInHome = opts.isGhostInHome;
    const preference = opts.preference;
    const getNextPelletsFn = opts.getNextPellets || function (tile) {
        return getNextPellets({
            map: map,
            manhattanDistance: manhattanDistance,
            curTile: tile
        });
    };

    let maxUtility = -Infinity;
    let bestTile = null;
    const availableTiles = getAvailableTiles(pacmanTile, null);
    let pelletTile;

    for (let i = 0; i < availableTiles.length; i++) {
        const tile = availableTiles[i];
        let utility = 0;
        let tileValue = 0;
        let distanceToPellet = 0;

        if (map.getTile(tile.x, tile.y) == " ") {
            pelletTile = getNextPelletsFn(tile);
            distanceToPellet = (aStarSearch(tile, pelletTile, manhattanDistance, null)).length - 1;
        } else {
            distanceToPellet = 0;
        }

        tileValue = -0.5 * distanceToPellet + preference[generateAction(pacmanTile, tile)];

        const safetyValues = [];
        for (let g = 0; g < ghosts.length; g++) {
            const ghost = ghosts[g];
            if (isGhostInHome(ghost)) continue;

            let distanceToGhost = 0;
            let sign = 1;
            let k = 0;
            if (ghost.scared) {
                sign = -1;
                k = 0.43; // safe distance about 5
                distanceToGhost = (aStarSearch(ghost.tile, tile, manhattanDistance, ghost)).length - 1;
            } else {
                k = 2.0;
                distanceToGhost = (aStarSearch(ghost.tile, tile, manhattanDistance, ghost)).length - 1;
            }

            const value = sign * 100 / (1 + Math.exp(k * (distanceToGhost - 1.7)));
            if (sign * value > 0.48) safetyValues.push(value);
        }

        if (safetyValues.length === 0) {
            utility = tileValue;
        } else {
            utility = tileValue - (safetyValues.reduce(function (a, b) { return a + b; }, 0)) / safetyValues.length;
        }

        if (utility > maxUtility) {
            bestTile = tile;
            maxUtility = utility;
        }
    }

    return {
        targetTile: bestTile,
        maxUtility: maxUtility
    };
};

export const maybeShufflePreference = function (opts) {
    const pacmanTile = opts.pacmanTile;
    const targetTile = opts.targetTile;
    const preference = opts.preference;

    if (targetTile == null) return preference;
    if (pacmanTile.x == targetTile.x && pacmanTile.y == targetTile.y) {
        const shuffled = preference.slice();
        shuffled.sort(function () { return Math.random() - 0.5; });
        return shuffled;
    }
    return preference;
};
