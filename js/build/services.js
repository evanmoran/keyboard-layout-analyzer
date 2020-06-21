/*
	Service for computing keyboard efficiency

    It is simply a wrapper around the KLA.Analyzer singleton
*/

var appServices = appServices || angular.module('kla.services', []);

appServices.factory('analyzer', [
	function() {
        return KLA.Analyzer;
	}

])
/*
	Service for maintaining the keyboards
*/

var appServices = appServices || angular.module('kla.services', []);

appServices.factory('keyboards', [

	function() {
        var me = {},
            layouts = []
            ;

        // setup layouts
        layouts[0] = {};
        layouts[0].keySet = $.extend(true, {}, KB.keySet.standard.qwerty);
        layouts[0].keyMap = $.extend(true, {}, KB.keyMap.standard.s683_225);
        layouts[0].keyboard = null;
        
        layouts[1] = {};
        layouts[1].keySet = $.extend(true, {}, KB.keySet.european.azerty);
        layouts[1].keyMap = $.extend(true, {}, KB.keyMap.european.s683_225);
        layouts[1].keyboard = null;

        layouts[2] = {};
        layouts[2].keySet = $.extend(true, {}, KB.keySet.standard.simplifiedDvorak);
        layouts[2].keyMap = $.extend(true, {}, KB.keyMap.standard.s683_225);
        layouts[2].keyboard = null;

        layouts[3] = {};
        layouts[3].keySet = $.extend(true, {}, KB.keySet.standard.programmerDvorak);
        layouts[3].keyMap = $.extend(true, {}, KB.keyMap.standard.s683_225);
        layouts[3].keyboard = null;

        layouts[4] = {};
        layouts[4].keySet = $.extend(true, {}, KB.keySet.standard.colemak);
        layouts[4].keyMap = $.extend(true, {}, KB.keyMap.standard.s683_225);
        layouts[4].keyboard = null;
        
        layouts[5] = {};
        layouts[5].keySet = $.extend(true, {}, KB.keySet.european.colemak_dh);
        layouts[5].keyMap = $.extend(true, {}, KB.keyMap.european.s683_225);
        layouts[5].keyboard = null;
        
        // public functions

        me.registerKeyboard = function(index, elmId) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            layouts[index].keyboard = new KB.Keyboard({
                container: elmId,
                layout: layouts[index]
            });
        };

        me.forEach = function(cb) {
            var ii = 0;
            for (ii = 0; ii < layouts.length; ii++) {
                cb(layouts[ii]);
            }
        };

        me.getKeyMapFromKeyboardType = function(keyboardType) {
            if ( typeof KB.keyMap[keyboardType] === 'undefined' || typeof KB.keyMap[keyboardType].s683_225 === 'undefined' ) {
                throw Error("Invalid keyboard type.");
            }

            return KB.keyMap[keyboardType].s683_225;
        };

        /*
            keys - array of keys ordered from most popular to least
        */
        me.createPersonalLayout = function(keys, refKeySet) {

            var topQwertyKeys = [31, 36, 32, 35, 30, 37, 33, 34, 29, 38, 18, 21, 17, 22, 16, 23, 45, 47, 48, 19, 39, 15, 24, 44, 20, 46, 25, 26, 42, 43, 49, 50, 51, 27], 
                tqkLookup = {},
                ii = 0, 
                jj,
                key,
                orderedKeys = [];
            for (ii = 0; ii < topQwertyKeys.length; ii++) {
                tqkLookup[ topQwertyKeys[ii] ] = true;
            }

            var pKeySet = $.extend(true, {}, refKeySet);
            pKeySet.label = "Personalized";
            
            for (ii = 0; ii < keys.length; ii++) {
                if (tqkLookup[ keys[ii].index ] && keys[ii].count > 0) {
                    orderedKeys.push(pKeySet.keys[keys[ii].index]);
                    orderedKeys[orderedKeys.length-1].index = keys[ii].index;
                }
            }
            
            for (ii = 0; ii < orderedKeys.length; ii++) {
                var kIndex = topQwertyKeys[ii];
                for (jj = 0; jj < keys.length; jj++) {
                    if ( keys[jj].index === kIndex && keys[jj].count === 0) {
                        orderedKeys.push(pKeySet.keys[keys[jj].index]);
                        orderedKeys[orderedKeys.length-1].index = keys[jj].index;
                    }
                }
            }
            
            for (ii = 0; ii < orderedKeys.length; ii++) {
                pKeySet.keys[ topQwertyKeys[ii] ] = orderedKeys[ ii ];
            }

            // copy over finger information
            for (ii = 0; ii < pKeySet.keys.length; ii++) {
                pKeySet.keys[ii].finger = refKeySet.keys[ii].finger;
                pKeySet.keys[ii].id = ii;
            }
            
            return pKeySet;
        };

        me.getLayouts = function() {
            return layouts;
        }

        me.getLayout = function(index) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            return layouts[index];
        };
        me.setLayout = function(index, layout) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            layouts[index].keySet = layout.keySet;
            layouts[index].keyMap = layout.keyMap;
            if (layouts[index].keyboard !== null) {
                layouts[index].keyboard.setLayout( layout );
            }
        };

        me.getKeySet = function(index) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            return layouts[index].keySet;
        };

        me.setLayoutName = function(index, name) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            layouts[index].keySet.label = name;
        };
        me.getLayoutName = function(index) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            return layouts[index].keySet.label;
        };

        me.getMoreInfoUrl = function(index) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            return layouts[index].keySet.moreInfoUrl;
        };
        me.getMoreInfoText = function(index) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            return layouts[index].keySet.moreInfoText;
        };

        me.getKeyboardType = function(index) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            return layouts[index].keySet.keyboardType;
        };

        me.parseKeySet = function(txt) {
            try {
                var nn = JSON.parse(txt);
            } catch (err) {
                return {
                    valid: false,
                    reason: "Invalid input."
                };
            }
            var vv = {}, prop, ii, valid = true;
            if (typeof nn.label === "string") {
                vv.label = nn.label;
            } else {
                return {
                    valid: false,
                    reason: "Label not a string."
                };
            }
            if (typeof nn.fingerStart === "object") {
                vv.fingerStart = {};
                for (prop in nn.fingerStart) {
                    if (typeof nn.fingerStart[prop] === "number") {
                        vv.fingerStart[prop] = nn.fingerStart[prop];
                    } else {
                        return {
                            valid: false,
                            reason: "Finger start is not a number."
                        };
                    }
                }
            } else {
                return {
                    valid: false,
                    reason: "Finger start is not a object."
                };
            }
            if (typeof nn.keyboardType === "string") {
                vv.keyboardType = nn.keyboardType;
            } else {
                return {
                    valid: false,
                    reason: "Keyboard type is not a string."
                };
            }
            if (typeof nn.author === "string" || typeof nn.author === 'undefined') {
                vv.author = nn.author || 'Unknown';
            } else {
                return {
                    valid: false,
                    reason: "Keyboard author is defined and is not a string."
                };
            }

            // deprecated, ignore
            if (typeof nn.authorUrl === "string" || typeof nn.authorUrl === 'undefined') {
                vv.authorUrl = nn.authorUrl || '';
            } else {
                return {
                    valid: false,
                    reason: "Keyboard authorUrl is defined and is not a string."
                };
            }


            if (typeof nn.moreInfoUrl === "string" || typeof nn.moreInfoUrl === 'undefined') {
                vv.moreInfoUrl = nn.moreInfoUrl || '';
            } else {
                return {
                    valid: false,
                    reason: "Keyboard moreInfoUrl is defined and is not a string."
                };
            }
            if (typeof nn.moreInfoText === "string" || typeof nn.moreInfoText === 'undefined') {
                vv.moreInfoText = nn.moreInfoText || '';
            } else {
                return {
                    valid: false,
                    reason: "Keyboard moreInfoText is defined and is not a string."
                };
            }

            if (typeof nn.keys === "object" && typeof nn.keys.length === "number") {
                vv.keys = [];
                outterloop: for (ii = 0; ii < nn.keys.length; ii++) {
                    if (typeof nn.keys[ii] === "object") {
                        for (prop in nn.keys[ii]) {
                            if (typeof nn.keys[ii][prop] !== "string" && typeof nn.keys[ii][prop] !== "number") {
                                return {
                                    valid: false,
                                    reason: "Key prop is not a string or number."
                                };
                            }
                        }
                        vv.keys.push(nn.keys[ii]);
                    } else {
                        return {
                            valid: false,
                            reason: "Key item is not an object."
                        };
                    }
                }
            } else {
                return {
                    valid: false,
                    reason: "Keys are not an array."
                };
            }
            
            return {
                valid: true,
                keySet: vv
            };
        }; // end function

        return me;
	}

])

