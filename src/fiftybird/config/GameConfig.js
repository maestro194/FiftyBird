var GC = GC || {};
var winSize = cc.director.getWinSize();
// game state
GC.GAME_STATE = {
    HOME: 0,
    COUNT: 1,
    PLAY: 2,
    OVER: 3,
    PAUSE: 4,
};

// score
GC.SCORE = 0;
GC.ADD_SCORE = 1;

// gravity
GC.GRAVITY = 1960;
GC.JUMP_SPEED = -640;
// GC.SPEED_MULTIPLIER = 1440;
// GC.SPEED_UP = 2160;
// GC.SPEED_DOWN = 2160;

// container
GC.CONTAINER = {
    BACKGROUNDS: [],
    GROUNDS: [],
    PIPES: [],
}

// keys
GC.KEYS = []

// scroll speed
GC.SCROLL_SPEED = 240;
GC.BACKGROUND_SPEED = 20;
GC.GROUND_SPEED = 320;

// Global
GC.PAUSE_TEXT = "Press P to continue";

// Home
GC.TITLE_HOME = "Fifty Bird";
GC.ENTER = "Press Enter";
GC.TITLEX = winSize.width / 2;
GC.TITLEY = winSize.height * 3 / 4;
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
GC.PIPE_MIN_GAP = 224;
GC.PIPE_INTERVAL = 288;
GC.PIPE_MIN_INTERVAL = 224;
GC.PIPE_DELTA = 64;
GC.PIPE_WIDTH = 420;

// skill
GC.SKILL_DASH_CD = 10;
GC.SKILL_DASH_DURATION = 0.1;
GC.SKILL_DASH_SPEED = 10;
GC.SKILL_GROW_CD = 30;
GC.SKILL_GROW_DURATION = 5;
GC.SKILL_GROW_SCALE = 5;
GC.SCALE_SKILL = 0.5;

// over
GC.TITLE_OVER = "GAME OVER";
GC.SCOREBOARDX = winSize.width / 2;
GC.SCOREBOARDY = winSize.height / 2;
GC.SCOREOVERX = winSize.width / 2 * 1.31;
GC.SCOREOVERY = winSize.height / 2;
GC.MEDALX = winSize.width / 2 * 0.72;
GC.MEDALY = winSize.height / 2 * 0.95;