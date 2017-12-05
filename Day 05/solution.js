// ==UserScript==
// @name         Advent of Code 2017 - Day 5 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/5/input
// @grant        none
// ==/UserScript==

class Day5 {

    /**
     *
     */
    constructor() {
        /** @type {string} */
        this.inputString = document.querySelector('pre').innerHTML.trim();
        /** @type {Array} */
        this.inputData = this.inputString.split('\n').map(x => parseInt(x));
    }

    /**
     * @returns {number}
     */
    partOne() {
        /** @type {number} */
        let count = 0;
        /** @type {number} */
        let offset = 0;
        while (offset >= 0 && offset < this.inputData.length) {
            offset += this.inputData[offset]++;
            count++;
        }
        return count;
    }

    /**
     * @returns {number}
     */
    partTwo() {
        /** @type {number} */
        let count = 0;
        /** @type {number} */
        let offset = 0;
        while (offset >= 0 && offset < this.inputData.length) {
            /** @type {number} */
            let tempOffset = offset;
            offset += this.inputData[offset];
            this.inputData[tempOffset] += this.inputData[tempOffset] >= 3 ? -1 : 1;
            count++;
        }
        return count;
    }
}

/** @type {Day5} */
let outputAnswer = new Day5();

document.write(outputAnswer.partOne() + '<br>' + outputAnswer.partTwo());

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());