// ==UserScript==
// @name         Advent of Code 2017 - Day 16 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/16/input
// @match        https://adventofcode.com/2017/day/16/input
// @grant        none
// ==/UserScript==

class Day16 {

    /**
     * @constructor Day16
     */
    constructor() {
        /** @type {string} */
        this.inputString = document.body.textContent.trim();
        /** @type {Array} */
        this.inputDataArray = this.inputString.split(',');
        /** @type {Array} */
        this.programsList = [...'abcdefghijklmnop'];
    }

    /**
     * @param {String} move
     * @param {Array} programs
     */
    parseMove(move, programs) {
        /** @type {Array} */
        const positions = move.substr(1).split('/');
        if (move[0] === 's') {
            /** @type {number} */
            let num = +move.substr(1);
            programs.unshift(...programs.splice(-num, num));
        } else if (move[0] === 'x') {
            [programs[positions[0]], programs[positions[1]]] = [programs[positions[1]], programs[positions[0]]];
        } else {
            /** @type {number} */
            const indexA = programs.indexOf(positions[0]);
            /** @type {number} */
            const indexB = programs.indexOf(positions[1]);
            [programs[indexA], programs[indexB]] = [positions[1], positions[0]];
        }
    }

    /**
     * @returns {String}
     */
    partOne() {
        /** @type {Array} */
        let programs = this.programsList.slice();
        this.inputDataArray.forEach(move => {
            this.parseMove(move, programs);
        });
        return programs.join('');
    }

    /**
     * @returns {String}
     */
    partTwo() {
        /** @type {Array} */
        let programs = this.programsList.slice();
        /** @type {string} */
        const startPoint = programs.join('');
        /** @type {number} */
        const iterations = 1000000000;
        for (let i = 0; i < iterations; i++) {
            this.inputDataArray.forEach(move => this.parseMove(move, programs));
            if (programs.join('') === startPoint) {
                i += (Math.floor(iterations / (i + 1)) - 1) * (i + 1);
            }
        }
        return programs.join('');
    }
}

/** @type {Day16} */
let outputAnswer = new Day16();

document.write(`${outputAnswer.partOne()}<br>${outputAnswer.partTwo()}`);

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());