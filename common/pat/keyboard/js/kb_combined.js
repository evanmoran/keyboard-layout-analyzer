"use strict";
/*
    This file defines the basic elements of the KB name space
    
*/

const _ = require("lodash");

var KB = KB || {}; // define namespace

KB.PRIME_PUSH = 0;
KB.SHIFT_PUSH = 1;
KB.ALTGR_PUSH = 2;
KB.SHIFT_ALTGR_PUSH = 3;
KB.PUSH_TYPES = {};
KB.PUSH_TYPES[KB.PRIME_PUSH] = "primary"; 
KB.PUSH_TYPES[KB.SHIFT_PUSH] = "shift"; 
KB.PUSH_TYPES[KB.ALTGR_PUSH] = "altGr";
KB.PUSH_TYPES[KB.SHIFT_ALTGR_PUSH] = "shiftAltGr";

KB.finger = {};
KB.finger.color = {};

KB.finger.NONE =        -1;
KB.finger.LEFT_PINKY =   1;
KB.finger.LEFT_RING =    2;
KB.finger.LEFT_MIDDLE =  3;
KB.finger.LEFT_INDEX =   4;
KB.finger.LEFT_THUMB =   5;
KB.finger.RIGHT_THUMB =  6;
KB.finger.RIGHT_INDEX =  7;
KB.finger.RIGHT_MIDDLE = 8;
KB.finger.RIGHT_RING =   9;
KB.finger.RIGHT_PINKY =  10;
KB.finger.BOTH_THUMBS =  11;

KB.fingers = {};
KB.fingers[KB.finger.LEFT_PINKY] =   "Left Pinky";
KB.fingers[KB.finger.LEFT_RING] =    "Left Ring";
KB.fingers[KB.finger.LEFT_MIDDLE] =  "Left Middle";
KB.fingers[KB.finger.LEFT_INDEX] =   "Left Index";
KB.fingers[KB.finger.LEFT_THUMB] =   "Left Thumb";
KB.fingers[KB.finger.RIGHT_THUMB] =  "Right Thumb";
KB.fingers[KB.finger.RIGHT_INDEX] =  "Right Index";
KB.fingers[KB.finger.RIGHT_MIDDLE] = "Right Middle";
KB.fingers[KB.finger.RIGHT_RING] =   "Right Ring";
KB.fingers[KB.finger.RIGHT_PINKY] =  "Right Pinky";

KB.finger.color[KB.finger.NONE] =           {r:255, g:255, b:255, a: 0.5};
KB.finger.color[KB.finger.LEFT_PINKY] =     {r:  0, g:255, b:255, a: 0.5};//"rgba(  0, 255, 255, 0.5)";//"#00FFFF";
KB.finger.color[KB.finger.LEFT_RING] =      {r:  0, g:  0, b:230, a: 0.5};//"rgba(  0,   0, 255, 0.5)";//"#0000FF";
KB.finger.color[KB.finger.LEFT_MIDDLE] =    {r:136, g:136, b:255, a: 0.5};//"rgba(136, 136, 255, 0.5)";//"#8888FF";78, 56, 126
KB.finger.color[KB.finger.LEFT_INDEX] =     {r:255, g:  0, b:255, a: 0.5};//"rgba(255,   0, 255, 0.5)";//"#FF00FF";
KB.finger.color[KB.finger.LEFT_THUMB] =     {r:255, g:255, b:255, a: 0.5};//"rgba(255, 255, 255, 0.5)";//"#ffffff";
KB.finger.color[KB.finger.RIGHT_THUMB] =    {r:204, g:204, b:204, a: 0.5};//"rgba(204, 204, 204, 0.5)";//"#cccccc";
KB.finger.color[KB.finger.RIGHT_INDEX] =    {r:255, g:  0, b:  0, a: 0.5};//"rgba(255,   0,   0, 0.5)";//"#FF0000";
KB.finger.color[KB.finger.RIGHT_MIDDLE] =   {r:255, g:136, b:  0, a: 0.5};//"rgba(255, 136,   0, 0.5)";//"#FF8800";
KB.finger.color[KB.finger.RIGHT_RING] =     {r:255, g:255, b:  0, a: 0.5};//"rgba(255, 255,   0, 0.5)";//"#FFFF00";
KB.finger.color[KB.finger.RIGHT_PINKY] =    {r:  0, g:255, b:  0, a: 0.5};//"rgba(  0, 255,   0, 0.5)";//"#00FF00";
KB.finger.color[KB.finger.BOTH_THUMBS] =    {r:255, g:255, b:255, a: 0.5};//"rgba(255, 255, 255, 0.5)";//"#ffffff";

KB.finger.colorHoverOpacity = {};
KB.finger.colorHoverOpacity[KB.finger.NONE] =           1;
KB.finger.colorHoverOpacity[KB.finger.LEFT_PINKY] =     1;
KB.finger.colorHoverOpacity[KB.finger.LEFT_RING] =      0.15;
KB.finger.colorHoverOpacity[KB.finger.LEFT_MIDDLE] =    0.5;
KB.finger.colorHoverOpacity[KB.finger.LEFT_INDEX] =     0.35;
KB.finger.colorHoverOpacity[KB.finger.LEFT_THUMB] =     1;
KB.finger.colorHoverOpacity[KB.finger.RIGHT_THUMB] =    1;
KB.finger.colorHoverOpacity[KB.finger.RIGHT_INDEX] =    0.25;
KB.finger.colorHoverOpacity[KB.finger.RIGHT_MIDDLE] =   0.5;
KB.finger.colorHoverOpacity[KB.finger.RIGHT_RING] =     0.5;
KB.finger.colorHoverOpacity[KB.finger.RIGHT_PINKY] =    0.5;
KB.finger.colorHoverOpacity[KB.finger.BOTH_THUMBS] =    1;

KB.finger.getColor = function(finger, opacity) {
    var r = KB.finger.color[finger].r,
        g = KB.finger.color[finger].g,
        b = KB.finger.color[finger].b;
    return "rgba("+r+","+g+", "+b+", "+opacity+")";
};

KB.finger.getColorHoverOpacity = function(finger) {
    return KB.finger.colorHoverOpacity[finger];
};
KB.finger.getColorNormalOpacity = function(finger) {
    return KB.finger.color[finger].a;
};

KB.finger.isThumb = function(finger) {
    switch(finger) {
        case KB.finger.RIGHT_THUMB:
        case KB.finger.LEFT_THUMB:
            return true;
    }
    return false;
};

KB.finger.whichHand = function(finger) {
    switch(finger) {
        case KB.finger.LEFT_PINKY:
        case KB.finger.LEFT_RING:
        case KB.finger.LEFT_MIDDLE:
        case KB.finger.LEFT_INDEX:
        case KB.finger.LEFT_THUMB:
            return "left";
        case KB.finger.RIGHT_PINKY:
        case KB.finger.RIGHT_RING:
        case KB.finger.RIGHT_MIDDLE:
        case KB.finger.RIGHT_INDEX:
        case KB.finger.RIGHT_THUMB:
            return "right";            
        case KB.finger.NONE:
            return "none";
        case KB.finger.BOTH_THUMBS:
            return "both";
    }
    return "none";
};

KB.finger.leftRightOrThumb = function(finger) {
    switch(finger) {
        case KB.finger.LEFT_PINKY:
        case KB.finger.LEFT_RING:
        case KB.finger.LEFT_MIDDLE:
        case KB.finger.LEFT_INDEX:
            return "left";
        case KB.finger.RIGHT_PINKY:
        case KB.finger.RIGHT_RING:
        case KB.finger.RIGHT_MIDDLE:
        case KB.finger.RIGHT_INDEX:
            return "right";
        case KB.finger.LEFT_THUMB:
        case KB.finger.RIGHT_THUMB:
        return "thumbs";
        case KB.finger.NONE:
            return "none";
        case KB.finger.BOTH_THUMBS:
            return "both";
    }
    return "none";
};

KB.glyphLayouts = {};
KB.glyphLayouts.standard = {};
KB.glyphLayouts.standard.getCoords = function(id, type, keyCode, fontSize, coords) {
    return KB.glyphLayouts.standard[type](keyCode, fontSize, coords);
};
 
KB.glyphLayouts.standard[KB.PRIME_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
        
    return {
        x: coords[3].x + padding,
        y:coords[3].y - padding/2,
        textAlign: "left",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.standard[KB.SHIFT_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[0].x + padding,
        y:coords[0].y + padding/2,
        textAlign: "left",
        textBaseline: "top"
    };
};
KB.glyphLayouts.standard[KB.ALTGR_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[2].x - padding,
        y:coords[2].y - padding/2,
        textAlign: "right",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.standard[KB.SHIFT_ALTGR_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[1].x - padding,
        y:coords[1].y + padding/2,
        textAlign: "right",
        textBaseline: "top"
    };
};

KB.glyphLayouts.european = {};
KB.glyphLayouts.european.getCoords = function(id, type, keyCode, fontSize, coords) {
    return KB.glyphLayouts.european[type](keyCode, fontSize, coords);
};
 
KB.glyphLayouts.european[KB.PRIME_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
        
    return {
        x: coords[3].x + padding,
        y:coords[3].y - padding/2,
        textAlign: "left",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.european[KB.SHIFT_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[0].x + padding,
        y:coords[0].y + padding/2,
        textAlign: "left",
        textBaseline: "top"
    };
};
KB.glyphLayouts.european[KB.ALTGR_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[2].x - padding,
        y:coords[2].y - padding/2,
        textAlign: "right",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.european[KB.SHIFT_ALTGR_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[1].x - padding,
        y:coords[1].y + padding/2,
        textAlign: "right",
        textBaseline: "top"
    };
};


KB.glyphLayouts.matrix = {};
KB.glyphLayouts.matrix.getCoords = function(id, type, keyCode, fontSize, coords) {
    return KB.glyphLayouts.matrix[type](keyCode, fontSize, coords);
};

KB.glyphLayouts.matrix[KB.PRIME_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;

    return {
        x: coords[3].x + padding,
        y:coords[3].y - padding/2,
        textAlign: "left",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.matrix[KB.SHIFT_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[0].x + padding,
        y:coords[0].y + padding/2,
        textAlign: "left",
        textBaseline: "top"
    };
};
KB.glyphLayouts.matrix[KB.ALTGR_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[2].x - padding,
        y:coords[2].y - padding/2,
        textAlign: "right",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.matrix[KB.SHIFT_ALTGR_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[1].x - padding,
        y:coords[1].y + padding/2,
        textAlign: "right",
        textBaseline: "top"
    };
};

KB.glyphLayouts.ergodox = {};
KB.glyphLayouts.ergodox.getCoords = function(id, type, keyCode, fontSize, coords) {
    return KB.glyphLayouts.ergodox[type](keyCode, fontSize, coords);
};
 
KB.glyphLayouts.ergodox[KB.PRIME_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
        
    return {
        x: coords[3].x + padding,
        y:coords[3].y - padding/2,
        textAlign: "left",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.ergodox[KB.SHIFT_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[0].x + padding,
        y:coords[0].y + padding/2,
        textAlign: "left",
        textBaseline: "top"
    };
};
KB.glyphLayouts.ergodox[KB.ALTGR_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[2].x - padding,
        y:coords[2].y - padding/2,
        textAlign: "right",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.ergodox[KB.SHIFT_ALTGR_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[1].x - padding,
        y:coords[1].y + padding/2,
        textAlign: "right",
        textBaseline: "top"
    };
};


KB.keyMap = {};

var setMountPoints = function( key ) {
	var mountPoint = {};
	mountPoint["top"] = {};
	mountPoint["right"] = {};
	mountPoint["bottom"] = {};
	mountPoint["left"] = {};
	mountPoint["top"].x = key.x + (key.w/2);
	mountPoint["top"].y = key.y;
	mountPoint["right"].x = key.x + key.w;
	mountPoint["right"].y = key.y + (key.h/2);
	mountPoint["bottom"].x = key.x + (key.w/2);
	mountPoint["bottom"].y = key.y + key.h;
	mountPoint["left"].x = key.x;
	mountPoint["left"].y = key.y + (key.h/2);
	return mountPoint;
};


// standard keymap (ansi)
KB.keyMap.standard = {};

// 50 pixels = 1.9cm
// 26.315789 pixels = 1cm
KB.keyMap.standard.s683_225 = {};
KB.keyMap.standard.s683_225.width = 754;//756
KB.keyMap.standard.s683_225.height = 252;//254
KB.keyMap.standard.s683_225.pixelsPerCm = 26.315789;
KB.keyMap.standard.s683_225.split = false;
(function() {
    var ii,
        km = KB.keyMap.standard.s683_225,
        normKeySize = 50,
        row,
        keyCount = [14,14,13,12,8],
        index = 0,
        curX = 0.5,//2.5
        curY = 0.5,//2.5
        keyWidths = {};
        
    km.leftX = curX;
    km.leftY = curY;
        
    // special key sizes
    keyWidths["0,13"] = 100; // backspace
    keyWidths["1,0"] = 75; // tab
    keyWidths["1,13"] = 75; // backslash
    keyWidths["2,0"] = 87.5; // caps
    keyWidths["2,12"] = 112.5; // return
    keyWidths["3,0"] = 112.5; // l.shift
    keyWidths["3,11"] = 137.5; //r.shift
    keyWidths["4,0"] = 75;
    keyWidths["4,2"] = 75;
    keyWidths["4,3"] = 300; // space
    keyWidths["4,4"] = 75;
    keyWidths["4,7"] = 75;
        
    for (row = 0; row < 5; row++) {
        for (ii = 0; ii < keyCount[row]; ii++) {
            km[index] = {};
            km[index].x = curX;
            km[index].y = curY;
            km[index].w = keyWidths[row+","+ii] || normKeySize;
            km[index].h = normKeySize;
            km[index].cx = km[index].x + (km[index].w/2);
            km[index].cy = km[index].y + (km[index].h/2);
            km[index].row = row;
            
            // set the mount points - these are points where dialogs will attach to keys
            // all our keys are squares, so this is simple
            km[index].mountPoint = setMountPoints( km[index] );
            
            curX += km[index].w;
            index++;
        }
        curX = 0.5;//2.5
        curY += normKeySize;
    }
})();

// European keymap (ISO)
KB.keyMap.european = {};

// 50 pixels = 1.9cm
// 26.315789 pixels = 1cm
KB.keyMap.european.s683_225 = {};
KB.keyMap.european.s683_225.width = 754;//756
KB.keyMap.european.s683_225.height = 252;//254
KB.keyMap.european.s683_225.pixelsPerCm = 26.315789;
KB.keyMap.european.s683_225.split = false;
(function() {
    var ii,
        km = KB.keyMap.european.s683_225,
        normKeySize = 50,
        row,
        keyCount = [14,14,13,13,8],
        index = 0,
        curX = 0.5,//2.5
        curY = 0.5,//2.5
        keyWidths = {};
        
    km.leftX = curX;
    km.leftY = curY;
        
    // special key sizes
    keyWidths["0,13"] = 100; // backspace
    keyWidths["1,0"] = 75; // tab
    keyWidths["1,13"] = 75; // backslash
    keyWidths["2,0"] = 87.5; // caps
    keyWidths["3,0"] = 62.5; // l.shift
    keyWidths["3,12"] = 137.5; //r.shift
    keyWidths["4,0"] = 75;
    keyWidths["4,2"] = 75;
    keyWidths["4,3"] = 300; // space
    keyWidths["4,4"] = 75;
    keyWidths["4,7"] = 75;
        
    for (row = 0; row < 5; row++) {
        for (ii = 0; ii < keyCount[row]; ii++) {
            km[index] = {};
            km[index].x = curX;
            km[index].y = curY;
            km[index].w = keyWidths[row+","+ii] || normKeySize;
            km[index].h = normKeySize;
            km[index].cx = km[index].x + (km[index].w/2);
            km[index].cy = km[index].y + (km[index].h/2);
            km[index].row = row;
            
            if (row === 1 && ii === 13) {
                var enterBottomWidth = 62.5;//keyWidths["3,0"]+12*normKeySize;
            
                km[index].coords = [
                    {
                        x:km[index].x,
                        y:km[index].y
                    }, {
                        x:km[index].x+km[index].w,
                        y:km[index].y
                    }, {
                        x:km[index].x+km[index].w, 
                        y:km[index].y+(km[index].h*2)
                    }, {
                        x:km[index].x+(km[index].w-enterBottomWidth),
                        y:km[index].y+(km[index].h*2)
                    }, {
                        x:km[index].x+(km[index].w-enterBottomWidth),
                        y:km[index].y+km[index].h
                    }, {
                        x:km[index].x,
                        y:km[index].y+km[index].h
                    }
                ];
                
                km[index].cx = ( km[index].coords[1].x + km[index].coords[3].x ) / 2;
                km[index].cy = ( km[index].coords[1].y + km[index].coords[3].y ) / 2;
            }
            
            // set the mount points - these are points where dialogs will attach to keys
            // all our keys are squares, so this is simple
            km[index].mountPoint = setMountPoints( km[index] );
            
            if (row === 1 && ii === 13) {
                km[index].mountPoint["bottom"].x = km[index].x + (km[index].w/2);
                km[index].mountPoint["bottom"].y = km[index].y + km[index].h*2;
            }
            
            curX += km[index].w;
            index++;
        }
        curX = 0.5;//2.5
        curY += normKeySize;
    }
})();

// European keymap with split spacebar
KB.keyMap.european_ss = {};

// 50 pixels = 1.9cm
// 26.315789 pixels = 1cm
KB.keyMap.european_ss.s683_225 = {};
KB.keyMap.european_ss.s683_225.width = 754;//756
KB.keyMap.european_ss.s683_225.height = 252;//254
KB.keyMap.european_ss.s683_225.pixelsPerCm = 26.315789;
KB.keyMap.european_ss.s683_225.split = false;
(function() {
    var ii,
        km = KB.keyMap.european_ss.s683_225,
        normKeySize = 50,
        row,
        keyCount = [14,14,13,13,9],
        index = 0,
        curX = 0.5,//2.5
        curY = 0.5,//2.5
        keyWidths = {};
        
    km.leftX = curX;
    km.leftY = curY;
        
    // special key sizes
    keyWidths["0,13"] = 100; // backspace
    keyWidths["1,0"] = 75; // tab
    keyWidths["1,13"] = 75; // backslash
    keyWidths["2,0"] = 87.5; // caps
    keyWidths["3,0"] = 62.5; // l.shift
    keyWidths["3,12"] = 137.5; //r.shift
    keyWidths["4,0"] = 75;
    keyWidths["4,2"] = 75;
    keyWidths["4,3"] = 150; // l.space
    keyWidths["4,4"] = 150; // r.space
    keyWidths["4,5"] = 75;
    keyWidths["4,8"] = 75;
        
    for (row = 0; row < 5; row++) {
        for (ii = 0; ii < keyCount[row]; ii++) {
            km[index] = {};
            km[index].x = curX;
            km[index].y = curY;
            km[index].w = keyWidths[row+","+ii] || normKeySize;
            km[index].h = normKeySize;
            km[index].cx = km[index].x + (km[index].w/2);
            km[index].cy = km[index].y + (km[index].h/2);
            km[index].row = row;
            
            if (row === 1 && ii === 13) {
                var enterBottomWidth = 62.5;//keyWidths["3,0"]+12*normKeySize;
            
                km[index].coords = [
                    {
                        x:km[index].x,
                        y:km[index].y
                    }, {
                        x:km[index].x+km[index].w,
                        y:km[index].y
                    }, {
                        x:km[index].x+km[index].w, 
                        y:km[index].y+(km[index].h*2)
                    }, {
                        x:km[index].x+(km[index].w-enterBottomWidth),
                        y:km[index].y+(km[index].h*2)
                    }, {
                        x:km[index].x+(km[index].w-enterBottomWidth),
                        y:km[index].y+km[index].h
                    }, {
                        x:km[index].x,
                        y:km[index].y+km[index].h
                    }
                ];
                
                km[index].cx = ( km[index].coords[1].x + km[index].coords[3].x ) / 2;
                km[index].cy = ( km[index].coords[1].y + km[index].coords[3].y ) / 2;
            }
            
            // set the mount points - these are points where dialogs will attach to keys
            // all our keys are squares, so this is simple
            km[index].mountPoint = setMountPoints( km[index] );
            
            if (row === 1 && ii === 13) {
                km[index].mountPoint["bottom"].x = km[index].x + (km[index].w/2);
                km[index].mountPoint["bottom"].y = km[index].y + km[index].h*2;
            }
            
            curX += km[index].w;
            index++;
        }
        curX = 0.5;//2.5
        curY += normKeySize;
    }
})();



// Key Map for Ergodox
KB.keyMap.ergodox = {};

// 50 pixels = 1.9cm
// 26.315789 pixels = 1cm
KB.keyMap.ergodox.s683_225 = {};
KB.keyMap.ergodox.s683_225.width = 935;
KB.keyMap.ergodox.s683_225.height = 360;
KB.keyMap.ergodox.s683_225.pixelsPerCm = 25.7894732;//26.315789;
KB.keyMap.ergodox.s683_225.split = true;
(function() {
    var ii,
        km = KB.keyMap.ergodox.s683_225,
        normKeySize = 50,
        row,
        keyCount = [14,14,13,12,8],
        index = 0,
        curX = 0.5,//2.5
        curY = 0.5,//2.5
        keyWidths = {};
        
    km.leftX = curX;
    km.leftY = curY;

    var sw = 46;
    var sh = 46;
    var sSpacing = 2;

    function keySpacing(key) {
        var keyOffset = {};
        keyOffset[7] = 214;
        keyOffset[21] = 214;
        keyOffset[34] = 214 + sw*2 + sSpacing*2;
        keyOffset[47] = 214;
        keyOffset[59] = 214 + sw*4 + sSpacing*4;

        // keys that begin a row
        keyOffset[0] = 0;
        keyOffset[14] = 0;
        keyOffset[28] = 0;
        keyOffset[40] = 0;
        keyOffset[54] = 23;

        var ret = (typeof keyOffset[key] !== 'undefined') ? keyOffset[key] : sSpacing;

        return ret;
    }

    var idx = 0;
    var yOffset = [
        [0, 0, -8, -12, -8, -5,      -5,        -5, -5,  -8, -12,  -8, 0, 0],
        [0, 0, -8, -12, -8, -5,      -5,        -5, -5,  -8, -12,  -8, 0, 0],
        [0, 0, -8, -12, -8, -5,                 -5,      -8, -12,  -8, 0, 0],
        [0, 0, -8, -12, -8, -5, -5 - 23,   -5 - 23, -5,  -8, -12,  -8, 0, 0],
        [0, 0, -8, -12, -8,                              -8, -12,  -8, 0, 0]
    ];

    var rowY = [
        13, 
        13 + sh + sSpacing,
        13 + sh + sSpacing + sh + sSpacing,
        13 + sh + sSpacing + sh + sSpacing + sh + sSpacing,
        13 + sh + sSpacing + sh + sSpacing + sh + sSpacing + sh + sSpacing 
    ];

    var keyWidth = {};
    keyWidth[0] = 69;
    keyWidth[13] = 69;
    keyWidth[14] = 69;
    keyWidth[27] = 69;
    keyWidth[28] = 69;
    keyWidth[39] = 69;
    keyWidth[40] = 69;
    keyWidth[53] = 69;
    var keyHeight = {}
    keyHeight[20] = sh + 23 + sSpacing;
    keyHeight[21] = sh + 23 + sSpacing;
    keyHeight[46] = sh + 23 + sSpacing;
    keyHeight[47] = sh + 23 + sSpacing;
    keyHeight[66] = sh*2+sSpacing;
    keyHeight[67] = sh*2+sSpacing;
    keyHeight[74] = sh*2+sSpacing;
    keyHeight[75] = sh*2+sSpacing;

    var rotation = {};

    var xOffset = 0;
    var yPos = 0;
    var row, col;
    var idx = 0;

    for (row = 0; row < yOffset.length; row++) {
        for (col = 0; col < yOffset[row].length; col++) {
            if (col === 0) {
                xOffset = 0;
            } else {
                xOffset = xOffset + (keyWidth[idx-1] || sw);
            } 
            xOffset += keySpacing(idx);

            km[idx] = {};
            km[idx].x = xOffset + 0.5;
            km[idx].y = rowY[row] + yOffset[row][col] + 0.5;
            km[idx].w = keyWidth[idx] || sw;
            km[idx].h = keyHeight[idx] || sh;
            km[idx].row = row;

            idx++;
        }
    }

    var rotatePoint = function(angle, aroundPoint, rotatingPoint) {
        var s = Math.sin(angle);
        var c = Math.cos(angle);

        rotatingPoint.x -= aroundPoint.x;
        rotatingPoint.y -= aroundPoint.y;

        var newX = rotatingPoint.x * c - rotatingPoint.y * s;
        var newY = rotatingPoint.x * s + rotatingPoint.y * c;

        rotatingPoint.x = newX + aroundPoint.x;
        rotatingPoint.y = newY + aroundPoint.y;
    }

    var tCoords = [
        {x: 378, y: 179, r: 0.45},
        {x: 422, y: 200, r: 0.45},
        {x: 313, y: 203, r: 0.45},
        {x: 357, y: 224, r: 0.45},
        {x: 401, y: 245, r: 0.45},
        {x: 380, y: 289, r: 0.45},

        {x: 466, y: 220, r: -0.45},
        {x: 510, y: 199, r: -0.45},
        {x: 487, y: 265, r: -0.45},
        {x: 508, y: 309, r: -0.45},
        {x: 531, y: 244, r: -0.45},
        {x: 575, y: 223, r: -0.45}
    ];
    for (ii = 0; ii < tCoords.length; ii++) {
        km[idx] = {};
        km[idx].x = tCoords[ii].x;
        km[idx].y = tCoords[ii].y;
        km[idx].w = keyWidth[idx] || sw;
        km[idx].h = keyHeight[idx] || sh;
        km[idx].row = 4;
        km[idx].coords = [
            {   x: km[idx].x,                 y: km[idx].y },
            {   x: km[idx].x + km[idx].w,     y: km[idx].y },
            {   x: km[idx].x + km[idx].w,     y: km[idx].y + km[idx].h},
            {   x: km[idx].x,                 y: km[idx].y + km[idx].h}
        ];
        rotation[idx] = tCoords[ii].r;
        rotatePoint(rotation[idx], km[idx].coords[0], km[idx].coords[1]);
        rotatePoint(rotation[idx], km[idx].coords[0], km[idx].coords[2]);
        rotatePoint(rotation[idx], km[idx].coords[0], km[idx].coords[3]);

        km[idx].mountPoint = {};
        km[idx].mountPoint["top"] = {};
        km[idx].mountPoint["right"] = {};
        km[idx].mountPoint["bottom"] = {};
        km[idx].mountPoint["left"] = {};
        
        var xSum = 0, ySum = 0;
        for (var cc = 0; cc < km[idx].coords.length; cc++) {
            xSum += km[idx].coords[cc].x;
            ySum += km[idx].coords[cc].y;
        }

        km[idx].mountPoint["top"].x = xSum / km[idx].coords.length;
        km[idx].mountPoint["top"].y = ySum / km[idx].coords.length;
        km[idx].mountPoint["right"].x = xSum / km[idx].coords.length;
        km[idx].mountPoint["right"].y = ySum / km[idx].coords.length;
        km[idx].mountPoint["bottom"].x = xSum / km[idx].coords.length;
        km[idx].mountPoint["bottom"].y = ySum / km[idx].coords.length;
        km[idx].mountPoint["left"].x = xSum / km[idx].coords.length;
        km[idx].mountPoint["left"].y = ySum / km[idx].coords.length;

        idx++;
    }

    km.rotation = function(idx) {
        if (rotation[idx]) {
            return rotation[idx];
        }
        return 0;
    };

    for (index = 0; index < idx; index++) {

        if (km[index].coords) {
            var xSum = 0, ySum = 0;
            for (var cc = 0; cc < km[index].coords.length; cc++) {
                xSum += km[index].coords[cc].x;
                ySum += km[index].coords[cc].y;
            }
            km[index].cx = xSum / km[index].coords.length;
            km[index].cy = ySum / km[index].coords.length;
        } else {
            km[index].cx = km[index].x + (km[index].w/2);
            km[index].cy = km[index].y + (km[index].h/2);
        }
        
        // set the mount points - these are points where dialogs will attach to keys
        // all our keys are squares, so this is simple
        if (typeof km[index].mountPoint === 'undefined') {
            km[index].mountPoint = {};
            km[index].mountPoint["top"] = {};
            km[index].mountPoint["right"] = {};
            km[index].mountPoint["bottom"] = {};
            km[index].mountPoint["left"] = {};
            
            km[index].mountPoint["top"].x = km[index].x + (km[index].w/2);
            km[index].mountPoint["top"].y = km[index].y;
            km[index].mountPoint["right"].x = km[index].x + km[index].w;
            km[index].mountPoint["right"].y = km[index].y + (km[index].h/2);
            km[index].mountPoint["bottom"].x = km[index].x + (km[index].w/2);
            km[index].mountPoint["bottom"].y = km[index].y + km[index].h;
            km[index].mountPoint["left"].x = km[index].x;
            km[index].mountPoint["left"].y = km[index].y + (km[index].h/2);
        }
    }
})();

KB.keyMap.matrix = {};
// 50 pixels = 1.9cm
// 26.315789 pixels = 1cm
KB.keyMap.matrix.s683_225 = {};
KB.keyMap.matrix.s683_225.width = 12*50;
KB.keyMap.matrix.s683_225.height = 254;
KB.keyMap.matrix.s683_225.pixelsPerCm = 26.315789;
KB.keyMap.matrix.s683_225.split = false;
(function() {
    var ii,
        km = KB.keyMap.matrix.s683_225,
        normKeySize = 50,
        row,
        keyCount = [12,12,12,12,12],
        index = 0,
        curX = 0.5,//2.5
        curY = 0.0,//2.5
        maxW = KB.keyMap.matrix.s683_225.width;

    km.leftX = curX;
    km.leftY = 0;

    for (row = 0; row < 5; row++) {
        curX = km.leftX;
        var rowmax = keyCount[row];
        for (ii = 0; ii < rowmax; ii++) {
            km[index] = {};
            km[index].x = curX;
            km[index].y = curY;
            km[index].w = normKeySize;
            km[index].h = normKeySize;
            km[index].cx = km[index].x + (km[index].w/2);
            km[index].cy = km[index].y + (km[index].h/2);
            km[index].row = row;

            // set the mount points - these are points where dialogs will attach to keys
            // all our keys are squares, so this is simple
            km[index].mountPoint = setMountPoints( km[index] );

            curX += km[index].w;
            index++;
        }

        curY += normKeySize;
    }
})();

KB.keyMap.matrix_split = {};
// 50 pixels = 1.9cm
// 26.315789 pixels = 1cm
KB.keyMap.matrix_split.s683_225 = {};
KB.keyMap.matrix_split.s683_225.width = 12*50 + 150;
KB.keyMap.matrix_split.s683_225.height = 254;
KB.keyMap.matrix_split.s683_225.pixelsPerCm = 26.315789;
KB.keyMap.matrix_split.s683_225.split = true;
(function() {
    var ii,
        km = KB.keyMap.matrix_split.s683_225,
        normKeySize = 50,
        row,
        keyCount = [12,12,12,12,12],
        index = 0,
        curX = 0.5,//2.5
        curY = 0.0,//2.5
        maxW = KB.keyMap.matrix_split.s683_225.width;

    km.leftX = curX;
    km.leftY = 0;

    for (row = 0; row < 5; row++) {
        curX = km.leftX;
        var rowmax = keyCount[row];
        var halfrow = rowmax / 2;
        for (ii = 0; ii < halfrow; ii++) {
            km[index] = {};
            km[index].x = curX;
            km[index].y = curY;
            km[index].w = normKeySize;
            km[index].h = normKeySize;
            km[index].cx = km[index].x + (km[index].w/2);
            km[index].cy = km[index].y + (km[index].h/2);
            km[index].row = row;

            // set the mount points - these are points where dialogs will attach to keys
            // all our keys are squares, so this is simple
            km[index].mountPoint = setMountPoints( km[index] );

            curX += km[index].w;
            index++;
        }

        curX = maxW - ( halfrow * normKeySize ) - 6;
        for (ii = halfrow; ii < rowmax; ii++) {
            km[index] = {};
            km[index].x = curX;
            km[index].y = curY;
            km[index].w = normKeySize;
            km[index].h = normKeySize;
            km[index].cx = km[index].x + (km[index].w/2);
            km[index].cy = km[index].y + (km[index].h/2);
            km[index].row = row;

            // set the mount points - these are points where dialogs will attach to keys
            // all our keys are squares, so this is simple
            km[index].mountPoint = setMountPoints( km[index] );

            curX += km[index].w;
            index++;
        }
        curY += normKeySize;
    }
})();




/// ------------------------------------------
// key.js
/// ------------------------------------------


var doneNow=0;

KB.Key = (function() {

    // -------------------------------------------------------------------------
    // private static
    // -------------------------------------------------------------------------

	// -------------------------------------------------------------------------
	// object definition
	// -------------------------------------------------------------------------
	
	return function(config) {
        
        // ---------------------------------------------------------------------
        // private
        // ---------------------------------------------------------------------
        
        var me = this,
            myKeyboard = null,
            myCoords = [{x:0,y:0}],
            keyModel = {},
            myId = null,
            shouldDrawDot = true,
            myBgColor = {r: null, g: null, b: null, a: 0.5},
            myGlyphLayout = KB.glyphLayouts.standard,//default
            highlightBorderOpt = false;
        
        function drawFingerDot(myCtx) {
            if (!shouldDrawDot) {return;}
            var ii,
                len = myCoords.length,
                xCen=0, yCen=0,fingerStart,
                prevOpacity = me.getBackgroundColorOpacity();
            me.setBackgroundColorOpacity(0.5);
            // draw finger start dot (if needed)
            if ( fingerStart = me.getKeyboard().getFingerStartForKey(myId) ) {
                myCtx.save();
                myCtx.fillStyle = me.getBackgroundColorString();
                myCtx.strokeStyle = "rgba(0, 0, 0, 0.5)";
                myCtx.lineWidth = 2;

                xCen = me.getKeyboard().getKeyMap()[myId].cx;
                yCen = me.getKeyboard().getKeyMap()[myId].cy;
                myCtx.beginPath();
                myCtx.arc(xCen, yCen, 4, 0, Math.PI*2, true); 
                myCtx.closePath();
                myCtx.stroke();
                myCtx.fill();
                myCtx.restore();
            }
            me.setBackgroundColorOpacity(prevOpacity);
        }
        
        function drawBackground(myCtx) {
            var ii,
                len = myCoords.length;
            
            myCtx.save();
            
            myCtx.fillStyle = me.getBackgroundColorString();//KB.finger.getColor(keyModel.finger, opacity);
            myCtx.beginPath();
            myCtx.moveTo(myCoords[0].x, myCoords[0].y);
            for (ii = 1; ii < len; ii++) {
                myCtx.lineTo(myCoords[ii].x, myCoords[ii].y);
            }
            myCtx.closePath();
            myCtx.fill();
            myCtx.restore();
        }
        
        function drawBorder(myCtx, offsetX, offsetY, borderOverride) {
			
			var ii,
                len = myCoords.length;
            
            offsetX = offsetX || 0;
            offsetY = offsetY || 0;
            
            myCtx.save();
			myCtx.strokeStyle = "#000";
			myCtx.lineWidth = borderOverride || 1.25;
			myCtx.beginPath();

            myCtx.moveTo( myCoords[0].x+offsetX, myCoords[0].y+offsetY);
			
			for (ii = 0; ii < len; ii++) {
                myCtx.lineTo(myCoords[ii].x+offsetX,myCoords[ii].y+offsetY);
			}
            myCtx.closePath();
            myCtx.stroke();
            myCtx.restore();
        }
        
        function drawGlyphs(myCtx, offsetX, offsetY) {
            var pType,
                coords,
                fontSize = 14;
                
            if (!myCtx.fillText) {return;}
            offsetX = offsetX || 0;
            offsetY = offsetY || 0;
                
            myCtx.save();
            myCtx.font = fontSize + "px sans-serif"
            myCtx.fillStyle = "rgba(0, 0, 0, 1)"; 
                
            var pName;
            for (pType in KB.PUSH_TYPES) {
                pName = KB.PUSH_TYPES[pType];
                if ( keyModel.hasOwnProperty(pName) ) {
                    myCtx.save();
                    if (pName === "primary" && (typeof keyModel["shift"] === "undefined" || keyModel["shift"] === KB.Key.NONE)) {
                        coords = myGlyphLayout.getCoords(me.getId(), 1, keyModel[pName], fontSize, myCoords);
                    } else {
                        coords = myGlyphLayout.getCoords(me.getId(), pType, keyModel[pName], fontSize, myCoords);
                    }
					myCtx.textAlign = coords.textAlign;
					myCtx.textBaseline = coords.textBaseline;
					
                    // draw label
                    var keySetLabels = me.getKeyboard().getKeySet().labels || {};
                    
                    myCtx.translate(coords.x+offsetX, coords.y+offsetY);

                    var rotation = me.getKeyboard().getKeyMap().rotation;
                    if ( rotation ) {                        
                        myCtx.rotate(rotation(me.getId()));
                    }

                    if ( keySetLabels[ keyModel[pName] ]) {
                        myCtx.fillText(keySetLabels[ keyModel[pName] ], 0, 0);
                    } else if ( KB.Key.labels[ keyModel[pName] ] ) {
					    myCtx.fillText(KB.Key.labels[ keyModel[pName] ], 0, 0);
					} else if ( keyModel[pName] > 0 ) {
					    myCtx.fillText(String.fromCharCode( keyModel[pName] ), 0, 0);
					}
                    myCtx.restore();
                }
            }
            myCtx.restore();
        }
        
        // ---------------------------------------------------------------------
        // public
        // ---------------------------------------------------------------------        
        
        me.isHighlighted = false;

        me.highlightBorder = function(val) {
            highlightBorderOpt = val;
        }

        me.drawDragOverlay = function(offsetX, offsetY) {
            var ii,
                myOverlay = myKeyboard.getDragLayer(),
                myOverlayCtx = myOverlay.getContext("2d");
            myOverlayCtx.clearRect ( 0 , 0 , myOverlay.getAttribute("width") , myOverlay.getAttribute("height") );
            drawBorder(myOverlayCtx, offsetX, offsetY);
            drawGlyphs(myOverlayCtx, offsetX, offsetY);
        };
        
        me.highlight = function() {
            var myOverlayCtx = myKeyboard.getHighlightLayer().getContext("2d"),
                opacity = KB.finger.getColorHoverOpacity(keyModel.finger);
            
            opacity = (typeof opacity !== "undefined") ? opacity : 0.5;
            me.setBackgroundColorOpacity(opacity);

            // draw background
            drawBackground(myOverlayCtx);
            drawFingerDot(myOverlayCtx);
            if (highlightBorderOpt) {
                drawBorder(myOverlayCtx, 0, 0, 1.75);
            } else {
                drawBorder(myOverlayCtx);
            }
            drawGlyphs(myOverlayCtx);
            
            me.isHighlighted = true;
        }
        
        me.unhighlight = function() {
            var myOverlay = myKeyboard.getHighlightLayer(),
                myOverlayCtx = myOverlay.getContext("2d");
            myOverlayCtx.clearRect ( 0 , 0 , myOverlay.getAttribute("width") , myOverlay.getAttribute("height") );
            me.isHighlighted = false;
            me.setBackgroundColorOpacity( KB.finger.getColorNormalOpacity(keyModel.finger) );
        };
        
        me.draw = function() {
            var myCtx = myKeyboard.getBgLayer().getContext("2d");
            drawBackground(myCtx);
            drawFingerDot(myCtx);
            drawBorder(myCtx);
            drawGlyphs(myCtx);
        };

        me.shouldDrawFingerDot = function(val) {
            shouldDrawDot = val;
        }

        me.setKeyboard = function(newKeyboard) {
            myKeyboard = newKeyboard;
            myGlyphLayout = KB.glyphLayouts[myKeyboard.getKeySet().keyboardType];
        };
        me.getKeyboard = function() {
            return myKeyboard;
        };
        me.getBgLayer = function() {
            return myKeyboard.getBgLayer();
        };
        me.getHighlightLayer = function() {
            return myKeyboard.getHighlightLayer();
        };

        me.setKeyModel = function(key) {
            keyModel = key;
        };

        me.setFinger = function(newFinger) {
            keyModel.finger = parseInt(newFinger,10);
        };
        me.getFinger = function() {
            return keyModel.finger;
        };
        me.getFingerStart = function() {
            return me.getKeyboard().getFingerStartForKey(me.getId());
        }
        me.setId = function(newId) {
            myId = newId;
        };
        me.getId = function() {
            return myId;
        };

        me.getGlyphLayout = function() {
            return myGlyphLayout;
        };
        me.setGlyphLayout = function(newGlyphLayout) {
            myGlyphLayout = newGlyphLayout;
        };

        me.getValue = function(type) {
            //if ( !keyModel.hasOwnProperty( KB.PUSH_TYPES[type]) ) {throw new Error("Invalid key type '" + type + "' for key.");}
            if ( !keyModel.hasOwnProperty( KB.PUSH_TYPES[type]) ) {keyModel[KB.PUSH_TYPES[type]]=KB.Key.NONE;}
            return keyModel[KB.PUSH_TYPES[type]];            
        };
        me.setValue = function(type, keyCode) {
            if ( !keyModel.hasOwnProperty(KB.PUSH_TYPES[type]) ) {throw new Error("Invalid key type '" + type + "' for key.");}
            if ( typeof keyCode === "string" && keyCode.length === 1) {
                keyCode = keyCode.charCodeAt(0);
            }
            if ( typeof keyCode !== "number" ) {throw new Error("keyCode for setKey function must be a Number.");}
            keyModel[KB.PUSH_TYPES[type]] = keyCode;
        };
        
        me.getX = function() {
            return myCoords[0].x;
        };
        me.getY = function() {
            return myCoords[0].y;
        };
        me.getCoords = function() {
            return myCoords;
        };
        me.setCoords = function(newCoords) {
            myCoords = newCoords;
        };        
        
        me.getBackgroundColorString = function() {
            if (myBgColor.r !== null) {
                return "rgba("+myBgColor.r+","+myBgColor.g+","+myBgColor.b+","+myBgColor.a+")";
            } else {
                return KB.finger.getColor(keyModel.finger, myBgColor.a);
            }
        };
        me.getBackgroundColor = function() {
            return myBgColor || KB.finger.color[keyModel.finger];
        };
        me.setBackgroundColor = function(color) {
            if (color !== null && color !== "") {
                myBgColor.r = isFinite(color.r) ? color.r : myBgColor.r;
                myBgColor.g = isFinite(color.g) ? color.g : myBgColor.g;
                myBgColor.b = isFinite(color.b) ? color.b : myBgColor.b;
            } else {
                myBgColor.r = null;
                myBgColor.g = null;
                myBgColor.b = null;
            }
        };
        me.getBackgroundColorOpacity = function() {
            return myBgColor.a;
        };
        me.setBackgroundColorOpacity = function(opacity) {
            myBgColor.a = opacity;
        };
        
        me.pointOverKey = function(x,y) {

            var nvert = myCoords.length;
            var vertx = [];
            var verty = [];
            var testx = x;
            var testy = y;
            for (var i = 0; i < nvert; i++) {
                vertx.push(myCoords[i].x);
                verty.push(myCoords[i].y);
            }

            var i, j, c = false;
            for( i = 0, j = nvert-1; i < nvert; j = i++ ) {
                if( ( ( verty[i] > testy ) != ( verty[j] > testy ) ) &&
                    ( testx < ( vertx[j] - vertx[i] ) * ( testy - verty[i] ) / ( verty[j] - verty[i] ) + vertx[i] ) ) {
                        c = !c;
                }
            }
            return c;
        };
        
	    // ---------------------------------------------------------------------
	    // constructor
	    // ---------------------------------------------------------------------
    
        (function(myConfig) {

        })(config);
    };
})();

// -----------------------------------------------------------------------------
// public static
// -----------------------------------------------------------------------------

/*
    Valid inputs:
    - [uU]+[0-9a-f]+    unicode string
    - [0-9][a-f]+       unicode string minus the u:
    - [a-?]             Single character that will get converted into unicode
    
    return:
        - empty string on invalid input
        - unicode number for key input
*/
KB.Key.getUnicode = function(keyInput) {
    var matches;
    if (typeof keyInput === "number") {return keyInput;}//return numeric input as is
    if (keyInput.length === 1) {
        return keyInput.charCodeAt(0);
    } else if (matches = keyInput.match(/^(?:[uU]\:)?([-0-9a-f]+)$/)) {
        return parseInt(matches[1],16);
    } else {
        return -1;//error
    }
};

KB.Key.getDisplayText = function(keyInput) {
    var key = keyInput;
    if (typeof keyInput === "string") {
        key = KB.Key.getUnicode(keyInput);
    } else if (typeof keyInput === "number") {
        if (keyInput === KB.Key.NONE) {
            return "";
        } 
    }
    if (key === "") {return "";} // error
    if (key >= 33 && key <= 126) {
        return String.fromCharCode(key);
    }
    return "u:" + key.toString(16);
};

KB.Key.NONE = -1;
KB.Key.WIN = -91;
KB.Key.ALT_GR = -18;
KB.Key.RIGHT_CLICK = -93;

KB.Key.labels = {};
KB.Key.labels[8] = "\u232B";
KB.Key.labels[9] = "\u21E5";
KB.Key.labels[13] = "\u23CE";
KB.Key.labels[16] = "LShift";
KB.Key.labels[27] = "Esc";
KB.Key.labels[-16] = "RShift";
KB.Key.labels[17] = "Ctrl";
KB.Key.labels[18] = "Alt";
KB.Key.labels[-18] = "AltGr";
KB.Key.labels[20] = "\u21EA";
KB.Key.labels[27] = "Esc";
KB.Key.labels[-91] = "Win";
KB.Key.labels[-93] = "R-Clk";























// ---------------------------------------------------------------
// default_layouts.js
// ---------------------------------------------------------------


KB.keySet = {}; 
KB.keySet.standard = {};
KB.keySet.european = {};
KB.keySet.european_ss = {};
KB.keySet.ergodox = {};
KB.keySet.matrix = {};
KB.keySet.matrix_split = {};

KB.keySet.standard.qwerty = {
    label: "QWERTY",
    ops: "",
    author: "Patrick Gillespie",
    moreInfoUrl: "https://en.wikipedia.org/wiki/QWERTY", 
    moreInfoText: "Wikipedia Entry",
    fingerStart: {},
    keyboardType: "standard",
    keys: [ 
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},//1
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},//2
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},//3
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},//4
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},//5
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},//6
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},//7
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},//8
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},//9
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},//10
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},//11
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},//12
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},//15
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},//16
        {primary:"e",   shift:"E",  finger:KB.finger.LEFT_MIDDLE},//17
        {primary:"r",   shift:"R",  finger:KB.finger.LEFT_INDEX},//18
        {primary:"t",   shift:"T",  finger:KB.finger.LEFT_INDEX},//19
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_INDEX},//20
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_INDEX},//21
        {primary:"i",   shift:"I",  finger:KB.finger.RIGHT_MIDDLE},//22
        {primary:"o",   shift:"O",  finger:KB.finger.RIGHT_RING},//23
        {primary:"p",   shift:"P",  finger:KB.finger.RIGHT_PINKY},//24
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},//25
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},//26
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},//29
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_RING},//30
        {primary:"d",  shift:"D",  finger:KB.finger.LEFT_MIDDLE},//31
        {primary:"f",  shift:"F",  finger:KB.finger.LEFT_INDEX},//32
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},//33
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},//34
        {primary:"j",  shift:"J",  finger:KB.finger.RIGHT_INDEX},//35
        {primary:"k",  shift:"K",  finger:KB.finger.RIGHT_MIDDLE},//36
        {primary:"l",  shift:"L",  finger:KB.finger.RIGHT_RING},//37
        {primary:";",  shift:":",  finger:KB.finger.RIGHT_PINKY},//38
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},//39
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},//42
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},//43
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},//44
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},//45
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},//46
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_INDEX},//47
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},//48
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},//49
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},//50
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},//51
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},//54
        {primary:18,               finger:KB.finger.LEFT_THUMB},//55
        {primary:" ",              finger:KB.finger.LEFT_THUMB},//56
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},//57
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},//58
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},//59
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};

