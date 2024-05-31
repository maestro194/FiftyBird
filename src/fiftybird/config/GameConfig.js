var GC = GC || {};
var winSize = cc.director.getWinSize();
// game state
GC.GAME_STATE = {
    HOME: 0,
    PLAY: 1,
    COUNT: 2,
    OVER: 3
};

// font
GC.FONT = "fiftybird/flappy.ttf";

// score
GC.SCORE = 0;

// gravity
GC.GRAVITY = 960;
GC.SPEED_MULTIPLIER = 960;
GC.JUMP_SPEED = -480;

// scroll speed
GC.SCROLL_SPEED = 10;

// container
GC.CONTAINER = {
    BACKGROUNDS: [],
    GROUNDS: [],
    PIPES: [],
}

// keys
GC.KEYS = []

// Home
GC.TITLE_HOME = "Fifty Bird";
GC.ENTER = "Press Enter";
GC.TITLEX = winSize.width / 2;
GC.TITLEY = winSize.height * 2 / 3;
GC.WIDTH = 1024;
GC.HEIGHT = 768;
GC.SCALE = 2.55;

// Play
GC.BIRDX = 256;
GC.BIRDY = 480;
GC.SCALE_BIRD = 1.25;
GC.PIPEX = 1024;
GC.PIPEY = 0;
GC.PIPE_SPEED = 192;
GC.PIPE_WIDTH = 120;

// over
GC.TITLE_OVER = "GAME OVER";