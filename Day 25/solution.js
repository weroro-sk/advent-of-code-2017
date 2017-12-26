// ==UserScript==
// @name         Advent of Code 2017 - Day 25 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/25/input
// @match        https://adventofcode.com/2017/day/25/input
// @grant        none
// ==/UserScript==

class Day25 {

    /**
     * @constructor Day25
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
        /** @type {String} */
        let currentState = this.inputDataArray[0].match(/Begin.+(.)./)[1];
        /** @type {number} */
        const steps = +this.inputDataArray[1].match(/(\d+)/)[1];
        /** @type {Object} */
        let states = this.inputDataArray
            .slice(3).join(' ')
            .split(/In/g)
            .slice(1)
            .map(str => str.match(/(\b\w\b|left|right)/g))
            .map(([state, value1, write1, move1, next1, value2, write2, move2, next2]) => ({
                state,
                [value1]: {write: +write1, move: move1, next: next1},
                [value2]: {write: +write2, move: move2, next: next2}
            }))
            .reduce((a, v) => ({...a, [v.state]: v}), {});
        /** @type {[number]} */
        let tape = [0];
        /** @type {number} */
        let index = 0;
        for (let i = 0; i < steps; i++) {
            /** @type {String} */
            let state = states[currentState];
            /** @type {number} */
            let currentValue = tape[index];
            currentState = state[currentValue].next;
            tape[index] = state[currentValue].write;
            if (state[currentValue].move === 'left') {
                if (index === 0) {
                    tape.unshift(0);
                } else {
                    index--;
                }
            } else {
                index++;
                if (index === tape.length) {
                    tape.push(0);
                }
            }
        }
        return tape.reduce((a, v) => +v + a, 0);
    }

    /**
     * @returns {number}
     */
    partTwo() {
        return 0;
    }
}

/** @type {Day25} */
let outputAnswer = new Day25();

document.write(outputAnswer.partOne() + '<br>' + outputAnswer.partTwo());

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());