KB.keySet.standard.qwk2 = {
    label: "qwk2",
    ops: "ek",
    author: "Evan Moran",
    moreInfoUrl: "https://en.wikipedia.org/wiki/qwk", 
    moreInfoText: "Wikipedia Entry",
    fingerStart: {},
    keyboardType: "standard",
    keys: [ 
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},//1
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},//2
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},//3
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},//4
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},//5
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},//6
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},//7
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},//8
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},//9
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},//10
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},//11
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},//12
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},//15
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},//16
        {primary:"k",   shift:"K",  finger:KB.finger.LEFT_MIDDLE},//17
        {primary:"r",   shift:"R",  finger:KB.finger.LEFT_INDEX},//18
        {primary:"t",   shift:"T",  finger:KB.finger.LEFT_INDEX},//19
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_INDEX},//20
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_INDEX},//21
        {primary:"i",   shift:"I",  finger:KB.finger.RIGHT_MIDDLE},//22
        {primary:"o",   shift:"O",  finger:KB.finger.RIGHT_RING},//23
        {primary:"p",   shift:"P",  finger:KB.finger.RIGHT_PINKY},//24
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},//25
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},//26
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},//29
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_RING},//30
        {primary:"d",  shift:"D",  finger:KB.finger.LEFT_MIDDLE},//31
        {primary:"f",  shift:"F",  finger:KB.finger.LEFT_INDEX},//32
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},//33
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},//34
        {primary:"j",  shift:"J",  finger:KB.finger.RIGHT_INDEX},//35
        {primary:"e",  shift:"E",  finger:KB.finger.RIGHT_MIDDLE},//36
        {primary:"l",  shift:"L",  finger:KB.finger.RIGHT_RING},//37
        {primary:";",  shift:":",  finger:KB.finger.RIGHT_PINKY},//38
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},//39
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},//42
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},//43
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},//44
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},//45
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},//46
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_INDEX},//47
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},//48
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},//49
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},//50
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},//51
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},//54
        {primary:18,               finger:KB.finger.LEFT_THUMB},//55
        {primary:" ",              finger:KB.finger.LEFT_THUMB},//56
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},//57
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},//58
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},//59
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};

KB.keySet.standard.qwk4 = {
    label: "qwk4",
    ops: "ektf",
    author: "Evan Moran",
    moreInfoUrl: "https://en.wikipedia.org/wiki/qwk", 
    moreInfoText: "Wikipedia Entry",
    fingerStart: {},
    keyboardType: "standard",
    keys: [ 
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},//1
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},//2
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},//3
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},//4
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},//5
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},//6
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},//7
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},//8
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},//9
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},//10
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},//11
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},//12
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},//15
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},//16
        {primary:"k",   shift:"K",  finger:KB.finger.LEFT_MIDDLE},//17
        {primary:"r",   shift:"R",  finger:KB.finger.LEFT_INDEX},//18
        {primary:"f",   shift:"F",  finger:KB.finger.LEFT_INDEX},//19
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_INDEX},//20
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_INDEX},//21
        {primary:"i",   shift:"I",  finger:KB.finger.RIGHT_MIDDLE},//22
        {primary:"o",   shift:"O",  finger:KB.finger.RIGHT_RING},//23
        {primary:"p",   shift:"P",  finger:KB.finger.RIGHT_PINKY},//24
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},//25
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},//26
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},//29
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_RING},//30
        {primary:"d",  shift:"D",  finger:KB.finger.LEFT_MIDDLE},//31
        {primary:"t",  shift:"T",  finger:KB.finger.LEFT_INDEX},//32
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},//33
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},//34
        {primary:"j",  shift:"J",  finger:KB.finger.RIGHT_INDEX},//35
        {primary:"e",  shift:"E",  finger:KB.finger.RIGHT_MIDDLE},//36
        {primary:"l",  shift:"L",  finger:KB.finger.RIGHT_RING},//37
        {primary:";",  shift:":",  finger:KB.finger.RIGHT_PINKY},//38
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},//39
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},//42
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},//43
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},//44
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},//45
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},//46
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_INDEX},//47
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},//48
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},//49
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},//50
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},//51
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},//54
        {primary:18,               finger:KB.finger.LEFT_THUMB},//55
        {primary:" ",              finger:KB.finger.LEFT_THUMB},//56
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},//57
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},//58
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},//59
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};


KB.keySet.standard.qwk6 = {
    label: "qwk6",
    ops: "ektfhj",
    author: "Evan Moran",
    moreInfoUrl: "https://en.wikipedia.org/wiki/qwk", 
    moreInfoText: "Wikipedia Entry",
    fingerStart: {},
    keyboardType: "standard",
    keys: [ 
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},//1
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},//2
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},//3
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},//4
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},//5
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},//6
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},//7
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},//8
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},//9
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},//10
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},//11
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},//12
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},//15
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},//16
        {primary:"k",   shift:"K",  finger:KB.finger.LEFT_MIDDLE},//17
        {primary:"r",   shift:"R",  finger:KB.finger.LEFT_INDEX},//18
        {primary:"f",   shift:"F",  finger:KB.finger.LEFT_INDEX},//19
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_INDEX},//20
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_INDEX},//21
        {primary:"i",   shift:"I",  finger:KB.finger.RIGHT_MIDDLE},//22
        {primary:"o",   shift:"O",  finger:KB.finger.RIGHT_RING},//23
        {primary:"p",   shift:"P",  finger:KB.finger.RIGHT_PINKY},//24
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},//25
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},//26
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},//29
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_RING},//30
        {primary:"d",  shift:"D",  finger:KB.finger.LEFT_MIDDLE},//31
        {primary:"t",  shift:"T",  finger:KB.finger.LEFT_INDEX},//32
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},//33
        {primary:"j",  shift:"J",  finger:KB.finger.RIGHT_INDEX},//34
        {primary:"H",  shift:"H",  finger:KB.finger.RIGHT_INDEX},//35
        {primary:"e",  shift:"E",  finger:KB.finger.RIGHT_MIDDLE},//36
        {primary:"l",  shift:"L",  finger:KB.finger.RIGHT_RING},//37
        {primary:";",  shift:":",  finger:KB.finger.RIGHT_PINKY},//38
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},//39
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},//42
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},//43
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},//44
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},//45
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},//46
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_INDEX},//47
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},//48
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},//49
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},//50
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},//51
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},//54
        {primary:18,               finger:KB.finger.LEFT_THUMB},//55
        {primary:" ",              finger:KB.finger.LEFT_THUMB},//56
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},//57
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},//58
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},//59
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};


KB.keySet.standard.qwk8 = {
    label: "qwk8",
    ops: "ektfhjn;",
    author: "Evan Moran",
    moreInfoUrl: "https://en.wikipedia.org/wiki/qwk", 
    moreInfoText: "Wikipedia Entry",
    fingerStart: {},
    keyboardType: "standard",
    keys: [ 
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},//1
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},//2
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},//3
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},//4
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},//5
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},//6
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},//7
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},//8
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},//9
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},//10
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},//11
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},//12
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},//15
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},//16
        {primary:"k",   shift:"K",  finger:KB.finger.LEFT_MIDDLE},//17
        {primary:"r",   shift:"R",  finger:KB.finger.LEFT_INDEX},//18
        {primary:"f",   shift:"F",  finger:KB.finger.LEFT_INDEX},//19
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_INDEX},//20
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_INDEX},//21
        {primary:"i",   shift:"I",  finger:KB.finger.RIGHT_MIDDLE},//22
        {primary:"o",   shift:"O",  finger:KB.finger.RIGHT_RING},//23
        {primary:"p",   shift:"P",  finger:KB.finger.RIGHT_PINKY},//24
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},//25
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},//26
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},//29
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_RING},//30
        {primary:"d",  shift:"D",  finger:KB.finger.LEFT_MIDDLE},//31
        {primary:"t",  shift:"T",  finger:KB.finger.LEFT_INDEX},//32
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},//33
        {primary:"j",  shift:"J",  finger:KB.finger.RIGHT_INDEX},//34
        {primary:"H",  shift:"H",  finger:KB.finger.RIGHT_INDEX},//35
        {primary:"e",  shift:"E",  finger:KB.finger.RIGHT_MIDDLE},//36
        {primary:"l",  shift:"L",  finger:KB.finger.RIGHT_RING},//37
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_PINKY},//38
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},//39
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},//42
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},//43
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},//44
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},//45
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},//46
        {primary:";",  shift:":",  finger:KB.finger.RIGHT_INDEX},//47
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},//48
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},//49
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},//50
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},//51
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},//54
        {primary:18,               finger:KB.finger.LEFT_THUMB},//55
        {primary:" ",              finger:KB.finger.LEFT_THUMB},//56
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},//57
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},//58
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},//59
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};


KB.keySet.standard.qwk10 = {
    label: "qwk10", 
    ops: "ektfhjn;rd",
    author: "Evan Moran",
    moreInfoUrl: "https://en.wikipedia.org/wiki/qwk", 
    moreInfoText: "Wikipedia Entry",
    fingerStart: {},
    keyboardType: "standard",
    keys: [ 
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},//1
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},//2
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},//3
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},//4
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},//5
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},//6
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},//7
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},//8
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},//9
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},//10
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},//11
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},//12
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},//15
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},//16
        {primary:"k",   shift:"K",  finger:KB.finger.LEFT_MIDDLE},//17
        {primary:"d",   shift:"D",  finger:KB.finger.LEFT_INDEX},//18
        {primary:"f",   shift:"F",  finger:KB.finger.LEFT_INDEX},//19
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_INDEX},//20
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_INDEX},//21
        {primary:"i",   shift:"I",  finger:KB.finger.RIGHT_MIDDLE},//22
        {primary:"o",   shift:"O",  finger:KB.finger.RIGHT_RING},//23
        {primary:"p",   shift:"P",  finger:KB.finger.RIGHT_PINKY},//24
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},//25
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},//26
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},//29
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_RING},//30
        {primary:"r",  shift:"R",  finger:KB.finger.LEFT_MIDDLE},//31
        {primary:"t",  shift:"T",  finger:KB.finger.LEFT_INDEX},//32
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},//33
        {primary:"j",  shift:"J",  finger:KB.finger.RIGHT_INDEX},//34
        {primary:"H",  shift:"H",  finger:KB.finger.RIGHT_INDEX},//35
        {primary:"e",  shift:"E",  finger:KB.finger.RIGHT_MIDDLE},//36
        {primary:"l",  shift:"L",  finger:KB.finger.RIGHT_RING},//37
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_PINKY},//38
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},//39
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},//42
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},//43
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},//44
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},//45
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},//46
        {primary:";",  shift:":",  finger:KB.finger.RIGHT_INDEX},//47
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},//48
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},//49
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},//50
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},//51
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},//54
        {primary:18,               finger:KB.finger.LEFT_THUMB},//55
        {primary:" ",              finger:KB.finger.LEFT_THUMB},//56
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},//57
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},//58
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},//59
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};

KB.keySet.standard.nsemi = {
    label: "nsemi",
    ops: "n;",
    author: "Evan Moran",
    moreInfoUrl: "https://en.wikipedia.org/wiki/nsemi", 
    moreInfoText: "Wikipedia Entry",
    fingerStart: {},
    keyboardType: "standard",
    keys: [ 
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},//1
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},//2
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},//3
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},//4
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},//5
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},//6
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},//7
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},//8
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},//9
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},//10
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},//11
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},//12
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},//15
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},//16
        {primary:"e",   shift:"E",  finger:KB.finger.LEFT_MIDDLE},//17
        {primary:"r",   shift:"R",  finger:KB.finger.LEFT_INDEX},//18
        {primary:"t",   shift:"T",  finger:KB.finger.LEFT_INDEX},//19
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_INDEX},//20
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_INDEX},//21
        {primary:"i",   shift:"I",  finger:KB.finger.RIGHT_MIDDLE},//22
        {primary:"o",   shift:"O",  finger:KB.finger.RIGHT_RING},//23
        {primary:"p",   shift:"P",  finger:KB.finger.RIGHT_PINKY},//24
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},//25
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},//26
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},//29
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_RING},//30
        {primary:"d",  shift:"D",  finger:KB.finger.LEFT_MIDDLE},//31
        {primary:"f",  shift:"F",  finger:KB.finger.LEFT_INDEX},//32
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},//33
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},//34
        {primary:"j",  shift:"J",  finger:KB.finger.RIGHT_INDEX},//35
        {primary:"k",  shift:"K",  finger:KB.finger.RIGHT_MIDDLE},//36
        {primary:"l",  shift:"L",  finger:KB.finger.RIGHT_RING},//37
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_PINKY},//38
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},//39
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},//42
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},//43
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},//44
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},//45
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},//46
        {primary:";",  shift:":",  finger:KB.finger.RIGHT_INDEX},//47
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},//48
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},//49
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},//50
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},//51
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},//54
        {primary:18,               finger:KB.finger.LEFT_THUMB},//55
        {primary:" ",              finger:KB.finger.LEFT_THUMB},//56
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},//57
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},//58
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},//59
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};


KB.keySet.standard.psemi = {
    label: "psemi",
    ops: "p;",
    author: "Evan Moran",
    moreInfoUrl: "https://en.wikipedia.org/wiki/psemi", 
    moreInfoText: "Wikipedia Entry",
    fingerStart: {},
    keyboardType: "standard",
    keys: [ 
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},//1
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},//2
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},//3
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},//4
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},//5
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},//6
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},//7
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},//8
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},//9
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},//10
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},//11
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},//12
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},//15
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},//16
        {primary:"e",   shift:"E",  finger:KB.finger.LEFT_MIDDLE},//17
        {primary:"r",   shift:"R",  finger:KB.finger.LEFT_INDEX},//18
        {primary:"t",   shift:"T",  finger:KB.finger.LEFT_INDEX},//19
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_INDEX},//20
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_INDEX},//21
        {primary:"i",   shift:"I",  finger:KB.finger.RIGHT_MIDDLE},//22
        {primary:"o",   shift:"O",  finger:KB.finger.RIGHT_RING},//23
        {primary:";",   shift:":",  finger:KB.finger.RIGHT_PINKY},//24
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},//25
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},//26
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},//29
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_RING},//30
        {primary:"d",  shift:"D",  finger:KB.finger.LEFT_MIDDLE},//31
        {primary:"f",  shift:"F",  finger:KB.finger.LEFT_INDEX},//32
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},//33
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},//34
        {primary:"j",  shift:"J",  finger:KB.finger.RIGHT_INDEX},//35
        {primary:"k",  shift:"K",  finger:KB.finger.RIGHT_MIDDLE},//36
        {primary:"l",  shift:"L",  finger:KB.finger.RIGHT_RING},//37
        {primary:"p",  shift:"P",  finger:KB.finger.RIGHT_PINKY},//38
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},//39
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},//42
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},//43
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},//44
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},//45
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},//46
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_INDEX},//47
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},//48
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},//49
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},//50
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},//51
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},//54
        {primary:18,               finger:KB.finger.LEFT_THUMB},//55
        {primary:" ",              finger:KB.finger.LEFT_THUMB},//56
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},//57
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},//58
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},//59
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};

// ----------------------------------------------------------------------------
// Minimak
// ----------------------------------------------------------------------------

KB.keySet.standard.minimak4 = {
    label: "Minimak 4",
    ops: "ekdt",
    author: "Ted Lilley",
    moreInfoUrl: "https://en.wikipedia.org/wiki/QWERTY", 
    moreInfoText: "Wikipedia Entry",
    fingerStart: {},
    keyboardType: "standard",
    keys: [ 
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},//1
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},//2
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},//3
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},//4
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},//5
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},//6
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},//7
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},//8
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},//9
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},//10
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},//11
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},//12
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},//15
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},//16
        {primary:"t",   shift:"T",  finger:KB.finger.LEFT_MIDDLE},//17
        {primary:"r",   shift:"R",  finger:KB.finger.LEFT_INDEX},//18
        {primary:"e",   shift:"E",  finger:KB.finger.LEFT_INDEX},//19
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_INDEX},//20
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_INDEX},//21
        {primary:"i",   shift:"I",  finger:KB.finger.RIGHT_MIDDLE},//22
        {primary:"o",   shift:"O",  finger:KB.finger.RIGHT_RING},//23
        {primary:"p",   shift:"P",  finger:KB.finger.RIGHT_PINKY},//24
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},//25
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},//26
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},//29
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_RING},//30
        {primary:"d",  shift:"D",  finger:KB.finger.LEFT_MIDDLE},//31
        {primary:"f",  shift:"F",  finger:KB.finger.LEFT_INDEX},//32
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},//33
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},//34
        {primary:"j",  shift:"J",  finger:KB.finger.RIGHT_INDEX},//35
        {primary:"k",  shift:"K",  finger:KB.finger.RIGHT_MIDDLE},//36
        {primary:"l",  shift:"L",  finger:KB.finger.RIGHT_RING},//37
        {primary:";",  shift:":",  finger:KB.finger.RIGHT_PINKY},//38
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},//39
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},//42
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},//43
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},//44
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},//45
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},//46
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_INDEX},//47
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},//48
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},//49
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},//50
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},//51
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},//54
        {primary:18,               finger:KB.finger.LEFT_THUMB},//55
        {primary:" ",              finger:KB.finger.LEFT_THUMB},//56
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},//57
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},//58
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},//59
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};


KB.keySet.standard.minimak8 = {
    label: "Minimak 8",
    ops: "ekdt lo nj",
    author: "Ted Lilley",
    moreInfoUrl: "https://en.wikipedia.org/wiki/QWERTY", 
    moreInfoText: "Wikipedia Entry",
    fingerStart: {},
    keyboardType: "standard",
    keys: [ 
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},//1
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},//2
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},//3
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},//4
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},//5
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},//6
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},//7
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},//8
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},//9
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},//10
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},//11
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},//12
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},//15
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},//16
        {primary:"t",   shift:"T",  finger:KB.finger.LEFT_MIDDLE},//17
        {primary:"r",   shift:"R",  finger:KB.finger.LEFT_INDEX},//18
        {primary:"e",   shift:"E",  finger:KB.finger.LEFT_INDEX},//19
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_INDEX},//20
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_INDEX},//21
        {primary:"i",   shift:"I",  finger:KB.finger.RIGHT_MIDDLE},//22
        {primary:"l",   shift:"L",  finger:KB.finger.RIGHT_RING},//23
        {primary:"p",   shift:"P",  finger:KB.finger.RIGHT_PINKY},//24
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},//25
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},//26
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},//29
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_RING},//30
        {primary:"d",  shift:"D",  finger:KB.finger.LEFT_MIDDLE},//31
        {primary:"f",  shift:"F",  finger:KB.finger.LEFT_INDEX},//32
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},//33
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},//34
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_INDEX},//35
        {primary:"k",  shift:"K",  finger:KB.finger.RIGHT_MIDDLE},//36
        {primary:"o",  shift:"O",  finger:KB.finger.RIGHT_RING},//37
        {primary:";",  shift:":",  finger:KB.finger.RIGHT_PINKY},//38
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},//39
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},//42
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},//43
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},//44
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},//45
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},//46
        {primary:"j",  shift:"J",  finger:KB.finger.RIGHT_INDEX},//47
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},//48
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},//49
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},//50
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},//51
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},//54
        {primary:18,               finger:KB.finger.LEFT_THUMB},//55
        {primary:" ",              finger:KB.finger.LEFT_THUMB},//56
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},//57
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},//58
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},//59
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};

KB.keySet.standard.minimak12 = {
    label: "Minimak 12",
    ops: "ekdt lo nj fr p;",
    author: "Ted Lilley",
    moreInfoUrl: "https://en.wikipedia.org/wiki/QWERTY", 
    moreInfoText: "Wikipedia Entry",
    fingerStart: {},
    keyboardType: "standard",
    keys: [ 
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},//1
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},//2
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},//3
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},//4
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},//5
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},//6
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},//7
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},//8
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},//9
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},//10
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},//11
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},//12
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},//15
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},//16
        {primary:"t",   shift:"T",  finger:KB.finger.LEFT_MIDDLE},//17
        {primary:"f",   shift:"F",  finger:KB.finger.LEFT_INDEX},//18
        {primary:"e",   shift:"E",  finger:KB.finger.LEFT_INDEX},//19
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_INDEX},//20
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_INDEX},//21
        {primary:"i",   shift:"I",  finger:KB.finger.RIGHT_MIDDLE},//22
        {primary:"l",   shift:"L",  finger:KB.finger.RIGHT_RING},//23
        {primary:";",   shift:":",  finger:KB.finger.RIGHT_PINKY},//24
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},//25
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},//26
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},//29
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_RING},//30
        {primary:"d",  shift:"D",  finger:KB.finger.LEFT_MIDDLE},//31
        {primary:"r",  shift:"R",  finger:KB.finger.LEFT_INDEX},//32
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},//33
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},//34
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_INDEX},//35
        {primary:"k",  shift:"K",  finger:KB.finger.RIGHT_MIDDLE},//36
        {primary:"o",  shift:"O",  finger:KB.finger.RIGHT_RING},//37
        {primary:"p",  shift:"P",  finger:KB.finger.RIGHT_PINKY},//38
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},//39
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},//42
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},//43
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},//44
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},//45
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},//46
        {primary:"j",  shift:"J",  finger:KB.finger.RIGHT_INDEX},//47
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},//48
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},//49
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},//50
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},//51
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},//54
        {primary:18,               finger:KB.finger.LEFT_THUMB},//55
        {primary:" ",              finger:KB.finger.LEFT_THUMB},//56
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},//57
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},//58
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},//59
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};

// ----------------------------------------------------------------------------
// standard Simplified Dvorak
// ----------------------------------------------------------------------------

