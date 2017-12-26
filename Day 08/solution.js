// ==UserScript==
// @name         Advent of Code 2017 - Day 8 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/8/input
// @match        https://adventofcode.com/2017/day/8/input
// @grant        none
// ==/UserScript==

class Day8 {

    /**
     * @constructor Day8
     */
    constructor() {
        /** @type {String} */
        this.inputString = document.querySelector('pre').innerText.trim();
        /** @type {Array} */
        this.inputDataArray = this.inputString.split('\n');
    }

    /**
     * @param {Number} part
     * @returns {Number}
     */
    solver(part) {
        /** @type {Number} */
        let secondPartOutput = 0;
        /** @type {Object} */
        const hash = {};
        this.inputDataArray.forEach(line => {
            /** @type {Array} */
            const args = line.split(' ');
            /** @type {String} */
            const key = args[0];
            /** @type {String} */
            const operation = args[1].toLowerCase();
            /** @type {Number} */
            const val = +args[2];
            /** @type {String} */
            const operator = args[5];
            /** @type {Number} */
            const leftValue = +hash[args[4]] || 0;
            /** @type {String} */
            const rightValue = args[6];
            /** @type {String} */
            const condition = `${leftValue} ${operator} ${rightValue}`;
            /** @type {Boolean} */
            const bool = Boolean(eval(condition));
            if (bool) {
                /** @type {Number} */
                let hashValue = +hash[key] || 0;
                if (operation === 'inc') {
                    hashValue += val;
                } else {
                    hashValue -= val;
                }
                hash[key] = hashValue;
            }
            secondPartOutput = Math.max(
                Math.max.apply(
                    null,
                    Object.keys(hash).map(key => hash[key])
                ),
                secondPartOutput
            );
        });
        if (part === 2) {
            return secondPartOutput;
        }
        return Math.max.apply(
            null,
            Object.keys(hash).map(key => hash[key])
        );
    }

    /**
     * @returns {number}
     */
    partOne() {
        return this.solver(1);
    }

    /**
     * @returns {number}
     */
    partTwo() {
        return this.solver(2);
    }
}

/** @type {Day8} */
let outputAnswer = new Day8();

document.write(outputAnswer.partOne() + '<br>' + outputAnswer.partTwo());

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());