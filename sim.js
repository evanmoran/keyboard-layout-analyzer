
console.log("SIM STARTED");

_ = require("lodash");
const dateFormat = require("dateformat");
const colors = require('colors');

const TinyQueue = require("tinyqueue");
// const KLA = require("./js/analyzer");
const combined = require("./common/pat/keyboard/js/kb_combined");
var KB = combined.KB;
var KLA = combined.KLA;


// ----------------------------------------------------------------------

// const fs = require("fs");
// const {keys} = Object;
// const {Console} = console;
// /**
//  * Redirect console to a file.  Call without path or with false-y
//  * value to restore original behavior.
//  * @param {string} [path]
//  */
// function file(path) {
//     const con = path ? new Console(fs.createWriteStream(path)) : null;

//     keys(Console.prototype).forEach(key => {
//         if (path) {
//             this[key] = (...args) => con[key](...args);
//         } else {
//             delete this[key];
//         }
//     });
// };
// console.file = file;

// // Log this time as log
var logFilePath = "./" + dateFormat(new Date(), "yyyy_mm_dd__h:MM:ss") + ".log";
// console.file(logFile);

// // // patch global console object and export
// // module.exports = console.file = file;

var consoleLog = console.log;
var consoleError = console.error;

var fs = require('fs');
var util = require('util');
var fd = fs.openSync(logFilePath, 'a'); 

  // Or 'w' to truncate the file every time the process starts.
var logStdout = process.stdout;

