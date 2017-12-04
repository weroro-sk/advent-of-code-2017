// ==UserScript==
// @name         Advent of Code 2017 - Day 3 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/3/input
// @grant        none
// ==/UserScript==

class Day3 {

    /**
     *
     */
    constructor() {
        /** @type {string} */
        this.inputString = document.querySelector('pre').innerHTML.trim();
        /** @type {number} */
        this.inputNumericValue = parseInt(this.inputString);
    }

    /**
     * @param {number} spiral
     * @returns {Array|number}
     */
    getDistance(spiral) {
        spiral = spiral % 1;
        /** @type {[number,number,number,number]} */
        let centers = [0.125, 0.375, 0.625, 0.875];
        for (let i in centers) {
            /** @type {number} */
            let distI = Math.abs(spiral - centers[i]);
            if (distI <= 0.125)
                return [distI, spiral < centers[i]];
        }
        return 1;
    }

    /**
     * @param {Object} valueMatrix
     * @param {number} positionX
     * @param {number} positionY
     * @returns {number}
     */
    getValue(valueMatrix, positionX, positionY) {
        /** @type {number} */
        let summary = 0;
        for (let x = positionX - 1; x <= positionX + 1; x++) {
            for (let y = positionY - 1; y <= positionY + 1; y++) {
                if (valueMatrix[x + ',' + y]) {
                    summary += valueMatrix[x + ',' + y];
                }
            }
        }
        return summary;
    }

    /**
     * @returns {number}
     */
    partOne() {
        /** @type {number} */
        let spiral = Math.sqrt(this.inputNumericValue / 4) - 0.5;
        /** @type {number} */
        let spiralNum = Math.ceil(spiral);
        let [distance, isNegativeFromCenter] = this.getDistance(spiral);
        /** @type {number} */
        let offset = 8 * spiralNum * distance;
        if (isNegativeFromCenter) {
            offset = Math.ceil(offset);
        }
        return Math.floor(spiralNum + offset);
    }

    /**
     * @returns {number}
     */
    partTwo() {
        let xPos, yPos, valueMatrix;
        /** @type {number} */
        xPos = yPos = 0;
        /** @type {Object} */
        valueMatrix = {};
        /** @type {number} */
        valueMatrix[xPos + ',' + yPos] = 1;
        while (true) {
            /** @type {number} */
            let val = this.getValue(valueMatrix, xPos, yPos);
            if (val >= this.inputNumericValue) {
                return val;
            }
            valueMatrix[xPos + ',' + yPos] = val;
            if ((xPos !== yPos || xPos >= 0) && Math.abs(xPos) <= Math.abs(yPos)) {
                xPos += yPos >= 0 ? 1 : -1;
            } else {
                yPos += xPos >= 0 ? -1 : 1;
            }
        }
    }
}

/** @type {Day3} */
let outputAnswer = new Day3();

document.write(outputAnswer.partOne() + '<br>' + outputAnswer.partTwo());

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());