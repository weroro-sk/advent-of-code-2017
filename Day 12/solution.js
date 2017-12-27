// ==UserScript==
// @name         Advent of Code 2017 - Day 12 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/12/input
// @match        https://adventofcode.com/2017/day/12/input
// @grant        none
// ==/UserScript==

class Day12 {

    /**
     * @constructor Day12
     */
    constructor() {
        /** @type {string} */
        this.inputString = document.body.textContent.trim();
        /** @type {Array} */
        this.inputDataArray = this.getCleanInput(this.inputString);
    }

    /**
     * @param {String} data
     * @returns {Array}
     */
    getCleanInput(data) {
        return data
            .split(/\r?\n/)
            .map(p => p.trim())
            .map(p => p.replace(/ /g, ""))
            .filter(p => !!p)
            .reduce((map, p) => {
                /** @type {Array} */
                let parts = p.split("<->");
                map[parts[0]] = parts[1].split(",");
                return map;
            }, {});
    }

    /**
     * @param {Array} pipes
     * @param {String} pipe
     * @param {Set} currentSet
     * @returns {Set}
     */
    getConnectedPipes(pipes, pipe, currentSet = new Set()) {
        currentSet.add(pipe);
        for (let p of pipes[pipe].filter(p => !currentSet.has(p))) {
            this.getConnectedPipes(pipes, p, currentSet);
        }
        return currentSet;
    }

    /**
     * @returns {Number}
     */
    partOne() {
        /** @type {Set} */
        let connectedPipesSet = this.getConnectedPipes(this.inputDataArray, "0");
        return connectedPipesSet.size;
    }

    /**
     * @returns {Number}
     */
    partTwo() {
        /** @type {Array} */
        let pipes = this.inputDataArray;
        /** @type {Array} */
        let sets = Object.keys(pipes).map(p => this.getConnectedPipes(pipes, p));
        return new Set(sets
            .map(g => Array.from(g))
            .map(g => g.sort((a, b) => a.localeCompare(b)))
            .map(g => JSON.stringify(g))
        ).size;
    }
}

/** @type {Day12} */
let outputAnswer = new Day12();

document.write(`${outputAnswer.partOne()}<br>${outputAnswer.partTwo()}`);

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());