console.log = function () {
    consoleLog(...arguments);

    var outStringWithColor = util.format.apply(null, arguments) + '\n';
    var outString = outStringWithColor.replace(
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
    fs.writeSync(fd, outString);
    // logFile.write();
    // logStdout.write(util.format.apply(null, arguments) + '\n');
}
console.error = console.log;

// ----------------------------------------------------------------------

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

    function _cartesianProductOf(args) {
        if (arguments.length>1) args=_.toArray(arguments);

        // strings to arrays of letters
        args=_.map(args, opt=>typeof opt==='string'?_.toArray(opt):opt)

        return _.reduce(args, function(a, b) {
            return _.flatten(_.map(a, function(x) {
                return _.map(b, function(y) {
                    return _.concat(x,[y]);
                });
            }), true);
        }, [ [] ]);
    }


    function _cartesianProductObj(optObj){
        var keys = _.keys(optObj);
        var opts = _.values(optObj);
        var combs = _cartesianProductOf(opts);
        return _.map(combs,function(comb){
            return _.zipObject(keys,comb);
        });
    }

    function product(opts){
        if (arguments.length===1 && !_.isArray(opts))
            return _cartesianProductObj(opts)
        else if (arguments.length===1)
            return _cartesianProductOf(opts)
        else
            return _cartesianProductOf(arguments)
    }
    function permutations(obj, n){
        if (typeof obj=='string') obj = _.toArray(obj)
        n = n?n:obj.length
        // make n copies of keys/indices
        let nInds=[];
        for (var j = 0; j < n; j++) {nInds.push(_.keys(obj)) }
        // get product of the indices, then filter to remove the same key twice
        // var arrangements = product(nInds).filter(pair=>pair[0]!==pair[1]) // this line only removes duplicates from the first two elements.
        let arrangements = product(nInds);
        let out=[]
        for (let j=0; j< arrangements.length;j++ ) {
            let outt = arrangements[j].filter((value, index, self)=> {return self.indexOf(value) === index})
            if (outt.length === arrangements[j].length) out.push(outt)
        }
        return _.map(out,indices=>_.map(indices,i=>obj[i]))
    }
    function combinations(obj,n){
        /* filter out keys out of order, e.g. [0,1] is ok but [1,0] isn't */
        function isSorted(arr) {
            return _.every(arr, function (value, index, array) {
                return index === 0 || String(array[index - 1]) <= String(value);
            });
        }
        // array with n copies of the keys of obj
        return _(permutations(_.keys(obj),n))
            .filter(isSorted)
            .map(indices=>_.map(indices,i=>obj[i]))
            .value()
    }
    _.permutations = permutations;
    _.combinations = combinations;

    const ROOT_INDEX=1;class Heapify{constructor(t=64,i=[],e=[],s=Uint32Array,r=Uint32Array){if(this._capacity=t,this._keys=new s(t+ROOT_INDEX),this._priorities=new r(t+ROOT_INDEX),i.length!==e.length)throw new Error("Number of keys does not match number of priorities provided.");if(t<i.length)throw new Error("Capacity less than number of provided keys.");for(let t=0;t<i.length;t++)this._keys[t+ROOT_INDEX]=i[t],this._priorities[t+ROOT_INDEX]=e[t];this.length=i.length;for(let t=i.length>>>1;t>=ROOT_INDEX;t--)this.bubbleDown(t)}get capacity(){return this._capacity}clear(){this.length=0}bubbleUp(t){const i=this._keys[t],e=this._priorities[t];for(;t>ROOT_INDEX;){const i=t>>>1;if(this._priorities[i]<=e)break;this._keys[t]=this._keys[i],this._priorities[t]=this._priorities[i],t=i}this._keys[t]=i,this._priorities[t]=e}bubbleDown(t){const i=this._keys[t],e=this._priorities[t],s=ROOT_INDEX+(this.length>>>1),r=this.length+ROOT_INDEX;for(;t<s;){const i=t<<1;if(i>=r)break;let s=this._priorities[i],h=this._keys[i],o=i;const n=i+1;if(n<r){const t=this._priorities[n];t<s&&(s=t,h=this._keys[n],o=n)}if(s>=e)break;this._keys[t]=h,this._priorities[t]=s,t=o}this._keys[t]=i,this._priorities[t]=e}push(t,i){if(this.length===this._capacity)throw new Error("Heap has reached capacity, can't push new items");const e=this.length+ROOT_INDEX;this._keys[e]=t,this._priorities[e]=i,this.bubbleUp(e),this.length++}pop(){if(0===this.length)return;const t=this._keys[ROOT_INDEX];return this.length--,this.length>0&&(this._keys[ROOT_INDEX]=this._keys[this.length+ROOT_INDEX],this._priorities[ROOT_INDEX]=this._priorities[this.length+ROOT_INDEX],this.bubbleDown(ROOT_INDEX)),t}peekPriority(){return this._priorities[ROOT_INDEX]}peek(){return this._keys[ROOT_INDEX]}get size(){return this.length}toString(){if(0===this.length)return"(empty queue)";const t=Array(this.length-ROOT_INDEX);for(let i=0;i<this.length;i++)t[i]=this._priorities[i+ROOT_INDEX];return`[${t.join(" ")}]`}get[Symbol.toStringTag](){return"Heapify"}*[Symbol.iterator](){for(let t=0;t<this.length;t++){const i=this._priorities[t+ROOT_INDEX],e=this._keys[t+ROOT_INDEX];yield[e,i]}}*keys(){for(let t=0;t<this.length;t++)yield this._keys[t+ROOT_INDEX]}*priorities(){for(let t=0;t<this.length;t++)yield this._priorities[t+ROOT_INDEX]}}

    function sortAndFlattenString(str){
        var arr = str.split('');
        // sorted and unique
        var sorted = _.uniqBy(arr.sort(), function(e){ return e; });
        var out = sorted.join('');
        // no spaces
        out = out.replace(/\s/g, '');
        return out;
    }

    function sortString(str){
        var arr = str.split('');
        var sorted = arr.sort();
        return sorted.join('');
    }
    const cloneArray = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);

var me = KLA.Analyzer;












// ---------------------------------------------------------------------------------

var MAX_DELTA_COUNT = 8;
// var BEAM_WIDTH = 25; // only look at top BEAM results
var MIN_RELATIVE_THRESHOLD = -4 ; // prev to top scoree
var FINISH_THRESHOLD_SCORE = 2;
var FINISH_THRESHOLD_DELTA_REMAINING = 2; // when this or less delta places remain, use FINISH_THRESHOLD_SCORE to limit recursion
var MAX_COUNT = 10000000;
var TEXT = me.t1000;
var SWAPPABLE_KEYS = me.qwerty23Mask;
var FIRST_KEYBOARD = _.cloneDeep(KB.keySet.standard.qwerty);
FIRST_KEYBOARD.layoutName = "ROOT KEYBOARD LAYOUT NAME";

