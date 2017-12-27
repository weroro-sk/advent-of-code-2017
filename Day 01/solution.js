// ==UserScript==
// @name         Advent of Code 2017 - Day 1 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/1/input
// @match        https://adventofcode.com/2017/day/1/input
// @grant        none
// ==/UserScript==

class Day1 {

    /**
     * @constructor Day1
     */
    constructor() {
        /** @type {string} */
        this.inputString = document.body.textContent.trim();
    }

    /**
     * @param {string} input
     * @param {number} interval
     * @returns {number}
     */
    captcha(input, interval = 1) {
        return [...input].map(Number).reduce((sum, digit, index, subject) => {
            /** @type {number} */
            const nextIndex = (index + interval) % subject.length;
            return digit === subject[nextIndex] ? sum + digit : sum;
        }, 0);
    }

    /**
     * @returns {number}
     */
    partOne() {
        return this.captcha(this.inputString);
    }

    /**
     * @returns {number}
     */
    partTwo() {
        return this.captcha(this.inputString, this.inputString.length / 2);
    }
}

/** @type {Day1} */
let outputAnswer = new Day1();

document.write(`${outputAnswer.partOne()}<br>${outputAnswer.partTwo()}`);

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());