KB.keySet.standard.simplifiedDvorak = {
    label: "Simplified Dvorak",
    author: "Patrick Gillespie",
    moreInfoUrl: "https://en.wikipedia.org/wiki/Dvorak_Simplified_Keyboard", 
    moreInfoText: "Wikipedia Entry",
    fingerStart: {},
    keyboardType: "standard",
    keys: [
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"'",   shift:"\"",  finger:KB.finger.LEFT_PINKY},
        {primary:",",   shift:"<",  finger:KB.finger.LEFT_RING},
        {primary:".",   shift:">",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"p",   shift:"P",  finger:KB.finger.LEFT_INDEX},
        {primary:"y",   shift:"Y",  finger:KB.finger.LEFT_INDEX},
        {primary:"f",   shift:"F",  finger:KB.finger.RIGHT_INDEX},
        {primary:"g",   shift:"G",  finger:KB.finger.RIGHT_INDEX},
        {primary:"c",   shift:"C",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"r",   shift:"R",  finger:KB.finger.RIGHT_RING},
        {primary:"l",   shift:"L",  finger:KB.finger.RIGHT_PINKY},
        {primary:"/",   shift:"?",  finger:KB.finger.RIGHT_PINKY},
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},
        {primary:"o",  shift:"O",  finger:KB.finger.LEFT_RING},
        {primary:"e",  shift:"E",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"u",  shift:"U",  finger:KB.finger.LEFT_INDEX},
        {primary:"i",  shift:"I",  finger:KB.finger.LEFT_INDEX},
        {primary:"d",  shift:"D",  finger:KB.finger.RIGHT_INDEX},
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},
        {primary:"t",  shift:"T",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_RING},
        {primary:"s",  shift:"S",  finger:KB.finger.RIGHT_PINKY},
        {primary:"-",  shift:"_",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:";",  shift:":",  finger:KB.finger.LEFT_PINKY},
        {primary:"q",  shift:"Q",  finger:KB.finger.LEFT_RING},
        {primary:"j",  shift:"J",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"k",  shift:"K",  finger:KB.finger.LEFT_INDEX},
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_INDEX},
        {primary:"b",  shift:"B",  finger:KB.finger.RIGHT_INDEX},
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},
        {primary:"w",  shift:"W",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"v",  shift:"V",  finger:KB.finger.RIGHT_RING},
        {primary:"z",  shift:"Z",  finger:KB.finger.RIGHT_PINKY},
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},
        {primary:18,               finger:KB.finger.LEFT_THUMB},
        {primary:" ",              finger:KB.finger.LEFT_THUMB},
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};

// ----------------------------------------------------------------------------
// standard Colemak
// ----------------------------------------------------------------------------

KB.keySet.standard.colemak = {
    label: "Colemak",
    author: "Patrick Gillespie",
    moreInfoUrl: "http://colemak.com/", 
    moreInfoText: "colemak.com",
    fingerStart: {},
    keyboardType: "standard",
    keys: [
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},
        {primary:"f",   shift:"F",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"p",   shift:"P",  finger:KB.finger.LEFT_INDEX},
        {primary:"g",   shift:"G",  finger:KB.finger.LEFT_INDEX},
        {primary:"j",   shift:"J",  finger:KB.finger.RIGHT_INDEX},
        {primary:"l",   shift:"L",  finger:KB.finger.RIGHT_INDEX},
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_RING},
        {primary:";",   shift:":",  finger:KB.finger.RIGHT_PINKY},
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:8 ,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},
        {primary:"r",  shift:"R",  finger:KB.finger.LEFT_RING},
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"t",  shift:"T",  finger:KB.finger.LEFT_INDEX},
        {primary:"d",  shift:"D",  finger:KB.finger.LEFT_INDEX},
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_INDEX},
        {primary:"e",  shift:"E",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"i",  shift:"I",  finger:KB.finger.RIGHT_RING},
        {primary:"o",  shift:"O",  finger:KB.finger.RIGHT_PINKY},
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},
        {primary:"k",  shift:"K",  finger:KB.finger.RIGHT_INDEX},
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},
        {primary:18,               finger:KB.finger.LEFT_THUMB},
        {primary:" ",              finger:KB.finger.LEFT_THUMB},
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};

// ----------------------------------------------------------------------------
// standard Capewell
// ----------------------------------------------------------------------------

KB.keySet.standard.capewell = {
    label: "Capewell",
    author: "Patrick Gillespie",
    moreInfoUrl: "http://www.michaelcapewell.com/projects/keyboard/", 
    moreInfoText: "michaelcapewell.com",
    fingerStart: {},
    keyboardType: "standard",
    keys: [
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:".",   shift:">",  finger:KB.finger.LEFT_PINKY},
        {primary:"y",   shift:"Y",  finger:KB.finger.LEFT_RING},
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"d",   shift:"D",  finger:KB.finger.LEFT_INDEX},
        {primary:"f",   shift:"F",  finger:KB.finger.LEFT_INDEX},
        {primary:"j",   shift:"J",  finger:KB.finger.RIGHT_INDEX},
        {primary:"p",   shift:"P",  finger:KB.finger.RIGHT_INDEX},
        {primary:"l",   shift:"L",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_RING},
        {primary:"q",   shift:"Q",  finger:KB.finger.RIGHT_PINKY},
        {primary:"/",   shift:"?",  finger:KB.finger.RIGHT_PINKY},
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},
        {primary:"e",  shift:"E",  finger:KB.finger.LEFT_RING},
        {primary:"r",  shift:"R",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_INDEX},
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},
        {primary:"b",  shift:"B",  finger:KB.finger.RIGHT_INDEX},
        {primary:"t",  shift:"T",  finger:KB.finger.RIGHT_INDEX},
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"i",  shift:"I",  finger:KB.finger.RIGHT_RING},
        {primary:"o",  shift:"O",  finger:KB.finger.RIGHT_PINKY},
        {primary:"-",  shift:"_",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_PINKY},
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_RING},
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},
        {primary:";",  shift:":",  finger:KB.finger.LEFT_INDEX},
        {primary:"k",  shift:"K",  finger:KB.finger.RIGHT_INDEX},
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_RING},
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},
        {primary:18,               finger:KB.finger.LEFT_THUMB},
        {primary:" ",              finger:KB.finger.LEFT_THUMB},
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};


// ----------------------------------------------------------------------------
// standard Programmer Dvorak
// ----------------------------------------------------------------------------

KB.keySet.standard.programmerDvorak = {
    label: "Programmer Dvorak",
    author: "Patrick Gillespie",
    moreInfoUrl: "http://www.kaufmann.no/roland/dvorak/", 
    moreInfoText: "kaufmann.no",
    fingerStart: {},
    keyboardType: "standard",
    keys: [
        {primary:"$",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"&",   shift:"%",  finger:KB.finger.LEFT_PINKY},
        {primary:"[",   shift:"7",  finger:KB.finger.LEFT_RING},
        {primary:"{",   shift:"5",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"}",   shift:"3",  finger:KB.finger.LEFT_INDEX},
        {primary:"(",   shift:"1",  finger:KB.finger.LEFT_INDEX},
        {primary:"=",   shift:"9",  finger:KB.finger.RIGHT_INDEX},
        {primary:"*",   shift:"0",  finger:KB.finger.RIGHT_INDEX},
        {primary:")",   shift:"2",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"+",   shift:"4",  finger:KB.finger.RIGHT_RING},
        {primary:"]",   shift:"6",  finger:KB.finger.RIGHT_PINKY},
        {primary:"!",   shift:"8",  finger:KB.finger.RIGHT_PINKY},
        {primary:"#",   shift:"`",  finger:KB.finger.RIGHT_PINKY},
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:";",   shift:":",  finger:KB.finger.LEFT_PINKY},
        {primary:",",   shift:"<",  finger:KB.finger.LEFT_RING},
        {primary:".",   shift:">",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"p",   shift:"P",  finger:KB.finger.LEFT_INDEX},
        {primary:"y",   shift:"Y",  finger:KB.finger.LEFT_INDEX},
        {primary:"f",   shift:"F",  finger:KB.finger.RIGHT_INDEX},
        {primary:"g",   shift:"G",  finger:KB.finger.RIGHT_INDEX},
        {primary:"c",   shift:"C",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"r",   shift:"R",  finger:KB.finger.RIGHT_RING},
        {primary:"l",   shift:"L",  finger:KB.finger.RIGHT_PINKY},
        {primary:"/",   shift:"?",  finger:KB.finger.RIGHT_PINKY},
        {primary:"@",   shift:"^",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},
        {primary:"o",  shift:"O",  finger:KB.finger.LEFT_RING},
        {primary:"e",  shift:"E",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"u",  shift:"U",  finger:KB.finger.LEFT_INDEX},
        {primary:"i",  shift:"I",  finger:KB.finger.LEFT_INDEX},
        {primary:"d",  shift:"D",  finger:KB.finger.RIGHT_INDEX},
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},
        {primary:"t",  shift:"T",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_RING},
        {primary:"s",  shift:"S",  finger:KB.finger.RIGHT_PINKY},
        {primary:"-",  shift:"_",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"'",  shift:"\"",  finger:KB.finger.LEFT_PINKY},
        {primary:"q",  shift:"Q",  finger:KB.finger.LEFT_RING},
        {primary:"j",  shift:"J",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"k",  shift:"K",  finger:KB.finger.LEFT_INDEX},
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_INDEX},
        {primary:"b",  shift:"B",  finger:KB.finger.RIGHT_INDEX},
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},
        {primary:"w",  shift:"W",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"v",  shift:"V",  finger:KB.finger.RIGHT_RING},
        {primary:"z",  shift:"Z",  finger:KB.finger.RIGHT_PINKY},
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},
        {primary:18,               finger:KB.finger.LEFT_THUMB},
        {primary:" ",              finger:KB.finger.LEFT_THUMB},
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};


// ----------------------------------------------------------------------------
// european AZERTY
// ----------------------------------------------------------------------------

KB.keySet.european.azerty = {
   "label":"AZERTY",
   "fingerStart":{
      "1":29,
      "2":30,
      "3":31,
      "4":32,
      "5":57,
      "6":57,
      "7":35,
      "8":36,
      "9":37,
      "10":38,
      "11":57,
      "false":-1
   },
   "keyboardType":"european",
   "author":"Jean-François Moser",
   "moreInfoText":"Wikipedia Entry",
   "moreInfoUrl":"http://en.wikipedia.org/wiki/AZERTY",
   "keys":[
      {"primary":178,   "shift":-1,     "finger":1,     "id":0,     "altGr":-1,     "shiftAltGr":-1},
      {"primary":38,    "shift":49,     "finger":1,     "id":1,     "altGr":-1,     "shiftAltGr":-1},
      {"primary":233,   "shift":50,     "finger":2,     "id":2,     "altGr":126,    "shiftAltGr":-1},
      {"primary":34,    "shift":51,     "finger":3,     "id":3,     "altGr":35,     "shiftAltGr":-1},
      {"primary":39,    "shift":52,     "finger":4,     "id":4,     "altGr":123,    "shiftAltGr":-1},
      {"primary":40,    "shift":53,     "finger":4,     "id":5,     "altGr":91,     "shiftAltGr":-1},
      {"primary":45,    "shift":54,     "finger":7,     "id":6,     "altGr":124,    "shiftAltGr":-1},
      {"primary":232,   "shift":55,     "finger":7,     "id":7,     "altGr":96,     "shiftAltGr":-1},
      {"primary":95,    "shift":56,     "finger":8,     "id":8,     "altGr":92,     "shiftAltGr":-1},
      {"primary":231,   "shift":57,     "finger":9,     "id":9,     "altGr":94,     "shiftAltGr":-1},
      {"primary":224,   "shift":48,     "finger":10,    "id":10,    "altGr":64,     "shiftAltGr":-1},
      {"primary":41,    "shift":176,    "finger":10,    "id":11,    "altGr":93,     "shiftAltGr":-1},
      {"primary":61,    "shift":43,     "finger":10,    "id":12,    "altGr":125,    "shiftAltGr":-1},
      {"primary":8,     "finger":10,    "id":13},
      {"primary":9,     "finger":1,     "id":14},
      {"primary":97,    "shift":65,     "finger":1,     "id":15,    "altGr":-1,     "shiftAltGr":-1},
      {"primary":122,   "shift":90,     "finger":2,     "id":16,    "altGr":-1,     "shiftAltGr":-1},
      {"primary":101,   "shift":69,     "finger":3,     "id":17,    "altGr":8364,   "shiftAltGr":-1},
      {"primary":114,   "shift":82,     "finger":4,     "id":18},
      {"primary":116,   "shift":84,     "finger":4,     "id":19},
      {"primary":121,   "shift":89,     "finger":7,     "id":20},
      {"primary":117,   "shift":85,     "finger":7,     "id":21},
      {"primary":105,   "shift":73,     "finger":8,     "id":22},
      {"primary":111,   "shift":79,     "finger":9,     "id":23},
      {"primary":112,   "shift":80,     "finger":10,    "id":24},
      {"primary":94,    "shift":168,    "finger":10,    "id":25,    "altGr":-1,     "shiftAltGr":-1},
      {"primary":36,    "shift":163,    "finger":10,    "id":26,    "altGr":164,    "shiftAltGr":-1},
      {"primary":13,    "finger":10,    "id":27},
      {"primary":20,    "finger":1,     "id":28},
      {"primary":113,   "shift":81,     "finger":1,     "id":29,    "altGr":-1,     "shiftAltGr":-1},
      {"primary":115,   "shift":83,     "finger":2,     "id":30,    "altGr":-1,     "shiftAltGr":-1},
      {"primary":100,   "shift":68,     "finger":3,     "id":31},
      {"primary":102,   "shift":70,     "finger":4,     "id":32},
      {"primary":103,   "shift":71,     "finger":4,     "id":33},
      {"primary":104,   "shift":72,     "finger":7,     "id":34},
      {"primary":106,   "shift":74,     "finger":7,     "id":35},
      {"primary":107,   "shift":75,     "finger":8,     "id":36},
      {"primary":108,   "shift":76,     "finger":9,     "id":37},
      {"primary":109,   "shift":77,     "finger":10,    "id":38,    "altGr":-1,     "shiftAltGr":-1},
      {"primary":249,   "shift":37,     "finger":10,    "id":39,    "altGr":-1,     "shiftAltGr":-1},
      {"primary":42,    "shift":181,    "finger":10,    "id":40,    "altGr":-1,     "shiftAltGr":-1},
      {"primary":16,    "finger":1,     "id":41},
      {"primary":60,    "shift":62,     "finger":1,     "id":42,    "altGr":-1,     "shiftAltGr":-1},
      {"primary":119,   "shift":87,     "finger":1,     "id":43,    "altGr":-1,     "shiftAltGr":-1},
      {"primary":120,   "shift":88,     "finger":2,     "id":44},
      {"primary":99,    "shift":67,     "finger":3,     "id":45},
      {"primary":118,   "shift":86,     "finger":4,     "id":46},
      {"primary":98,    "shift":66,     "finger":4,     "id":47},
      {"primary":110,   "shift":78,     "finger":7,     "id":48},
      {"primary":44,    "shift":63,     "finger":7,     "id":49,    "altGr":-1,     "shiftAltGr":-1},
      {"primary":59,    "shift":46,     "finger":8,     "id":50,    "altGr":-1,     "shiftAltGr":-1},
      {"primary":58,    "shift":47,     "finger":9,     "id":51,    "altGr":-1,     "shiftAltGr":-1},
      {"primary":33,    "shift":167,    "finger":10,    "id":52,    "altGr":-1,     "shiftAltGr":-1},
      {"primary":-16,   "finger":10,    "id":53},
      {"primary":17,    "finger":5,     "id":54},
      {"primary":-91,   "finger":5,     "id":55},
      {"primary":18,    "finger":5,     "id":56},
      {"primary":32,    "finger":5,     "id":57},
      {"primary":-18,   "finger":6,     "id":58},
      {"primary":-91,   "finger":6,     "id":59},
      {"primary":-93,   "finger":6,     "id":60,        "shift":-1,     "altGr":-1, "shiftAltGr":-1
      },
      {"primary":17,    "finger":6,     "id":61}
   ]
}


// ----------------------------------------------------------------------------
// european Simplified Dvorak
// ----------------------------------------------------------------------------

KB.keySet.european.simplifiedDvorak = {
    label: "Simplified Dvorak",
    author: "Patrick Gillespie",
    authorUrl: "",
    fingerStart: {},
    keyboardType: "european",
    keys: [
        {primary:"`",   shift:172,  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},
        {primary:"2",   shift:"\"",  finger:KB.finger.LEFT_RING},
        {primary:"3",   shift:163,  finger:KB.finger.LEFT_MIDDLE},
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"'",   shift:"@",  finger:KB.finger.LEFT_PINKY},
        {primary:",",   shift:"<",  finger:KB.finger.LEFT_RING},
        {primary:".",   shift:">",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"p",   shift:"P",  finger:KB.finger.LEFT_INDEX},
        {primary:"y",   shift:"Y",  finger:KB.finger.LEFT_INDEX},
        {primary:"f",   shift:"F",  finger:KB.finger.RIGHT_INDEX},
        {primary:"g",   shift:"G",  finger:KB.finger.RIGHT_INDEX},
        {primary:"c",   shift:"C",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"r",   shift:"R",  finger:KB.finger.RIGHT_RING},
        {primary:"l",   shift:"L",  finger:KB.finger.RIGHT_PINKY},
        {primary:"/",   shift:"?",  finger:KB.finger.RIGHT_PINKY},
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\r",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},
        {primary:"o",  shift:"O",  finger:KB.finger.LEFT_RING},
        {primary:"e",  shift:"E",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"u",  shift:"U",  finger:KB.finger.LEFT_INDEX},
        {primary:"i",  shift:"I",  finger:KB.finger.LEFT_INDEX},
        {primary:"d",  shift:"D",  finger:KB.finger.RIGHT_INDEX},
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},
        {primary:"t",  shift:"T",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_RING},
        {primary:"s",  shift:"S",  finger:KB.finger.RIGHT_PINKY},
        {primary:"-",  shift:"_",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:";",  shift:":",  finger:KB.finger.LEFT_PINKY},
        {primary:"q",  shift:"Q",  finger:KB.finger.LEFT_RING},
        {primary:"j",  shift:"J",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"k",  shift:"K",  finger:KB.finger.LEFT_INDEX},
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_INDEX},
        {primary:"b",  shift:"B",  finger:KB.finger.RIGHT_INDEX},
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},
        {primary:"w",  shift:"W",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"v",  shift:"V",  finger:KB.finger.RIGHT_RING},
        {primary:"z",  shift:"Z",  finger:KB.finger.RIGHT_PINKY},
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},
        {primary:18,               finger:KB.finger.LEFT_THUMB},
        {primary:" ",              finger:KB.finger.LEFT_THUMB},
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};

// ----------------------------------------------------------------------------
// european Colemak
// ----------------------------------------------------------------------------

KB.keySet.european.colemak = {
    "label": "Colemak",
    "author": "",
    "moreInfoUrl": "https://colemak.com/",
    "moreInfoText": "Colemak",
    "fingerStart": {
        "1": 29,
        "2": 30,
        "3": 31,
        "4": 32,
        "5": 57,
        "6": 57,
        "7": 35,
        "8": 36,
        "9": 37,
        "10": 38,
        "11": 57,
        "false": -1
    },
    "keyboardType": "european",
    "keys": [
        {
            "primary": 96,
            "shift": 172,
            "finger": 1,
            "id": 0,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 49,
            "shift": 33,
            "finger": 1,
            "id": 1,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 50,
            "shift": 34,
            "finger": 2,
            "id": 2,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 51,
            "shift": 163,
            "finger": 3,
            "id": 3,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 52,
            "shift": 36,
            "finger": 4,
            "id": 4,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 53,
            "shift": 37,
            "finger": 4,
            "id": 5,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 54,
            "shift": 94,
            "finger": 7,
            "id": 6,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 55,
            "shift": 38,
            "finger": 7,
            "id": 7,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 56,
            "shift": 42,
            "finger": 8,
            "id": 8,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 57,
            "shift": 40,
            "finger": 9,
            "id": 9,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 48,
            "shift": 41,
            "finger": 10,
            "id": 10,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 45,
            "shift": 95,
            "finger": 10,
            "id": 11,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 61,
            "shift": 43,
            "finger": 10,
            "id": 12,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 8,
            "finger": 10,
            "id": 13,
            "shift": -1,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 9,
            "finger": 1,
            "id": 14
        },
        {
            "primary": 113,
            "shift": 81,
            "finger": 1,
            "id": 15,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 119,
            "shift": 87,
            "finger": 2,
            "id": 16,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 102,
            "shift": 70,
            "finger": 3,
            "id": 17,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 112,
            "shift": 80,
            "finger": 4,
            "id": 18,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 103,
            "shift": 71,
            "finger": 4,
            "id": 19,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 106,
            "shift": 74,
            "finger": 7,
            "id": 20,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 108,
            "shift": 76,
            "finger": 7,
            "id": 21,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 117,
            "shift": 85,
            "finger": 8,
            "id": 22,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 121,
            "shift": 89,
            "finger": 9,
            "id": 23,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 59,
            "shift": 58,
            "finger": 10,
            "id": 24,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 91,
            "shift": 123,
            "finger": 10,
            "id": 25,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 93,
            "shift": 125,
            "finger": 10,
            "id": 26,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 13,
            "finger": 10,
            "id": 27
        },
        {
            "primary": 8,
            "finger": 1,
            "id": 28,
            "shift": -1,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 97,
            "shift": 65,
            "finger": 1,
            "id": 29
        },
        {
            "primary": 114,
            "shift": 82,
            "finger": 2,
            "id": 30,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 115,
            "shift": 83,
            "finger": 3,
            "id": 31,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 116,
            "shift": 84,
            "finger": 4,
            "id": 32,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 100,
            "shift": 68,
            "finger": 4,
            "id": 33,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 104,
            "shift": 72,
            "finger": 7,
            "id": 34,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 110,
            "shift": 78,
            "finger": 7,
            "id": 35,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 101,
            "shift": 69,
            "finger": 8,
            "id": 36,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 105,
            "shift": 73,
            "finger": 9,
            "id": 37,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 111,
            "shift": 79,
            "finger": 10,
            "id": 38,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 39,
            "shift": 64,
            "finger": 10,
            "id": 39,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 35,
            "shift": 126,
            "finger": 10,
            "id": 40,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 16,
            "finger": 1,
            "id": 41
        },
        {
            "primary": 92,
            "shift": 124,
            "finger": 1,
            "id": 42,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 122,
            "shift": 90,
            "finger": 1,
            "id": 43,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 120,
            "shift": 88,
            "finger": 2,
            "id": 44,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 99,
            "shift": 67,
            "finger": 3,
            "id": 45,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 118,
            "shift": 86,
            "finger": 4,
            "id": 46,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 98,
            "shift": 66,
            "finger": 4,
            "id": 47,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 107,
            "shift": 75,
            "finger": 7,
            "id": 48,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 109,
            "shift": 77,
            "finger": 7,
            "id": 49,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 44,
            "shift": 60,
            "finger": 8,
            "id": 50,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 46,
            "shift": 62,
            "finger": 9,
            "id": 51,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 47,
            "shift": 63,
            "finger": 10,
            "id": 52,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": -16,
            "finger": 10,
            "id": 53
        },
        {
            "primary": 17,
            "finger": 5,
            "id": 54
        },
        {
            "primary": -91,
            "finger": 5,
            "id": 55
        },
        {
            "primary": 18,
            "finger": 5,
            "id": 56
        },
        {
            "primary": 32,
            "finger": 5,
            "id": 57
        },
        {
            "primary": -18,
            "finger": 6,
            "id": 58
        },
        {
            "primary": -91,
            "finger": 6,
            "id": 59
        },
        {
            "primary": -93,
            "finger": 6,
            "id": 60
        },
        {
            "primary": 17,
            "finger": 6,
            "id": 61
        }
    ]
}

KB.keySet.european.colemak_dh = {
    "label": "Colemak-DH (Mod-DH)",
    "author": "SteveP",
    "moreInfoUrl": "https://colemakmods.github.io/mod-dh/",
    "moreInfoText": "Colemak Mod-DH",
    "fingerStart": {
        "1": 29,
        "2": 30,
        "3": 31,
        "4": 32,
        "5": 57,
        "6": 57,
        "7": 35,
        "8": 36,
        "9": 37,
        "10": 38,
        "11": 57,
        "false": -1
    },
    "keyboardType": "european",
    "keys": [
        {
            "primary": 96,
            "shift": 172,
            "finger": 1,
            "id": 0,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 49,
            "shift": 33,
            "finger": 1,
            "id": 1,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 50,
            "shift": 34,
            "finger": 2,
            "id": 2,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 51,
            "shift": 163,
            "finger": 3,
            "id": 3,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 52,
            "shift": 36,
            "finger": 3,
            "id": 4,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 53,
            "shift": 37,
            "finger": 4,
            "id": 5,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 54,
            "shift": 94,
            "finger": 4,
            "id": 6,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 55,
            "shift": 38,
            "finger": 7,
            "id": 7,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 56,
            "shift": 42,
            "finger": 8,
            "id": 8,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 57,
            "shift": 40,
            "finger": 9,
            "id": 9,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 48,
            "shift": 41,
            "finger": 10,
            "id": 10,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 45,
            "shift": 95,
            "finger": 10,
            "id": 11,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 61,
            "shift": 43,
            "finger": 10,
            "id": 12,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 8,
            "finger": 10,
            "id": 13,
            "shift": -1,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 9,
            "finger": 1,
            "id": 14
        },
        {
            "primary": 113,
            "shift": 81,
            "finger": 1,
            "id": 15,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 119,
            "shift": 87,
            "finger": 2,
            "id": 16,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 102,
            "shift": 70,
            "finger": 3,
            "id": 17,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 112,
            "shift": 80,
            "finger": 4,
            "id": 18,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 98,
            "shift": 66,
            "finger": 4,
            "id": 19,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 106,
            "shift": 74,
            "finger": 7,
            "id": 20,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 108,
            "shift": 76,
            "finger": 7,
            "id": 21,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 117,
            "shift": 85,
            "finger": 8,
            "id": 22,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 121,
            "shift": 89,
            "finger": 9,
            "id": 23,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 59,
            "shift": 58,
            "finger": 10,
            "id": 24,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 91,
            "shift": 123,
            "finger": 10,
            "id": 25,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 93,
            "shift": 125,
            "finger": 10,
            "id": 26,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 13,
            "finger": 10,
            "id": 27
        },
        {
            "primary": 8,
            "finger": 1,
            "id": 28,
            "shift": -1,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 97,
            "shift": 65,
            "finger": 1,
            "id": 29
        },
        {
            "primary": 114,
            "shift": 82,
            "finger": 2,
            "id": 30,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 115,
            "shift": 83,
            "finger": 3,
            "id": 31,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 116,
            "shift": 84,
            "finger": 4,
            "id": 32,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 103,
            "shift": 71,
            "finger": 4,
            "id": 33,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 107,
            "shift": 75,
            "finger": 7,
            "id": 34,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 110,
            "shift": 78,
            "finger": 7,
            "id": 35,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 101,
            "shift": 69,
            "finger": 8,
            "id": 36,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 105,
            "shift": 73,
            "finger": 9,
            "id": 37,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 111,
            "shift": 79,
            "finger": 10,
            "id": 38,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 39,
            "shift": 64,
            "finger": 10,
            "id": 39,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 35,
            "shift": 126,
            "finger": 10,
            "id": 40,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 16,
            "finger": 1,
            "id": 41
        },
        {
            "primary": 122,
            "shift": 90,
            "finger": 1,
            "id": 42,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 120,
            "shift": 88,
            "finger": 2,
            "id": 43,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 99,
            "shift": 67,
            "finger": 3,
            "id": 44,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 100,
            "shift": 68,
            "finger": 4,
            "id": 45,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 118,
            "shift": 86,
            "finger": 4,
            "id": 46,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 92,
            "shift": 124,
            "finger": 4,
            "id": 47,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 109,
            "shift": 77,
            "finger": 7,
            "id": 48,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 104,
            "shift": 72,
            "finger": 7,
            "id": 49,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 44,
            "shift": 60,
            "finger": 8,
            "id": 50,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 46,
            "shift": 62,
            "finger": 9,
            "id": 51,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": 47,
            "shift": 63,
            "finger": 10,
            "id": 52,
            "altGr": -1,
            "shiftAltGr": -1
        },
        {
            "primary": -16,
            "finger": 10,
            "id": 53
        },
        {
            "primary": 17,
            "finger": 5,
            "id": 54
        },
        {
            "primary": -91,
            "finger": 5,
            "id": 55
        },
        {
            "primary": 18,
            "finger": 5,
            "id": 56
        },
        {
            "primary": 32,
            "finger": 5,
            "id": 57
        },
        {
            "primary": -18,
            "finger": 6,
            "id": 58
        },
        {
            "primary": -91,
            "finger": 6,
            "id": 59
        },
        {
            "primary": -93,
            "finger": 6,
            "id": 60
        },
        {
            "primary": 17,
            "finger": 6,
            "id": 61
        }
    ]
}

KB.keySet.european.qwerty = {
    label: "QWERTY",
    author: "",
    moreInfoUrl: "http://en.wikipedia.org/wiki/Qwerty", 
    moreInfoText: "Wikipedia Entry",
   "fingerStart":{
      "1":29,
      "2":30,
      "3":31,
      "4":32,
      "5":57,
      "6":58,
      "7":35,
      "8":36,
      "9":37,
      "10":38,
      "11":57,
      "false":-1
   },
    keyboardType: "european",
    keys: [ 
        {primary:"`",   shift:172,  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},//1
        {primary:"2",   shift:"\"",  finger:KB.finger.LEFT_RING},//2
        {primary:"3",   shift:163,  finger:KB.finger.LEFT_MIDDLE},//3
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},//4
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},//5
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},//6
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},//7
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},//8
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},//9
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},//10
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},//11
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},//12
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},//15
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},//16
        {primary:"e",   shift:"E",  finger:KB.finger.LEFT_MIDDLE},//17
        {primary:"r",   shift:"R",  finger:KB.finger.LEFT_INDEX},//18
        {primary:"t",   shift:"T",  finger:KB.finger.LEFT_INDEX},//19
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_INDEX},//20
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_INDEX},//21
        {primary:"i",   shift:"I",  finger:KB.finger.RIGHT_MIDDLE},//22
        {primary:"o",   shift:"O",  finger:KB.finger.RIGHT_RING},//23
        {primary:"p",   shift:"P",  finger:KB.finger.RIGHT_PINKY},//24
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},//25
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},//26
        {primary:"\r",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},//29
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_RING},//30
        {primary:"d",  shift:"D",  finger:KB.finger.LEFT_MIDDLE},//31
        {primary:"f",  shift:"F",  finger:KB.finger.LEFT_INDEX},//32
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},//33
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},//34
        {primary:"j",  shift:"J",  finger:KB.finger.RIGHT_INDEX},//35
        {primary:"k",  shift:"K",  finger:KB.finger.RIGHT_MIDDLE},//36
        {primary:"l",  shift:"L",  finger:KB.finger.RIGHT_RING},//37
        {primary:";",  shift:":",  finger:KB.finger.RIGHT_PINKY},//38
        {primary:"'",  shift:"@",  finger:KB.finger.RIGHT_PINKY},//39
        {primary:"#",  shift:"~",  finger:KB.finger.RIGHT_PINKY},//39
        
        
        {primary:16,                finger:KB.finger.LEFT_PINKY},//41
        {primary:"|",  shift:"\\", finger:KB.finger.LEFT_PINKY},//42
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},//42
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},//43
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},//44
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},//45
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},//46
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_INDEX},//47
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},//48
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},//49
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},//50
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},//51
        {primary:16,               finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},//54
        {primary:18,               finger:KB.finger.LEFT_THUMB},//55
        {primary:" ",              finger:KB.finger.LEFT_THUMB},//56
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},//57
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},//58
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},//59
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};

// ----------------------------------------------------------------------------
// Update Key Sets
// ----------------------------------------------------------------------------

/*
    The below code converts the raw characters to numbers.
*/
// set ID of each key in the main layouts
(function() {
    var ii,
        jj,
        pp,
        prop,
        props,
        klen,
        layout,
        key,
        layouts = [],
        llen = layouts.length,
        keySetName;
    
    for (keySetName in KB.keySet) {
        layouts = [];
        for (jj in KB.keySet[keySetName]) {
            if ( KB.keySet[keySetName].hasOwnProperty(jj) ) {
                layouts.push(jj);
            }
        }
        llen = layouts.length;
        
        for (jj = 0; jj < llen; jj++) {
            layout = layouts[jj];
            klen = KB.keySet[keySetName][layout].keys.length;
            for (ii = 0; ii < klen; ii++) {
                key = KB.keySet[keySetName][layout].keys[ii]; 
                key.id=ii;
                props = ["primary","shift","altGr","shiftAltGr"];
                for (pp = 0, prop = props[pp]; pp < props.length; prop = props[++pp]) {
                    if (typeof key[prop] === "string" && key[prop].length !== 0) {
                       key[prop] = key[prop].charCodeAt(0);
                    }
                }
            }
            
            var fs = KB.keySet[keySetName][layout].fingerStart;
            var spaceKey = 56;
            if (keySetName === 'european' || keySetName === 'european_ss') {
                spaceKey = 57;
            } else if (keySetName === 'ergodox') {
                spaceKey = 66;
            }

            fs[KB.finger.LEFT_PINKY] = (typeof fs[KB.finger.LEFT_PINKY] === "undefined") ? 29 : fs[KB.finger.LEFT_PINKY];
            fs[KB.finger.LEFT_RING] = (typeof fs[KB.finger.LEFT_RING] === "undefined") ? 30 : fs[KB.finger.LEFT_RING];
            fs[KB.finger.LEFT_MIDDLE] = (typeof fs[KB.finger.LEFT_MIDDLE] === "undefined") ? 31 : fs[KB.finger.LEFT_MIDDLE];
            fs[KB.finger.LEFT_INDEX] = (typeof fs[KB.finger.LEFT_INDEX] === "undefined") ? 32 : fs[KB.finger.LEFT_INDEX];
            fs[KB.finger.LEFT_THUMB] = (typeof fs[KB.finger.LEFT_THUMB] === "undefined") ? spaceKey : fs[KB.finger.LEFT_THUMB];
            fs[KB.finger.RIGHT_THUMB] = (typeof fs[KB.finger.RIGHT_THUMB] === "undefined") ? spaceKey : fs[KB.finger.RIGHT_THUMB];
            fs[KB.finger.RIGHT_INDEX] = (typeof fs[KB.finger.RIGHT_INDEX] === "undefined") ? 35 : fs[KB.finger.RIGHT_INDEX];
            fs[KB.finger.RIGHT_MIDDLE] = (typeof fs[KB.finger.RIGHT_MIDDLE] === "undefined") ? 36 : fs[KB.finger.RIGHT_MIDDLE];
            fs[KB.finger.RIGHT_RING] = (typeof fs[KB.finger.RIGHT_RING] === "undefined") ? 37 : fs[KB.finger.RIGHT_RING];
            fs[KB.finger.RIGHT_PINKY] = (typeof fs[KB.finger.RIGHT_PINKY] === "undefined") ? 38 : fs[KB.finger.RIGHT_PINKY];
            fs[KB.finger.BOTH_THUMBS] =  (typeof fs[KB.finger.BOTH_THUMBS] === "undefined") ? spaceKey : fs[KB.finger.BOTH_THUMBS];
        }
    }
})();

