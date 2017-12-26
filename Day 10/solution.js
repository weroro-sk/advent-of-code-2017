// ==UserScript==
// @name         Advent of Code 2017 - Day 10 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/10/input
// @match        https://adventofcode.com/2017/day/10/input
// @grant        none
// ==/UserScript==

class Day10 {

    /**
     * @constructor Day10
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
     * @returns {number}
     */
    partOne() {
        /** @type {Array} */
        let [list] = this.hash([...new Array(256).keys()], this.inputString.split(',').map(Number), 0, 0);
        return list[0] * list[1];
    }

    /**
     * @returns {String}
     */
    partTwo() {
        /** @type {Array} */
        const asciiList = [...this.inputString].map(v => v.charCodeAt(0));
        asciiList.push(17, 31, 73, 47, 23);
        /** @type {Array.<Number>} */
        let list = [...new Array(256).keys()];
        /** @type {number} */
        let skip = 0;
        /** @type {number} */
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
}

/** @type {Day10} */
let outputAnswer = new Day10();

document.write(`${outputAnswer.partOne()}<br>${outputAnswer.partTwo()}`);

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());