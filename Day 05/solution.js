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
        this.inputDataArray = this.inputString.split('\n');
        /** @type {Array} */
        this.dataOne = this.inputDataArray.map(x => parseInt(x));
        /** @type {Array} */
        this.dataTwo = this.inputDataArray.map(x => parseInt(x));
    }

    /**
     * @returns {number}
     */
    partOne() {
        /** @type {number} */
        let count = 0;
        /** @type {number} */
        let offset = 0;
        while (offset >= 0 && offset < this.dataOne.length) {
            offset += this.dataOne[offset]++;
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
        while (offset >= 0 && offset < this.dataTwo.length) {
            /** @type {number} */
            let tempOffset = offset;
            offset += this.dataTwo[offset];
            this.dataTwo[tempOffset] += this.dataTwo[tempOffset] >= 3 ? -1 : 1;
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