console.log("MAX_DELTA_COUNT:                  ".white, MAX_DELTA_COUNT.toString().magenta);
console.log("MIN_RELATIVE_THRESHOLD:           ".white, MIN_RELATIVE_THRESHOLD.toString().magenta);
console.log("MAX_COUNT:                        ".white, MAX_COUNT.toString().magenta);
console.log("FINISH_THRESHOLD_SCORE:           ".white, FINISH_THRESHOLD_SCORE.toString().magenta);
console.log("FINISH_THRESHOLD_DELTA_REMAINING: ".white, FINISH_THRESHOLD_DELTA_REMAINING.toString().magenta);
console.log("FIRST_KEYBOARD:                   ".white, me.toKeyString(FIRST_KEYBOARD).green);
console.log("SWAPPABLE_KEYS:                   ".white, SWAPPABLE_KEYS.toString().cyan, "\n\n");

// ---------------------------------------------------------------------------------








var q = new TinyQueue([], function(a,b){ return b.score - a.score; });

var swappableCombinations = [];


// 3 loop
// swappableCombinations.push(..._.combinations(SWAPPABLE_KEYS, 3));

// // 2 loop
swappableCombinations.push(..._.combinations(SWAPPABLE_KEYS, 2));

// 4 loop
// swappableCombinations.push(..._.combinations(SWAPPABLE_KEYS, 4));

// Solve first
var analysis = [];
analysis.push(
    me.examine({
    text: TEXT,
    keyMap: KB.keyMap.standard.s683_225,
    keySet: FIRST_KEYBOARD
}));
var scores = me.scoreLayouts(analysis);
var initialScore = scores.finalList[0].score;
console.log("initialScore", scoreColor(initialScore));
var scored = {}
var completed = {}
var queued = {}
q.push({keyString: me.toKeyString(FIRST_KEYBOARD), layoutName: FIRST_KEYBOARD.ops, score: initialScore, /*scoreList: [],*/ keySet: FIRST_KEYBOARD});

var bestScore = 0;
var bestString = "NO BEST STRING";
var bestLayoutName = "NO BEST LAYOUT";
var bestDeltaName = "NO BEST DELTA"
var count = 1;

function scoreColor(score, lowScore, mediumScore) {
    if (lowScore === undefined) {
        lowScore = 60;
    }
    if (mediumScore === undefined) {
        mediumScore = 67;
    }

    var scoreString = score.toString();
    if (score < lowScore) return scoreString.red;
    else if (score < mediumScore) return scoreString.yellow;
    return scoreString.green;
}

