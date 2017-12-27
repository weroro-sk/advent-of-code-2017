// ==UserScript==
// @name         Advent of Code 2017 - Day 15 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/15/input
// @match        https://adventofcode.com/2017/day/15/input
// @grant        none
// ==/UserScript==

class Day15 {

    /**
     * @constructor Day15
     */
    constructor() {
        /** @type {Number} */
        this.factorA = 16807;
        /** @type {Number} */
        this.factorB = 48271;
        /** @type {Number} */
        this.reminder = 2147483647;
        /** @type {string} */
        this.inputString = document.body.textContent.trim();
        /** @type {Array} */
        this.inputDataArray = this.inputString.split('\n');
        /** @type {Number} */
        this.generatorA = 0;
        /** @type {Number} */
        this.generatorB = 0;
        this.setGeneratorValues();
    }

    /**
     * @returns {void}
     */
    setGeneratorValues() {
        const valuesArray = [];
        this.inputDataArray.map(row => {
            let rowArray = row.trim().split(' ');
            valuesArray.push(rowArray.pop());
        });
        this.generatorA = +valuesArray[0];
        this.generatorB = +valuesArray[1];
    }

    /**
     * @param {Number} val
     * @param {Number} factor
     * @param {Number} div
     * @returns {Number}
     */
    next(val, factor, div) {
        return (val = (val * factor % this.reminder)) % div ? this.next(val, factor, div) : val;
    }

    /**
     * @param {Number} iterations
     * @param {Number} divA
     * @param {Number} divB
     * @returns {Number}
     */
    counting(iterations, divA, divB) {
        let genA = this.generatorA;
        let genB = this.generatorB;
        let count = 0;
        for (let i = 0; i < iterations; i++) {
            genA = this.next(genA, this.factorA, divA);
            genB = this.next(genB, this.factorB, divB);
            count += (genA & 0xFFFF) === (genB & 0xFFFF);
        }
        return count;
    }

    /**
     * @returns {Number}
     */
    partOne() {
        return this.counting(40000000, 1, 1);
    }

    /**
     * @returns {Number}
     */
    partTwo() {
        return this.counting(5000000, 4, 8);
    }
}

/** @type {Day15} */
let outputAnswer = new Day15();

document.write(`${outputAnswer.partOne()}<br>${outputAnswer.partTwo()}`);

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());