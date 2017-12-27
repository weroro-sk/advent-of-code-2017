// ==UserScript==
// @name         Advent of Code 2017 - Day 11 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/11/input
// @match        https://adventofcode.com/2017/day/11/input
// @grant        none
// ==/UserScript==

class Day11 {

    /**
     * @constructor Day11
     */
    constructor() {
        /** @type {string} */
        this.inputString = document.body.textContent.trim();
        /** @type {Array} */
        this.inputDataArray = this.inputString.split(',');
    }

    /**
     * @param {Array} inputArray
     * @param {String} direction
     * @returns {Array}
     */
    incDec(inputArray, direction) {
        /** @type {Array} */
        let tmpArray = inputArray;
        switch (direction) {
            case 'nw':
                tmpArray[0]++;
                break;
            case 'n':
                tmpArray[1]++;
                break;
            case 'ne':
                tmpArray[2]++;
                break;
            case 'se':
                tmpArray[0]--;
                break;
            case 's':
                tmpArray[1]--;
                break;
            case 'sw':
                tmpArray[2]--;
                break;
            default:
        }
        return tmpArray;
    }

    /**
     * @param {Array} inputArray
     * @returns {Number}
     */
    getDistance(inputArray) {
        /** @type {Number} */
        const half = 0.5;
        return Math.abs(inputArray[2] * half - inputArray[0] * half) + Math.abs(inputArray[2] * half + inputArray[0] * half + inputArray[1]);
    }

    /**
     * @returns {Number}
     */
    partOne() {
        /** @type {Array} */
        let keysArray = this.inputDataArray.reduce((inputArray, direction) => {
            return this.incDec(inputArray, direction);
        }, [0, 0, 0]);
        return this.getDistance(keysArray);
    }

    /**
     * @returns {Number}
     */
    partTwo() {
        /** @type {Number} */
        let maxDistance = 0;
        this.inputDataArray.reduce((inputArray, direction) => {
            /** @type {Array} */
            const tmpArray = this.incDec(inputArray, direction);
            /** @type {Number} */
            const distance = this.getDistance(tmpArray);
            if (distance > maxDistance) {
                maxDistance = distance;
            }
            return tmpArray;
        }, [0, 0, 0]);
        return maxDistance;
    }
}

/** @type {Day11} */
let outputAnswer = new Day11();

document.write(`${outputAnswer.partOne()}<br>${outputAnswer.partTwo()}`);

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());