/*
    Service for storing globally available data
*/

var appServices = appServices || angular.module('kla.services', []);

appServices.factory('library', [
    function() {
        var me = {},
            data = {};

        me.get = function(prop) {
            if (typeof prop === 'undefined') {
                return data;
            } else {
                return data[prop];
            }
        };

        me.set = function(prop, val) {
            data[prop] = val;
        };

        return me;
    }

])
/*
	Generates and formats the results
*/

var appServices = appServices || angular.module('kla.services', []);

var shouldGeneratePersonalizedLayout = false;

appServices.factory('resultsGenerator', ['$log', 'keyboards', 'analyzer', 'library',

	function($log, keyboards, analyzer, library) {
        var me = {},
            layouts = []
            ;

        k=keyboards; 
        l=library; 
        a=analyzer;

        /*
			Throws an Error if it fails
        */
        me.go = function(txt) {

            // --------------------------------------------------------------------
            // Create an analysis report on each layout
            

            var analysis = [];
            var kLayouts = [];
            keyboards.forEach(function(layout) {
                analysis[analysis.length] = analyzer.examine({
                    text: analyzer.t1000,
                    keyMap: layout.keyMap,
                    keySet: layout.keySet 
                });

                var idx = kLayouts.length;
                kLayouts[idx] = {};
                console.log("layout", layout);
                kLayouts[idx].keyMap = layout.keyMap;
                kLayouts[idx].keySet = layout.keySet;
            });

            if (analysis.length === 0) {
                throw new Error('You must set at least 1 layout to display results.');
            }

            // ---------------------------------------------------------------------
            // create personal layout
        
            if (shouldGeneratePersonalizedLayout) {
                var qwertyAnalysis = analyzer.examine({
                    text: txt,
                    keyMap: KB.keyMap.standard.s683_225,
                    keySet: KB.keySet.standard.qwerty 
                });
                
                var qKeys = Array.prototype.sort.call(qwertyAnalysis.keyData, function(a, b) {
                    return b.count - a.count;
                });
                var pKeys = keyboards.createPersonalLayout(qKeys, KB.keySet.standard.qwerty);
                
                var newLayout = {};
                newLayout.keySet = pKeys;
                newLayout.keyMap = KB.keyMap.standard.s683_225;
                
                analysis[analysis.length] = analyzer.examine({
                    text: txt,
                    keyMap: newLayout.keyMap,
                    keySet: newLayout.keySet
                });
                
                library.set('personalized', newLayout);
                library.set('inputText', txt);

                kLayouts.push(newLayout);

                $log.info( analysis );
            }

            // --------------------------------------------------------------------
            // Compute best layout
            
            var scores = analyzer.scoreLayouts(analysis);
            library.set('summary', {
                bestLayout: scores.finalList[0].layoutName,
                rankedLayouts: scores.finalList
            });
            console.log("library", library.get("summary"));

            // --------------------------------------------------------------------
            // Prepare charts

            var displayData = {};
            displayData['All'] = [  
                {label: 'Left Pinky',   color: 'rgba(  0,255,255,0.5)', data: [KB.finger.LEFT_PINKY]},  
                {label: 'Left Ring',    color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_RING]},   
                {label: 'Left Middle',  color: 'rgba(136,136,255,0.5)', data: [KB.finger.LEFT_MIDDLE]},  
                {label: 'Left Index',   color: 'rgba(255,  0,255,0.5)', data: [KB.finger.LEFT_INDEX]}, 
                {label: 'Left Thumb',   color: 'rgba(255,255,255,0.5)', data: [KB.finger.LEFT_THUMB]},
                {label: 'Right Thumb',  color: 'rgba(204,204,204,0.5)', data: [KB.finger.RIGHT_THUMB]}, 
                {label: 'Right Index',  color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_INDEX]}, 
                {label: 'Right Middle', color: 'rgba(255,136,  0,0.5)', data: [KB.finger.RIGHT_MIDDLE]}, 
                {label: 'Right Ring',   color: 'rgba(255,255,  0,0.5)', data: [KB.finger.RIGHT_RING]}, 
                {label: 'Right Pinky',  color: 'rgba(  0,255,  0,0.5)', data: [KB.finger.RIGHT_PINKY]} 
            ];
            displayData['Fingers'] = [
                {label: 'Left Pinky',   color: 'rgba(  0,255,255,0.5)', data: [KB.finger.LEFT_PINKY]},  
                {label: 'Left Ring',    color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_RING]},    
                {label: 'Left Middle',  color: 'rgba(136,136,255,0.5)', data: [KB.finger.LEFT_MIDDLE]}, 
                {label: 'Left Index',   color: 'rgba(255,  0,255,0.5)', data: [KB.finger.LEFT_INDEX]},
                {label: 'Right Index',  color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_INDEX]}, 
                {label: 'Right Middle', color: 'rgba(255,136,  0,0.5)', data: [KB.finger.RIGHT_MIDDLE]}, 
                {label: 'Right Ring',   color: 'rgba(255,255,  0,0.5)', data: [KB.finger.RIGHT_RING]},  
                {label: 'Right Pinky',  color: 'rgba(  0,255,  0,0.5)', data: [KB.finger.RIGHT_PINKY]}
            ];
            displayData['Left Hand'] =  [
                {label: 'Left Pinky',   color: 'rgba(  0,255,255,0.5)', data: [KB.finger.LEFT_PINKY]},
                {label: 'Left Ring',    color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_RING]},   
                {label: 'Left Middle',  color: 'rgba(136,136,255,0.5)', data: [KB.finger.LEFT_MIDDLE]},  
                {label: 'Left Index',   color: 'rgba(255,  0,255,0.5)', data: [KB.finger.LEFT_INDEX]}, 
                {label: 'Left Thumb',   color: 'rgba(255,255,255,0.5)', data: [KB.finger.LEFT_THUMB]}
            ];
            displayData['Right Hand'] = [
                {label: 'Right Thumb',  color: 'rgba(204,204,204,0.5)', data: [KB.finger.RIGHT_THUMB]}, 
                {label: 'Right Index',  color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_INDEX]}, 
                {label: 'Right Middle', color: 'rgba(255,136,  0,0.5)', data: [KB.finger.RIGHT_MIDDLE]}, 
                {label: 'Right Ring',   color: 'rgba(255,255,  0,0.5)', data: [KB.finger.RIGHT_RING]}, 
                {label: 'Right Pinky',  color: 'rgba(  0,255,  0,0.5)', data: [KB.finger.RIGHT_PINKY]}
            ];
            displayData['Left Fingers vs Right Fingers vs Thumbs'] = [ 
                {label: 'Left Fingers', color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_PINKY,  KB.finger.LEFT_RING,   KB.finger.LEFT_MIDDLE,  KB.finger.LEFT_INDEX]}, 
                {label: 'Right Fingers',color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_INDEX, KB.finger.RIGHT_MIDDLE, KB.finger.RIGHT_RING, KB.finger.RIGHT_PINKY]},
                {label: 'Thumbs',       color: 'rgba(204,204,204,0.5)', data: [KB.finger.LEFT_THUMB,KB.finger.RIGHT_THUMB]}
            ];
            displayData['Hand vs Hand'] = [ 
                {label: 'Left Hand', color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_PINKY,  KB.finger.LEFT_RING,   KB.finger.LEFT_MIDDLE,  KB.finger.LEFT_INDEX, KB.finger.LEFT_THUMB]}, 
                {label: 'Right Hand',color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_INDEX, KB.finger.RIGHT_MIDDLE, KB.finger.RIGHT_RING, KB.finger.RIGHT_PINKY, KB.finger.RIGHT_THUMB]}
            ];
            displayData['Pinky vs Pinky'] = [ 
                {label: 'Left Pinky', color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_PINKY]}, 
                {label: 'Right Pinky',color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_PINKY]}
            ];
            displayData['Ring vs Ring'] = [ 
                {label: 'Left Ring', color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_RING]}, 
                {label: 'Right Ring',color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_RING]}
            ];
            displayData['Middle vs Middle'] = [ 
                {label: 'Left Middle', color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_MIDDLE]}, 
                {label: 'Right Middle',color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_MIDDLE]}
            ];
            displayData['Index vs Index'] = [ 
                {label: 'Left Index', color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_INDEX]}, 
                {label: 'Right Index',color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_INDEX]}
            ];
            displayData['Thumb vs Thumb'] = [ 
                {label: 'Left Thumb', color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_THUMB]}, 
                {label: 'Right Thumb',color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_THUMB]}
            ];

            var rowDisplayData = {};
            rowDisplayData['All'] = [
                {label: 'Number Row',   color: 'rgba(  0,255,255,0.5)', data: [1]},
                {label: 'Top Row',      color: 'rgba(  0,  0,230,0.5)', data: [2]},
                {label: 'Home Row',     color: 'rgba(136,136,255,0.5)', data: [3]},
                {label: 'Bottom Row',   color: 'rgba(255,  0,255,0.5)', data: [4]},
                {label: 'Spacebar Row', color: 'rgba(255,255,255,0.5)', data: [5]}
            ];
            rowDisplayData['Number, Top, Home, Bottom'] = [
                {label: 'Number Row',   color: 'rgba(  0,255,255,0.5)', data: [1]},
                {label: 'Top Row',      color: 'rgba(  0,  0,230,0.5)', data: [2]},
                {label: 'Home Row',     color: 'rgba(136,136,255,0.5)', data: [3]},
                {label: 'Bottom Row',   color: 'rgba(255,  0,255,0.5)', data: [4]}
            ];
            rowDisplayData['Top, Home, Bottom'] = [
                {label: 'Top Row',      color: 'rgba(  0,  0,230,0.5)', data: [2]},
                {label: 'Home Row',     color: 'rgba(136,136,255,0.5)', data: [3]},
                {label: 'Bottom Row',   color: 'rgba(255,  0,255,0.5)', data: [4]}
            ];

            var unitConverter = function(rawVal, pixelsPerCm, unit) {
                var units = {};
                units["Centimeters"] = rawVal / pixelsPerCm;
                units["Meters"] = units["Centimeters"] * 0.01;
                units["Feet"] = units["Meters"] * 3.2808399;
                units["Miles"] = units["Meters"] * 0.000621371192;
                units['Key Presses'] = rawVal;
                return units[unit];
            }

            var displayFilter = function(displayType, unitType, rawSeriesData, displayData) {
                var idx, sIndex = 0, ii, jj, items, val,
                    seriesData = [], series,
                    labels = [], seriesLabels = [], allSeriesLabels = [],
                    colors = [], seriesColors = [];

                // separte out labels and colors
                for (ii = 0; ii < displayData[displayType].length; ii++) {
                    labels.push(displayData[displayType][ii].label);
                    colors.push(displayData[displayType][ii].color);
                }

                for (idx = 0; idx < rawSeriesData.length; idx++) {
                    allSeriesLabels.push( rawSeriesData[idx].label );
                    if (!rawSeriesData[idx].visible) continue;

                    series = [];
                    seriesLabels.push( rawSeriesData[idx].label );
                    seriesColors.push( rawSeriesData[idx].color );

                    for (ii = 0; ii < displayData[displayType].length; ii++) {
                        items = displayData[displayType][ii].data;
                        val = 0;
                        for (jj = 0; jj < items.length; jj++) {
                            val += rawSeriesData[idx].data[ items[jj]-1 ];
                        }
                        series.push(val);
                    }

                    var total = 0;
                    for (ii = 0; ii< series.length; ii++) {
                        total += series[ii];
                    }

                    for (ii = 0; ii< series.length; ii++) {
                        if ( unitType === 'Percent' ) {
                            series[ii] = (total > 0) ? (series[ii] / total) * 100 : 0;
                            series[ii] = (!isFinite(series[ii])) ? 0 : series[ii];
                        } else {
                            series[ii] = unitConverter(series[ii], analysis[idx].pixelsPerCm, unitType);
                        }
                    }
                    total = ( unitType === 'Percent' ) ? 100 : unitConverter(total, analysis[idx].pixelsPerCm, unitType);
                    series.total = total;
                    seriesData[sIndex] = series;
                    sIndex++;
                }
                seriesData.labels = labels;
                seriesData.colors = colors;
                seriesData.allSeriesLabels = allSeriesLabels;
                seriesData.seriesLabels = seriesLabels;
                seriesData.seriesColors = seriesColors;
                return seriesData;
            };


            var seriesColors = [
                'rgb(42, 66, 105)',
                'rgb(56, 88, 142)',
                'rgb(71, 111, 178)',
                'rgb(105, 139, 195)',
                'rgb(141, 167, 210)',
                'rgb(178, 195, 224)'
            ];
            var distSeriesData = [];
            var fuSeriesData = [];
            var rowSeriesData = [];
            var cfuSeriesData = [];
            var cfuidSeriesData = [];
            var chuSeriesData = [];
            var chuidSeriesData = [];
            var modSeriesData = [];
            var keyData = [];
            var ii, jj;

            for (ii = 0; ii < analysis.length; ii++) {
                keyData[ii] = [];
                for (jj = 0; jj < analysis[ii].keyData.length; jj++) {
                    var kData = {};
                    kData.count = analysis[ii].keyData[jj].count;
                    kData.cx = kLayouts[ii].keyMap[jj].cx;
                    kData.cy = kLayouts[ii].keyMap[jj].cy;
                    kData.primary = kLayouts[ii].keySet.keys[jj].primary;
                    kData.shift = kLayouts[ii].keySet.keys[jj].shift;
                    kData.altGr = kLayouts[ii].keySet.keys[jj].altGr;
                    kData.shiftAltGr = kLayouts[ii].keySet.keys[jj].shiftAltGr;
                    keyData[ii].push(kData);
                }
            }

            for (ii = 0; ii < analysis.length; ii++) {
                distSeriesData.push({
                    label: analysis[ii].layoutName,
                    color: seriesColors[ii],
                    data: analysis[ii].distance.slice(1),
                    visible: true
                });
                fuSeriesData.push({
                    label: analysis[ii].layoutName,
                    color: seriesColors[ii],
                    data: analysis[ii].fingerUsage.slice(1),
                    visible: true
                });
                rowSeriesData.push({
                    label: analysis[ii].layoutName,
                    color: seriesColors[ii],
                    data: analysis[ii].rowUsage.slice(0),
                    visible: true
                });
                cfuSeriesData.push({
                    label: analysis[ii].layoutName,
                    color: seriesColors[ii],
                    data: analysis[ii].consecFingerPress.slice(0),
                    visible: true
                });
                cfuidSeriesData.push({
                    label: analysis[ii].layoutName,
                    color: seriesColors[ii],
                    data: analysis[ii].consecFingerPressIgnoreDups.slice(0),
                    visible: true
                });
                chuSeriesData.push({
                    label: analysis[ii].layoutName,
                    color: seriesColors[ii],
                    data: analysis[ii].consecHandPress,
                    visible: true
                });
                chuidSeriesData.push({
                    label: analysis[ii].layoutName,
                    color: seriesColors[ii],
                    data: analysis[ii].consecHandPressIgnoreDups,
                    visible: true
                });
                modSeriesData.push({
                    label: analysis[ii].layoutName,
                    color: seriesColors[ii],
                    data: analysis[ii].modifierUse,
                    visible: true
                });
            }

            var cfuDisplayData = {};
            cfuDisplayData['nodups'] = [  
                {label: 'Left Pinky',   color: 'rgba(  0,255,255,0.5)', data: [KB.finger.LEFT_PINKY]},  
                {label: 'Left Ring',    color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_RING]},   
                {label: 'Left Middle',  color: 'rgba(136,136,255,0.5)', data: [KB.finger.LEFT_MIDDLE]},  
                {label: 'Left Index',   color: 'rgba(255,  0,255,0.5)', data: [KB.finger.LEFT_INDEX]}, 
                {label: 'Left Thumb',   color: 'rgba(255,255,255,0.5)', data: [KB.finger.LEFT_THUMB]},
                {label: 'Right Thumb',  color: 'rgba(204,204,204,0.5)', data: [KB.finger.RIGHT_THUMB]}, 
                {label: 'Right Index',  color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_INDEX]}, 
                {label: 'Right Middle', color: 'rgba(255,136,  0,0.5)', data: [KB.finger.RIGHT_MIDDLE]}, 
                {label: 'Right Ring',   color: 'rgba(255,255,  0,0.5)', data: [KB.finger.RIGHT_RING]}, 
                {label: 'Right Pinky',  color: 'rgba(  0,255,  0,0.5)', data: [KB.finger.RIGHT_PINKY]} 
            ];
            cfuDisplayData['dups'] = cfuDisplayData['nodups'];

            var chuDisplayData = {};
            chuDisplayData['nodups'] = [  
                {label: 'Left Fingers', color: 'rgba(  0,  0,230,0.5)', data: ['left']}, 
                {label: 'Right Fingers',color: 'rgba(255,  0,  0,0.5)', data: ['right']},
                {label: 'Thumbs',       color: 'rgba(204,204,204,0.5)', data: ['thumbs']}
            ];
            chuDisplayData['dups'] = chuDisplayData['nodups'];

            var modDisplayData = {};
            modDisplayData['all'] = [  
                {label: 'Shift', color: 'rgba(  0,  0,230,0.5)', data: ['shift']}, 
                {label: 'AltGr', color: 'rgba(255,  0,  0,0.5)', data: ['altGr']},
                {label: 'Shift+AltGr',       color: 'rgba(204,204,204,0.5)', data: ['shiftAltGr']}
            ];

            var cfuDisplayFilter = function(displayType, unitType, rawSeriesData, displayData) {
                var idx, sIndex = 0, ii, jj, items, val,
                    seriesData = [], series,
                    labels = [], seriesLabels = [], allSeriesLabels = [],
                    colors = [], seriesColors = [];

                // separte out labels and colors
                for (ii = 0; ii < displayData[displayType].length; ii++) {
                    labels.push(displayData[displayType][ii].label);
                    colors.push(displayData[displayType][ii].color);
                }

                var rawData = rawSeriesData[displayType];
                for (idx = 0; idx < rawData.length; idx++) {
                    allSeriesLabels.push( rawData[idx].label );
                    if (!rawData[idx].visible) continue;

                    seriesLabels.push( rawData[idx].label );
                    seriesColors.push( rawData[idx].color );
                    series = rawData[idx].data.slice(1);

                    var total = 0;
                    for (ii = 0; ii< series.length; ii++) {
                        total += series[ii];
                    }

                    for (ii = 0; ii< series.length; ii++) {
                        if ( unitType === 'Percent' ) {
                            series[ii] = (total > 0) ? (series[ii] / total) * 100 : 0;
                            series[ii] = (!isFinite(series[ii])) ? 0 : series[ii];
                        } else {
                            series[ii] = unitConverter(series[ii], analysis[idx].pixelsPerCm, unitType);
                        }
                    }
                    total = ( unitType === 'Percent' ) ? 100 : unitConverter(total, analysis[idx].pixelsPerCm, unitType);
                    series.total = total;
                    seriesData[sIndex] = series;
                    sIndex++;
                }
                seriesData.labels = labels;
                seriesData.colors = colors;
                seriesData.allSeriesLabels = allSeriesLabels;
                seriesData.seriesLabels = seriesLabels;
                seriesData.seriesColors = seriesColors;
                return seriesData;
            }

            var chuDisplayFilter = function(displayType, unitType, rawSeriesData, displayData) {
                var idx, sIndex = 0, ii, jj, items, val,
                    seriesData = [], series,
                    labels = [], seriesLabels = [], allSeriesLabels = [],
                    colors = [], seriesColors = [];

                // separte out labels and colors
                for (ii = 0; ii < displayData[displayType].length; ii++) {
                    labels.push(displayData[displayType][ii].label);
                    colors.push(displayData[displayType][ii].color);
                }

                var rawData = rawSeriesData[displayType];
                for (idx = 0; idx < rawData.length; idx++) {
                    allSeriesLabels.push( rawData[idx].label );
                    if (!rawData[idx].visible) continue;

                    seriesLabels.push( rawData[idx].label );
                    seriesColors.push( rawData[idx].color );
                    series = [];
                    series[0] = rawData[idx].data['left'];
                    series[1] = rawData[idx].data['right'];
                    series[2] = rawData[idx].data['thumbs'];
                    series.visible = rawData[idx].visible;

                    var total = 0;
                    for (ii = 0; ii< series.length; ii++) {
                        total += series[ii];
                    }

                    for (ii = 0; ii< series.length; ii++) {
                        if ( unitType === 'Percent' ) {
                            series[ii] = (total > 0) ? (series[ii] / total) * 100 : 0;
                            series[ii] = (!isFinite(series[ii])) ? 0 : series[ii];
                        } else {
                            series[ii] = unitConverter(series[ii], analysis[idx].pixelsPerCm, unitType);
                        }
                    }
                    total = ( unitType === 'Percent' ) ? 100 : unitConverter(total, analysis[idx].pixelsPerCm, unitType);
                    series.total = total;
                    seriesData[sIndex] = series;
                    sIndex++;
                }
                seriesData.labels = labels;
                seriesData.colors = colors;
                seriesData.allSeriesLabels = allSeriesLabels;
                seriesData.seriesLabels = seriesLabels;
                seriesData.seriesColors = seriesColors;

                return seriesData;
            }

            var modDisplayFilter = function(displayType, unitType, rawSeriesData, displayData) {
                var idx, sIndex = 0, ii, jj, items, val,
                    seriesData = [], series,
                    labels = [], seriesLabels = [], allSeriesLabels = [],
                    colors = [], seriesColors = [];

                // separte out labels and colors
                for (ii = 0; ii < displayData[displayType].length; ii++) {
                    labels.push(displayData[displayType][ii].label);
                    colors.push(displayData[displayType][ii].color);
                }

                var rawData = rawSeriesData;
                for (idx = 0; idx < rawData.length; idx++) {
                    allSeriesLabels.push( rawData[idx].label );
                    if (!rawData[idx].visible) continue;

                    seriesLabels.push( rawData[idx].label );
                    seriesColors.push( rawData[idx].color );
                    series = [];
                    series[0] = rawData[idx].data['shift'];
                    series[1] = rawData[idx].data['altGr'];
                    series[2] = rawData[idx].data['shiftAltGr'];
                    series.visible = rawData[idx].visible;

                    var total = 0;
                    for (ii = 0; ii< series.length; ii++) {
                        total += series[ii];
                    }

                    for (ii = 0; ii< series.length; ii++) {
                        if ( unitType === 'Percent' ) {
                            series[ii] = (total > 0) ? (series[ii] / total) * 100 : 0;
                            series[ii] = (!isFinite(series[ii])) ? 0 : series[ii];
                        } else {
                            series[ii] = unitConverter(series[ii], analysis[idx].pixelsPerCm, unitType);
                        }
                    }
                    total = ( unitType === 'Percent' ) ? 100 : unitConverter(total, analysis[idx].pixelsPerCm, unitType);
                    series.total = total;
                    seriesData[sIndex] = series;
                    sIndex++;
                }
                seriesData.labels = labels;
                seriesData.colors = colors;
                seriesData.allSeriesLabels = allSeriesLabels;
                seriesData.seriesLabels = seriesLabels;
                seriesData.seriesColors = seriesColors;

                return seriesData;
            }

            // --------------------------------------------------------------------
            // Show results

            library.set('distance', {
                rawSeriesData: distSeriesData,
                displayFilter: displayFilter,
                displayType: 'All',
                displayData: displayData,
                units: 'Centimeters',
                allowedUnits: ['Centimeters', 'Meters', 'Feet', 'Miles', 'Percent']
            });

            library.set('fingerUsage', {
                rawSeriesData: fuSeriesData,
                displayFilter: displayFilter,
                displayType: 'All',
                displayData: displayData,
                units: 'Key Presses',
                allowedUnits: ['Key Presses', 'Percent']
            });

            library.set('rowUsage', {
                rawSeriesData: rowSeriesData,
                displayFilter: displayFilter,
                displayType: 'All',
                displayData: rowDisplayData,
                units: 'Key Presses',
                allowedUnits: ['Key Presses', 'Percent']
            });

            library.set('consecFingerPress', {
                rawSeriesData: {
                    'nodups': cfuSeriesData,
                    'dups': cfuidSeriesData,
                    0: {visible: true},
                    1: {visible: true},
                    2: {visible: true},
                    3: {visible: true},
                    4: {visible: true},
                    5: {visible: true},
                    length: 6
                },
                displayFilter: cfuDisplayFilter,
                displayType: 'nodups',
                displayData: cfuDisplayData,
                units: 'Key Presses',
                allowedUnits: ['Key Presses', 'Percent']
            });

            library.set('consecHandPress', {
                rawSeriesData: {
                    'nodups': chuSeriesData,
                    'dups': chuidSeriesData,
                    0: {visible: true},
                    1: {visible: true},
                    2: {visible: true},
                    3: {visible: true},
                    4: {visible: true},
                    5: {visible: true},
                    length: 6
                },
                displayFilter: chuDisplayFilter,
                displayType: 'nodups',
                displayData: chuDisplayData,
                units: 'Key Presses',
                allowedUnits: ['Key Presses', 'Percent']
            });

            library.set('modifierUse', {
                rawSeriesData: modSeriesData,
                displayFilter: modDisplayFilter,
                displayType: 'all',
                displayData: modDisplayData,
                units: 'Key Presses',
                allowedUnits: ['Key Presses', 'Percent']
            });

            library.set('layouts', kLayouts);
            library.set('keyData', keyData);

            return true;
        };

        return me;
	}

]);

/*
    Service for storing globally available data
*/

var appServices = appServices || angular.module('kla.services', []);

appServices.factory('textPresets', ['$http',
    function($http) {
        var service = {};

        service.load = function(preset) {
            var promise = $http.get('./presets/'+preset+'.txt').then(function (response) {
                return response.data;
            });
            return promise;
        };

        return service;
    }

])