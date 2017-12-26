// ==UserScript==
// @name         Advent of Code 2017 - Day 6 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/6/input
// @match        https://adventofcode.com/2017/day/6/input
// @grant        none
// ==/UserScript==

class Day6 {

    /**
     * @constructor Day6
     */
    constructor() {
        /** @type {string} */
        this.inputString = document.body.textContent.trim();
        /** @type {Array.<Number>} */
        this.inputDataArray = this.inputString.split('\t').map(Number);
    }

    /**
     * @param {Array} blocks
     * @returns {number}
     */
    getLargestIndexKey(blocks) {
        /** @type {number} */
        let largest = 0;
        /** @type {number} */
        let key = 0;
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i] > largest) {
                largest = blocks[i];
                key = i;
            }
        }
        return key;
    }

    /**
     * @param {Array} blocks
     */
    redistribute(blocks) {
        /** @type {number} */
        let index = this.getLargestIndexKey(blocks);
        /** @type {number} */
        let value = blocks[index];
        blocks[index] = 0;
        while (value) {
            index = (index + 1) % blocks.length;
            blocks[index]++;
            value--;
        }
    }

    /**
     * @param {boolean} secondPart
     * @returns {number}
     */
    solver(secondPart = false) {
        /** @type {Array|[Number]} */
        const blocks = this.inputDataArray.slice();
        /** @type {Object} */
        const states = {};
        states[blocks.join('|')] = true;
        /** @type {number} */
        let loops = 0;
        while (true) {
            this.redistribute(blocks);
            loops++;
            /** @type {string} */
            let blockJoin = blocks.join('|');
            if (secondPart) {
                if (states[blockJoin]) {
                    return loops - states[blockJoin];
                }
                states[blockJoin] = loops;
            } else {
                if (states[blockJoin]) {
                    break;
                }
                states[blockJoin] = true;
            }
        }
        if (!secondPart) {
            return loops;
        }
        return 0;
    }

    /**
     * @returns {number}
     */
    partOne() {
        return this.solver();
    }

    /**
     * @returns {number}
     */
    partTwo() {
        return this.solver(true);
    }

}

/** @type {Day6} */
let outputAnswer = new Day6();

document.write(outputAnswer.partOne() + '<br>' + outputAnswer.partTwo());

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());