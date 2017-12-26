// ==UserScript==
// @name         Advent of Code 2017 - Day 21 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/21/input
// @match        https://adventofcode.com/2017/day/21/input
// @grant        none
// ==/UserScript==

class Day21 {

    /**
     * @constructor Day21
     */
    constructor() {
        /** @type {String} */
        this.inputString = document.body.textContent.trim();
        /** @type {Array} */
        this.inputDataArray = this.inputString.split('\n');
        /** @type {Array} */
        this.grid = [];
        /** @type {Object} */
        this.rules = {};

        this.init();
    }

    /**
     * @param {Number} totalIterations
     * @returns {Number}
     */
    solve(totalIterations) {
        this.grid = ['.#.', '..#', '###'];
        for (let loop = 0; loop < totalIterations; loop++) {
            /** @type {Array} */
            const sub = this.getSubgrids();
            for (let l = 0; l < sub.length; l++) {
                sub[l] = this.rule(sub[l]);
            }
            this.grid = this.reform(sub);
        }
        return this.grid.reduce((a, b) => a + b.match(/#/g).length, 0);
    }

    /**
     * @param {String} gridString
     * @returns {*}
     */
    rule(gridString) {
        for (let i = 0; i < 2; i++)
            for (let j = 0; j < 4; j++) {
                /** @type {string} */
                const s = this.morph(gridString, j, i);
                if (this.rules.hasOwnProperty(s)) {
                    return this.rules[s];
                }
            }
    }

    /**
     * @param {String} inputString
     * @param {Number} rotate
     * @param {Number} flip
     * @returns {string}
     */
    morph(inputString, rotate, flip) {
        /** @type {Array} */
        let tmpArray = inputString.split('/');
        if (flip) {
            tmpArray.reverse();
        }
        for (let r = 0; r < rotate; r++) {
            /** @type {Array} */
            const morphedArray = [];
            for (let i = 0; i < tmpArray.length; i++) {
                /** @type {string} */
                let news = '';
                for (let j = tmpArray.length - 1; j >= 0; j--) {
                    news += tmpArray[j][i];
                }
                morphedArray.push(news);
            }
            tmpArray = morphedArray;
        }
        return tmpArray.join('/')
    }

    /**
     * @returns {Array}
     */
    getSubgrids() {
        /** @type {number} */
        const num = this.grid.length % 2 === 0 ? 2 : 3;
        /** @type {Array} */
        let strs = [];
        for (let i = 0; i < this.grid.length; i += num)
            for (let j = 0; j < this.grid.length; j += num) {
                /** @type {string} */
                let str = '';
                for (let k = 0; k < num; k++) {
                    str += this.grid[i + k].substring(j, j + num) + '/';
                }
                strs.push(str.substr(0, str.length - 1));
            }
        return strs;
    }

    /**
     * @param {Array} arr
     * @returns {Array}
     */
    reform(arr) {
        /** @type {Array} */
        const outputArray = [];
        /** @type {number} */
        const num = Math.sqrt(arr.length);
        /** @type {number} */
        const strlen = arr[0].match(/\//g).length + 1;
        for (let i = 0; i < arr.length; i += num)
            for (let j = 0; j < strlen; j++) {
                /** @type {string} */
                let str = '';
                for (let k = 0; k < num; k++) {
                    str += arr[i + k].split('/')[j];
                }
                outputArray.push(str);
            }
        return outputArray;
    }

    /**
     * @returns {void}
     */
    init() {
        this.inputDataArray.forEach(d => {
            /** @type {Array} */
            const tokens = d.split(' => ');
            this.rules[tokens[0]] = tokens[1];
        })
    }

    /**
     * @returns {number}
     */
    partOne() {
        return this.solve(5);
    }

    /**
     * @returns {number}
     */
    partTwo() {
        return this.solve(18);
    }
}

/** @type {Day21} */
let outputAnswer = new Day21();

document.write(outputAnswer.partOne() + '<br>' + outputAnswer.partTwo());

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());