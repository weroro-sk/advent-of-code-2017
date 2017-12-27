// ==UserScript==
// @name         Advent of Code 2017 - Day 17 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/17/input
// @match        https://adventofcode.com/2017/day/17/input
// @grant        none
// ==/UserScript==

class Day17 {

    /**
     * @constructor Day17
     */
    constructor() {
        /** @type {string} */
        this.inputString = document.body.textContent.trim();
        /** @type {Number} */
        this.inputNumericValue = +this.inputString;
    }

    /**
     * @returns {Number}
     */
    partOne() {
        /** @type {number} */
        const totalTimes = 2017;
        /** @type {number} */
        let position = 0;
        /** @type {Array} */
        let buffer = [0];
        for (let n = 1; n <= totalTimes; n++) {
            position = (position + this.inputNumericValue % n + 1) % n;
            buffer.splice(position, 0, n);
        }
        return buffer[buffer.indexOf(totalTimes) + 1];
    }

    /**
     * @returns {Number}
     */
    partTwo() {
        /** @type {number} */
        let position = 0;
        /** @type {number} */
        let oneth = 1;
        for (let n = 1; n <= 50000000; n++) {
            position = (position + this.inputNumericValue % n + 1) % n;
            if (position === 0) {
                oneth = n;
            }
        }
        return oneth;
    }
}

/** @type {Day17} */
let outputAnswer = new Day17();

document.write(`${outputAnswer.partOne()}<br>${outputAnswer.partTwo()}`);

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());