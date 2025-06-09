// This is the beginning of the game.js module.
// Game modes, score, lives, and high score logic will be moved here.

// game modes
export var GAME_PACMAN = 0;

export var practiceMode = false;
export var turboMode = false;

// current game mode
export var gameMode = GAME_PACMAN;


export var getGhostDrawFunc = function (mode) {
    if (mode == undefined) {
        mode = gameMode;
    }
    // This will require atlas to be imported or passed as a dependency.
    // For now, assuming atlas is globally available or will be refactored later.
    return atlas.drawGhostSprite;
};

export var getPlayerDrawFunc = function (mode) {
    if (mode == undefined) {
        mode = gameMode;
    }
    // Assuming atlas is globally available or will be refactored later.
    return atlas.drawPacmanSprite;
};


// current level, lives, and score
export var level = 1;
export var extraLives = 0;

/// SCORING
// (manages scores and high scores for each game type)

export var scores = [
    0, 0, // pacman
    0
];
export var highScores = [
    10000, 10000, // pacman
];

export var getScoreIndex = function () {
    if (practiceMode) {
        return 8;
    }
    return gameMode * 2 + (turboMode ? 1 : 0);
};

// handle a score increment
export var addScore = function (p) {

    // get current scores
    var score = getScore();

    // handle extra life at 10000 points
    if (score < 10000 && score + p >= 10000) {
        extraLives++;
        // This will require renderer to be imported or passed as a dependency.
        // For now, assuming renderer is globally available or will be refactored later.
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

export var getScore = function () {
    return scores[getScoreIndex()];
};
export var setScore = function (score) {
    scores[getScoreIndex()] = score;
};

export var getHighScore = function () {
    return highScores[getScoreIndex()];
};
export var setHighScore = function (highScore) {
    highScores[getScoreIndex()] = highScore;
    saveHighScores();
};
// High Score Persistence

export var loadHighScores = function () {
    var hs;
    var hslen;
    var i;
    if (localStorage && localStorage.highScores) {
        hs = JSON.parse(localStorage.highScores);
        hslen = hs.length;
        for (i = 0; i < hslen; i++) {
            highScores[i] = Math.max(highScores[i], hs[i]);
        }
    }
};
export var saveHighScores = function () {
    if (localStorage) {
        localStorage.highScores = JSON.stringify(highScores);
    }
};
