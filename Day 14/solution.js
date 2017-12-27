// ==UserScript==
// @name         Advent of Code 2017 - Day 14 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/14/input
// @match        https://adventofcode.com/2017/day/14/input
// @grant        none
// ==/UserScript==

class Day14 {

    /**
     * @constructor Day14
     */
    constructor() {
        /** @type {string} */
        this.inputString = document.body.textContent.trim();
    }

    /**
     * @param {Array} list
     * @param {Array} ins
     * @param {Number} index
     * @param {Number} skip
     * @returns {[Array,Number,Number]|Array}
     */
    hash(list, ins, index, skip) {
        /** @type {Number} */
        const listLength = list.length;
        ins.forEach(v => {
            [...new Array(v).keys()]
                .map((o, k) => list[(k + index) % listLength])
                .reverse()
                .forEach((val, k) => (list[(k + index) % listLength] = val));
            index += v + skip;
            skip++;
        });
        return [list, index, skip];
    }

    /**
     * @param {String} input
     * @returns {String}
     */
    knotHash(input) {
        /** @type {Array} */
        const asciiList = [...input].map(v => v.charCodeAt(0));
        asciiList.push(17, 31, 73, 47, 23);
        /** @type {Array.<Number>} */
        let list = [...new Array(256).keys()];
        /** @type {Number} */
        let skip = 0;
        /** @type {Number} */
        let index = 0;
        for (let k = 0; k < 64; ++k) {
            [list, index, skip] = this.hash(list, asciiList, index, skip);
        }
        /** @type {Array} */
        let dense = [];
        for (let iterator = 0; iterator < list.length; iterator += 16) {
            dense.push(list.slice(iterator, iterator + 16).reduce((xor, cur) => xor ^ cur));
        }
        return dense.map(ascii => (`00${ascii.toString(16)}`).substr(-2)).join('');
    }

    /**
     * @returns {Number}
     */
    partOne() {
        /** @type {Number} */
        let filled = 0;
        for (let i = 0; i < 128; ++i) {
            /** @type {String} */
            const hash = this.knotHash(this.inputString + '-' + i);
            for (let k = 0; k < hash.length; k += 2) {
                /** @type {string} */
                let bin = parseInt(hash.slice(k, k + 2), 16).toString(2);
                filled += bin.split('').reduce((acc, cur) => (cur === '1' ? acc + 1 : acc), 0);
            }
        }
        return filled;
    }

    /**
     * @returns {Number}
     */
    partTwo() {
        /** @type {Array} */
        let map = [];
        for (let i = 0; i < 128; ++i) {
            /** @type {String} */
            const hash = this.knotHash(this.inputString + '-' + i);
            map[i] = [];
            /** @type {string} */
            let data = '';
            for (let k = 0; k < hash.length; k += 2) {
                /** @type {string} */
                let bin = parseInt(hash.slice(k, k + 2), 16).toString(2);
                while (bin.length < 8) {
                    bin = '0' + bin;
                }
                data += bin;
            }
            map[i] = data.split('').map(v => (v === '1' ? 1 : 0));
        }
        /** @type {Number} */
        let groups = 0;
        for (let y = 0; y < map.length; ++y) {
            for (let x = 0; x < map[y].length; ++x) {
                if (map[y][x] === 0) {
                    continue;
                }
                /** @type {Array} */
                let toCheck = [[x, y]];
                while (toCheck.length > 0) {
                    /** @type {Array} */
                    let [cX, cY] = toCheck.pop();
                    if (map[cY][cX] === 0) {
                        continue;
                    }
                    map[cY][cX] = 0;
                    if (map[cY] && map[cY][cX - 1]) {
                        toCheck.push([cX - 1, cY]);
                    }
                    if (map[cY] && map[cY][cX + 1]) {
                        toCheck.push([cX + 1, cY]);
                    }
                    if (map[cY - 1] && map[cY - 1][cX]) {
                        toCheck.push([cX, cY - 1]);
                    }
                    if (map[cY + 1] && map[cY + 1][cX]) {
                        toCheck.push([cX, cY + 1]);
                    }
                }
                groups++;
            }
        }
        return groups;
    }
}

/** @type {Day14} */
let outputAnswer = new Day14();

document.write(`${outputAnswer.partOne()}<br>${outputAnswer.partTwo()}`);

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());