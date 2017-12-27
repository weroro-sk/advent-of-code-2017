// ==UserScript==
// @name         Advent of Code 2017 - Day 2 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/2/input
// @match        https://adventofcode.com/2017/day/2/input
// @grant        none
// ==/UserScript==

class Day2 {

    /**
     * @constructor Day2
     */
    constructor() {
        /** @type {string} */
        this.inputString = document.body.textContent.trim();
        /** @type {Array} */
        this.inputDataArray = this.inputString.split('\n');
    }

    /**
     * @returns {number}
     */
    partOne() {
        /** @type {Array} */
        const differences = this.inputDataArray.map(r => {
            /** @type {Array} */
            const cells = r.split('\t');
            /** @type {number} */
            const smallest = Math.min(...cells);
            /** @type {number} */
            const largest = Math.max(...cells);
            return largest - smallest;
        });
        return differences.reduce((acc, cur) => acc + cur, 0);
    }

    /**
     * @returns {number}
     */
    partTwo() {
        /** @type {Array} */
        const differences = this.inputDataArray.map(r => {
            /** @type {Array} */
            const blocks = r.split('\t');
            /** @type {Array} */
            const cells = blocks.map(Number);
            for (let i = 0; i < cells.length; i++) {
                for (let j = i + 1; j < cells.length; j++) {
                    if (cells[i] % cells[j] === 0 || cells[j] % cells[i] === 0) {
                        return cells[i] > cells[j] ? cells[i] / cells[j] : cells[j] / cells[i];
                    }
                }
            }
            return 0;
        });
        return differences.reduce((acc, cur) => acc + cur, 0);
    }
}

/** @type {Day2} */
let outputAnswer = new Day2();

document.write(`${outputAnswer.partOne()}<br>${outputAnswer.partTwo()}`);

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());