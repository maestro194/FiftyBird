var GC = GC || {};
var winSize = cc.director.getWinSize();
// game state
GC.GAME_STATE = {
    HOME: 0,
    COUNT: 1,
    PLAY: 2,
    OVER: 3
};

// score
GC.SCORE = 0;

// gravity
GC.GRAVITY = 720;
GC.SPEED_MULTIPLIER = 2160;
GC.JUMP_SPEED = -800;

// container
GC.CONTAINER = {
    BACKGROUNDS: [],
    GROUNDS: [],
    PIPES: [],
}

// keys
GC.KEYS = []

// scroll speed
GC.SCROLL_SPEED = 160;
GC.BACKGROUND_SPEED = 20;
GC.GROUND_SPEED = 240;

// Home
GC.TITLE_HOME = "Fifty Bird";
GC.ENTER = "Press Enter";
GC.TITLEX = winSize.width / 2;
GC.TITLEY = winSize.height * 2 / 3;
GC.WIDTH = 1024;
GC.HEIGHT = 768;
GC.SCALE = 2.4;
GC.SCALE_DELTA = 0.01;
GC.BG_WIDTH = 1668;
GC.G_WIDTH = 1100;

// Play
GC.SCOREX = winSize.width / 2;
GC.SCOREY = winSize.height * 3 / 4;
GC.BIRDX = winSize.width / 3;
GC.BIRDY = winSize.height / 2;
GC.SCALE_BIRD = 2;
GC.PIPEX = 1024;
GC.PIPEY = 0;
GC.SCALE_PIPE = 2;
GC.PIPE_GAP = 256;
GC.PIPE_SPEED = 280;
GC.PIPE_WIDTH = 420;

// over
GC.TITLE_OVER = "GAME OVER";