// ---------------------------------------------------------------------


module.exports = KB;

"use strict";

var KLA = KLA || {};


if (typeof console === 'undefined') {
    var console = {};
    console.log = function() {};
    console.dir = function() {};
}

KLA.Analyzer = (function() {

    var me, distanceBetweenKeysCached;

    // simulate the arm approaching the keyboard at an angle (15 degrees)
    var theta = 15.0 * Math.PI / 180.0;
    var sintheta = Math.sin(theta);
    var costheta = Math.cos(theta);

    me = function() {
        return me;
    };
    
    me.allKeys = [
        // q  w  e  r  t  y  u  i  o  p 
          15,16,17,18,19,20,21,22,23,24,
        // a  s  d  f  g  h  j  k  l  ;
          29,30,31,32,33,34,35,36,37,38,
        // z  x  c  v  b  n  m  ,  .  /
          42,43,44,45,46,47,48,49,50,51
    ];

    me.qwerty30Mask = [
        // q  w  e  r  t  y  u  i  o  p 
          15,16,17,18,19,20,21,22,23,24,
        // a  s  d  f  g  h  j  k  l  ;
          29,30,31,32,33,34,35,36,37,38,
        // z  x  c  v  b  n  m  ,  .  /
          42,43,44,45,46,47,48,49,50,51
    ];
    me.nSemi30Mask = [
        // q  w  e  r  t  y  u  i  o  p 
          15,16,17,18,19,20,21,22,23,24,
        // a  s  d  f  g  h  j  k  l 
          29,30,31,32,33,34,35,36,37,
        // z  x  c  v  b     m  ,  .  /
          42,43,44,45,46,   48,49,50,51
    ];
    me.pSemi30Mask = [
        // q  w  e  r  t  y  u  i  o  
          15,16,17,18,19,20,21,22,23,
        // a  s  d  f  g  h  j  k  l  p
          29,30,31,32,33,34,35,36,37,38,
        // z  x  c  v  b  n  m  ,  .  /
          42,43,44,45,46,47,48,49,50,51
    ];

    // Min: Removing shortcuts and punctuations
    // REMOVE z x c v . . /

    me.qwerty23Mask = [ 
        // q  w  e  r  t  y  u  i  o  p 
          15,16,17,18,19,20,21,22,23,24,
        // a  s  d  f  g  h  j  k  l  ;
          29,30,31,32,33,34,35,36,37,38,
        //             b  n  m  
                      46,47,48
    ];

    me.nSemi23Mask = [ 
        // q  w  e  r  t  y  u  i  o  p 
          15,16,17,18,19,20,21,22,23,24,
        // a  s  d  f  g  h  j  k  l 
          29,30,31,32,33,34,35,36,37,
        //             b     m 
                      46,   48
    ];

    me.pSemi23Mask = [ 
        // q  w  e  r  t  y  u  i  o  
          15,16,17,18,19,20,21,22,23,
        // a  s  d  f  g  h  j  k  l  p  
          29,30,31,32,33,34,35,36,37,38,
        //             b  n  m  ,  .  /
                      46,47,48
    ];

    // REMOVE w p m b ------------------------------------------
    me.qwerty19Mask = [ 
        // q     e  r  t  y  u  i  o 
          15,   17,18,19,20,21,22,23,
        // a  s  d  f  g  h  j  k  l  ;
          29,30,31,32,33,34,35,36,37,38,
        //                n  
                         47
    ];

    me.nSemi19Mask = [ 
        // q     e  r  t  y  u  i  o 
          15,   17,18,19,20,21,22,23,
        // a  s  d  f  g  h  j  k  l  n
          29,30,31,32,33,34,35,36,37,38
    ];
    me.pSemi19Mask = [ 
        // q     e  r  t  y  u  i  o 
          15,   17,18,19,20,21,22,23,
        // a  s  d  f  g  h  j  k  l  p
          29,30,31,32,33,34,35,36,37,38,
        //                n  
                         47
    ];

    // Medium: Removing Obvious Stays
    // REMOVE q g u s  ---------------------------------------
    me.qwerty15Mask = [ 
        //       e  r  t  y     i  o 
                17,18,19,20,   22,23,
        // a     d  f     h  j  k  l  ;
          29,   31,32,   34,35,36,37,38,
        //                n  
                         47
    ];
    me.nSemi15Mask = [ 
        //       e  r  t  y     i  o 
                17,18,19,20,   22,23,
        // a     d  f     h  j  k  l  n 
          29,   31,32,   34,35,36,37,38
    ];
     // REMOVE a y  ---------------------------------------
     me.qwerty13Mask = [ 
        //       e  r  t        i  o 
                17,18,19,      22,23,
        //       d  f     h  j  k  l  ;
                31,32,   34,35,36,37,38,
        //                n  
                         47
    ];
    me.nSemi13Mask = [ 
        //       e  r  t        i  o 
                17,18,19,      22,23,
        //       d  f     h  j  k  l  n
                31,32,   34,35,36,37,38
    ];
    me.pSemi13Mask = [ 
        //       e  r  t        i  o 
                17,18,19,      22,23,
        //       d  f     h  j  k  l  p
                31,32,   34,35,36,37,38
    ];
     // REMOVE r  ---------------------------------------
     me.qwerty12Mask = [ 
        //       e     t        i  o 
                17,   19,      22,23,
        //       d  f     h  j  k  l  ;
                31,32,   34,35,36,37,38,
        //                n  
                         47
    ];
    me.nSemi12Mask = [ 
        //       e     t        i  o 
                17,   19,      22,23,
        //       d  f     h  j  k  l  n 
                31,32,   34,35,36,37,38
    ];
    me.pSemi12Mask = [ 
        //       e     t        i  o 
                17,   19,      22,23,
        //       d  f     h  j  k  l  p 
                31,32,   34,35,36,37,38
    ];
    // REMOVE i l  ---------------------------------------
    me.qwerty10Mask = [ 
        //       e     t           o 
                17,   19,         23,
        //       d  f     h  j  k     ;
                31,32,   34,35,36,   38,
        //                n  
                         47
    ];
    me.nSemi10Mask = [ 
        //       e     t           o 
                17,   19,         23,
        //       d  f     h  j  k     n 
                31,32,   34,35,36,   38
    ];
    me.pSemi10Mask = [ 
        //       e     t           o 
                17,   19,         23,
        //       d  f     h  j  k     p 
                31,32,   34,35,36,   38
    ];

    // REMOVE n d  ---------------------------------------
    me.qwerty8Mask = [ 
        //       e     t           o 
                17,   19,         23,
        //          f     h  j  k     ;
                   32,   34,35,36,   38
    ];

    // REMOVE h ;  ---------------------------------------
    me.qwerty6Mask = [ 
        //       e     t           o 
                17,   19,         23,
        //           f       j  k  
                    32,     35,36
    ];

    // REMOVE o  ---------------------------------------
    me.qwerty5Mask = [ 
        //       e     t           
                17,   19,         
        //           f       j  k  
                    32,     35,36
    ];

    // REMOVE f  ---------------------------------------
    me.qwerty4Mask = [ 
        //       e     t           
                17,   19,         
        //                   j  k  
                            35,36
    ];

    me.keyIxToCharacter = function(keyboard, keyIx) {
        return String.fromCharCode(keyboard.keys[keyIx].primary);
    }

    me.toKeyString = function(keyboard) {
        var strOut = "";
        for (var ix = 0; ix < me.allKeys.length; ix++) {
            var keyIx = me.allKeys[ix];
            var unicode = keyboard.keys[keyIx].primary;
            var char = String.fromCharCode(unicode);
            strOut += char;
            strOut += "";
            if (ix %10 == 9 && ix < me.allKeys.length - 1) {
                strOut += " ";
            }
        }
        return strOut;
    }

    me.swapKey = function(keyboard, keyIx1, keyIx2) {
        var o1 = keyboard.keys[keyIx1];
        var o2 = keyboard.keys[keyIx2];

        var o1OldPrimary = o1.primary;
        var o1OldShift = o1.shift;
        
        o1.primary = o2.primary;
        o1.shift = o2.shift;
        o2.primary = o1OldPrimary;
        o2.shift = o1OldShift;
    }

    me.rotateKey = function(keyboard, keyIxList) {
        if (keyIxList.length == 0) return;

        // Iterate once for every pair of ix
        var keyIx1 = keyIxList[0];
        for(var ix = 1; ix < keyIxList.length; ix++) {
            var keyIx2 = keyIxList[ix];
            me.swapKey(keyboard, keyIx1, keyIx2);
        }
    }

    me.t1000 = "a ability able about above accept according account across act action activity actually add address administration admit adult affect after again against age agency agent ago agree agreement ahead air all allow almost alone along already also although always American among amount analysis and animal another answer any anyone anything appear apply approach area argue arm around arrive art article artist as ask assume at attack attention attorney audience author authority available avoid away baby back bad bag ball bank bar base be beat beautiful because become bed before begin behavior behind believe benefit best better between beyond big bill billion bit black blood blue board body book born both box boy break bring brother budget build building business but buy by call camera campaign can cancer candidate capital car card care career carry case catch cause cell center central century certain certainly chair challenge chance change character charge check child choice choose church citizen city civil claim class clear clearly close coach cold collection college color come commercial common community company compare computer concern condition conference Congress consider consumer contain continue control cost could country couple course court cover create crime cultural culture cup current customer cut dark data daughter day dead deal death debate decade decide decision deep defense degree Democrat democratic describe design despite detail determine develop development die difference different difficult dinner direction director discover discuss discussion disease do doctor dog door down draw dream drive drop drug during each early east easy eat economic economy edge education effect effort eight either election else employee end energy enjoy enough enter entire environment environmental especially establish even evening event ever every everybody everyone everything evidence exactly example executive exist expect experience expert explain eye face fact factor fail fall family far fast father fear federal feel feeling few field fight figure fill film final finally financial find fine finger finish fire firm first fish five floor fly focus follow food foot for force foreign forget form former forward four free friend from front full fund future game garden gas general generation get girl give glass go goal good government great green ground group grow growth guess gun guy hair half hand hang happen happy hard have he head health hear heart heat heavy help her here herself high him himself his history hit hold home hope hospital hot hotel hour house how however huge human hundred husband I idea identify if image imagine impact important improve in include including increase indeed indicate individual industry information inside instead institution interest interesting international interview into investment involve issue it item its itself job join just keep key kid kill kind kitchen know knowledge land language large last late later laugh law lawyer lay lead leader learn least leave left leg legal less let letter level lie life light like likely line list listen little live local long look lose loss lot love low machine magazine main maintain major majority make man manage management manager many market marriage material matter may maybe me mean measure media medical meet meeting member memory mention message method middle might military million mind minute miss mission model modern moment money month more morning most mother mouth move movement movie Mr Mrs much music must my myself name nation national natural nature near nearly necessary need network never new news newspaper next nice night no none nor north not note nothing notice now n't number occur of off offer office officer official often oh oil ok old on once one only onto open operation opportunity option or order organization other others our out outside over own owner page pain painting paper parent part participant particular particularly partner party pass past patient pattern pay peace people per perform performance perhaps period person personal phone physical pick picture piece place plan plant play player PM point police policy political politics poor popular population position positive possible power practice prepare present president pressure pretty prevent price private probably problem process produce product production professional professor program project property protect prove provide public pull purpose push put quality question quickly quite race radio raise range rate rather reach read ready real reality realize really reason receive recent recently recognize record red reduce reflect region relate relationship religious remain remember remove report represent Republican require research resource respond response responsibility rest result return reveal rich right rise risk road rock role room rule run safe same save say scene school science scientist score sea season seat second section security see seek seem sell send senior sense series serious serve service set seven several sex sexual shake share she shoot short shot should shoulder show side sign significant similar simple simply since sing single sister sit site situation six size skill skin small smile so social society soldier some somebody someone something sometimes son song soon sort sound source south southern space speak special specific speech spend sport spring staff stage stand standard star start state statement station stay step still stock stop store story strategy street strong structure student study stuff style subject success successful such suddenly suffer suggest summer support sure surface system table take talk task tax teach teacher team technology television tell ten tend term test than thank that the their them themselves then theory there these they thing think third this those though thought thousand threat three through throughout throw thus time to today together tonight too top total tough toward town trade traditional training travel treat treatment tree trial trip trouble true truth try turn TV two type under understand unit until up upon us use usually value various very victim view violence visit voice vote wait walk wall want war watch water way we weapon wear week weight well west western what whatever when where whether which while white who whole whom whose why wide wife will win wind window wish with within without woman wonder word work worker world worry would write writer wrong yard yeah year yes yet you young your yourself";

    me.t10000 = "the of and to a in for is on that by this with i you it not or be are from at as your all have new more an was we will home can us about if page my has search free but our one other do no information time they site he up may what which their news out use any there see only so his when contact here business who web also now help get pm view online c e first am been would how were me s services some these click its like service x than find price date back top people had list name just over state year day into email two health n world re next used go b work last most products music buy data make them should product system post her city t add policy number such please available copyright support message after best software then jan good video well d where info rights public books high school through m each links she review years order very privacy book items company r read group sex need many user said de does set under general research university january mail full map reviews program life know games way days management p part could great united hotel real f item international center ebay must store travel comments made development report off member details line terms before hotels did send right type because local those using results office education national car design take posted internet address community within states area want phone dvd shipping reserved subject between forum family l long based w code show o even black check special prices website index being women much sign file link open today technology south case project same pages uk version section own found sports house related security both g county american photo game members power while care network down computer systems three total place end following download h him without per access think north resources current posts big media law control water history pictures size art personal since including guide shop directory board location change white text small rating rate government children during usa return students v shopping account times sites level digital profile previous form events love old john main call hours image department title description non k y insurance another why shall property class cd still money quality every listing content country private little visit save tools low reply customer december compare movies include college value article york man card jobs provide j food source author different press u learn sale around print course job canada process teen room stock training too credit point join science men categories advanced west sales look english left team estate box conditions select windows photos gay thread week category note live large gallery table register however june october november market library really action start series model features air industry plan human provided tv yes required second hot accessories cost movie forums march la september better say questions july yahoo going medical test friend come dec server pc study application cart staff articles san feedback again play looking issues april never users complete street topic comment financial things working against standard tax person below mobile less got blog party payment equipment login student let programs offers legal above recent park stores side act problem red give memory performance social q august quote language story sell options experience rates create key body young america important field few east paper single ii age activities club example girls additional password z latest something road gift question changes night ca hard texas oct pay four poker status browse issue range building seller court february always result audio light write war nov offer blue groups al easy given files event release analysis request fax china making picture needs possible might professional yet month major star areas future space committee hand sun cards problems london washington meeting rss become interest id child keep enter california porn share similar garden schools million added reference companies listed baby learning energy run delivery net popular term film stories put computers journal reports co try welcome central images president notice god original head radio until cell color self council away includes track australia discussion archive once others entertainment agreement format least society months log safety friends sure faq trade edition cars messages marketing tell further updated association able having provides david fun already green studies close common drive specific several gold feb living sep collection called short arts lot ask display limited powered solutions means director daily beach past natural whether due et electronics five upon period planning database says official weather mar land average done technical window france pro region island record direct microsoft conference environment records st district calendar costs style url front statement update parts aug ever downloads early miles sound resource present applications either ago document word works material bill apr written talk federal hosting rules final adult tickets thing centre requirements via cheap nude kids finance true minutes else mark third rock gifts europe reading topics bad individual tips plus auto cover usually edit together videos percent fast function fact unit getting global tech meet far economic en player projects lyrics often subscribe submit germany amount watch included feel though bank risk thanks everything deals various words linux jul production commercial james weight town heart advertising received choose treatment newsletter archives points knowledge magazine error camera jun girl currently construction toys registered clear golf receive domain methods chapter makes protection policies loan wide beauty manager india position taken sort listings models michael known half cases step engineering florida simple quick none wireless license paul friday lake whole annual published later basic sony shows corporate google church method purchase customers active response practice hardware figure materials fire holiday chat enough designed along among death writing speed html countries loss face brand discount higher effects created remember standards oil bit yellow political increase advertise kingdom base near environmental thought stuff french storage oh japan doing loans shoes entry stay nature orders availability africa summary turn mean growth notes agency king monday european activity copy although drug pics western income force cash employment overall bay river commission ad package contents seen players engine port album regional stop supplies started administration bar institute views plans double dog build screen exchange types soon sponsored lines electronic continue across benefits needed season apply someone held ny anything printer condition effective believe organization effect asked eur mind sunday selection casino pdf lost tour menu volume cross anyone mortgage hope silver corporation wish inside solution mature role rather weeks addition came supply nothing certain usr executive running lower necessary union jewelry according dc clothing mon com particular fine names robert homepage hour gas skills six bush islands advice career military rental decision leave british teens pre huge sat woman facilities zip bid kind sellers middle move cable opportunities taking values division coming tuesday object lesbian appropriate machine logo length actually nice score statistics client ok returns capital follow sample investment sent shown saturday christmas england culture band flash ms lead george choice went starting registration fri thursday courses consumer hi airport foreign artist outside furniture levels channel letter mode phones ideas wednesday structure fund summer allow degree contract button releases wed homes super male matter custom virginia almost took located multiple asian distribution editor inn industrial cause potential song cnet ltd los hp focus late fall featured idea rooms female responsible inc communications win associated thomas primary cancer numbers reason tool browser spring foundation answer voice eg friendly schedule documents communication purpose feature bed comes police everyone independent ip approach cameras brown physical operating hill maps medicine deal hold ratings chicago forms glass happy tue smith wanted developed thank safe unique survey prior telephone sport ready feed animal sources mexico population pa regular secure navigation operations therefore ass simply evidence station christian round paypal favorite understand option master valley recently probably thu rentals sea built publications blood cut worldwide improve connection publisher hall larger anti networks earth parents nokia impact transfer introduction kitchen strong tel carolina wedding properties hospital ground overview ship accommodation owners disease tx excellent paid italy perfect hair opportunity kit classic basis command cities william express anal award distance tree peter assessment ensure thus wall ie involved el extra especially interface pussy partners budget rated guides success maximum ma operation existing quite selected boy amazon patients restaurants beautiful warning wine locations horse vote forward flowers stars significant lists technologies owner retail animals useful directly manufacturer ways est son providing rule mac housing takes iii gmt bring catalog searches max trying mother authority considered told xml traffic programme joined input strategy feet agent valid bin modern senior ireland sexy teaching door grand testing trial charge units instead canadian cool normal wrote enterprise ships entire educational md leading metal positive fl fitness chinese opinion mb asia football abstract uses output funds mr greater likely develop employees artists alternative processing responsibility resolution java guest seems publication pass relations trust van contains session multi photography republic fees components vacation century academic assistance completed skin graphics indian prev ads mary il expected ring grade dating pacific mountain organizations pop filter mailing vehicle longer consider int northern behind panel floor german buying match proposed default require iraq boys outdoor deep morning otherwise allows rest protein plant reported hit transportation mm pool mini politics partner disclaimer authors boards faculty parties fish membership mission eye string sense modified pack released stage internal goods recommended born unless richard detailed japanese race approved background target except character usb maintenance ability maybe functions ed moving brands places php pretty trademarks phentermine spain southern yourself etc winter rape battery youth pressure submitted boston incest debt keywords medium television interested core break purposes throughout sets dance wood msn itself defined papers playing awards fee studio reader virtual device established answers rent las remote dark programming external apple le regarding instructions min offered theory enjoy remove aid surface minimum visual host variety teachers isbn martin manual block subjects agents increased repair fair civil steel understanding songs fixed wrong beginning hands associates finally az updates desktop classes paris ohio gets sector capacity requires jersey un fat fully father electric saw instruments quotes officer driver businesses dead respect unknown specified restaurant mike trip pst worth mi procedures poor teacher xxx eyes relationship workers farm fucking georgia peace traditional campus tom showing creative coast benefit progress funding devices lord grant sub agree fiction hear sometimes watches careers beyond goes families led museum themselves fan transport interesting blogs wife evaluation accepted former implementation ten hits zone complex th cat galleries references die presented jack flat flow agencies literature respective parent spanish michigan columbia setting dr scale stand economy highest helpful monthly critical frame musical definition secretary angeles networking path australian employee chief gives kb bottom magazines packages detail francisco laws changed pet heard begin individuals colorado royal clean switch russian largest african guy titles relevant guidelines justice connect bible dev cup basket applied weekly vol installation described demand pp suite vegas na square chris attention advance skip diet army auction gear lee os difference allowed correct charles nation selling lots piece sheet firm seven older illinois regulations elements species jump cells module resort facility random pricing dvds certificate minister motion looks fashion directions visitors documentation monitor trading forest calls whose coverage couple giving chance vision ball ending clients actions listen discuss accept automotive naked goal successful sold wind communities clinical situation sciences markets lowest highly publishing appear emergency developing lives currency leather determine milf temperature palm announcements patient actual historical stone bob commerce ringtones perhaps persons difficult scientific satellite fit tests village accounts amateur ex met pain xbox particularly factors coffee www settings cum buyer cultural steve easily oral ford poster edge functional root au fi closed holidays ice pink zealand balance monitoring graduate replies shot nc architecture initial label thinking scott llc sec recommend canon hardcore league waste minute bus provider optional dictionary cold accounting manufacturing sections chair fishing effort phase fields bag fantasy po letters motor va professor context install shirt apparel generally continued foot mass crime count breast techniques ibm rd johnson sc quickly dollars websites religion claim driving permission surgery patch heat wild measures generation kansas miss chemical doctor task reduce brought himself nor component enable exercise bug santa mid guarantee leader diamond israel se processes soft servers alone meetings seconds jones arizona keyword interests flight congress fuel username walk fuck produced italian paperback classifieds wait supported pocket saint rose freedom argument competition creating jim drugs joint premium providers fresh characters attorney upgrade di factor growing thousands km stream apartments pick hearing eastern auctions therapy entries dates generated signed upper administrative serious prime samsung limit began louis steps errors shops bondage del efforts informed ga ac thoughts creek ft worked quantity urban practices sorted reporting essential myself tours platform load affiliate labor immediately admin nursing defense machines designated tags heavy covered recovery joe guys integrated configuration cock merchant comprehensive expert universal protect drop solid cds presentation languages became orange compliance vehicles prevent theme rich im campaign marine improvement vs guitar finding pennsylvania examples ipod saying spirit ar claims porno challenge motorola acceptance strategies mo seem affairs touch intended towards sa goals hire election suggest branch charges serve affiliates reasons magic mount smart talking gave ones latin multimedia xp tits avoid certified manage corner rank computing oregon element birth virus abuse interactive requests separate quarter procedure leadership tables define racing religious facts breakfast kong column plants faith chain developer identify avenue missing died approximately domestic sitemap recommendations moved houston reach comparison mental viewed moment extended sequence inch attack sorry centers opening damage lab reserve recipes cvs gamma plastic produce snow placed truth counter failure follows eu weekend dollar camp ontario automatically des minnesota films bridge native fill williams movement printing baseball owned approval draft chart played contacts cc jesus readers clubs lcd wa jackson equal adventure matching offering shirts profit leaders posters institutions assistant variable ave dj advertisement expect parking headlines yesterday compared determined wholesale workshop russia gone codes kinds extension seattle statements golden completely teams fort cm wi lighting senate forces funny brother gene turned portable tried electrical applicable disc returned pattern ct hentai boat named theatre laser earlier manufacturers sponsor classical icon warranty dedicated indiana direction harry basketball objects ends delete evening assembly nuclear taxes mouse signal criminal issued brain sexual wisconsin powerful dream obtained false da cast flower felt personnel passed supplied identified falls pic soul aids opinions promote stated stats hawaii professionals appears carry flag decided nj covers hr em advantage hello designs maintain tourism priority newsletters adults clips savings iv graphic atom payments rw estimated binding brief ended winning eight anonymous iron straight script served wants miscellaneous prepared void dining alert integration atlanta dakota tag interview mix framework disk installed queen vhs credits clearly fix handle sweet desk criteria pubmed dave massachusetts diego hong vice associate ne truck behavior enlarge ray frequently revenue measure changing votes du duty looked discussions bear gain festival laboratory ocean flights experts signs lack depth iowa whatever logged laptop vintage train exactly dry explore maryland spa concept nearly eligible checkout reality forgot handling origin knew gaming feeds billion destination scotland faster intelligence dallas bought con ups nations route followed specifications broken tripadvisor frank alaska zoom blow battle residential anime speak decisions industries protocol query clip partnership editorial nt expression es equity provisions speech wire principles suggestions rural shared sounds replacement tape strategic judge spam economics acid bytes cent forced compatible fight apartment height null zero speaker filed gb netherlands obtain bc consulting recreation offices designer remain managed pr failed marriage roll korea banks fr participants secret bath aa kelly leads negative austin favorites toronto theater springs missouri andrew var perform healthy translation estimates font assets injury mt joseph ministry drivers lawyer figures married protected proposal sharing philadelphia portal waiting birthday beta fail gratis banking officials brian toward won slightly assist conduct contained lingerie shemale legislation calling parameters jazz serving bags profiles miami comics matters houses doc postal relationships tennessee wear controls breaking combined ultimate wales representative frequency introduced minor finish departments residents noted displayed mom reduced physics rare spent performed extreme samples davis daniel bars reviewed row oz forecast removed helps singles administrator cycle amounts contain accuracy dual rise usd sleep mg bird pharmacy brazil creation static scene hunter addresses lady crystal famous writer chairman violence fans oklahoma speakers drink academy dynamic gender eat permanent agriculture dell cleaning constitutes portfolio practical delivered collectibles infrastructure exclusive seat concerns colour vendor originally intel utilities philosophy regulation officers reduction aim bids referred supports nutrition recording regions junior toll les cape ann rings meaning tip secondary wonderful mine ladies henry ticket announced guess agreed prevention whom ski soccer math import posting presence instant mentioned automatic healthcare viewing maintained ch increasing majority connected christ dan dogs sd directors aspects austria ahead moon participation scheme utility preview fly manner matrix containing combination devel amendment despite strength guaranteed turkey libraries proper distributed degrees singapore enterprises delta fear seeking inches phoenix rs convention shares principal daughter standing voyeur comfort colors wars cisco ordering kept alpha appeal cruise bonus certification previously hey bookmark buildings specials beat disney household batteries adobe smoking bbc becomes drives arms alabama tea improved trees avg achieve positions dress subscription dealer contemporary sky utah nearby rom carried happen exposure panasonic hide permalink signature gambling refer miller provision outdoors clothes caused luxury babes frames viagra certainly indeed newspaper toy circuit layer printed slow removal easier src liability trademark hip printers faqs nine adding kentucky mostly eric spot taylor trackback prints spend factory interior revised grow americans optical promotion relative amazing clock dot hiv identity suites conversion feeling hidden reasonable victoria serial relief revision broadband influence ratio pda importance rain onto dsl planet webmaster copies recipe zum permit seeing proof dna diff tennis bass prescription bedroom empty instance hole pets ride licensed orlando specifically tim bureau maine sql represent conservation pair ideal specs recorded don pieces finished parks dinner lawyers sydney stress cream ss runs trends yeah discover sexo ap patterns boxes louisiana hills javascript fourth nm advisor mn marketplace nd evil aware wilson shape evolution irish certificates objectives stations suggested gps op remains acc greatest firms concerned euro operator structures generic encyclopedia usage cap ink charts continuing mixed census interracial peak tn competitive exist wheel transit dick suppliers salt compact poetry lights tracking angel bell keeping preparation attempt receiving matches accordance width noise engines forget array discussed accurate stephen elizabeth climate reservations pin playstation alcohol greek instruction managing annotation sister raw differences walking explain smaller newest establish gnu happened expressed jeff extent sharp lesbians ben lane paragraph kill mathematics aol compensation ce export managers aircraft modules sweden conflict conducted versions employer occur percentage knows mississippi describe concern backup requested citizens connecticut heritage personals immediate holding trouble spread coach kevin agricultural expand supporting audience assigned jordan collections ages participate plug specialist cook affect virgin experienced investigation raised hat institution directed dealers searching sporting helping perl affected lib bike totally plate expenses indicate blonde ab proceedings favourite transmission anderson utc characteristics der lose organic seek experiences albums cheats extremely verzeichnis contracts guests hosted diseases concerning developers equivalent chemistry tony neighborhood nevada kits thailand variables agenda anyway continues tracks advisory cam curriculum logic template prince circle soil grants anywhere psychology responses atlantic wet circumstances edward investor identification ram leaving wildlife appliances matt elementary cooking speaking sponsors fox unlimited respond sizes plain exit entered iran arm keys launch wave checking costa belgium printable holy acts guidance mesh trail enforcement symbol crafts highway buddy hardcover observed dean setup poll booking glossary fiscal celebrity styles denver unix filled bond channels ericsson appendix notify blues chocolate pub portion scope hampshire supplier cables cotton bluetooth controlled requirement authorities biology dental killed border ancient debate representatives starts pregnancy causes arkansas biography leisure attractions learned transactions notebook explorer historic attached opened tm husband disabled authorized crazy upcoming britain concert retirement scores financing efficiency sp comedy adopted efficient weblog linear commitment specialty bears jean hop carrier edited constant visa mouth jewish meter linked portland interviews concepts nh gun reflect pure deliver wonder hell lessons fruit begins qualified reform lens alerts treated discovery draw mysql classified relating assume confidence alliance fm confirm warm neither lewis howard offline leaves engineer lifestyle consistent replace clearance connections inventory converter suck organisation babe checks reached becoming blowjob safari objective indicated sugar crew legs sam stick securities allen pdt relation enabled genre slide montana volunteer tested rear democratic enhance switzerland exact bound parameter adapter processor node formal dimensions contribute lock hockey storm micro colleges laptops mile showed challenges editors mens threads bowl supreme brothers recognition presents ref tank submission dolls estimate encourage navy kid regulatory inspection consumers cancel limits territory transaction manchester weapons paint delay pilot outlet contributions continuous db czech resulting cambridge initiative novel pan execution disability increases ultra winner idaho contractor ph episode examination potter dish plays bulletin ia pt indicates modify oxford adam truly epinions painting committed extensive affordable universe candidate databases patent slot psp outstanding ha eating perspective planned watching lodge messenger mirror tournament consideration ds discounts sterling sessions kernel boobs stocks buyers journals gray catalogue ea jennifer antonio charged broad taiwan und chosen demo greece lg swiss sarah clark labour hate terminal publishers nights behalf caribbean liquid rice nebraska loop salary reservation foods gourmet guard properly orleans saving nfl remaining empire resume twenty newly raise prepare avatar gary depending illegal expansion vary hundreds rome arab lincoln helped premier tomorrow purchased milk decide consent drama visiting performing downtown keyboard contest collected nw bands boot suitable ff absolutely millions lunch dildo audit push chamber guinea findings muscle featuring iso implement clicking scheduled polls typical tower yours sum misc calculator significantly chicken temporary attend shower alan sending jason tonight dear sufficient holdem shell province catholic oak vat awareness vancouver governor beer seemed contribution measurement swimming spyware formula constitution packaging solar jose catch jane pakistan ps reliable consultation northwest sir doubt earn finder unable periods classroom tasks democracy attacks kim wallpaper merchandise const resistance doors symptoms resorts biggest memorial visitor twin forth insert baltimore gateway ky dont alumni drawing candidates charlotte ordered biological fighting transition happens preferences spy romance instrument bruce split themes powers heaven br bits pregnant twice classification focused egypt physician hollywood bargain wikipedia cellular norway vermont asking blocks normally lo spiritual hunting diabetes suit ml shift chip res sit bodies photographs cutting wow simon writers marks flexible loved favourites mapping numerous relatively birds satisfaction represents char indexed pittsburgh superior preferred saved paying cartoon shots intellectual moore granted choices carbon spending comfortable magnetic interaction listening effectively registry crisis outlook massive denmark employed bright treat header cs poverty formed piano echo que grid sheets patrick experimental puerto revolution consolidation displays plasma allowing earnings voip mystery landscape dependent mechanical journey delaware bidding consultants risks banner applicant charter fig barbara cooperation counties acquisition ports implemented sf directories recognized dreams blogger notification kg licensing stands teach occurred textbooks rapid pull hairy diversity cleveland ut reverse deposit seminar investments latina nasa wheels sexcam specify accessibility dutch sensitive templates formats tab depends boots holds router concrete si editing poland folder womens css completion upload pulse universities technique contractors milfhunter voting courts notices subscriptions calculate mc detroit alexander broadcast converted metro toshiba anniversary improvements strip specification pearl accident nick accessible accessory resident plot qty possibly airline typically representation regard pump exists arrangements smooth conferences uniprotkb beastiality strike consumption birmingham flashing lp narrow afternoon threat surveys sitting putting consultant controller ownership committees penis legislative researchers vietnam trailer anne castle gardens missed malaysia unsubscribe antique labels willing bio molecular upskirt acting heads stored exam logos residence attorneys milfs antiques density hundred ryan operators strange sustainable philippines statistical beds breasts mention innovation pcs employers grey parallel honda amended operate bills bold bathroom stable opera definitions von doctors lesson cinema asset ag scan elections drinking blowjobs reaction blank enhanced entitled severe generate stainless newspapers hospitals vi deluxe humor aged monitors exception lived duration bulk successfully indonesia pursuant sci fabric edt visits primarily tight domains capabilities pmid contrast recommendation flying recruitment sin berlin cute organized ba para siemens adoption improving cr expensive meant capture pounds buffalo organisations plane pg explained seed programmes desire expertise mechanism camping ee jewellery meets welfare peer caught eventually marked driven measured medline bottle agreements considering innovative marshall massage rubber conclusion closing tampa thousand meat legend grace susan ing ks adams python monster alex bang villa bone columns disorders bugs collaboration hamilton detection ftp cookies inner formation tutorial med engineers entity cruises gate holder proposals moderator sw tutorials settlement portugal lawrence roman duties valuable erotic tone collectables ethics forever dragon busy captain fantastic imagine brings heating leg neck hd wing governments purchasing scripts abc stereo appointed taste dealing commit tiny operational rail airlines liberal livecam jay trips gap sides tube turns corresponding descriptions cache belt jacket determination animation oracle er matthew lease productions aviation hobbies proud excess disaster console commands jr telecommunications instructor giant achieved injuries shipped bestiality seats approaches biz alarm voltage anthony nintendo usual loading stamps appeared franklin angle rob vinyl highlights mining designers melbourne ongoing worst imaging betting scientists liberty wyoming blackjack argentina era convert possibility analyst commissioner dangerous garage exciting reliability thongs gcc unfortunately respectively volunteers attachment ringtone finland morgan derived pleasure honor asp oriented eagle desktops pants columbus nurse prayer appointment workshops hurricane quiet luck postage producer represented mortgages dial responsibilities cheese comic carefully jet productivity investors crown par underground diagnosis maker crack principle picks vacations gang semester calculated cumshot fetish applies casinos appearance smoke apache filters incorporated nv craft cake notebooks apart fellow blind lounge mad algorithm semi coins andy gross strongly cafe valentine hilton ken proteins horror su exp familiar capable douglas debian till involving pen investing christopher admission epson shoe elected carrying victory sand madison terrorism joy editions cpu mainly ethnic ran parliament actor finds seal situations fifth allocated citizen vertical corrections structural municipal describes prize sr occurs jon absolute disabilities consists anytime substance prohibited addressed lies pipe soldiers nr guardian lecture simulation layout initiatives ill concentration classics lbs lay interpretation horses lol dirty deck wayne donate taught bankruptcy mp worker optimization alive temple substances prove discovered wings breaks genetic restrictions participating waters promise thin exhibition prefer ridge cabinet modem harris mph bringing sick dose evaluate tiffany tropical collect bet composition toyota streets nationwide vector definitely shaved turning buffer purple existence commentary larry limousines developments def immigration destinations lets mutual pipeline necessarily syntax li attribute prison skill chairs nl everyday apparently surrounding mountains moves popularity inquiry ethernet checked exhibit throw trend sierra visible cats desert postposted ya oldest rhode nba busty coordinator obviously mercury steven handbook greg navigate worse summit victims epa spaces fundamental burning escape coupons somewhat receiver substantial tr progressive cialis bb boats glance scottish championship arcade richmond sacramento impossible ron russell tells obvious fiber depression graph covering platinum judgment bedrooms talks filing foster modeling passing awarded testimonials trials tissue nz memorabilia clinton masters bonds cartridge alberta explanation folk org commons cincinnati subsection fraud electricity permitted spectrum arrival okay pottery emphasis roger aspect workplace awesome mexican confirmed counts priced wallpapers hist crash lift desired inter closer assumes heights shadow riding infection firefox lisa expense grove eligibility venture clinic korean healing princess mall entering packet spray studios involvement dad buttons placement observations vbulletin funded thompson winners extend roads subsequent pat dublin rolling fell motorcycle yard disclosure establishment memories nelson te arrived creates faces tourist cocks av mayor murder sean adequate senator yield presentations grades cartoons pour digest reg lodging tion dust hence wiki entirely replaced radar rescue undergraduate losses combat reducing stopped occupation lakes butt donations associations citysearch closely radiation diary seriously kings shooting kent adds nsw ear flags pci baker launched elsewhere pollution conservative guestbook shock effectiveness walls abroad ebony tie ward drawn arthur ian visited roof walker demonstrate atmosphere suggests kiss beast ra operated experiment targets overseas purchases dodge counsel federation pizza invited yards assignment chemicals gordon mod farmers rc queries bmw rush ukraine absence nearest cluster vendors mpeg whereas yoga serves woods surprise lamp rico partial shoppers phil everybody couples nashville ranking jokes cst http ceo simpson twiki sublime counseling palace acceptable satisfied glad wins measurements verify globe trusted copper milwaukee rack medication warehouse shareware ec rep dicke kerry receipt supposed ordinary nobody ghost violation configure stability mit applying southwest boss pride institutional expectations independence knowing reporter metabolism keith champion cloudy linda ross personally chile anna plenty solo sentence throat ignore maria uniform excellence wealth tall rm somewhere vacuum dancing attributes recognize brass writes plaza pdas outcomes survival quest publish sri screening toe thumbnail trans jonathan whenever nova lifetime api pioneer booty forgotten acrobat plates acres venue athletic thermal essays behaviour vital telling fairly coastal config cf charity intelligent edinburgh vt excel modes obligation campbell wake stupid harbor hungary traveler urw segment realize regardless lan enemy puzzle rising aluminum wells wishlist opens insight sms shit restricted republican secrets lucky latter merchants thick trailers repeat syndrome philips attendance penalty drum glasses enables nec iraqi builder vista jessica chips terry flood foto ease arguments amsterdam orgy arena adventures pupils stewart announcement tabs outcome xx appreciate expanded casual grown polish lovely extras gm centres jerry clause smile lands ri troops indoor bulgaria armed broker charger regularly believed pine cooling tend gulf rt rick trucks cp mechanisms divorce laura shopper tokyo partly nikon customize tradition candy pills tiger donald folks sensor exposed telecom hunt angels deputy indicators sealed thai emissions physicians loaded fred complaint scenes experiments balls afghanistan dd boost spanking scholarship governance mill founded supplements chronic icons tranny moral den catering aud finger keeps pound locate camcorder pl trained burn implementing roses labs ourselves bread tobacco wooden motors tough roberts incident gonna dynamics lie crm rf conversation decrease cumshots chest pension billy revenues emerging worship bukkake capability ak fe craig herself producing churches precision damages reserves contributed solve shorts reproduction minority td diverse amp ingredients sb ah johnny sole franchise recorder complaints facing sm nancy promotions tones passion rehabilitation maintaining sight laid clay defence patches weak refund usc towns environments trembl divided blvd reception amd wise emails cyprus wv odds correctly insider seminars consequences makers hearts geography appearing integrity worry ns discrimination eve carter legacy marc pleased danger vitamin widely processed phrase genuine raising implications functionality paradise hybrid reads roles intermediate emotional sons leaf pad glory platforms ja bigger billing diesel versus combine overnight geographic exceed bs rod saudi fault cuba hrs preliminary districts introduce silk promotional kate chevrolet babies bi karen compiled romantic revealed specialists generator albert examine jimmy graham suspension bristol margaret compaq sad correction wolf slowly authentication communicate rugby supplement showtimes cal portions infant promoting sectors samuel fluid grounds fits kick regards meal ta hurt machinery bandwidth unlike equation baskets probability pot dimension wright img barry proven schedules admissions cached warren slip studied reviewer involves quarterly rpm profits devil grass comply marie florist illustrated cherry continental alternate deutsch achievement limitations kenya webcam cuts funeral nutten earrings enjoyed automated chapters pee charlie quebec nipples passenger convenient dennis mars francis tvs sized manga noticed socket silent literary egg mhz signals caps orientation pill theft childhood swing symbols lat meta humans analog facial choosing talent dated flexibility seeker wisdom shoot boundary mint packard offset payday philip elite gi spin holders believes swedish poems deadline jurisdiction robot displaying witness collins equipped stages encouraged sur winds powder broadway acquired assess wash cartridges stones entrance gnome roots declaration losing attempts gadgets noble glasgow automation impacts rev gospel advantages shore loves induced ll knight preparing loose aims recipient linking extensions appeals cl earned illness islamic athletics southeast ieee ho alternatives pending parker determining lebanon corp personalized kennedy gt sh conditioning teenage soap ae triple cooper nyc vincent jam secured unusual answered partnerships destruction slots increasingly migration disorder routine toolbar basically rocks conventional titans applicants wearing axis sought genes mounted habitat firewall median guns scanner herein occupational animated horny judicial rio hs adjustment hero integer treatments bachelor attitude camcorders engaged falling basics montreal carpet rv struct lenses binary genetics attended difficulty punk collective coalition pi dropped enrollment duke walter ai pace besides wage producers ot collector arc hosts interfaces advertisers moments atlas strings dawn representing observation feels torture carl deleted coat mitchell mrs rica restoration convenience returning ralph opposition container yr defendant warner confirmation app embedded inkjet supervisor wizard corps actors liver peripherals liable brochure morris bestsellers petition eminem recall antenna picked assumed departure minneapolis belief killing bikini memphis shoulder decor lookup texts harvard brokers roy ion diameter ottawa doll ic podcast tit seasons peru interactions refine bidder singer evans herald literacy fails aging nike intervention pissing fed plugin attraction diving invite modification alice latinas suppose customized reed involve moderate terror younger thirty mice opposite understood rapidly dealtime ban temp intro mercedes zus assurance fisting clerk happening vast mills outline amendments tramadol holland receives jeans metropolitan compilation verification fonts ent odd wrap refers mood favor veterans quiz mx sigma gr attractive xhtml occasion recordings jefferson victim demands sleeping careful ext beam gardening obligations arrive orchestra sunset tracked moreover minimal polyphonic lottery tops framed aside outsourcing licence adjustable allocation michelle essay discipline amy ts demonstrated dialogue identifying alphabetical camps declared dispatched aaron handheld trace disposal shut florists packs ge installing switches romania voluntary ncaa thou consult phd greatly blogging mask cycling midnight ng commonly pe photographer inform turkish coal cry messaging pentium quantum murray intent tt zoo largely pleasant announce constructed additions requiring spoke aka arrow engagement sampling rough weird tee refinance lion inspired holes weddings blade suddenly oxygen cookie meals canyon goto meters merely calendars arrangement conclusions passes bibliography pointer compatibility stretch durham furthermore permits cooperative muslim xl neil sleeve netscape cleaner cricket beef feeding stroke township rankings measuring cad hats robin robinson jacksonville strap headquarters sharon crowd tcp transfers surf olympic transformation remained attachments dv dir entities customs administrators personality rainbow hook roulette decline gloves israeli medicare cord skiing cloud facilitate subscriber valve val hewlett explains proceed flickr feelings knife jamaica priorities shelf bookstore timing liked parenting adopt denied fotos incredible britney freeware fucked donation outer crop deaths rivers commonwealth pharmaceutical manhattan tales katrina workforce islam nodes tu fy thumbs seeds cited lite ghz hub targeted organizational skype realized twelve founder decade gamecube rr dispute portuguese tired titten adverse everywhere excerpt eng steam discharge ef drinks ace voices acute halloween climbing stood sing tons perfume carol honest albany hazardous restore stack methodology somebody sue ep housewares reputation resistant democrats recycling hang gbp curve creator amber qualifications museums coding slideshow tracker variation passage transferred trunk hiking lb damn pierre jelsoft headset photograph oakland colombia waves camel distributor lamps underlying hood wrestling suicide archived photoshop jp chi bt arabia gathering projection juice chase mathematical logical sauce fame extract specialized diagnostic panama indianapolis af payable corporations courtesy criticism automobile confidential rfc statutory accommodations athens northeast downloaded judges sl seo retired isp remarks detected decades paintings walked arising nissan bracelet ins eggs juvenile injection yorkshire populations protective afraid acoustic railway cassette initially indicator pointed hb jpg causing mistake norton locked eliminate tc fusion mineral sunglasses ruby steering beads fortune preference canvas threshold parish claimed screens cemetery planner croatia flows stadium venezuela exploration mins fewer sequences coupon nurses ssl stem proxy gangbang astronomy lanka opt edwards drew contests flu translate announces mlb costume tagged berkeley voted killer bikes gates adjusted rap tune bishop pulled corn gp shaped compression seasonal establishing farmer counters puts constitutional grew perfectly tin slave instantly cultures norfolk coaching examined trek encoding litigation submissions oem heroes painted lycos ir zdnet broadcasting horizontal artwork cosmetic resulted portrait terrorist informational ethical carriers ecommerce mobility floral builders ties struggle schemes suffering neutral fisher rat spears prospective dildos bedding ultimately joining heading equally artificial bearing spectacular coordination connector brad combo seniors worlds guilty affiliated activation naturally haven tablet jury dos tail subscribers charm lawn violent mitsubishi underwear basin soup potentially ranch constraints crossing inclusive dimensional cottage drunk considerable crimes resolved mozilla byte toner nose latex branches anymore oclc delhi holdings alien locator selecting processors pantyhose plc broke nepal zimbabwe difficulties juan complexity msg constantly browsing resolve barcelona presidential documentary cod territories melissa moscow thesis thru jews nylon palestinian discs rocky bargains frequent trim nigeria ceiling pixels ensuring hispanic cv cb legislature hospitality gen anybody procurement diamonds espn fleet untitled bunch totals marriott singing theoretical afford exercises starring referral nhl surveillance optimal quit distinct protocols lung highlight substitute inclusion hopefully brilliant turner sucking cents reuters ti fc gel todd spoken omega evaluated stayed civic assignments fw manuals doug sees termination watched saver thereof grill households gs redeem rogers grain aaa authentic regime wanna wishes bull montgomery architectural louisville depend differ macintosh movements ranging monica repairs breath amenities virtually cole mart candle hanging colored authorization tale verified lynn formerly projector bp situated comparative std seeks herbal loving strictly routing docs stanley psychological surprised retailer vitamins elegant gains renewal vid genealogy opposed deemed scoring expenditure panties brooklyn liverpool sisters critics connectivity spots oo algorithms hacker madrid similarly margin coin bbw solely fake salon collaborative norman fda excluding turbo headed voters cure madonna commander arch ni murphy thinks thats suggestion hdtv soldier phillips asin aimed justin bomb harm interval mirrors spotlight tricks reset brush investigate thy expansys panels repeated assault connecting spare logistics deer kodak tongue bowling tri danish pal monkey proportion filename skirt florence invest honey um analyses drawings significance scenario ye fs lovers atomic approx symposium arabic gauge essentials junction protecting nn faced mat rachel solving transmitted weekends screenshots produces oven ted intensive chains kingston sixth engage deviant noon switching quoted adapters correspondence farms imports supervision cheat bronze expenditures sandy separation testimony suspect celebrities macro sender mandatory boundaries crucial syndication gym celebration kde adjacent filtering tuition spouse exotic viewer signup threats luxembourg puzzles reaching vb damaged cams receptor piss laugh joel surgical destroy citation pitch autos yo premises perry proved offensive imperial dozen benjamin deployment teeth cloth studying colleagues stamp lotus salmon olympus separated proc cargo tan directive fx salem mate dl starter upgrades likes butter pepper weapon luggage burden chef tapes zones races isle stylish slim maple luke grocery offshore governing retailers depot kenneth comp alt pie blend harrison ls julie occasionally cbs attending emission pete spec finest realty janet bow penn recruiting apparent instructional phpbb autumn traveling probe midi permissions biotechnology toilet ranked jackets routes packed excited outreach helen mounting recover tied lopez balanced prescribed catherine timely talked upskirts debug delayed chuck reproduced hon dale explicit calculation villas ebook consolidated boob exclude peeing occasions brooks equations newton oils sept exceptional anxiety bingo whilst spatial respondents unto lt ceramic prompt precious minds annually considerations scanners atm xanax eq pays cox fingers sunny ebooks delivers je queensland necklace musicians leeds composite unavailable cedar arranged lang theaters advocacy raleigh stud fold essentially designing threaded uv qualify fingering blair hopes assessments cms mason diagram burns pumps slut ejaculation footwear sg vic beijing peoples victor mario pos attach licenses utils removing advised brunswick spider phys ranges pairs sensitivity trails preservation hudson isolated calgary interim assisted divine streaming approve chose compound intensity technological syndicate abortion dialog venues blast wellness calcium newport antivirus addressing pole discounted indians shield harvest membrane prague previews bangladesh constitute locally concluded pickup desperate mothers nascar iceland demonstration governmental manufactured candles graduation mega bend sailing variations moms sacred addiction morocco chrome tommy springfield refused brake exterior greeting ecology oliver congo glen botswana nav delays synthesis olive undefined unemployment cyber verizon scored enhancement newcastle clone dicks velocity lambda relay composed tears performances oasis baseline cab angry fa societies silicon brazilian identical petroleum compete ist norwegian lover belong honolulu beatles lips escort retention exchanges pond rolls thomson barnes soundtrack wondering malta daddy lc ferry rabbit profession seating dam cnn separately physiology lil collecting das exports omaha tire participant scholarships recreational dominican chad electron loads friendship heather passport motel unions treasury warrant sys solaris frozen occupied josh royalty scales rally observer sunshine strain drag ceremony somehow arrested expanding provincial investigations icq ripe yamaha rely medications hebrew gained rochester dying laundry stuck solomon placing stops homework adjust assessed advertiser enabling encryption filling downloadable sophisticated imposed silence scsi focuses soviet possession cu laboratories treaty vocal trainer organ stronger volumes advances vegetables lemon toxic dns thumbnails darkness pty ws nuts nail bizrate vienna implied span stanford sox stockings joke respondent packing statute rejected satisfy destroyed shelter chapel gamespot manufacture layers wordpress guided vulnerability accountability celebrate accredited appliance compressed bahamas powell mixture zoophilia bench univ tub rider scheduling radius perspectives mortality logging hampton christians borders therapeutic pads butts inns bobby impressive sheep accordingly architect railroad lectures challenging wines nursery harder cups ash microwave cheapest accidents travesti relocation stuart contributors salvador ali salad np monroe tender violations foam temperatures paste clouds competitions discretion tft tanzania preserve jvc poem vibrator unsigned staying cosmetics easter theories repository praise jeremy venice jo concentrations vibrators estonia christianity veteran streams landing signing executed katie negotiations realistic dt cgi showcase integral asks relax namibia generating christina congressional synopsis hardly prairie reunion composer bean sword absent photographic sells ecuador hoping accessed spirits modifications coral pixel float colin bias imported paths bubble por acquire contrary millennium tribune vessel acids focusing viruses cheaper admitted dairy admit mem fancy equality samoa gc achieving tap stickers fisheries exceptions reactions leasing lauren beliefs ci macromedia companion squad analyze ashley scroll relate divisions swim wages additionally suffer forests fellowship nano invalid concerts martial males victorian retain colours execute tunnel genres cambodia patents copyrights yn chaos lithuania mastercard wheat chronicles obtaining beaver updating distribute readings decorative kijiji confused compiler enlargement eagles bases vii accused bee campaigns unity loud conjunction bride rats defines airports instances indigenous begun cfr brunette packets anchor socks validation parade corruption stat trigger incentives cholesterol gathered essex slovenia notified differential beaches folders dramatic surfaces terrible routers cruz pendant dresses baptist scientist starsmerchant hiring clocks arthritis bios females wallace nevertheless reflects taxation fever pmc cuisine surely practitioners transcript myspace theorem inflation thee nb ruth pray stylus compounds pope drums contracting topless arnold structured reasonably jeep chicks bare hung cattle mba radical graduates rover recommends controlling treasure reload distributors flame levitra tanks assuming monetary elderly pit arlington mono particles floating extraordinary tile indicating bolivia spell hottest stevens coordinate kuwait exclusively emily alleged limitation widescreen compile squirting webster struck rx illustration plymouth warnings construct apps inquiries bridal annex mag gsm inspiration tribal curious affecting freight rebate meetup eclipse sudan ddr downloading rec shuttle aggregate stunning cycles affects forecasts detect sluts actively ciao ampland knee prep pb complicated chem fastest butler shopzilla injured decorating payroll cookbook expressions ton courier uploaded shakespeare hints collapse americas connectors twinks unlikely oe gif pros conflicts techno beverage tribute wired elvis immune latvia travelers forestry barriers cant jd rarely gpl infected offerings martha genesis barrier argue incorrect trains metals bicycle furnishings letting arise guatemala celtic thereby irc jamie particle perception minerals advise humidity bottles boxing wy dm bangkok renaissance pathology sara bra ordinance hughes photographers bitch infections jeffrey chess operates brisbane configured survive oscar festivals menus joan possibilities duck reveal canal amino phi contributing herbs clinics mls cow manitoba analytical missions watson lying costumes strict dive saddam circulation drill offense threesome bryan cet protest handjob assumption jerusalem hobby tries transexuales invention nickname fiji technician inline executives enquiries washing audi staffing cognitive exploring trick enquiry closure raid ppc timber volt intense div playlist registrar showers supporters ruling steady dirt statutes withdrawal myers drops predicted wider saskatchewan jc cancellation plugins enrolled sensors screw ministers publicly hourly blame geneva freebsd veterinary acer prostores reseller dist handed suffered intake informal relevance incentive butterfly tucson mechanics heavily swingers fifty headers mistakes numerical ons geek uncle defining xnxx counting reflection sink accompanied assure invitation devoted princeton jacob sodium randy spirituality hormone meanwhile proprietary timothy childrens brick grip naval thumbzilla medieval porcelain avi bridges pichunter captured watt thehun decent casting dayton translated shortly cameron columnists pins carlos reno donna andreas warrior diploma cabin innocent bdsm scanning ide consensus polo valium copying rpg delivering cordless patricia horn eddie uganda fired journalism pd prot trivia adidas perth frog grammar intention syria disagree klein harvey tires logs undertaken tgp hazard retro leo livesex statewide semiconductor gregory episodes boolean circular anger diy mainland illustrations suits chances interact snap happiness arg substantially bizarre glenn ur auckland olympics fruits identifier geo worldsex ribbon calculations doe jpeg conducting startup suzuki trinidad ati kissing wal handy swap exempt crops reduces accomplished calculators geometry impression abs slovakia flip guild correlation gorgeous capitol sim dishes rna barbados chrysler nervous refuse extends fragrance mcdonald replica plumbing brussels tribe neighbors trades superb buzz transparent nuke rid trinity charleston handled legends boom calm champions floors selections projectors inappropriate exhaust comparing shanghai speaks burton vocational davidson copied scotia farming gibson pharmacies fork troy ln roller introducing batch organize appreciated alter nicole latino ghana edges uc mixing handles skilled fitted albuquerque harmony distinguished asthma projected assumptions shareholders twins developmental rip zope regulated triangle amend anticipated oriental reward windsor zambia completing gmbh buf ld hydrogen webshots sprint comparable chick advocate sims confusion copyrighted tray inputs warranties genome escorts documented thong medal paperbacks coaches vessels harbour walks sucks sol keyboards sage knives eco vulnerable arrange artistic bat honors booth indie reflected unified bones breed detector ignored polar fallen precise sussex respiratory notifications msgid transexual mainstream invoice evaluating lip subcommittee sap gather suse maternity backed alfred colonial mf carey motels forming embassy cave journalists danny rebecca slight proceeds indirect amongst wool foundations msgstr arrest volleyball mw adipex horizon nu deeply toolbox ict marina liabilities prizes bosnia browsers decreased patio dp tolerance surfing creativity lloyd describing optics pursue lightning overcome eyed ou quotations grab inspector attract brighton beans bookmarks ellis disable snake succeed leonard lending oops reminder nipple xi searched behavioral riverside bathrooms plains sku ht raymond insights abilities initiated sullivan za midwest karaoke trap lonely fool ve nonprofit lancaster suspended hereby observe julia containers attitudes karl berry collar simultaneously racial integrate bermuda amanda sociology mobiles screenshot exhibitions kelkoo confident retrieved exhibits officially consortium dies terrace bacteria pts replied seafood novels rh rrp recipients playboy ought delicious traditions fg jail safely finite kidney periodically fixes sends durable mazda allied throws moisture hungarian roster referring symantec spencer wichita nasdaq uruguay ooo hz transform timer tablets tuning gotten educators tyler futures vegetable verse highs humanities independently wanting custody scratch launches ipaq alignment masturbating henderson bk britannica comm ellen competitors nhs rocket aye bullet towers racks lace nasty visibility latitude consciousness ste tumor ugly deposits beverly mistress encounter trustees watts duncan reprints hart bernard resolutions ment accessing forty tubes attempted col midlands priest floyd ronald analysts queue dx sk trance locale nicholas biol yu bundle hammer invasion witnesses runner rows administered notion sq skins mailed oc fujitsu spelling arctic exams rewards beneath strengthen defend aj frederick medicaid treo infrared seventh gods une welsh belly aggressive tex advertisements quarters stolen cia sublimedirectory soonest haiti disturbed determines sculpture poly ears dod wp fist naturals neo motivation lenders pharmacology fitting fixtures bloggers mere agrees passengers quantities petersburg consistently powerpoint cons surplus elder sonic obituaries cheers dig taxi punishment appreciation subsequently om belarus nat zoning gravity providence thumb restriction incorporate backgrounds treasurer guitars essence flooring lightweight ethiopia tp mighty athletes humanity transcription jm holmes complications scholars dpi scripting gis remembered galaxy chester snapshot caring loc worn synthetic shaw vp segments testament expo dominant twist specifics itunes stomach partially buried cn newbie minimize darwin ranks wilderness debut generations tournaments bradley deny anatomy bali judy sponsorship headphones fraction trio proceeding cube defects volkswagen uncertainty breakdown milton marker reconstruction subsidiary strengths clarity rugs sandra adelaide encouraging furnished monaco settled folding emirates terrorists airfare comparisons beneficial distributions vaccine belize crap fate viewpicture promised volvo penny robust bookings threatened minolta republicans discusses gui porter gras jungle ver rn responded rim abstracts zen ivory alpine dis prediction pharmaceuticals andale fabulous remix alias thesaurus individually battlefield literally newer kay ecological spice oval implies cg soma ser cooler appraisal consisting maritime periodic submitting overhead ascii prospect shipment breeding citations geographical donor mozambique tension href benz trash shapes wifi tier fwd earl manor envelope diane homeland disclaimers championships excluded andrea breeds rapids disco sheffield bailey aus endif finishing emotions wellington incoming prospects lexmark cleaners bulgarian hwy eternal cashiers guam cite aboriginal remarkable rotation nam preventing productive boulevard eugene ix gdp pig metric compliant minus penalties bennett imagination hotmail refurbished joshua armenia varied grande closest activated actress mess conferencing assign armstrong politicians trackbacks lit accommodate tigers aurora una slides milan premiere lender villages shade chorus christine rhythm digit argued dietary symphony clarke sudden accepting precipitation marilyn lions findlaw ada pools tb lyric claire isolation speeds sustained matched approximate rope carroll rational programmer fighters chambers dump greetings inherited warming incomplete vocals chronicle fountain chubby grave legitimate biographies burner yrs foo investigator gba plaintiff finnish gentle bm prisoners deeper muslims hose mediterranean nightlife footage howto worthy reveals architects saints entrepreneur carries sig freelance duo excessive devon screensaver helena saves regarded valuation unexpected cigarette fog characteristic marion lobby egyptian tunisia metallica outlined consequently headline treating punch appointments str gotta cowboy narrative bahrain enormous karma consist betty queens academics pubs quantitative shemales lucas screensavers subdivision tribes vip defeat clicks distinction honduras naughty hazards insured harper livestock mardi exemption tenant sustainability cabinets tattoo shake algebra shadows holly formatting silly nutritional yea mercy hartford freely marcus sunrise wrapping mild fur nicaragua weblogs timeline tar belongs rj readily affiliation soc fence nudist infinite diana ensures relatives lindsay clan legally shame satisfactory revolutionary bracelets sync civilian telephony mesa fatal remedy realtors breathing briefly thickness adjustments graphical genius discussing aerospace fighter meaningful flesh retreat adapted barely wherever estates rug democrat borough maintains failing shortcuts ka retained voyeurweb pamela andrews marble extending jesse specifies hull logitech surrey briefing belkin dem accreditation wav blackberry highland meditation modular microphone macedonia combining brandon instrumental giants organizing shed balloon moderators winston memo ham solved tide kazakhstan hawaiian standings partition invisible gratuit consoles funk fbi qatar magnet translations porsche cayman jaguar reel sheer commodity posing wang kilometers rp bind thanksgiving rand hopkins urgent guarantees infants gothic cylinder witch buck indication eh congratulations tba cohen sie usgs puppy kathy acre graphs surround cigarettes revenge expires enemies lows controllers aqua chen emma consultancy finances accepts enjoying conventions eva patrol smell pest hc italiano coordinates rca fp carnival roughly sticker promises responding reef physically divide stakeholders hydrocodone gst consecutive cornell satin bon deserve attempting mailto promo jj representations chan worried tunes garbage competing combines mas beth bradford len phrases kai peninsula chelsea boring reynolds dom jill accurately speeches reaches schema considers sofa catalogs ministries vacancies quizzes parliamentary obj prefix lucia savannah barrel typing nerve dans planets deficit boulder pointing renew coupled viii myanmar metadata harold circuits floppy texture handbags jar ev somerset incurred acknowledge thoroughly antigua nottingham thunder tent caution identifies questionnaire qualification locks modelling namely miniature dept hack dare euros interstate pirates aerial hawk consequence rebel systematic perceived origins hired makeup textile lamb madagascar nathan tobago presenting cos troubleshooting uzbekistan indexes pac rl erp centuries gl magnitude ui richardson hindu dh fragrances vocabulary licking earthquake vpn fundraising fcc markers weights albania geological assessing lasting wicked eds introduces kills roommate webcams pushed webmasters ro df computational acdbentity participated junk handhelds wax lucy answering hans impressed slope reggae failures poet conspiracy surname theology nails evident whats rides rehab epic saturn organizer nut allergy sake twisted combinations preceding merit enzyme cumulative zshops planes edmonton tackle disks condo pokemon amplifier ambien arbitrary prominent retrieve lexington vernon sans worldcat titanium irs fairy builds contacted shaft lean bye cdt recorders occasional leslie casio deutsche ana postings innovations kitty postcards dude drain monte fires algeria blessed luis reviewing cardiff cornwall favors potato panic explicitly sticks leone transsexual ez citizenship excuse reforms basement onion strand pf sandwich uw lawsuit alto informative girlfriend bloomberg cheque hierarchy influenced banners reject eau abandoned bd circles italic beats merry mil scuba gore complement cult dash passive mauritius valued cage checklist bangbus requesting courage verde lauderdale scenarios gazette hitachi divx extraction batman elevation hearings coleman hugh lap utilization beverages calibration jake eval efficiently anaheim ping textbook dried entertaining prerequisite luther frontier settle stopping refugees knights hypothesis palmer medicines flux derby sao peaceful altered pontiac regression doctrine scenic trainers muze enhancements renewable intersection passwords sewing consistency collectors conclude recognised munich oman celebs gmc propose hh azerbaijan lighter rage adsl uh prix astrology advisors pavilion tactics trusts occurring supplemental travelling talented annie pillow induction derek precisely shorter harley spreading provinces relying finals paraguay steal parcel refined fd bo fifteen widespread incidence fears predict boutique acrylic rolled tuner avon incidents peterson rays asn shannon toddler enhancing flavor alike walt homeless horrible hungry metallic acne blocked interference warriors palestine listprice libs undo cadillac atmospheric malawi wm pk sagem knowledgestorm dana halo ppm curtis parental referenced strikes lesser publicity marathon ant proposition gays pressing gasoline apt dressed scout belfast exec dealt niagara inf eos warcraft charms catalyst trader bucks allowance vcr denial uri designation thrown prepaid raises gem duplicate electro criterion badge wrist civilization analyzed vietnamese heath tremendous ballot lexus varying remedies validity trustee maui handjobs weighted angola squirt performs plastics realm corrected jenny helmet salaries postcard elephant yemen encountered tsunami scholar nickel internationally surrounded psi buses expedia geology pct wb creatures coating commented wallet cleared smilies vids accomplish boating drainage shakira corners broader vegetarian rouge yeast yale newfoundland sn qld pas clearing investigated dk ambassador coated intend stephanie contacting vegetation doom findarticles louise kenny specially owen routines hitting yukon beings bite issn aquatic reliance habits striking myth infectious podcasts singh gig gilbert sas ferrari continuity brook fu outputs phenomenon ensemble insulin assured biblical weed conscious accent mysimon eleven wives ambient utilize mileage oecd prostate adaptor auburn unlock hyundai pledge vampire angela relates nitrogen xerox dice merger softball referrals quad dock differently firewire mods nextel framing organised musician blocking rwanda sorts integrating vsnet limiting dispatch revisions papua restored hint armor riders chargers remark dozens varies msie reasoning wn liz rendered picking charitable guards annotated ccd sv convinced openings buys burlington replacing researcher watershed councils occupations acknowledged nudity kruger pockets granny pork zu equilibrium viral inquire pipes characterized laden aruba cottages realtor merge privilege edgar develops qualifying chassis dubai estimation barn pushing llp fleece pediatric boc fare dg asus pierce allan dressing techrepublic sperm vg bald filme craps fuji frost leon institutes mold dame fo sally yacht tracy prefers drilling brochures herb tmp alot ate breach whale traveller appropriations suspected tomatoes benchmark beginners instructors highlighted bedford stationery idle mustang unauthorized clusters antibody competent momentum fin wiring io pastor mud calvin uni shark contributor demonstrates phases grateful emerald gradually laughing grows cliff desirable tract ul ballet ol journalist abraham js bumper afterwards webpage religions garlic hostels shine senegal explosion pn banned wendy briefs signatures diffs cove mumbai ozone disciplines casa mu daughters conversations radios tariff nvidia opponent pasta simplified muscles serum wrapped swift motherboard runtime inbox focal bibliographic vagina eden distant incl champagne ala decimal hq deviation superintendent propecia dip nbc samba hostel housewives employ mongolia penguin magical influences inspections irrigation miracle manually reprint reid wt hydraulic centered robertson flex yearly penetration wound belle rosa conviction hash omissions writings hamburg lazy mv mpg retrieval qualities cindy lolita fathers carb charging cas marvel lined cio dow prototype importantly rb petite apparatus upc terrain dui pens explaining yen strips gossip rangers nomination empirical mh rotary worm dependence discrete beginner boxed lid sexuality polyester cubic deaf commitments suggesting sapphire kinase skirts mats remainder crawford labeled privileges televisions specializing marking commodities pvc serbia sheriff griffin declined guyana spies blah mime neighbor motorcycles elect highways thinkpad concentrate intimate reproductive preston deadly cunt feof bunny chevy molecules rounds longest refrigerator tions intervals sentences dentists usda exclusion workstation holocaust keen flyer peas dosage receivers urls customise disposition variance navigator investigators cameroon baking marijuana adaptive computed needle baths enb gg cathedral brakes og nirvana ko fairfield owns til invision sticky destiny generous madness emacs climb blowing fascinating landscapes heated lafayette jackie wto computation hay cardiovascular ww sparc cardiac salvation dover adrian predictions accompanying vatican brutal learners gd selective arbitration configuring token editorials zinc sacrifice seekers guru isa removable convergence yields gibraltar levy suited numeric anthropology skating kinda aberdeen emperor grad malpractice dylan bras belts blacks educated rebates reporters burke proudly pix necessity rendering mic inserted pulling basename kyle obesity curves suburban touring clara vertex bw hepatitis nationally tomato andorra waterproof expired mj travels flush waiver pale specialties hayes humanitarian invitations functioning delight survivor garcia cingular economies alexandria bacterial moses counted undertake declare continuously johns valves gaps impaired achievements donors tear jewel teddy lf convertible ata teaches ventures nil bufing stranger tragedy julian nest pam dryer painful velvet tribunal ruled nato pensions prayers funky secretariat nowhere cop paragraphs gale joins adolescent nominations wesley dim lately cancelled scary mattress mpegs brunei likewise banana introductory slovak cakes stan reservoir occurrence idol bloody mixer remind wc worcester sbjct demographic charming mai tooth disciplinary annoying respected stays disclose affair drove washer upset restrict springer beside mines portraits rebound logan mentor interpreted evaluations fought baghdad elimination metres hypothetical immigrants complimentary helicopter pencil freeze hk performer abu titled commissions sphere powerseller moss ratios concord graduated endorsed ty surprising walnut lance ladder italia unnecessary dramatically liberia sherman cork maximize cj hansen senators workout mali yugoslavia bleeding characterization colon likelihood lanes purse fundamentals contamination mtv endangered compromise masturbation optimize stating dome caroline leu expiration namespace align peripheral bless engaging negotiation crest opponents triumph nominated confidentiality electoral changelog welding orgasm deferred alternatively heel alloy condos plots polished yang gently greensboro tulsa locking casey controversial draws fridge blanket bloom qc simpsons lou elliott recovered fraser justify upgrading blades pgp loops surge frontpage trauma aw tahoe advert possess demanding defensive sip flashers subaru forbidden tf vanilla programmers pj monitored installations deutschland picnic souls arrivals spank cw practitioner motivated wr dumb smithsonian hollow vault securely examining fioricet groove revelation rg pursuit delegation wires bl dictionaries mails backing greenhouse sleeps vc blake transparency dee travis wx endless figured orbit currencies niger bacon survivors positioning heater colony cannon circus promoted forbes mae moldova mel descending paxil spine trout enclosed feat temporarily ntsc cooked thriller transmit apnic fatty gerald pressed frequencies scanned reflections hunger mariah sic municipality usps joyce detective surgeon cement experiencing fireplace endorsement bg planners disputes textiles missile intranet closes seq psychiatry persistent deborah conf marco assists summaries glow gabriel auditor wma aquarium violin prophet cir bracket looksmart isaac oxide oaks magnificent erik colleague naples promptly modems adaptation hu harmful paintball prozac sexually enclosure acm dividend newark kw paso glucose phantom norm playback supervisors westminster turtle ips distances absorption treasures dsc warned neural ware fossil mia hometown badly transcripts apollo wan disappointed persian continually communist collectible handmade greene entrepreneurs robots grenada creations jade scoop acquisitions foul keno gtk earning mailman sanyo nested biodiversity excitement somalia movers verbal blink presently seas carlo workflow mysterious novelty bryant tiles voyuer librarian subsidiaries switched stockholm tamil garmin ru pose fuzzy indonesian grams therapist richards mrna budgets toolkit promising relaxation goat render carmen ira sen thereafter hardwood erotica temporal sail forge commissioners dense dts brave forwarding qt awful nightmare airplane reductions southampton istanbul impose organisms sega telescope viewers asbestos portsmouth cdna meyer enters pod savage advancement wu harassment willow resumes bolt gage throwing existed whore generators lu wagon barbie dat favour soa knock urge smtp generates potatoes thorough replication inexpensive kurt receptors peers roland optimum neon interventions quilt huntington creature ours mounts syracuse internship lone refresh aluminium snowboard beastality webcast michel evanescence subtle coordinated notre shipments maldives stripes firmware antarctica cope shepherd lm canberra cradle chancellor mambo lime kirk flour controversy legendary bool sympathy choir avoiding beautifully blond expects cho jumping fabrics antibodies polymer hygiene wit poultry virtue burst examinations surgeons bouquet immunology promotes mandate wiley departmental bbs spas ind corpus johnston terminology gentleman fibre reproduce convicted shades jets indices roommates adware qui intl threatening spokesman zoloft activists frankfurt prisoner daisy halifax encourages ultram cursor assembled earliest donated stuffed restructuring insects terminals crude morrison maiden simulations cz sufficiently examines viking myrtle bored cleanup yarn knit conditional mug crossword bother budapest conceptual knitting attacked hl bhutan liechtenstein mating compute redhead arrives translator automobiles tractor allah continent ob unwrap fares longitude resist challenged telecharger hoped pike safer insertion instrumentation ids hugo wagner constraint groundwater touched strengthening cologne gzip wishing ranger smallest insulation newman marsh ricky ctrl scared theta infringement bent laos subjective monsters asylum lightbox robbie stake cocktail outlets swaziland varieties arbor mediawiki configurations poison ethnicity dominated costly derivatives prevents stitch lesotho rifle severity rfid notable warfare retailing judiciary embroidery mama inland oscommerce nonfiction homeowners racism greenland interpret accord vaio modest gamers slr licensee countryside sorting liaison bisexual rel unused bulbs ign consuming installer tourists sandals powershot bestselling insure packaged behaviors clarify seconded activate waist attributed tg seychelles pv fatigue owl patriot sewer crystals kathleen bosch forthcoming sandisk num treats marino detention carson vitro exceeds complementary cosponsors gallon coil battles hyatt traders carlton bitter memorandum burned cardinal dragons converting romeo din burundi incredibly delegates turks roma demos balancing btw att vet sided claiming psychiatric tittens teenagers courtyard presidents offenders depart grading cuban tenants expressly distinctive lily brackets unofficial oversight valentines vonage privately wetlands minded resin allies twilight preserved crossed kensington monterey linen rita quicktime ascending seals nominal alicia decay weaknesses underwater quartz registers eighth pbs usher herbert authorised improves advocates phenomena buffet deciding skate vanuatu joey erotik hackers tilt supportive vw granite repeatedly lynch masses transformed athlete targeting franc bead enforce preschool similarity landlord leak timor dw assorted hm implements jl adviser hg flats compelling vouchers megapixel booklet expecting cancun heels voter reimbursement turnover urine cheryl radeon capri towel ginger italicized suburbs imagery chromosome optimized sears als ffl flies upgraded competence colorful inadequate crying matthews amateurs crane defendants deployed governed considerably investigating rotten popup mk garnet habit bulb scattered honour useless protects northwestern audiences iris coupe hal benin ppp bach manages erosion oceania abundance carpenter khan insufficient highlands peters fertility formulation clever primer che lords bu tends fresno enjoyable handbag crescent bypass freshman ies playground negotiate logout sixty exploit orgies boyfriend permanently concentrated distinguish ei hogtied projections wl spark illustrate lin clipart patience securing pathway detectors newsgroups shallow stir spike plated jacques drawer ingredient togo spectra lifting judith curtain disclosed davies tactical pilots mailbox copenhagen expedition pile operative humour athlon maturity caller iq distortion prosecution het landscaping tonga mol imprint korn natalie receipts assisting shirley sanctions directv goodbye viable emerged deviantart defect qa poorly goddess backs observers magnets formulas spacious shoulders nas argues wade soils chapman organs det loyalty beloved sometime ballard beating faithful hunks appellant libya offence xsl invested whatsoever numbered terminated expands lithium sedan pony ctr comprises leap bolton founding swan planting alphabetically facials covenant dropping calories airways archaeology refill reagan sailor fittings lining banquet cares sanctuary flora kazaa einstein pornstar statue hilary quotation equals hardy vcd jumper caravan diagrams harness majors headsets manipulation bells vascular alongside impressions yankees toxicity forwarded sz gal transmitter dorothy freeman denim greenville andre scat ems neighborhoods puppies relaxing delphi trophy emotion buick slipknot nets sights uniforms mst residual disasters asterisk versatile liquor kindergarten profitable wounded clayton bf bash derivative suffolk ngos necklaces storesshop tot occupancy postgraduate doses educate baked glove daytona wastewater prejudice herzegovina constructor technicians debbie probable issuance sj baldwin mbps incorporation rem evolutionary arriving decoration nationals trojan assistants counselor spinal ij eliminated alito sooner struggling enacted waterfront tenure plush weber diagnosed biotech unstable turkmenistan elk woodland iranian nelly fulfill urged reflecting unsecured brent gaining kyoto cis definitive eb appropriately shifts inactive lansing traveled barcode adapt extracted accession patterson xd regulator carriage therein terminate rex fuels txt postcode traditionally withdraw soy brett makefile anchorage ansi paula vicodin landmark greens neat naming stern shawn suv lacrosse bentley bud slaves dentist utilizing mis crafted burkina eritrea bbq tutor idiot comprised winnipeg charities mickey wh debit sebastian aliens domino dmx edits unwanted raven defeated strains dwelling slice xr tanning bn gambia aspen lacking symbolic noaa cest objectionable angles lemma kyrgyzstan pressures webb sensing mediation venus postgresql bump cowboys flames primitive kbps auf trac stocking esp dolby balloons ecosystem pkg dashboard malcolm nikki georgetown technorati esl norwich halls alzheimer decorations pause simplicity postscript dividends relaxed periodicals pearson demon welcomed jk infinity wk handler gabon notation chandler aunt interviewed crow semantic dia discontinued concurrent decides caption bargaining globalization atv vga atari complain pulmonary adhesive toledo asses altitude compass closet sch reebok couch evolved downs mfg exceeding jb rogue unfair blogthis electronically inspirational augusta wilmington infantry faso renowned corridor philosophical scripture celebrating sahara justification rebuild sdram vacant manuscript fixing motherboards gram blk hiding methodist inherent dye sits alphabet shelves toes cleaned honored optic hannah jw telephones tailored insect frances diaries chili grief leicester vodafone sweat dolphin pendants wonders romanian xt ventilation ucla masks celeb bust lateral assoc quake palo usability alley gardner backyard sanders pathways telegraph pertaining novell memorable refunds newsroom tina professors kia monument taxpayer fb formally cola twain ile boise bsd nevis saab dew lavender refinancing justified withdrawn breeze debates gems cert buffy doctoral backpack npr identities outgoing mann tajikistan yankee sheraton outs snacks deficiency booster taxable gum progression adv saddle malaria loyal torrent imc ufo linksys dentistry renal fedora odyssey spite nero capita nyse guideline imply inaccuracies tendency caledonia freezer wholly chill utilized embrace pcr bnet ein binoculars liner manila auxiliary initiate ua elevated purely demographics fry lifts vivid enroll allegations stationary corresponds daemon foil whitney celebrated buddies alarms hunters roi allison kc crashes stairs outlines steroids kt pogo acted konica hotline amps byron critique accountants coefficient honestly transvestite upstream skull continuation carnegie digg servant falcon jointly canadians avoided comprising tick ladyboy terrier listened explanations renewed hussein incorporating variant riley biochemistry duplication equatorial critic sediment translators squares scottsdale ninja tj avalon deg bot lea vans od voucher tw honeymoon percussion glue wheelchair gw cone margins sands survived spinning epidemiology adequately pentagon spectral diabetic stressed libdevel prevalence dominica contaminated fragment dvi finishes lecturer biomedical embroidered bucket steak gameboy commits cobra subset gucci threw sutton djibouti https websphere authorize cheney zombie decorated credited cherokee recycled apo ao followup recruit simmons nih gals hoc hdd bidders wherein simulator appearances performers dessert dissertation exporters walsh ninth mutant nos marry blankets enthusiasm confusing celebrations approaching bounce ivan spiral ssh governors weakness authoring specializes wills katherine atoms jacobs mauritania tissues reminded irvine drake olds ramp jakarta cynthia roosevelt practicing schmidt nicely surprisingly expressing della laurel carolyn rails tl pgsql fried cairo ambulance practically traded signaling vivo malls domination shrimp jensen chords impairment scooter molecule dedication wap desires woody dismissed mcgraw lr cheerleader cried psychic cracks edu lotion analyzing substrate sincerely mmc beaten piercing ashanti antilles homemade ukrainian establishments marginal visions efficacy freshwater topical prestige cocaine accelerated pinnacle tucker rms recognizes plugs isdn responsive coded supra omitted molly proximity ku alcatel belonging unbiased pear suriname chiefs franz collision supplementary parkway femdom palau clue scandal duff lodges dangers lys ck bonuses scam travellers gia scream biking discrepancies pirate microsystems timeout senses aerosmith repeats resellers willie portfolios rival ops slower simulated culinary fairfax beck semantics huh scarface accountant beige auditing rolex propaganda amplifiers offender waterloo warwick coli executable pentax restart rounded boarding vanity mitigation tome prof overstock homer eps daylight macdonald hmm gases dependency dioxide fireworks genus approached catching cutter connects ont explores liberals aperture roofing dixon elastic melody sins cousin hath torque recalls consultations memberships debts renting icann ticketmaster cdc meridia phillip burial balcony prescriptions hsn prop avril willis myths camden coupling knees oncology neglect emerge nf winchester clutch shy poets woven bloglines auditorium pedro maid sid carrie audioslave towels wikimedia canterbury lipitor remodeling trent redhat barber intuitive rigid enom sta degradation ret haha orthodox erin ferguson coordinating holistic salsa fragments encarta mariana qualitative claude minorities childcare dvr blown diffusion baton cdn polynesia barton umbrella soundtracks napster rods wong stimulation abbey pigs debugging olivia rechargeable engineered jerseys refugee pw straps maya discourse lancashire superstore headache stained marital socialist hex wg bruno attracted undertaking slavery notwithstanding blogroll evite feasible romans micronesia credibility shores fest thames flowing dreamweaver diets montenegro deed sauna whirlpool perfumes sustain mechanic bauer eliminating rejection multiplayer crt caicos bowls qaeda dissemination shareholder cardinals kitts cosmic dawson tivo defective deletion lengths beacon hoover ptr macau politically elective forensic botanical quartet mudvayne ceramics suspense drafting cruel observing freestyle advertised commencement southwestern conform helmets organizers firing smartphone eager cmd denise hypertension searchable touching aguilera vacancy servicing papa settlements strawberry chang gloria counselling elevator pupil feast ecards maggie redemption profound canton nina acura registering seth warn conservatives clit bonnie laying cops provisional compiling fedex strive snowboarding releasing laserjet martinique shells painter cooker ankle peso leagues monkeys historically lego transitions prevented digits err banker sup easiest microbiology borrow internships bamboo lv denotes communicating sgh ki vectors decks craigslist vibration stepped vent blunt protector hamas aux react understands rises shane issuing heaters accents insane buddha voyage een rdf colonel transitional mozart acceleration sketch hoffman bj balances firearms nightly visualization pitt deduction dancer coats pol capsules hyde firmly doo dots pursuing newswire aston hf spermshack mugs brokerage washed overtime staind resonance mosaic rhodes fiesta wd sourcing vase filings forcing fairs flute durability boeing sizing exceeded meadows hindi presley harsh outfit godsmack labeling substitution whois burma cease deserves aboard paradigm msc irving perfection joints overwhelming linguistics snmp standardized liu poles gta bounds lyon nutrients kosovo santiago vera advising altogether devils dignity europa barbuda wondered cheshire boyd sliding accumulation napa descriptive abt inst feasibility nickelback lj negotiating homo pier sioux nazi cote premiums jenna arrays lutheran syllabus rgb fellows valencia superman rodriguez perkins animations ideally activism splash fargo chairperson equip saga reged leverage probation sgt ast gran commissioned hedge ke anguilla fender violet dancers mutation radisson envelopes apc alle compulsory hitler favorable rue handset preparations maxwell illustrates inheritance curry vulnerabilities pga oblique pearls worms activist palestinians satisfying ldap succeeded prerequisites maintainer apples elf dewey surviving pouch advent proposes hooks ces exploitation singers mayo tasmania mansion benq cha surrender lx schneider accumulated arsenal dub screws pyramid enjoys bv hacking stripe knoxville averages peaks tai como lisp limousine churchill mentoring pak affirmative keynote mos didnt classrooms planted petitioner residency spoon bombs niche deadlines fortunately tk cigar vis calculating erie berkshire bookshop proportional credentials deprecated nonetheless municipalities chin locker jenkins squash expectation severely spotted curse hifi gf ajax coconut interrupt conductor wont liberation forex diagnostics grandfather removes ew luxurious titan dreamcast tumors booked anita indirectly nile vm blessing lumber kyocera pillows portals illustrator asleep potassium prompted shout nudes rationale hubs pasadena presidency abnormal bissau delicate convince whoever subway hpa straw lifted mankind uncertain fgets citrus paramount cameltoe upright breakfasts inspectors emergencies reuse ernest sightseeing shocked therapies alcoholic bakery lieutenant orchid histories loses widget renault atkins variability comoros suede observatory soda waited preventive peach calculus stefan selector gop breathe diaper dunn hotwire ngo smiling ounces pvt economically uncut intact noting shifting samurai atp moines subtotal coefficients duplex ivy mvp delegate lightly negotiated jh analyzer herman congestion runners stove charset clin accidental talents nixon refuge brady guadeloupe nutrient walton zhang underway carved ark freak obstacles govt cbc preferably bluff excerpts jasper formatted sed newborn sadly laughed gorillaz avail emerson regulate orchard inhibitors uu mythology prestigious deploy trousers gameplay hatch replaces tomb regina stein shortage privileged spill goodness drift extracts professions explored autism mysteries fuller taxpayers martinez bombing decreases wwe metrics winxp crisp inability cor goo coronary bldg mediated prom scans keeper reinforced johannesburg spells specifying vaginal buddhist isps inevitable etiquette rookie environ nic theatrical coloured births kr cubs interdisciplinary wheeler ritual miguel kerala pulp onset interpreter enzymes specimens initiation analytics assay jacuzzi reconciliation pots lesbianas recognizing parser leigh razr slam jt respects tents plaque accounted deposited lowe beavers crib styling snack defending pulls autonomous weezer granting motoring appropriation randomly condensed philippine theological quietly semiconductors scenery coca acs peugeot bollywood mentally horoscopes drying assemblies noun xmas silicone collateral cpa learner welcomes dn swallow tara transplant scoreboard proliferation usenet squid marines hw lighthouse proves customised trilogy crab jen brightness maurice brooke consumed maxim hike bore imdb depreciation clic technically ars pharmacist marley enjoyment typepad cows xs deliveries recruiters austrian correspond slate suzanne confined screaming inhabitants straightforward delighted cygwin morton peel gprs cue jupiter simultaneous monopoly png pornography debris han intentions robotics pagan chopped widow contexts sac peg randall benson sleeves troubled footnote vibrant evolving sweater approximation skies barrett init burners alison fitzgerald kicks disappeared canoe svn sovereign reminds organism corrupt violated correspondent drought bake hurricanes oslo symptom laughter foreclosures propagation audits ignorance pesticides explosive inventor scaling juicy fave residues ashlee moody viet fashioned grains vicinity thyroid purification heal orbitz southeastern wizards horoscope invasive prosperity rainfall helsinki hardback mum launching vuitton nextag pedal inconsistent plantation storing asa tote jumped seemingly tuned narnia passionate alfa staples twp mayer backward sour geoff rename atx markup combustion breakthrough scrap ietf administer bilateral bella blondes beneficiaries disposable williamson sock gentlemen copier uncategorized terra literal questioned guiding charcoal xm vapor beware aloud glorious geforce overlap handsome defaults foreclosure clarification grounded bail goose espresso fn judgement cruiser hendrix cumberland gifted esteem cascade endorse strokes shelby hen homeowner ancestry mib dolphins adopting landed nucleus tees detached scouts warsaw ib mist glu winnt verb tec chic hydro nonlinear spokane objection phosphate playa gh noisy csi abide radioactive sentinel birthdays desserts doi socio pcmcia preserving vest neal economist grooming meridian marriages regret validate stakes rotating nederlands brigade movable doubles bst bliss filmography humiliation tens litter reflective outerwear abbreviations executing greenwich flooding parse rugged jelly dsp implementations grandmother renovation puma appoint attendees panthers perceptions greenwood ignition humble toc downstream petrol midway mania edwin webcasts ax accelerator masterbating clare flyers recognise tacoma hostile aphrodite radiology establishes whites rant trapped bolts diplomatic locals fringe linguistic internally planetary mms tungsten typed desc datasheet laurent shutdown ego manuel xenical computerworld gaza influenza gill tattoos rude sang steele citing viewpoint peptide nay sweatshirt hassle regents servants meanings conception unemployed heavenly gn exeter docket amusement dll elsevier nordic middlesex curl privat albanian overflow geometric hastings subsidies taxonomy thirds deli willingness intern implicit nsf patriotic simplify darling schwartz satan ornaments oppose sata terrific xxxx megan allergies definite bangalore congregation regiment cheer everett reviewers clutter misleading marty predator vine vale whereby deceased sparks xlibs belgian adolescents djs simpler captures coventry capitalism hancock falkland clamp cur pricegrabber mammals grape cloning args madden russ peppers deeds lively inequality smugmug educator premature visually tripod immigrant alright laguna limo demonstrations obsolete aligned rust lon pesticide interfere traps shuffle wardrobe vin transformers successes racer fabrication guilt sweep nash exploited avid outpatient bladder lam inflammatory iss immunity encrypted bets wholesalers doyle ducks coldfusion dcr shooter switchboard paints vince neighbourhood cheating carr fade fluorescent tastes cookware storms lavigne param smiled jurisdictions scrutiny regeneration lunar differentiation shields environmentally nonsense invented gradient ncbi inserts kvm elaine programmable posed subjected tasting bibtex chemotherapy gwen mob expose borrowing arises imf vr precautions branded dysfunction manning lisbon forks monk boxer shining livejournal diazepam weigh rodeo clerical voyager hobart sampler moose jovi timetable dorset corrosion positioned checker buenos workstations conscience crush cathy mystic solicitation darren cmp rectangular fischer pooh enthusiast udp positively sts shaping ich afghan inspire paulo torn meantime pumping patented revival disappear lever redundant regency milfseeker tasty sbc midland gag synchronization mccarthy informatics oakley heck rants tarot didrex brenda civilians bark carts wasted purdue cocoa invites cushion reversed lynx goa figurines footer maternal specimen jedi seamless ancestors panther mixes graves branding ghetto thr examiner vineyard meadow panty feeder mercer roms goodman listener subunit chloride awaiting kane becker aires bulls orion commercials councillor regulators hurry influential clarkson carlson yy beneficiary benchmarks hanson ug offspring emi panorama retrieving roth odor demanded reactor kiribati wastes telnet clash biker fidelity parked sis financials castro flew peanut holden ale sem converters nauru rhapsody trumpet solitaire decreasing freezing kaiser dishwasher rcs wallis criminals neurons ios retire rumors accomplishments emergence feminist theatres apex crimson compassion yds needing twentieth ive ecosystems pronounced extensively stain conrad wished transient kicked coloring curb gadget cctv leukemia reign trivial deco ticker coke habitats clauses baron remover sensible unlawful bates incorporates brasil webs swinging accountable thrust proving unicode opposing prod novice spreadsheet hewitt lowering dei delightful cane cruising fury personalities discography stiff todo encoded researching noah wore christchurch pediatrics traces rabbi sushi puffy asap weston headings enthusiasts ridiculous scattering secretaries onsite mapquest contracted elbow fights deleting compilations therapists appealing scholarly detailing stark lifestyles roberto dst strongest hammond swimwear padded applet pricetool circa revise contributes threesomes surroundings proficiency quinn uranium honours consolidate daniels billions hut daewoo antigen ultrasound stafford mgmt procedural labrador refusal lima suppression weaver cern readiness secular macros majesty msa fishery teresa distributing estimating outdated aussie advisories dues pewter lendingtree belmont distress pumpkin notably intends trevor homosexual garment acad bilingual barbecue localization supplying secondly razor cough cerebral grandma customization gigs indexing lori oceans displacement spacecraft ivoire backwards arrows volunteering montserrat telecommunication presumably coatings eureka plea constructive bundles pcb sdk tibet preparedness pres isles stretching ovens systemic garrett esther playoffs abundant deductible adaptors priests accompany compares forecasting hesitate inspiring specialize prey deposition drm laurie tas zodiac pavement enya masterbation tubing keller pedestrian fencing bloomington artery conditioner plaintiffs inlet rub violate stimulate realise fluids conveniently lick vanessa gov stealth nucleotide ter ness bronx listmania repayment middot netgear canopy gloss panda crc whip symbian porch pertinent lifelong emailed promoter chf collegiate constants construed interchange remotely clr fletcher concise isuzu fibers handful brains curtains eaten indigo retaining kelley autobiography conditioned webring prohibition motions redirect interoperability msrp tuvalu shampoo emphasize excite rebels neoplasms artifacts believing vac hilarious salisbury pseudo gu quoting sinks steep dinar dynasty creed carat nan microphones nobel raiders galaxies spreads verlag elegance volatile pointers sensory scrapbook dummies throne magnesium pagina kenwood chartered slopes socially unfortunate seized roundup territorial leases imac consisted randolph faxes plump uss memoirs alkaline expire och wwii midst methyl campuses borne forgive ramada competitor mansfield neighbours tesco marvin dba architectures conversions acdbline usable tempo getty mutations cdr readable almanac conway ay gail msi responds denote slayer payne prog firewalls tester polling fifa purchaser bins relies inserting tibetan prepares concludes consumables waterford rodney cylinders mus selects fulton directing nationality highbeam msdn statistically torch zurich stretched depressed mps encounters haunted spares symmetry agp bout cont adverts programmed lohan salons olympia hank negligence unclear screened helper carlisle aromatherapy rancho transferring nederland stockton stepping hacks clearwater attic trustpass topology appetite sensation piper airborne morality honorable wealthy handicap skinny sewage endowment demonstrating antennas sundance lifecycle dhcp avec trucking sonoma esta defender amos iraqis shortcut wretch sunlight stems racist wo profitability unc fairmont ventura convey ang evergreen globally bearings govern feather fond sore aaliyah fiat reboot sixteen newsgroup blinds audiovox traits tightly graded phuket successor jf intrusion sickness guiana underneath prohibit metabolic noel cans abused sarasota billed lim avery toons danielle brushes tenth anthology prosecutor smiles merged auditors grandchildren exc desks capsule aided relied suspend eternity mesothelioma trafficking introductions weighing eff currents bizjournals michele kk aide kindly cutie nes protests sharks notch minors dances revealing reprinted fernando mapped resurrection lieu decree tor creampie seoul printf columnist discovering tuberculosis lacks horizons transplantation jerome daytime elaborate contour gamble fra descent nwt gravel analyse rammstein disturbing judged shutter illusion ambitious scrapbooking ole notorious ibid residue reds enlarged stephens transforming sequential stripping uniquely bart assert goodies fluctuations bowie auth archaeological inspect thrice babylon gina sugababes edison casualty rsa rcw musings whistler poses airfares huntsville ths noir eli layouts evan servicemagic mushroom designate scent sequel gymnastics titanic knob wolves exquisite herpes upward sentenced dundee newsgator principe contractual acquiring judging unchanged kicking meg akron fines grasp streak ounce thirteen bh tragic theodore buena irrelevant professionally liberties sounding rebounds milano compressor toast happily hooked samantha shrink knox khz webmail carcinoma taipei unesco mutually stance aps kumar beaded remembering boca exodus compartment gemini kinky brittany dove testified iis cunningham derive affinity presbyterian supervisory pretend ostg buddhism kl amnesty chiropractic borrower gloucester warrants owens fairness needles coll throughput quota netbsd discreet misplace versa imp oi serviced mack pu sung lowell whichever starr elliot opener uae vaccines chooses tuscany jigsaw jumbo crowded tickling unspecified wee jsp turbine unreal wounds percentages advisers manufactures physiological lett maths addison charters generalized unprecedented probes frustration flint dummy financially awake sanitation americana swivel ally dissolved cleanliness complexes kung varsity collectively insurer croatian inhibition multicast certifications burnt solidarity frustrated muhammad alma pradesh ger px hanover inverse clifton holt isis verdict nominee medals proton dickinson christi lister recurring studs allegedly rhetoric modifying incubus kaplan impulse surveyed creditors dull tis cabins commenced ballroom employing satellites ignoring linens stevenson coherent beetle converts majestic bicycles omni roast testers debuginfo complainant inhibitor clifford knowledgeable critically cy composers localities owe jimi hummer reciprocal accelerate hatred telefonsex questioning putative manifest indications petty permitting hyperlink presario motorsports som behave getaway bees robbins zeppelin felix shiny carmel encore smash angelina kimberly unsure braun destructive sockets claimant dinosaur psa tac ample countless ashland energies dlp repealed royce listeners abusive sophomore antibiotics landfill warehousing filesize merits scarf strangers garland voor celebrex verisign riviera apprentice obscure napoleon registrations wavelength glamour slashdot transvestites hated cheerleaders sigh trolley principals sidney friedman coolpix spicy blocker tawnee frankly hud chronological mov entrepreneurship itinerary fools beard discoveries percentile linkage economical miniatures wedge adjusting mock peggy bats patriots ruins lh sheila ripper dependencies afp kd accomodation benton mcafee chateau denis counselors homestead competitiveness burger microscopy changer sergeant melt syrian hyper madthumbs linkin gmail ned cypress courtney cites utf scooters reserveamerica organisational prospectus ezine protectors reactive interiors encouragement clipboard disadvantages gamer alexa abbott tailor pollutants directorate chocolates faux supervised interpreting savvy pascal tha serenity uploads ore pant sheridan gallons attainment sanitary terri cooperate dreaming norms implants fortunate alibaba mushrooms hormones hype interpretations geoffrey faults addr nfs silva grease diablo urinary cairns institut premise epidemic prima condoms rite directives cinnamon zelda lac discharged alba underworld variants fetal palms lawsuits seated lattice dong realization reportedly absorbed sirius chord edi kudoz vous turf asphalt replay improper flavors dilemma ig rebuilding livingston quickcheck commenting shifted tangible smoked hawks ziff placebo irons comet berg baltic corrective competency muse probing teachings tyne lotto fowler xv youngest contingent refreshing textures pid syrup xii warmth hawkins dep lust correlated augustine dominion verses seagate nanotechnology astronomical solvent toggle luna amplitude aesthetic commercially emc dion wolfgang spacing frameworks completeness irregular barker solids mergers capturing filtration certify gpa consulted realised cpus jude eighteen singular incremental jennings demons unacceptable redistribute coping corr baxter outbreak abdominal sbin deficiencies curved milestone erase lien nip bites prose marx incidental toni arguing vein scalable hale ji swear intra bel clown spontaneous summers taboo equestrian wetland olson methodologies malicious consume amazed fourteen legislators volcano capacities fremont skeleton someday tsp sha suspects displaced sounded exporter honesty dwarf mri hum bis northeastern ifdef shocks rewarding killers battalion multicultural lasers candid schooling dataset thornton schoolgirl caesar savers powerpc pines steelers stellar davenport locating monogram philippe enhances aix fucks relational ornament graffiti cassettes pussies urges sophie doesnt tiff cnc refrigeration attacking microscope houghton countdown threaten decker natl bait extern badges enron kitten codec broadcasts brides dent checksum stealing bullets emphasized glossy informations haired directional breeders alterations pablo lethal biographical confirms cavity molded vladimir ida probate terrestrial decals completes beams props incense formulated dough stool macs towing welch rosemary millionaire turquoise archival seismic exposures baccarat boone substituted horde paperwork mommy teenager nanny suburb hutchinson smokers cohort succession declining alliances sums lineup averaged hotspot bellevue glacier pueblo hj req rigorous gigabit worksheet allocate relieve aftermath roach clarion override angus enthusiastic lame continuum squeeze feng sar burgundy struggles pep farewell soho ashes vanguard nylons chipset natal locus msnbc hillary evenings misses troubles factual carisoprodol tutoring spectroscopy gemstone psc phonephone elton purity shaking unregistered witnessed cellar moto gonzalez friction prone valerie enclosures dior mer equitable fuse lobster pops osha judaism goldberg atlantis amid onions preteen bonding insurers prototypes corinthians crosses proactive issuer uncomfortable sylvia furnace sponsoring poisoning doubled malaysian clues inflammation rabbits icc transported crews easton goodwill sentencing bulldogs worthwhile ideology anxious tariffs norris ly cervical baptism cutlery overlooking tallahassee userpic knot attribution rad gut staffordshire factories acta swords advancing yep timed evolve yuan iec differs esa suspicious leased subscribed tate starters dartmouth brewing coop uml bur blossom scare confessions bergen lowered kris thief prisons pictured feminine sizeof grabbed rocking spi nichols regs blackwell fulfilled sweets nautical imprisonment employs gutenberg bubbles ashton pitcher shinedown standby judgments muscular motif illnesses plum saloon prophecy loft arin unisex historian wallets identifiable elm facsimile hurts ethanol cannabis folded rsvp sofia dynamically comprise grenadines lump constr disposed subtitle chestnut librarians engraved halt alta manson autocad pastoral unpaid ghosts powerbook doubts locality substantive bulletins worries hug rejects spear nigel referee transporter jolie swinger broadly ethereal crossroads aero constructing smoothly parsons bury infiniti blanc autonomy bounded ppl williamsburg insist birch supp slash snyder budgeting exercised backpacks detecting resale mikes howell digestive scalar entertain cinderella unresolved sesame hep duct touches seiko electromagnetic arial tos joanne housewife zoofilia hcl pursued validated lend sco corvette yachts stacy christie unrelated lois levi annotate stimulating mont joomla misuse helix cosmos speculation sx dixie pans enforced legion env fulfillment biomass assertion phs hierarchical lesions shook lincolnshire financed dismissal surnames mah reconditioned shocking allergic overland prolonged isaiah backbone rk abn unanimously eliminates sausage addict matte neighboring uncommon centralized stratford heidi melanie objections unpublished ames slaughter enlightenment pistol juniors rockets secunia metering seymour genetically zebra runway arithmetic supposedly admits bombay originals enrichment chennai milford buckle bartlett fetch kitchens ions asshole wat rey divers faroe townsend blackburn glendale speedway founders sweatshirts sundays upside admiral yay patron sandwiches sinclair boiler anticipate activex logon induce annapolis padding recruiter popcorn espanol disadvantaged trong diagonal unite cracked debtor polk mets niue ux shear mortal sovereignty supermarket franchises rams cleansing mfr boo hmmm genomic gown helpdesk ponds archery refuses excludes afb sabbath ruin trump nate escaped precursor mates adhd avian exe stella visas matrices anyways xtreme passages etiology vu cereal comprehension tcl sy tow resolving mellon drills webmd alexandra champ personalised hospice zerodegrees agreeing qos exhibitor rented deductions harrisburg brushed augmentation otto annuity assortment credible sportswear ik cultured importing deliberately recap openly toddlers astro crawl chanel theo sparkling jabber hgh bindings hx convincing rotate flaws este tracing deviations incomes fema subwoofer amortization neurology ack fragile jeremiah sapiens nyt olsen serbian radiator hai competencies restoring sanchez rushing behold amherst alteration hotspots trainee nielsen podcasting murdered centennial tuna bluegrass hazel wipe ledger scarlet crushed acronyms laughs connie autographed referendum modulation statues depths spices communion loader uncertainties colonies followers caldwell latency themed messy squadron bei dmc rupee ments subsidy demolition irene empowerment felony lungs monuments veronica filtered replacements growers vinci subtitles adj gcse haul acupuncture workload acknowledgement highlighting duly roasted tenders inviting rig ov grassroots mick gentoo redevelopment mustard strait masterpiece obey cellphone donkey sax jacks conceived triggered boasts praying oss multiply intercourse frontgate radial mare routinely instructed stole kirby armour summarized avalanche asc northampton uploading manuscripts managerial nsu cary celine exhibited disciples shaving finepix wks bishops kite destroying humorous tonnes hypermail thunderbird faa corona heap griffith investigative letras bylaws erection quasi wmv lao energetic disturbance saunders ribbons jew facesitting exile breastfeeding bilder reside mccartney anglo cashier kathryn jaw butterflies eats randomized knots flea motivational offences anton pals gratuite gerry celebrates hail armenian longitudinal historians realities kappa mentions samson neuroscience blender jumps fleming blaster optimistic remediation wasting decoder genocide acclaimed seldom heathrow indy morrow pantera glitter giovanni sidebar authored lasted snoop awhile winery rbi scaled contingency photon wiltshire vague overlay wraps constituents rusty pharma herd handicapped exported fayetteville lag champaign warns fyi xc pakistani harmless ics apa bitches sting urbana bravo believers diagnose secsg franco announcing dispersion curiosity trivium amature showroom cx swarovski resting missiles persistence coarse continents liter carpets recovering submarine akon blessings brendan prevailing originated axe condosaver sculptures amex intrinsic classicvacations blackpool thoughtful nicht archer hertfordshire fh inuyasha nominees warmer cuz viewsonic dryers calf fujifilm basil ams hallmark counterparts paced engl grouped dominate asians orient contra damaging populated seether renee boiling journeys milestones parkinson parsing splitting mclean derbyshire checkboxes abandon lobbying rave ej dy mgm cigars cinemas islander encoder nicolas inference ras recalled importers impressum transformer weiss declarations rib phe chattanooga giles maroon drafts excursions jerk kontakt shack ers marrow kawasaki licences bose tavern bathing lambert epilepsy allowances fountains goggles ses unhappy clones foregoing crossover situ specificity certainty sleek gerard runoff osteoporosis approvals antarctic ord successive neglected ariel bea monty cafes jukebox classmates hitch fracture ama nexus cancers foremost nineteenth chesapeake tango melting mahogany actresses clarence ernst garner buster moderated mal nassau flap ignorant aba allowable karate compositions sings marcos sorrow carte qb canned collects treaties endurance optimizing teaspoon switchfoot coldplay insulated dupont harriet philosopher rectangle woo queer pains vioxx decatur wrapper tty ahmed bsc buchanan drummer sobre celexa guitarist symmetric ceremonies satisfies kuala appellate comma bbb geeks conformity jg avant repec insightful supper fulfilling hooded unrated diva adsense instability seminary exemptions integrates presenter csa offenses emulation lengthy sonata fortress contiguous bookstores perez cimel inaccurate hvac explanatory leica settlers stools ministerial xavier agendas torah fao publishes stacks owning nws andersen busch armani bipolar sermon facilitating complained ferdinand taps thrill lagoon undoubtedly menopause inbound withheld insisted shortlist gainesville tiava eclectic reluctant headphone regimes headaches ramsey oath readme pigeon rivals freed binder xemacs constrained parrot magnum invoked invaluable helicopters keystone inclined ngc gala intercontinental cheek traction utterly workspace customizable softcover gavin illuminated realtime lasts gloucestershire electrons psychologist dane claudia perpetual subsystem appl kinetic caffeine solicitor clustering xf glimpse nib verbatim innocence httpd quicker grandparents cardboard attributable sketches angelo tertiary exhausted smarter slac shelters attain dora calorie inconvenience tang graphite vaccination stroller farther bowel sweaters chats mafia riot fats futuna mandarin dungeon predictable germans lilly shire susceptible mosquito kashmir insest lyons skyline sulfur scams lipid putnam corpse speedy ming tao quot ritz networked localhost lush barrels transformations cabling analogue werner clyde stills perimeter biased cardiology playoff honorary sti irwin brewer chiang exchanged payload adhere fran merrill oldsmobile grilled rafael ccc enquire toilets mains whales misty lindsey parity partitions grim conserved searchsearch hubbard rewrite vending prism chasing keygen janeiro flop aggregation shelley batting borrowed heh transexuals rests toss prentice depicted grapes proposing cumbria winding diaz ripped vegan congressman cobalt pity recombinant ubuntu downward superstar closeout corel kayaking synergy eta catalogues aspire harvesting garfield groom jewels saturated georges backpacking quincy accidentally doughty bonded sticking dudley osama weeds stripped oprah inflatable beers clive fixture glassware canary steadily amc imagined darby woke kos fills proportions grips clergy coursework solicitors kayak moderately mayotte altar salvage repetitive stanton creators gears orbital musicals kilometres cuff lithuanian amatuer repeating empires profiling reps hn oyster sturdy sequencing massacre undergo panoramic risen blended deskjet rhino polynomial tau nsa imperative stakeholder beg digging lantern catches evangelical eaton ruler signifies henri stochastic psu tokens santana kidding piping swept swansea airmail staring seventy problematic troop arose decomposition chatham roadmap ogg becky lesbo farrell elders interpreters supporter acknowledgements klaus tnt skincare conquest heroin repairing mandated workbook assemble xslt hogan omg whistle sulfate dresden timeshare diversified oldies fertilizer complaining analytic predominantly amethyst debra woodward rewritten cdrom concerto adorable ambition torres apologize cle restraint thrillers fortran eddy condemned berger timeless parole corey kendall spouses slips vv ninety tyr trays stewardship cues esq bioinformatics kisses kerr regulating flock exporting arabian chung subpart scheduler bending boris hypnosis kat ammunition vega pleasures shortest denying cornerstone recycle shave sos lsu sexe disruption galway colt artillery furnish precedence gao applicability volatility grinding rubbish missionary knocked swamp uid pitching hoteles fav bordeaux manifold wf tornado disneyland umd gdb possessed upstairs bro turtles offs listserv fab vauxhall cond welcoming learns manipulate dividing hickory renovated inmates tokelau conformance slices diecast bittorrent cody frankie oa lawson quo iu vf alprazolam damned beethoven faint rebuilt proceeded collaborate lei tentative peterborough fierce jars authenticity hips rene gland positives wigs resignation striped zion blends garments fraternity hunk allocations lymphoma tapestry originating stu chap blows inevitably rpc freebies converse frontline thb tele gardener imap winamp winnie ita higgins stoke idg warwickshire polymers penguins attracting grills jeeves harp phat zz escrow lumpur wes dds denton anthem tack whitman nowadays woodstock infospace sack inferior surfers abuses inspected deb jockey kauai licensors indicative cpc stresses incumbent ithaca webhosting edmund peoria upholstery aggression peek alr practiced ella casualties ipsec bournemouth sudoku monarch undef housed administering temptation havana roe campground nasal sars restrictive costing ranged cme predictive vlan aquaculture hier spruce paradox sendmail redesign billings jeanne nitro oxidation jackpot marin halfway cortex entitlement amending conflicting georgian compensate recherche loser secs mixers accountancy claus policing braves cracking sued shoots michaels interrupted hemisphere miranda clover ecc kj kindness similarities kv hipaa porto neutron duluth directs jolly snakes swelling spanning politician femme unanimous railways approves scriptures misconduct lester dogg folklore resides wording obliged perceive rockies siege dimm exercising acoustics voluntarily pensacola atkinson crs condominium wildcats nord exhibitors truths ssi grouping wolfe redwood thereto invoices tyres westwood authorizing enamel toby gly radiant estonian virgins firstly martini butte bomber reeves songwriter suspicion disadvantage bastard shania coaster spends hicks typedef pratt pedigree strippers macmillan fraudulent aac woodworking sherwood forgiveness cbd almond pricerunner afl catalytic har petitions francais trenton chalk omar alexis bethesda privatization sourceforge sanford axle membranes puppet testosterone cultivation nunavut surveying grazing biochemical pillar mirage lennon questionable seaside suitability precinct renamed cobb lara unbelievable soluble piracy rowing siding kx hardest forrest invitational reminders negro blanca equivalents johann handcrafted aftermarket pineapple fellowships freeway wrath opal simplest patrons peculiar toon europeans commence descendants redmond safeguard digitally lars hatchback rfp obsession grind albeit billiards coa clint bankers righteous eo redistribution freaks subclass rutgers tra sampled sincere deploying interacting roanoke intentionally blitz tended censorship cactus viva treadmill fiberglass attained blew howe nap osaka splendid janice personalize lava leonardo sucked scissors broncos jorge cooks sharply granada laurence rebellion rainy tho regent evelyn vinegar vie classifications diggs rafting pluto gil sle vail jv fisherman misery undergoing limerick safaris contaminants envy scr mitch sweeping healthier ussr mailer preface jameson grievance liners asheville unread sentiment pencils galloway quinta kristin forged bistro viola lw voodoo disclosures provence caching computerized rustic rumor dillon shah eleanor deception volts conducts divorced rushed excalibur bots weighs sinatra magnolia diver disappointment castles notions plateau interpersonal dexter traumatic ringer zipper meds palette blaze wreck threatens strengthened sammy briefings siblings wakefield adversely devastating pitcairn centro pdb arabs bild onboard robbery eine nucleic telecoms jasmine crochet brock crowds hoops hehe macon celeron lynne invariant stamped challenger increment redistributed ju uptake newsweek geared ideals chloe ape svc gee apologies prada tycoon malignant maxtor plone dcp dismiss preceded lawful stag crosby biochem pte rash ors gateways compactflash collapsed antibiotic horns vanderbilt cps diversion overweight fantasies metasearch taliban maureen trekking coordinators beginnings reversal digi lex shoreline presses ordination westin oxfordshire yves tandem middleware mips boil deliberate gagged roundtable surprises abe roc dementia barley potent vo amusing mastering levine nerves ripencc shoppy filesystem retains pow docking guidebook atreyu kylie pilates chimney backstreet packers localized naomi proverbs lic risky mistaken carving miracles docume xy clair fte slipped realism stl crete fractions yd archiving disconnect bloodhound multilingual sherry desperately gsa indies tulip madame remedial vain bert immunization dalton bologna departing ciara maze cumming barefoot remuneration bohemian interviewing categorized imposing damon tivoli cmos transmissions receivable rode amen marching ronnie evacuation owing warp implant playlists thematic brentwood catholics imo correctional faculties katz denies jojo buffers talkback servings reinforce kobe inception draper baylor otc bowman frustrating subversion ssa zeta benny spires barney dinnerware sclerosis homosexuality declares emotionally masonry carbohydrate medicinal estrogen odbc ipods accrued temples realizing annum openbsd cemeteries indoors telescopes magellan champs federated averaging salads addicted shui flashlight disappointing rockford eighty staging unlocked scarce statistic roche ropes torino spiders obedience plague diluted canine gladly schizophrenia brewery lineage mehr brew vaughan kern julius coup cannes morse dominance predators piston itu cords mpi revisited cass sealing topped adhesives rag despair inventories fore uf brokeback absorb injected alps commodore dumping enlisted prophets ow econ footjob warez supernatural overlooked magenta tagging ditch feared prelude rowe slick overly limestone triggers commentaries constructs impedance dragonfly manpower underoath lec chunk reels lob slept gregg refundable hbo billboard drafted chalet huang sportsbook layered hopper sus neurological subs specialization abstraction ludwig watchdog scandinavian starbucks ibook viability kh detained luncheon filler smiley zenith genomics yi yum browns researched waits tenor copiers ovarian softly plenary scrub airplanes wilkinson limb intestinal cello poe wlan refusing suffers sweepstakes occupy antigens gan midtown bethlehem stabilization caves authoritative celestial immense audrey merlin kinetics cocos aiming seizure stuttgart diplomacy differing impacted foreigners limp capitalist rumsfeld mute beanie prescott protestant metre tricky ordinances thurs spaced koch freq topaz ans segmentation imaginary albion soaps courthouse sutherland entrepreneurial dar dart lebanese psycho maharashtra ricoh wrought robe nrc theresa heidelberg multitude tutors ezra housekeeping captive kettle visitation chr gibbs baggage chavez dusty patty serena asst satire overload tortured pioneers vikings crate kanye bootstrap wtf episcopal humane scm moonlight mast travelocity unfinished fno goth cared affection sworn twink bowen vicious educating nortel kin koh affiliations cozy pussycat appropriated escherichia mallorca mackenzie reversible spd oj slippers unclassified earthquakes bookshelf hayward wandering comb liquids htdocs beech vineyards amer zur frogs fps consequential initialization unreasonable expat osborne raider farmington timers stimulus economists miners agnes constituency rocker acknowledges alas enrolment glibc sawyer maori lawmakers tense predicting filipino cooled prudential basel migrant devotion larson photosmart invoke arte leaning centrally acl luv paddle watkins oxley anterior dealership chop eyewear rooted onyx benches illumination freedoms bakersfield foolish finale weaker foley fir stirling moran decal compose nausea comfortably hoop addictive clarinet temps fiona clearer vn floods gigabyte fritz mover dbz modeled erica malaga rainforest federally sustaining macos repaired diocese francois obituary multinational painters thistle pornstars tem sleepy nope footnotes evo rupert shrine aspirin purified striving dire attendant gull jour mir spoilers northumberland machining malibu memoir betsy gatwick shaun redundancy meredith fauna cliffs hayden emo roadside smells dispose detox waking feathers skateboard reflex falcons automate drosophila branson spurs sion ortho crashed appraisals travelled urgency flashes lakewood gould brit drupal prac eliza carers kramer graduating rims harmonic usaid darts idc shin intriguing keypad flaw richland tails emulator microbial discarded bibles hangs adc caregivers joanna quark zyban synonyms electronica stranded mitochondrial horton dolce hercules pane browning angular veins folds grinder angie sneak octet wj incorrectly avoidance cre dinosaurs sauces conquer mccoy probabilities vibe immortal mariners snapshots ubc endeavor creole mateo meth trendy teas settling inpatient filming badger mohammed saturdays partisan fread backend pri gratitude impress willy anon eminent ribs communicated exceptionally quilts cartier ageing splits subscribing companions cheques containment keynes protections edith aliases maximizing screwed handsfree tomcat magna walmart sectional interestingly fashionable polly tidal jules ballots hog ernie testify poole boycott elem vitality clerks crust bothered traverse vengeance organisers dolly pissed garrison nite sal barb mckenzie lenox huns miner fashions darussalam genital mcse barr analogy insomnia constituent aura cecil sponge cajun csu algebraic sect astm diner anticipation enduring scarborough kristen regis fsa winters nous explosives mound xiv backgammon sgd ox chromatography overdose nad gallagher snatch mueller mole obs owed ethan cao ladyboys orgasms plantronics ftd kissed buff freezers butcher psalms rum ibiza reese chefs engraving digimon constituted gastrointestinal hamlet inspiron pagerank asm smb contrib clad excursion blu matlab inverness orb grange netware bse megapixels resigned retriever fled svalbard enriched harrington brandy swings pixar scion elle reptiles dhtml vortex swallowing winme purses bodily func xiii awe gamespy beaumont standalone australasia mandy hoods antitrust equine bros fireplaces proto jared requisite retrospective emphasizes lizard hawthorne tehran bouquets dal wears anesthesia shropshire baja filemaker regal safeguards cabbage cub libtool wrongful spectator arrests circumstance signage numbering psy encode admins moc dau alvin accolades raton sliced reproductions stefani infertility byrd sidewalk prob breaker curly servlet alberto collage asserted aces depeche benchmarking jealous refinement durban learnt xxl hound squirrel teleflora concealed bankruptcies gauges blueprint mccain spiderman bridging wharf rhythms departures flick datum shotgun stimulated chickens canceled langley briggs cheyenne empowering lug ymca surveyor facilitator bos macworld wwf maize galveston extinction unaware rockville banff discretionary smc ry lq psalm serv ipo tek scented ipc timestamp musica bib gowns stevie spying nicholson rivera dermatology lied ek sandbox bloc mdt pinkworld cambridgeshire premiership luton recurrent talbot conftest leaks tam recursive swell obstacle ville registerregister fluorescence kosher mantle additives chico driveway irony gesture fairbanks parfum marketed armies hy hugs greenfield santos owls mandrake cutters camper acquires cpr ceased merging plaques breadth mammoth liquidity convictions lasik intentional galactic sophia merchandising prohibits ombudsman innings registrant reorganization pronunciation firefighters placements ih concession measurable elec ami parcels pastry manners levin academia amiga phosphorus viper descriptor hid volcanic gypsy thieves preaching pimp repeal gimp uncovered hemp eileen proficient pelican cyclic swimsuit apocalypse morphology versace printprinter cousins discharges giorgio condom admire westerns nk dodgers litre poured usefulness unsolicited binds unveiled correlations burt titus textual suffix handsets installment gandhi spindle heavens inks wink diarrhea seahawks mister rounding inorganic flare scholastic wight mondays withholding insertions itk kms couture foliage nod ocr ativan fife generals crank goats autographs summarize stub fundamentally creamy exposition savesave rains buckley middleton laminated organise citrix tort brace backups novelties turismo gigantic abdul sheldon ryder animalsex mayhem washers grep xeon polymerase optimisation octave struts easyshare cvsroot ud suppress harding dams deserved violates joplin dialup nx thn rutherford afro separates proofs precedent biosynthesis prosecutors confirming garth nolan alloys mach getaways facilitated miquelon paolo metaphor bridget wonderland infusion jessie organising zine conn truman argus jin mango spur jubilee landmarks polite sith thigh asynchronous paving cyclone perennial carla jacqueline seventeen messageslog meats clearinghouse wie dwi bulldog cleavage analysed uma gradual brethren facilitates embodiment specialised ramones everquest violating recruited bernstein skis calc marketers toilette trailing pact itc lipstick honourable lulu windy brennan kpx punished saturation stamford alamo chronology mastery thermometer cranberry kan downhill vita comcast hyderabad steer nesting vogue aired attn spaghetti outward whisper ipswich tues boogie abramoff ean fla compromised utilizes confession deprived benedict lesbos vodka molding zaire fasteners bricks communism leopard sakai lk flowering wig jingle bounty arcadia fishes ringing knobs taurus rajasthan whiskey absurd committing tolerant stoves inlog enactment laminate earring aggregator datatype embryo postnuke ska nora salts marietta ergonomic furious dma iteration vida ceilings dispenser respecting sme approving kp unsafe refills ibis yyyy separating soups residing unidentified atl richie markings ims moist tractors trina drained vx spp coed audiobooks mule cummings sheikh gk hernandez kiwi ohm cessation truste append motive pests acreage seasoned sunflower duel mfc fingerprint bernardino stocked sorority bethel entre audition mca plano nmr sunderland doris motives reinforcement dwight lortab leveraging psychotherapy provost mso guessing htm stokes lakers ats saxophone cocktails tal mead harlem throttle steroid gong ber communicator horticulture dhs resets util sympathetic fridays ordinator bono isolate unconscious bays acronym veritas faulty affidavit breathtaking streamline crowne messiah brunch infamous pundit pleasing seizures appealed figurine surveyors mutants cyberspace tenacious expiry exif waterfall sensual persecution goldman petit burgess msu inning gaze fries chlorine freshly initialize tlc saxon cabo rye sybase isabella foundry toxicology mpls monies bodybuilding fta assassination nostalgia remarkably acetate pointe stall pls deere bmx saratoga entirety destined marcel terminator lad hulk badminton cyan ora cory bal flores olivier portage stacey serif dwellings informing yellowstone portability characterize ricardo yourselves fsb yearbook rotterdam lubricants cns hv alameda aerosol mlm clemson hostage cracker anglican monks compliment camino storey scotch sermons goin philly remembers coolers multilateral freddie contention costello audited juliet adjunct guernsey galore aloha dehydrogenase bangor persia aq gx axes postfix stirring fj altavista wil haze pits exponential utter shi bottled ants gev gastric secretarial influencing rents christy theirs mattresses todays donovan lax toaster cater colts omb rehearsal strauss reputable wei bac tuck rei slab lure kart ren cpl sbs archbishop putin questionnaires ling incompatible emblem profileprofile roadway overlapping serials walters dunes equivalence murders vaughn aviv miserable unsuccessful condominiums decorate appleton bottoms revocation vomiting chesterfield exposing pea tubs simulate schematic liposuction medina swf apoptosis thankful pneumatic alaskan friedrich sniper vertices elephants pinch additive professionalism libertarian rus flynn washable normalized uninstall scopes fundraiser braces troll calhoun teamwork deficient auditions refrigerators redirected annotations middletown filth moderation widgets worrying ontology timberland mags outrageous kraft videogames concluding vallarta blackboard chopper nitrate pinball pharmacists skates surcharge tbd comstock hers grin ipb latvian asu footprint installs malware tunnels crises trillion tsn comforter cashmere heavier nguyen meteorological spit labelled darker salomon horsepower globes algae sarbanes alcoholism dissent bdd csc maximal daly prenatal documenting scooby choral unrestricted happenings moby leicestershire neu contempt socialism hem leds mcbride edible anarchy arden clicked ineffective scorecard gln beirut drawers byrne conditioners acme leakage culturally ilug shady chemist evenly janitorial reclamation rove propane appendices collagen lionel praised rhymes blizzard erect gj nigerian refining concessions ect commandments malone confront sto vests lydia coyote makeover breeder electrode esc dragonball chow stp cookbooks pollen drunken mot avis valet spoiler cheng ari avr lamborghini polarized shrubs watering baroque ppt barrow eliot jung jihad transporting sharepoint rifles cts abit posterior aria elgin excise poetic abnormalities mortar qtr blamed rae recommending inmate dirk posture thereon valleys declaring blogshares motorsport septic commencing armada wrench thanked citroen arranging thrilled gz bas predicts amelia palmone jonah expedited discomfort curricula scar indictment apology wmd pms raped collars configurable andover denon sloan pudding flawed cfs checkpoint rosenberg ffi plato examiners salzburg iriver rot callaway tcm possesses dorm squared needless pies lakeside marquette palma barnett interconnection gilmore prc ther heterogeneous taxis hates aspirations gamefaqs fences excavation cookers luckily ultraviolet rutland lighted pneumonia monastery afc erected expresses haitian dialing migrate unicef carton lorraine councillors identifiers hague mentors transforms ammonia steiner licensure roxy outlaw tammy saws bovine tz dislike systematically ogden interruption demi imminent madam tights compelled criticized hypertext dcs soybean electra affirmed posix communal landlords brewers emu libby seite dynamite tease motley mci aroma pierced translates mais retractable cognition quickbooks cain townhouse verona stormwater syn sgi delegated coco chatting punish fishermen pipelines conforming causal rudy stringent rowan tia assigning dwell hacked inaugural awkward congrats msds weaving metropolis arafat srl psychologists diligence stair splitter dine wai standardization enforcing lakeland thiscategory classy struggled lookout arterial injustice mystical acxiom triathlon ironing kbytes thx commanded woodlands guardians manifesto slap jaws textured finn doppler pedestal entropy widening snooker unleashed underwood saline sonny longevity paw lux isabel nairobi sterile importer isl orioles botany dissolution rotor pauline quart theres bison suppressed allegro materially cit amor xvi fungi phyllis ttl dreamy bengal backstage scrolls awakening qq fairies prescribe lubbock greed nominate sparkle autograph suvs bmp migrating gasket refrain lastly overcoming wander kona relieved firearm dss luc elena bam closures participatory intermittent ante micron budgetary pcos vols revolving ssk bundled pantie bombers covert crater leah favored bred spongebob fractional markus ideological fostering wellbutrin rheumatoid thence birthplace bleed reverend transmitting swindon cabernet serie sek neptune dsm caucasian understandable shea goblet doctorate binaries inventions dea slovenian practicable showdown simone fronts ancestor russians spc potentials incur tempe hklm cores borrowers osx canonical nodded confronted believer bouvet multifunction australians nifty declines unveils peacock utmost skeletal dems oahu yates leroy rollover infos helpers lds elapsed thanx anthrax academies tout shockwave gre imitation harvested dab hopeful furnishing negatively westlife residences spinach bpm liquidation predecessor tamiflu cheeks hare beasts touchdown planar philanthropy adequacy iomega xa fetisch peanuts discovers eastman franchising coppermine discard cavalry ged breakers quorum forwards ecard prevalent plat exploits ue kn dukes offended trimmed py ferries worcestershire faqfaq bonn muller prostitution mosque fudge extractor horseback vested terribly earnest usergroupsusergroups svenska pcg myocardial homme clancy everytime callback tory encompasses rossi sander oldham gonzales conductivity vor confederate presumed annette climax blending atc weave vicki postponed danville philosophers speeding creditor exits pardon sedona oder skateboarding lexisnexis abby deepthroat outback teller mandates siena reiki biopsy peptides veil peck custodian dante lange quarry seneca oceanic tres helm burbank festive rosen awakenings pim alla preserves sediments appraiser smp ingram gaussian hustler jess tensions secretion linkages separator insult scraps waived cured schultz buggy adr concordia recon kennel drilled fileplanet souvenirs royals prescribing slack globalisation borland pastel gin nottinghamshire differentiate strollers jays uninsured picasso pilgrim vines susceptibility ambiguous mcgill disputed scouting royale instinct gorge righteousness carrot discriminatory opaque headquartered bullying saul flaming travelodge empower apis marian liens caterpillar hurley remington pedals chew teak benefited prevail bitmap migraine musik sli undermine enum omission boyle lamar mio diminished jonas aes locke cages methane pager snp jolla aclu capitals correctness westchester implication pap banjo shaker natives tive nimh quilting campgrounds adm stout rewarded densities isd athena deepest matthias tional duane sane turnaround climbed corrupted relays navigational stargate hanna husbands saskatoon cen fading colchester minh fingertips sba rockwell persuade vl pepsi rea roaming oversized snr sibling ecs determinations burberry weighed ashamed concierge nrs gorilla gatherings endure cfa inhibit nom pps cheltenham screenplay unabridged dickens ntp endpoint juniper repetition labelling siberian synchronous heartland preparatory cafeteria outfitters fielding dune hee adler opp homelessness yosemite cursed opengl efficiencies blowout youths tickboxes migrants massey tumble oversee thresholds stare unlocking missy isnt waveform deficits meade contradiction flair helium applegate wonderfully whitewater tableware bernie dug workgroup congenital trojans insanity clement embraced cli finely authenticated reformed tolerate robotic mana lest adhesion tic mississauga dialysis filmed staten carole noticeable cette aesthetics schwarzenegger smoker benign hypotheses afforded aisle dunno blur evidently summarizes limbs unforgettable punt sludge crypto christensen tanned altering bunker multiplication paved heavyweight lps fabricated zach pdp pasture phantomnode richest cruelty comptroller scalability creatine mormon embl minimizing scots genuinely gpo neighbouring plugged tyson souvenir dq mifflin relativity mojo econo cucumber occurrences shapiro marshal rituals anders seize decisive spawn pq blanks ub dungeons epoxy watercolor uncensored sailors stony fayette trainees tori shelving effluent infousa annals storytelling sadness periodical polarization moe dime losers bombings punta flavour smes ionamin fuckin crypt charlottesville accomplishment xu onwards bogus carp aniston prompts witches barred skinner equities dusk nouveau customary vertically crashing cautious possessions feeders urging jboss passions faded mobil scrolling counterpart utensils secretly tying lent diode kaufman magician indulgence aloe johan buckinghamshire melted lund medford fam nel extremes puff underlined whores galileo bloomfield obsessed flavored gemstones bmi viewpoints groceries motto exim singled alton appalachian staple dealings phillies pathetic ramblings janis craftsman irritation rulers centric collisions militia optionally eis conservatory nightclub bananas geophysical fictional adherence golfing defended rubin handlers grille elisabeth claw pushes alain flagship kittens topeka openoffice illegally bugzilla deter tyre furry cubes transcribed bouncing wand linus taco mcsg humboldt scarves cavalier ish rinse outfits mla charlton repertoire respectfully emeritus ulster macroeconomic tides chu weld venom gundam adaptec writ patagonia dispensing tailed puppets voyer tapping hostname excl bx arr typo immersion explode toulouse escapes berries merchantability happier autodesk mummy jn punjab stacked winged brighter cries speciality warranted attacker ruined catcher damp sanity ether suction haynes crusade siyabona rumble inverter correcting shattered abi heroic motivate retreats mackay formulate bridgeport assessor fullerton cpp sheds blockbuster dz amarillo pixmania pathfinder anomalies homogeneous bonsai windshield humphrey spheres belonged tomtom spf assigns croydon sofas croix cushions fern convection jdbc defenders debugger boing odessa lore ancillary pointless whipped vox alibris dinners rosie factoring genealogical gyms inhalation terre selfish eventual faucet nach mitigate bitpipe jamestown arguably techs electives walkman midget elisa shelton quan boiled commissioning neville experimentation saltwater natasha cpi endeavour roswell haute herring nis unfamiliar wacky expectancy deterioration sgml proclaimed arid anemia biting coincidence idiots mona reits muddy nuevo savanna crn hitchcock cid travestis neighbour mmf raspberry cancellations paging coe nudists illusions fac spikes asean airsoft bontril enumeration proliant keeling zh accesses suche permissible yielded nuisance jive siam latent marcia drowning bullshit casper spun shalt libstdc ric loch commanding sparrow poorest hector xpress datasets webdesign nicotine comeback brotherhood gannett milling sinking sulphur curricular downtime takeover wicker lolitas balm thessalonians figs upto browne nephew confess joaquin chit chaotic alexandre lays principally visor mundo transistor jarvis drip traced outright melodies spotting myriad stains sandal rubbing naive wien skeptical wagering remembrance detects everest disregard hanger outkast dragged pitbull foreman rtf allegiance fairview hires conduit alienware dependable mainframe echoes indo compilers ladders prudent glowing guinness heartbeat blazer alchemy linden timezone merck sven tanya geographically bmc alternating tristan audible folio eia presiding mans colleen bbbonline participates waterways syndicated lexicon aff fractures apprenticeship childbirth dumped integers zirconia barre shortages plumbers rama johannes fiery convex jfk raf richer igor hama mop urn soleil patton pei surfer diapers eas waco physiol connor adp northamptonshire biscuits disclaims sich outbound breakout restless unanswered paired fakes stderr kev fomit vaults injections ahmad remortgage yogurt complies tossed caucus workaround cooke polytechnic pillars katy zoe uber overwhelmed salute shoppe parody berlios csr penthouse compensated synthase lacked circulated soo pistons emule maltese sauvignon acorn bosses pint ascension bayer carrera ply mornings dvb cation mentioning scientology cdma flagstaff maxi pretoria thrive msm rac feminism rightly paragon basal topps webinar dewalt turnout bruins persist wilde indispensable clamps illicit firefly liar tabletop pledged monoclonal pictorial curling ares wholesaler smoky opus typekey aromatic flirt slang emporium princes restricting partnering promoters soothing freshmen mage departed sqrt aristotle israelis finch inherently cdp krishna forefront headlights monophonic largo proquest amazingly plural dominic sergio swapping skipped hereinafter nur extracting analogous mev hebrews particulate tally unpleasant uno tempted bedfordshire blindness creep staining rockport nist shaded cot plaster novo negotiable subcategories hearted quarterback obstruction agility complying sudbury otis overture newcomers hectares upscale scrabble noteworthy agile sdn mta sacks docbook kiosk ionic stray runaway slowing firstgov hoodie hoodia payout clinically watchers supplemented poppy monmouth metacritic obligated frenzy decoding jargon kangaroo sleeper elemental presenters teal unnamed epstein doncaster particulars jerking weblogic ity bungalow covington bazaar esd interconnect predicate recurrence chinatown mindless purifier recruits sharper kz tablespoons greedy rodgers gloryhole supervise termed frauen suppl stamping coolest reilly hotjobs downing gnd libc basque societal astros ire halogen pegasus silhouette wyndham osu tuesdays dorado daring realms maestro turin gus utp superpages forte coaxial tipping jpy holster fiddle crunch leipzig liam sesso bard kellogg arabidopsis reap argv hanoi ccm faucets ballistic exemplary payouts rockin caliber apostle playful supermarkets bmg icelandic multiplied enchanted belgrade styled nacional commanders csv telstra thor waive contraception bethany polaroid vance soprano polishing marquis underage cardio wen translating frontiers timeshares atk qi logger adjoining greet acclaim kool oki birding hardship detainees hast indi lymph barrie pollutant closeouts miriam cavaliers rollers carleton pumped tolkien differentiated sonia undp verifying jbl almighty weekday homecoming increments kurdish vel intuition revoked openness chromium circulating bryce ilo latch mccormick verbs drank pcm confrontation shreveport grower frederic darlington slippery unpredictable galerie dtd capacitor outpost burnett hilfiger mda litres moroccan seville mira nightwish chatter hess wheaton santo lettuce raging tidy motorized jong subgroup oppression chevelle vets bows yielding assays torso occult expeditions nok hooker ramon longhorn lorenzo beau backdrop subordinate lilies aerobic articulate vgroup ecstasy sweetheart fulfil calcutta thursdays dansk tenerife hobbs mayen mediator oldmedline dunlop caa tad modernization xe cultivated rang disconnected consulate fourier businessman watersports lucent wilkes commuter orthopedic disagreement hhs strands tyrosine sicily compost shenzhen adjourned familiarity initiating erroneous grabs erickson marlin pulses theses stuffing casserole canoeing cca jeux wilton ophthalmology flooded geile clubhouse reverted crackers greyhound corsair ironic licensees wards unsupported evaluates hinge svg ultima cockpit protesters fernandez venetian mvc sleazydream patti mz sew carrots faire laps memorials sennheiser resumed sheehan conversely emory stunt maven excuses commute staged vitae transgender hustle stimuli customizing subroutine upwards witty pong transcend loosely anchors hun hertz atheist capped oro myr bridgewater firefighter liking preacher propulsion complied intangible westfield compassionate catastrophic fuckers blower substitutes tata flown frau dubbed silky giclee groovy vows reusable macy actuarial distorted nathaniel attracts bern qualifies grizzly helpline micah erectile timeliness obstetrics chaired agri repay hurting homicide prognosis colombian pandemic await mpc fob sparse corridors sont mcdowell fossils victories dimage chemically fetus determinants compliments durango cider noncommercial opteron crooked gangs segregation superannuation nemo ifs overcast inverted lenny achieves haas wimbledon documentaries mpa rao remake arp braille forehead physiopathology skye seperate econpapers arxiv pax kalamazoo taj percy scratches conan lilac sinus maverick intellect charmed denny harman hears wilhelm nationalism pervasive auch enfield anabolic nie allegra lexar clears videotape educ knowingly pivot amplification larsen huron snippets undergraduates conserv digestion dustin wsop mixtures composites wolverhampton soaring dragging virtues banning flushing deprivation cpt delights gauteng foreword glide transverse ftc watertown pathogens engagements mft withstand uefa newbury authorizes blooms soar jacking radiohead uniformly ooh subsections todos definately bod piedmont yin tiki empowered homepages asi lena outlying slogan subdivisions handouts deducted ezekiel totaling elijah cpm marvelous bop asnblock compton stretches vigorous biloxi flee biscuit creme submits woes waltz menace emerges classify paige downstairs statesman indymedia clapton cheerful blush beyonce smf leaflet monde weymouth nabble spherical intracellular infoworld favourable informs boyz dramas cher waltham geisha billiard aut dblp briefcase malay unseen mcmahon optimism cq silica kara mcgregor modal marlboro grafton unusually phishing addendum widest foia impotence medley cadet redskins kirsten temper yorker memberlistmemberlist gam intravenous ashcroft asserts loren stew newsfeed hereafter carbs retiring smashing yakima accumulate realtones xtc vdata interpro tahiti engadget tracey wac mariner collier hush darfur fragmentation behavioural kiev paranormal whispered generosity vibrating glossaries sonyericsson lama artisan akin raphael dex lola embarrassing emoticons carbohydrates aqueous pembroke hms norwood appetizers stockholders webmin lillian stylesheet goldstein splinter ibn wnba preferable englewood juices ironically morale morales solder trench asf persuasion hottie stripper practise pfc adrenaline mammalian opted lodged revolt meteorology analyzes renders pioneering pristine francaise ctx shines catalan spreadsheets regain resize auditory applause medically tweak mmm trait popped busted alicante basins farmhouse pounding picturesque ottoman graders shrek eater universidad tuners utopia slider insists cymru fprintf willard irq lettering dads marlborough sdl ebusiness pouring hays cyrus concentrating soak buckingham courtroom hides goodwin manure savior dade secrecy wesleyan baht duplicated dreamed relocating fertile hinges plausible creepy synth filthy subchapter ttf narrator optimizations infocus bellsouth sweeney augustus aca fpo fahrenheit hillside standpoint layup laundering nationalist piazza fre denoted nazis cumfiesta oneself royalties newbies mds piles abbreviation vaginas blanco critiques stroll anomaly thighs boa expressive infect bezel avatars pers twiztid dotted frontal havoc ubiquitous arsenic synonym facilitation ncr xb voc yer rts doomed applets francs ballad pdfs sling contraction cac devised teh explorers billie undercover substrates evansville joystick knowledgebase forrester ravens xoops rican underline obscene uptime dooyoo spammers mes hymn continual nuclei gupta tummy axial slowed aladdin tolerated quay aest outing instruct wilcox topographic westport overhaul majordomo peruvian indemnity lev imaginative weir wednesdays burgers rai remarked portrayed watchlist clarendon campers phenotype countrywide ferris julio affirm directx spelled epoch mourning resistor phelps aft bhd plaid audubon fable rescued commentsblog snowmobile exploded publ cpg padres scars whisky tes uptown susie subparagraph batter weighting reyes rectal vivian nuggets silently pesos shakes dram mckinney impartial hershey embryos punctuation initials spans pallet pistols mara garages sds tanner avenues urology dun aforementioned rihanna tackling obese compress apostles melvin sober collaborations tread legitimacy zoology steals unwilling lis isolates velcro worksheets avaya srs wigan hua abba qd orig paddy huskies frey iz loyola plunge pearce gartner vos sinister xda burr arteries strapon chaser formations vantage texans diffuse boredom norma astra expasy crosse overdrive mondo ripley phosphorylation helpless cfo depletion neonatal qr mclaren wyatt rowling vhf flatbed spades slug visionary coffin otter golfers lira navajo earns amplified recess dispersed technics shouted damien clippers shilling resemble spirited gv carbonate mimi staa discriminate stared recharge crocodile openid sassy demux ratification ribosomal tdk vases filmmakers transnational advises sind coward paralegal spokesperson fha teamed preset inequalities iptables pocketpc garde nox jams pancreatic tran manicures dyes sca tls prweb holloway viz turbulence cdrw yell fins plz nadu ritchie underwriting dresser rulemaking rake valentino ornamental riches resign prolyte millenium collectable stephan aries ramps tackles injunction intervene poised dsa barking walden josephine dread dag catchment targus tactic ess partitioning voicemail acct handwriting shimano serpent lingere tapped articulated pitched parentheses contextual qwest jira cerevisiae wisely accustomed bremen steaks dyson playhouse superficial toxins camaro suns josef casts bunk cryptography stab sanction dyer effected signalling daycare murakami tubular merriam moi ode scorpio attr avoids richter emp ultrasonic evidenced heinz argos dit larvae dyke ashford intergovernmental cassidy paranoid kernels mobilization dino xvid dmoz amt ivtools barron wilkins snorkeling chilean avs suny gifs qualifier manipulated hannover alleviate fungal ligand seam aust peoplesoft freelists riddle coastline comedies fainter omit respectful flamingo cabaret deformation orf recession pfizer assembler awaited renovations nozzle externally needy genbank broadcasters employability wheeled booksellers noodles darn diners greeks retardation supervising freeport lyme corning prov reich dishnetwork armored amg weary solitary claremont moo photographed tweed snowy pianist emmanuel acapulco surrounds knocking cosmopolitan magistrate everlasting cpe childs pigment faction tous bizkit argentine blogosphere endocrine scandinavia minnie resp genie carlsbad ammo bling chars linn mcguire utilisation rulings sst handel geophysics microscopic clarified coherence slater broccoli foreach oakwood sensations orphan conferred mcgee kissimmee acp disturbances chandelier linker embryonic tetris carver paterson tds delle graceful synchronized intercept hsbc shellfish shouts ascertain astoria veto trajectory epsilon exhaustive annoyed bureaucracy knowles astrophysics paz stalls fined bien hansard inward reflector greeted lai hartley defenses meaningless authorisation clam vampires relocate nerd francesco hes georg dac negligible starch melinda godfather apron glazing guts ros pragmatic tyranny provisioning warehouses mnt regimen axel expandable antony hahn maserati fluffy marianne slender hereford bender reliably aides forma fas sendo absorbing cherries hasbro gaelic gomez alec corba polski distinguishing multidisciplinary ventricular glazed judd dashed petersen libyan dickson distressed bans macquarie shouting pta poy mao bullock villagers transferable yummy acknowledgments ethiopian momma lehigh mermaid buds concordance greenberg trish sexes wilder sire centred confinement islanders ding uncover contested coma husky conserve bland electrodes svcd cron darth abatement cramer yup originator ching whipping skipping melanoma thug routed rudolph abigail missionaries yugoslav householder occ cpan plotting yan succeeding bizjournalshire";

    // utility function
    var memoize = function(funct) {
        var cache = {};
        return function() {
            var key = arguments.length + Array.prototype.join.call(arguments,",");
            if (key in cache) return cache[key];
            else return cache[key] = funct.apply(this,arguments);
        };
    };

    function distanceBetweenKeys(keyMap, keyIndex1, keyIndex2, finger) {
        var xDiff = keyMap[keyIndex1].cx - keyMap[keyIndex2].cx,
            yDiff = keyMap[keyIndex1].cy - keyMap[keyIndex2].cy;
        
        var isSplit = keyMap.split;
        var hand = KB.finger.leftRightOrThumb(parseInt(finger));

        var xr, yr;
        if (!isSplit && hand === "left" ) {
            // rotate the movement vector to align with the left hand's approach angle
            xr = xDiff * costheta + yDiff * sintheta;
            yr = -xDiff * sintheta + yDiff * costheta;
        } else if (!isSplit && hand === "right") {
            // rotate the movement vector to align with the right hand's approach angle
            xr = xDiff * costheta - yDiff * sintheta;
            yr = xDiff * sintheta + yDiff * costheta;
        } else {
            xr = xDiff;
            yr = yDiff;
        }
        if (hand === "left" || hand === "right") {
            // simulate lateral hand movement move expensive than vertical
            xr *= 1.5;
        }
        //console.log("split=%s hand=%s finger=%s:  xdiff=%f, ydiff=%f ... xr=%f, yr=%f", keyMap.split, hand, finger, xDiff, yDiff, xr, yr);
        return Math.sqrt(xr*xr + yr*yr);
    }

    /*
        Look up where the char was typed and any other information we'll need. 
        
        Input:
        * keySet
        * charCode
        
        An object with the following properties will be returned:
          * fingerUsed          - Represents the finger used. 
          * keyIndex            - keyID for the keySet
          * charCode            - Char code for character pressed
          * pushType            - What type of key (ie, KB.PRIME_PUSH, KB.SHIFT_PUSH, etc)
          * errors              - A string array indicating any errors
    */
    function findCharInKeySet(keySet, charCode) {
        var ret,
            len,
            keys = keySet.keys,
            ii,
            hand;
        ret = {
            fingerUsed: null,
            keyIndex: null,
            charCode: charCode,
            pushType: null,
            errors: []
        };

        //console.log("Entering findCharInKeySet");

        len = keys.length;
        for (ii = 0; ii < len; ii++) {
            if ( keys[ii].primary && keys[ii].primary === charCode ) {
                ret.fingerUsed = keys[ii].finger;
                ret.keyIndex = ii;
                ret.pushType = KB.PRIME_PUSH;
                break;
            } else if ( keys[ii].shift && keys[ii].shift === charCode ) {
                ret.fingerUsed = keys[ii].finger;
                ret.keyIndex = ii;    
                ret.pushType = KB.SHIFT_PUSH;
                break;
            } else if ( keys[ii].altGr && keys[ii].altGr === charCode ) {
                ret.fingerUsed = keys[ii].finger;
                ret.keyIndex = ii;
                ret.pushType = KB.ALTGR_PUSH;
                break;
            } else if ( keys[ii].shiftAltGr && keys[ii].shiftAltGr === charCode ) {
                ret.fingerUsed = keys[ii].finger;
                ret.keyIndex = ii;
                ret.pushType = KB.SHIFT_ALTGR_PUSH;
                break;
            }
        }

        if (ret.fingerUsed === null) {
            if (charCode < 0) {
                // If negative number charCode fails, attempt to use equivalent positive
                return findCharInKeySet(keySet, -charCode);
            }
        }

        // Blogs often change certain characters to other codes, so do some character changes to accommodate certain instances
        if (ret.fingerUsed === null) {
	        switch (charCode) {
	            case 8217:
	                return findCharInKeySet(keySet, 39); // '
                case 8220:
                case 8221:
                    return findCharInKeySet(keySet, 34); // "
                case 8211:
	                return findCharInKeySet(keySet, 45); // -
	        }
	        ret.errors.push("Char code not found: " + charCode + " ("+String.fromCharCode(charCode)+")");
        }

        if ( ret.pushType !== KB.PRIME_PUSH && (charCode === 16 || charCode === -16 || charCode === -18) ) {
	        //console.log("Shift Key and Alt GR Key can only be set as 'primary' key presses.");
	        ret.errors.push("Shift Key and Alt GR Key can only be set as 'primary' key presses.");
	        return ret;
        }
        
        //console.dir(ret);
        //console.log("Leaving findCharInKeySet %d", charCode);
        
        return ret;
    }

    /*
        Returns an array of the fingers used to press the key.
        An object from the "findCharInKeySet" function is taken in as input.
    */
    function getFingersUsed( char2KeyMap, keyInfo ) {
        var hand = KB.finger.whichHand( keyInfo.fingerUsed ),
            fingers = {},
            shiftInfo,
            altGrInfo;
    
        //console.log("Entering getFingersUsed");
    
        fingers[keyInfo.fingerUsed] = true;
    
        if (keyInfo.pushType === KB.SHIFT_PUSH) {
            shiftInfo = (hand === "right") ? char2KeyMap[16] : char2KeyMap[-16];
            fingers[ shiftInfo.fingerUsed ] = true;
        } else if (keyInfo.pushType === KB.ALTGR_PUSH) {
            altGrInfo = char2KeyMap[-18];
            //console.dir(altGrInfo);
            fingers[ altGrInfo.fingerUsed ] = true;
        } else if (keyInfo.pushType === KB.SHIFT_ALTGR_PUSH) {
            shiftInfo = (hand === "right") ? char2KeyMap[16] : char2KeyMap[-16];
            altGrInfo = char2KeyMap[-18];
            fingers[ shiftInfo.fingerUsed ] = true;
            fingers[ altGrInfo.fingerUsed ] = true;
        }
    
        //console.log("Leaving getFingersUsed");
    
        return fingers;
    }

    /*
        input:
	        keyMap             - key map
	        fingerHomes        - object indexed by fingers, maps to key index where they start
	        fingerPositions    - current finger positions (same type of object as fingerHomes)
	        except             - finger indexes to not return to home keys
	        analysis           - analysis object
    */
    function returnFingersToHomeRow(config) {
    
        var finger,
            fingerHomes = config.fingerHomes,
            fingerPositions = config.fingerPositions,
            keyMap = config.keyMap,
            except = config.except,
            analysis = config.analysis;
    
        //console.log("Entering returnFingersToHomeRow");
    
        for (finger in KB.fingers) {
            if ( except[finger] ) {continue;} // don't return finger if in except list
            if ( fingerHomes[finger] === fingerPositions[finger]) {continue;} // finger already home
            analysis.distance[finger] += distanceBetweenKeysCached(keyMap, fingerPositions[finger], fingerHomes[finger], finger);
            fingerPositions[finger] = fingerHomes[finger]; // return finger to key
        }
        
        //console.log("Leaving returnFingersToHomeRow");
    }

    /*
    Inputs:
	   keyInfo: char2KeyMap[charCode],
	   char2KeyMap: 
	   fingerPositions: curFingerPos,
	   keyMap: keyMap,
	   analysis: analysis
    */
    function typeKey(config) {
    
        var keyInfo = config.keyInfo,
            char2KeyMap = config.char2KeyMap,
            fingerPositions = config.fingerPositions,
            keyMap = config.keyMap,
            analysis = config.analysis,
            hand = KB.finger.whichHand( keyInfo.fingerUsed ),
            shiftInfo = {},
            altGrInfo = {},
            errors = [],
            tmpHand;
    
        //console.log("Entering typeKey");
    
        switch (keyInfo.pushType) {
            case KB.SHIFT_PUSH:
                shiftInfo = (hand === "right") ? char2KeyMap[16] : char2KeyMap[-16];
                break;
            case KB.ALTGR_PUSH:
                altGrInfo = char2KeyMap[-18];
                break;
            case KB.SHIFT_ALTGR_PUSH:
                shiftInfo = (hand === "right") ? char2KeyMap[16] : char2KeyMap[-16];
                altGrInfo = char2KeyMap[-18];
                break;
        }

        if ( ( shiftInfo.fingerUsed && shiftInfo.fingerUsed === altGrInfo.fingerUsed ) ||
            shiftInfo.fingerUsed === keyInfo.fingerUsed ||
            altGrInfo.fingerUsed === keyInfo.fingerUsed ) {
            errors.push("Keyboard configuration error: Same finger used to type shift, altgr or " + String.fromCharCode(keyInfo.charCode));
            console.log("Exiting typeKey due to errors.");
            return errors;
        }

        //shift key has been lifted up
        if ( 
            (!_.isEqual(analysis.tmp.prevShiftInfo, {}) && !_.isEqual(shiftInfo, analysis.tmp.prevShiftInfo)) 
        ) {
            analysis.tmp.prevFingerUsed = analysis.tmp.prevShiftInfo.fingerUsed;
            analysis.tmp.prevHandUsed = KB.finger.leftRightOrThumb(analysis.tmp.prevShiftInfo.fingerUsed);
            analysis.tmp.prevKeyIndex = analysis.tmp.prevShiftInfo.keyIndex;
            //console.log('shift up');
        }

        // shift key has gone down
        if ( 
            (_.isEqual(analysis.tmp.prevShiftInfo, {}) || !_.isEqual(shiftInfo, analysis.tmp.prevShiftInfo)) &&
            !_.isEqual(shiftInfo, {})
        ) {

            analysis.distance[shiftInfo.fingerUsed] += moveFingerToKey( keyMap, fingerPositions, shiftInfo );
            analysis.fingerUsage[shiftInfo.fingerUsed]++;
            analysis.rowUsage[keyMap[shiftInfo.keyIndex].row]++;
            analysis.keyData[shiftInfo.keyIndex].count++;
            analysis.numKeys++;
            analysis.modifierUse.shift++;
            
            if (analysis.tmp.prevFingerUsed === shiftInfo.fingerUsed) {
                if (analysis.tmp.prevKeyIndex !== shiftInfo.keyIndex) {
                    analysis.consecFingerPressIgnoreDups[shiftInfo.fingerUsed]++;
                }
                analysis.consecFingerPress[shiftInfo.fingerUsed]++;
            }
            analysis.tmp.prevFingerUsed = shiftInfo.fingerUsed;
            
            tmpHand = KB.finger.leftRightOrThumb(shiftInfo.fingerUsed);
            if (analysis.tmp.prevHandUsed === tmpHand ) {
                if (analysis.tmp.prevKeyIndex !== shiftInfo.keyIndex) {
                    analysis.consecHandPressIgnoreDups[tmpHand]++;
                }
                analysis.consecHandPress[tmpHand]++;
            }
            analysis.tmp.prevHandUsed = tmpHand;
            
            analysis.tmp.prevKeyIndex = shiftInfo.keyIndex;

            //console.log('shift down');

        } else if ( typeof shiftInfo.fingerUsed !== "undefined" ) {
            analysis.modifierUse.shift++;
        }
    
        // altgr key has been lifted up
        if ( 
            (!_.isEqual(analysis.tmp.prevAltGrInfo, {}) && !_.isEqual(altGrInfo, analysis.tmp.prevAltGrInfo)) 
        ) {
            analysis.tmp.prevFingerUsed = analysis.tmp.prevAltGrInfo.fingerUsed;
            analysis.tmp.prevHandUsed = KB.finger.leftRightOrThumb(analysis.tmp.prevAltGrInfo.fingerUsed);
            analysis.tmp.prevKeyIndex = analysis.tmp.prevAltGrInfo.keyIndex;
        }

        // altgr key has gone down
        if ( 
            (_.isEqual(analysis.tmp.prevAltGrInfo, {}) || !_.isEqual(altGrInfo, analysis.tmp.prevAltGrInfo)) &&
            !_.isEqual(altGrInfo, {})
        ) {

            analysis.distance[altGrInfo.fingerUsed] += moveFingerToKey( keyMap, fingerPositions, altGrInfo );
            analysis.fingerUsage[altGrInfo.fingerUsed]++;
            analysis.rowUsage[keyMap[altGrInfo.keyIndex].row]++;
            analysis.keyData[altGrInfo.keyIndex].count++;
            analysis.numKeys++;
            analysis.modifierUse.altGr++;
            
            if (analysis.tmp.prevFingerUsed === altGrInfo.fingerUsed) {
                if (analysis.tmp.prevKeyIndex !== altGrInfo.keyIndex) {
                    analysis.consecFingerPressIgnoreDups[altGrInfo.fingerUsed]++;
                }
                analysis.consecFingerPress[altGrInfo.fingerUsed]++;
            }
            analysis.tmp.prevFingerUsed = altGrInfo.fingerUsed;
            
            tmpHand = KB.finger.leftRightOrThumb(altGrInfo.fingerUsed);
            if (analysis.tmp.prevHandUsed === tmpHand ) {
                if (analysis.tmp.prevKeyIndex !== altGrInfo.keyIndex) {
                    analysis.consecHandPressIgnoreDups[tmpHand]++;
                }
                analysis.consecHandPress[tmpHand]++;
            }
            analysis.tmp.prevHandUsed = tmpHand;
            
            analysis.tmp.prevKeyIndex = altGrInfo.keyIndex;

        } else if ( typeof altGrInfo.fingerUsed !== "undefined" ) {
            analysis.modifierUse.altGr++;
        }

        if ( ( shiftInfo.fingerUsed && shiftInfo.fingerUsed === altGrInfo.fingerUsed ) ||
            shiftInfo.fingerUsed === keyInfo.fingerUsed ||
            altGrInfo.fingerUsed === keyInfo.fingerUsed ) {
            errors.push("Keyboard configuration error: Same finger used to type shift, altgr or " + String.fromCharCode(keyInfo.charCode));
            console.log("Exiting typeKey due to errors.");
            return errors;
        }

        // record stats
    /*
        if ( typeof shiftInfo.fingerUsed !== "undefined" ) {
            analysis.distance[shiftInfo.fingerUsed] += moveFingerToKey( keyMap, fingerPositions, shiftInfo );
            analysis.fingerUsage[shiftInfo.fingerUsed]++;
            analysis.rowUsage[keyMap[shiftInfo.keyIndex].row]++;
            analysis.keyData[shiftInfo.keyIndex].count++;
            analysis.numKeys++;
            analysis.modifierUse.shift++;
            
            if (analysis.tmp.prevFingerUsed === shiftInfo.fingerUsed) {
                if (analysis.tmp.prevKeyIndex !== shiftInfo.keyIndex) {
                    analysis.consecFingerPressIgnoreDups[shiftInfo.fingerUsed]++;
                }
                analysis.consecFingerPress[shiftInfo.fingerUsed]++;
            }
            analysis.tmp.prevFingerUsed = shiftInfo.fingerUsed;
            
            tmpHand = KB.finger.leftRightOrThumb(shiftInfo.fingerUsed);
            if (analysis.tmp.prevHandUsed === tmpHand ) {
                if (analysis.tmp.prevKeyIndex !== shiftInfo.keyIndex) {
                    analysis.consecHandPressIgnoreDups[tmpHand]++;
                }
                analysis.consecHandPress[tmpHand]++;
            }
            analysis.tmp.prevHandUsed = tmpHand;
            
            analysis.tmp.prevKeyIndex = shiftInfo.keyIndex;
        }
        */
        /*
        if ( typeof altGrInfo.fingerUsed !== "undefined" ) {
            analysis.distance[altGrInfo.fingerUsed] += moveFingerToKey( keyMap, fingerPositions, altGrInfo );
            analysis.fingerUsage[altGrInfo.fingerUsed]++;
            analysis.rowUsage[keyMap[altGrInfo.keyIndex].row]++;
            analysis.keyData[altGrInfo.keyIndex].count++;
            analysis.numKeys++;
            analysis.modifierUse.altGr++;
            
            if (analysis.tmp.prevFingerUsed === altGrInfo.fingerUsed) {
                if (analysis.tmp.prevKeyIndex !== altGrInfo.keyIndex) {
                    analysis.consecFingerPressIgnoreDups[altGrInfo.fingerUsed]++;
                }
                analysis.consecFingerPress[altGrInfo.fingerUsed]++;
            }
            analysis.tmp.prevFingerUsed = altGrInfo.fingerUsed;
            
            tmpHand = KB.finger.leftRightOrThumb(altGrInfo.fingerUsed);
            if (analysis.tmp.prevHandUsed === tmpHand ) {
                if (analysis.tmp.prevKeyIndex !== altGrInfo.keyIndex) {
                    analysis.consecHandPressIgnoreDups[tmpHand]++;
                }
                analysis.consecHandPress[tmpHand]++;
            }
            analysis.tmp.prevHandUsed = tmpHand;
            
            analysis.tmp.prevKeyIndex = altGrInfo.keyIndex;
        }
        */
        
        if (typeof shiftInfo.fingerUsed !== "undefined" && typeof altGrInfo.fingerUsed !== "undefined") {
            analysis.modifierUse.shiftAltGr++;
        }
    

        // handle the key that was typed

        analysis.fingerUsage[keyInfo.fingerUsed]++;
        analysis.distance[keyInfo.fingerUsed] += moveFingerToKey( keyMap, fingerPositions, keyInfo );
        analysis.rowUsage[keyMap[keyInfo.keyIndex].row]++;
        analysis.keyData[keyInfo.keyIndex].count++;
        analysis.numKeys++;
        
        if (analysis.tmp.prevFingerUsed === keyInfo.fingerUsed) {
            if (analysis.tmp.prevKeyIndex !== keyInfo.keyIndex) {
                analysis.consecFingerPressIgnoreDups[keyInfo.fingerUsed]++;
            }
            analysis.consecFingerPress[keyInfo.fingerUsed]++;
        }
        analysis.tmp.prevFingerUsed = keyInfo.fingerUsed;
        
        tmpHand = KB.finger.leftRightOrThumb(keyInfo.fingerUsed);
        if (analysis.tmp.prevHandUsed === tmpHand ) {
            if (analysis.tmp.prevKeyIndex !== keyInfo.keyIndex) {
                analysis.consecHandPressIgnoreDups[tmpHand]++;
            }
            analysis.consecHandPress[tmpHand]++;
        }
        analysis.tmp.prevHandUsed = tmpHand;
        
        // update key index for next press
        analysis.tmp.prevKeyIndex = keyInfo.keyIndex;
        
        analysis.tmp.prevShiftInfo = shiftInfo;
        analysis.tmp.prevAltGrInfo = altGrInfo;

        //console.log("Leaving typeKey");
        return errors;
    }

    /*
        Updates the fingerPositions object and returns the distance the finger moved
    */
    function moveFingerToKey( keyMap, fingerPositions, keyInfo) {
        //console.log("Entering moveFingerToKey");
        var dist = distanceBetweenKeysCached(keyMap, keyInfo.keyIndex, fingerPositions[keyInfo.fingerUsed], keyInfo.fingerUsed);
        fingerPositions[keyInfo.fingerUsed] = keyInfo.keyIndex;
        //console.log("Exiting moveFingerToKey");
        return dist; 
    }

    /*
        config.keyMap
        config.keySet
        config.text
    */
    me.examine = function(config) {
        if (!config || !config.keyMap || !config.keySet || typeof config.text === "undefined") {
            console.log("config object for examine function does not contain the needed parameters.");
            return;
        }

        var tLen = config.text.length,
            ii,
            jj,
            text = config.text.replace(/\r\n/g,"\r").replace(/\n/g,"\r"),
            keyMap = config.keyMap,
            keySet = config.keySet,
            charCode,
            finger,
            fingerLabel,
            curFingerPos = {},
            char2KeyMap = {},
            analysis = {}; // holds data we collect
        
//console.log('-----')

        analysis.keyString = me.toKeyString(config.keySet);
        analysis.keySet = _.cloneDeep(config.keySet);
        analysis.distance =    [0,0,0,0,0,0,0,0,0,0,0];
        analysis.fingerUsage = [0,0,0,0,0,0,0,0,0,0,0];
        analysis.rowUsage = [0, 0, 0, 0, 0];
        analysis.errors = [];
        analysis.keyData = {length:0}; // records number of times pushed
        analysis.charData = {}; // records information about characters // TODO: charData should only be computed once, not 5-6 times
        analysis.tmp = {}; // holds temporary data
        analysis.tmp.prevShiftInfo = {};
        analysis.tmp.prevAltGrInfo = {};
        analysis.consecFingerPress = [0,0,0,0,0,0,0,0,0,0,0];
        analysis.consecFingerPressIgnoreDups = [0,0,0,0,0,0,0,0,0,0,0];
        analysis.consecHandPress = {"left":0,"right":0,"thumbs":0};
        analysis.consecHandPressIgnoreDups = {"left":0,"right":0,"thumbs":0};
        analysis.modifierUse = {"shift":0,"altGr":0,"shiftAltGr":0};
        analysis.numKeys = 0;
        
        // initialize data keyData and charData data set
        for (ii = 0; ii < keySet.keys.length; ii++) {
            analysis.keyData[ii] = {};
            analysis.keyData[ii].count = 0;
            analysis.keyData[ii].index = ii;
            analysis.keyData.length++;
            
            for (jj in KB.PUSH_TYPES) {
                charCode = keySet.keys[ii][KB.PUSH_TYPES[jj]];
                if (typeof charCode === "number") {
                    analysis.charData[charCode] = {};
                }
            }
        }
        
        distanceBetweenKeysCached = memoize(distanceBetweenKeys);

        // initialize current finger positions
        curFingerPos[KB.finger.LEFT_PINKY] = keySet.fingerStart[KB.finger.LEFT_PINKY];
        curFingerPos[KB.finger.LEFT_RING] = keySet.fingerStart[KB.finger.LEFT_RING];
        curFingerPos[KB.finger.LEFT_MIDDLE] = keySet.fingerStart[KB.finger.LEFT_MIDDLE];
        curFingerPos[KB.finger.LEFT_INDEX] = keySet.fingerStart[KB.finger.LEFT_INDEX];
        curFingerPos[KB.finger.LEFT_THUMB] = keySet.fingerStart[KB.finger.LEFT_THUMB];
        curFingerPos[KB.finger.RIGHT_THUMB] = keySet.fingerStart[KB.finger.RIGHT_THUMB];
        curFingerPos[KB.finger.RIGHT_INDEX] = keySet.fingerStart[KB.finger.RIGHT_INDEX];
        curFingerPos[KB.finger.RIGHT_MIDDLE] = keySet.fingerStart[KB.finger.RIGHT_MIDDLE];
        curFingerPos[KB.finger.RIGHT_RING] = keySet.fingerStart[KB.finger.RIGHT_RING];
        curFingerPos[KB.finger.RIGHT_PINKY] = keySet.fingerStart[KB.finger.RIGHT_PINKY];

        // shift and altgr keys        
        char2KeyMap[16] = char2KeyMap[16] || findCharInKeySet(keySet, 16);
        char2KeyMap[-16] = char2KeyMap[-16] || findCharInKeySet(keySet, -16);
        char2KeyMap[-18] = char2KeyMap[-18] || findCharInKeySet(keySet, -18);
        
        if (char2KeyMap[16].errors.length > 1) {
            analysis.errors.push("Fatal Error: (left) Shift key not set correctly.");
            return analysis; 
        }
        if (char2KeyMap[-16].errors.length > 1) {
            analysis.errors.push("Fatal Error: (right) Shift key not set correctly.");
            return analysis; 
        }
        if (char2KeyMap[16].errors.length > 1) {
            analysis.errors.push("Fatal Error: AltGr key not set correctly.");
            return analysis; 
        }
        
        for (ii = 0; ii < tLen; ii++) {
            charCode = text.charCodeAt(ii);
            //console.log(charCode + " " + String.fromCharCode(charCode));

            // return object contains: fingerUsed, keyIndex, pushType, errors
            char2KeyMap[charCode] = char2KeyMap[charCode] || findCharInKeySet(keySet, charCode);
            
            if ( char2KeyMap[charCode].fingerUsed === null ) {
                console.log("Char code not found on keyboard (ignoring key):" + charCode); 
                analysis.errors.push.apply(analysis.errors, char2KeyMap[charCode].errors);
                continue;
            }
            
            returnFingersToHomeRow({
                keyMap: keyMap,
                fingerHomes: keySet.fingerStart,
                fingerPositions: curFingerPos,
                except: getFingersUsed( char2KeyMap, char2KeyMap[charCode] ),
                analysis: analysis
            });
            
            typeKey({
                keyInfo: char2KeyMap[charCode],
                char2KeyMap: char2KeyMap,
                fingerPositions: curFingerPos,
                keyMap: keyMap,
                analysis: analysis
            });
        }
        
        // done typing, but return fingers to the home row
        returnFingersToHomeRow({
            keyMap: keyMap,
            fingerHomes: keySet.fingerStart,
            fingerPositions: curFingerPos,
            except: {},
            analysis: analysis
        });
        
        analysis.pixelsPerCm = keyMap.pixelsPerCm;
        analysis.label = keySet.label;
        analysis.layoutName = keySet.layoutName;
        
        for (finger in KB.fingers) {
            fingerLabel = KB.fingers[finger];
	        //console.log(fingerLabel + " distance:" + analysis.distance[ finger ]);
	        var numCm = (analysis.distance[ finger ] / keyMap.pixelsPerCm);
	        var numMeters = (numCm * 0.001);
	        var numFeet = numMeters * 3.2808399;
	        var numMiles = numMeters * 0.000621371192;
	    
	        //console.log("meters:" + numMeters);
	        //console.log("feet:" + numFeet);
	        //console.log("miles:" + numMiles);
	    }
        
        distanceBetweenKeysCached = null;
        return analysis;
    };

    /*
        Takes in results from multiple calls to examine and scores them
    */
    me.scoreLayouts = function(analysis) {
        var results = {};
        
        // DISTANCE
        results.distScores = [];

        var ii, jj, total = [], len = analysis.length;
        for (ii = 0; ii < len; ii++) {
            total[ii] = 0; 
            var distu = 0;
            for (jj = 0; jj < analysis[ii].distance.length; jj++) {
                total[ii] += (analysis[ii].distance[jj] / analysis[ii].pixelsPerCm);
                distu += analysis[ii].distance[jj]/50;
            }
            // console.log("DIST (u): L%d %f", ii, distu); //for debug: show distance in key units
        }

        for (ii = 0; ii < len; ii++) {
            results.distScores[ii] = Math.max(0, 4 - (total[ii] / analysis[ii].numKeys)) / 4;
            // console.log("DIST SCORE: L%d, %f", ii, results.distScores[ii]); 
            if ( !isFinite(results.distScores[ii]) ) { results.distScores[ii]=0;}
        }
        
        // FINGER USAGE
        results.fingerScores = [];
        var percent;
        var fScoring = {};
        fScoring[KB.finger.LEFT_PINKY] =    0.5;
        fScoring[KB.finger.LEFT_RING] =     1.0;
        fScoring[KB.finger.LEFT_MIDDLE] =   2.0;
        fScoring[KB.finger.LEFT_INDEX] =    2.0;
        fScoring[KB.finger.LEFT_THUMB] =    1.0;
        fScoring[KB.finger.RIGHT_THUMB] =   1.0;
        fScoring[KB.finger.RIGHT_INDEX] =   2.0;
        fScoring[KB.finger.RIGHT_MIDDLE] =  2.0;
        fScoring[KB.finger.RIGHT_RING] =    1.0;
        fScoring[KB.finger.RIGHT_PINKY] =   0.5;
        
        for (ii = 0; ii < len; ii++) {
            total = 0;
            for (jj = 0; jj < analysis[ii].fingerUsage.length; jj++) {
                if (!fScoring[jj]) {continue;}//skip non-fingers
                percent = (analysis[ii].fingerUsage[jj] / analysis[ii].numKeys) * 100;
                percent = Math.min(percent, 20); // 20 is the max allowed percent
                total += (percent * fScoring[jj]);        
            }
            results.fingerScores[ii] = total / 200; // 180 is max possible score
            // console.log("FINGER SCORE: L%d %f", ii, results.fingerScores[ii]); 

        }
        
        // CONSEC FINGER USAGE
        results.consecFingerScores = [];
        total = [];
        for (ii = 0; ii < len; ii++) {
            total[ii] = 0; 
            for (jj = 0; jj < analysis[ii].consecFingerPressIgnoreDups.length; jj++) {
                total[ii] += analysis[ii].consecFingerPressIgnoreDups[jj] ;
            }
            total[ii] = (total[ii] / analysis[ii].numKeys) * 100;
        }
        for (ii = 0; ii < len; ii++) {
            results.consecFingerScores[ii] = Math.max(0, 10 - total[ii]) / 10;
            // console.log("CONSEC FINGER USAGE: L%d %f", ii, results.consecFingerScores[ii]); 
        }
        
        // CONSEC HAND USAGE
        results.consecHandScores = [];
        total = [];
        for (ii = 0; ii < len; ii++) {
            total[ii] = (analysis[ii].consecHandPressIgnoreDups["left"] + 
                         analysis[ii].consecHandPressIgnoreDups["right"]) / analysis[ii].numKeys;
            total[ii] = (total[ii]) * 100;
        }
        for (ii = 0; ii < len; ii++) {
            results.consecHandScores[ii] = Math.max(0, 50 - total[ii]) / 50;
            // console.log("CONSEC HAND USAGE: L%d %f", ii, results.consecHandScores[ii]); 
        }
        
        // put it all together!
        var consecHandWeight = 0, consecFingerWeight = 30, fingerUsageWeight = 20, distWeight = 50;
        results.finalList = [];
        for (ii = 0; ii < len; ii++) {
            results.finalList[ii] = {};

            results.finalList[ii].keyString = analysis[ii].keyString;
            results.finalList[ii].keySet = analysis[ii].keySet;
            results.finalList[ii].layoutName = analysis[ii].layoutName;
            results.finalList[ii].score = 
                (results.consecHandScores[ii] * consecHandWeight) +
                (results.consecFingerScores[ii] * consecFingerWeight) +
                (results.fingerScores[ii] * fingerUsageWeight) +
                (results.distScores[ii] * distWeight);
            if ( !isFinite( results.finalList[ii].score ) ) { results.finalList[ii].score=0;}
        }
        
        results.finalList.sort(function(a,b) {
            return b.score - a.score;
        });

        return results;
    };
    return me;
})();

module.exports.KB = KB;
module.exports.KLA = KLA;