while(q.length > 0 && count <= MAX_COUNT) {
    analysis = []
    var current = q.pop();
    var currentLayoutName = current.layoutName;
    var currentKeyString = me.toKeyString(current.keySet);
    var deltaLayoutName = sortAndFlattenString(current.layoutName);

    console.log("\nSOLVE\t\t".cyan, (count + "/" + MAX_COUNT + " (" + q.length + ")\t\t").cyan, deltaLayoutName.cyan + "\t\t", currentKeyString.cyan + "\t\t", currentLayoutName.cyan);

    count++;

    // Analyize all swaps and rotate combinations
    _.forEach(swappableCombinations, function(keyIxList, pairCount){
        var characterCodeList = _.map(keyIxList, function(keyIx){ return current.keySet.keys[keyIx].primary; });
        var characterList = _.map(characterCodeList, function(characterCode){ return String.fromCharCode(characterCode); });
        var nextKeySet = _.cloneDeep(current.keySet);
        var nextLayoutName = _.cloneDeep(current.layoutName) + " " + characterList.join("");
        var deltaLayoutName = sortAndFlattenString(nextLayoutName);
        nextKeySet.layoutName = nextLayoutName
        me.rotateKey(nextKeySet, keyIxList);
        var nextKeyString = me.toKeyString(nextKeySet);

        if (nextKeyString in completed && deltaLayoutName.length >= MAX_DELTA_COUNT) {
            // console.log("no queue: already completed", nextKeyString, completed[nextKeyString].score, deltaLayoutName, deltaLayoutName.length, MAX_DELTA_COUNT);
            return;
        } 
        
        if (deltaLayoutName.length > MAX_DELTA_COUNT ) {
            // console.log("no queue: bail too long: ", deltaLayoutName.length, MAX_DELTA_COUNT);
            return;
        }
        
        if (nextKeyString in queued) {
            // console.log("no queue: already queued: ", nextKeyString.green);
            return;
        }
        // console.log("QUEUE\t\t".magenta+"\t\t\t\t", deltaLayoutName + "\t\t", nextKeyString, "\t\t", nextLayoutName);
        analysis.push(
            me.examine({
                text: TEXT,
                keyMap: KB.keyMap.standard.s683_225,
                keySet: nextKeySet
            })
        );
        queued[nextKeyString] = {keyString: nextKeyString, deltaName: deltaLayoutName, layoutName: nextLayoutName};
    });

    var scores = me.scoreLayouts(analysis);
    // console.log(scores);


    var topfinalScore = 0;
    if (scores.finalList.length > 0) {
        topfinalScore = scores.finalList[0].score;
    }
    _.forEach(scores.finalList, function(final, finalCount){
        var finalKeyString = me.toKeyString(final.keySet);
        var finalName = final.layoutName;
        var deltaName = sortAndFlattenString(finalName);
        // var finalScoreList = _.cloneDeep(current.scoreList);
        var finalDeltaRemaining = MAX_DELTA_COUNT - deltaName.length;
        var finalRelativeScore = final.score - topfinalScore; // negative is worse (usually between 0 and -3.5)        

        // Update bests
        if (bestScore < final.score) {
            bestScore = final.score;
            bestString = finalKeyString;
            bestLayoutName = finalName;
            bestDeltaName = deltaName;
        }

        // Update score operations if already found to try to improve them
        if (final.score.toString() in scored && finalDeltaRemaining <= 0) {
            // Keep the score with the smallest operations
            var prevScore = scored[final.score];
            if (prevScore.layoutName > final.layoutName) {
                prevScore.layoutName = final.layoutName;
            }
        } 

        console.log("SAVE\t\t".white, scoreColor(final.score) + "\t\t", deltaName + "\t\t", finalKeyString, "\t\t", finalName);
        completed[finalKeyString] = {layoutName: finalName, delta: deltaName, keyString: finalKeyString, score: final.score};

        var result = {score: final.score, keyString: finalKeyString, score: final.score, /*scoreList: finalScoreList,*/ deltaName: deltaName, layoutName: finalName, keySet: final.keySet};
        scored[final.score.toString()] = result;

        // if (final.score < current.score && current.score - final.score > RELATIVE_THRESHOLD) {
        //     console.log("no queue: below RELATIVE threshold");
        //     return;
        // }

        if (finalRelativeScore < MIN_RELATIVE_THRESHOLD) {
            // console.log("no queue: below MIN REALTIVE threshold");
            return;
        }

        // When we're almost done, drop off really bad ones
        if (MAX_DELTA_COUNT >= 6 
                && finalDeltaRemaining <= FINISH_THRESHOLD_DELTA_REMAINING 
                && final.score <= bestScore - FINISH_THRESHOLD_SCORE) {
            // console.log("no queue: BELOW threshold", bestScore, final.score, finalDeltaRemaining);
            return;
        }
        
        if (finalDeltaRemaining <= 0) {
            // console.log("no queue: we are at delta size");
            return;
        }

        // console.log("PUSH\t\t".green, scoreColor(final.score) + "\t\t", deltaName + "\t\t", finalKeyString, "\t\t", finalName);

        q.push(result);

    });

    // if (bestScore != 0 && count % 5 == 0) {
    //     console.log("BEST\t".magenta+"\t\t", bestScore.toString().magenta + "\t\t", sortAndFlattenString(bestLayoutName).magenta + "\t\t", bestLayoutName.magenta + "\t\t", bestString.magenta + "\t\t");
    // }
}

console.log("\n\nBEST\t\t".magenta, bestScore.toString().magenta + "\t\t", bestDeltaName.magenta+"\t\t", bestString.magenta + "\t\t", bestLayoutName.magenta + "\t\t", );

// var filteredScored = _.filter(Object.values(scored), function(o){ return o.score > bestScore - });
var sortedScored = _.sortBy(scored, "score").reverse();
_.forEach(sortedScored, function(item){
    console.log("SORTED\t\t".white, scoreColor(item.score) + "\t\t", item.deltaName + "\t\t", item.keyString, "\t\t", item.layoutName);
});
// console.log("sortedScored", sortedScored);

// var minimak = _.find(sortedScored, function(o){ o.keyString == "qwdrkyuiop astfghjel; zxcvbnm,./"});
// console.log("minimak", minimak);

// var qwk = _.find(sortedScored, function(o){ o.keyString == "qwkrfyuiop asdtghjel; zxcvbnm,./"});
// console.log("qwk", qwk);

fs.copyFileSync(logFilePath, './last.log');
