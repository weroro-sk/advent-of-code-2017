// ==UserScript==
// @name         Advent of Code 2017 - Day 13 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/13/input
// @match        https://adventofcode.com/2017/day/13/input
// @grant        none
// ==/UserScript==

class Day13 {

    /**
     * @constructor Day13
     */
    constructor() {
        /** @type {string} */
        this.inputString = document.body.textContent.trim();
        /** @type {Array} */
        this.inputDataArray = this.inputString.split('\n').map(s => s.match(/\d+/g).map(Number));
    }

    /**
     * @param {Number} delay
     * @returns {function(*[]): boolean}
     */
    busted(delay) {
        return ([d, r]) => (delay + d) % (2 * (r - 1)) === 0;
    }

    /**
     * @param {Number} delay
     * @returns {Number}
     */
    severity(delay) {
        return this.inputDataArray.filter(this.busted(delay)).reduce((n, [d, r]) => n + d * r, 0);
    }

    /**
     * @returns {Number}
     */
    partOne() {
        return this.severity(0);
    }

    /**
     * @returns {Number}
     */
    partTwo() {
        /** @type {Number} */
        let delay = -1;
        while (this.inputDataArray.some(this.busted(++delay))) {
        }
        return delay;
    }
}

/** @type {Day13} */
let outputAnswer = new Day13();

document.write(`${outputAnswer.partOne()}<br>${outputAnswer.partTwo()}`);

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());