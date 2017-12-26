// ==UserScript==
// @name         Advent of Code 2017 - Day 9 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/9/input
// @match        https://adventofcode.com/2017/day/9/input
// @grant        none
// ==/UserScript==

class Day9 {

    /**
     * @constructor Day9
     */
    constructor() {
        /** @type {string} */
        this.inputString = document.body.textContent.trim();
        this.inputString = this.inputString.replace(/!./g, '');
    }

    /**
     * @returns {number}
     */
    partOne() {
        /** @type {number} */
        let score = 0;
        /** @type {number} */
        let total = 0;
        /** @type {string} */
        const inputString = this.inputString.replace(/<.*?>/g, '');
        for (const char of inputString) {
            if (char === '{') {
                score++;
            } else if (char === '}') {
                total += score--;
            }
        }
        return total;
    }

    /**
     * @returns {number}
     */
    partTwo() {
        /** @type {Array|{index: number, input: string}} */
        const inputStringMatchArray = this.inputString.match(/<.*?>/g);
        /** @type {Array.<Number>} */
        const garbage = inputStringMatchArray.map(str => str.length - 2);
        return garbage.reduce((a, b) => a + b);
    }
}

/** @type {Day9} */
let outputAnswer = new Day9();

document.write(outputAnswer.partOne() + '<br>' + outputAnswer.partTwo());

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());