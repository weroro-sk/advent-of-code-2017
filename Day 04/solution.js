// ==UserScript==
// @name         Advent of Code 2017 - Day 4 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/4/input
// @match        https://adventofcode.com/2017/day/4/input
// @grant        none
// ==/UserScript==

class Day4 {

    /**
     * @constructor Day4
     */
    constructor() {
        /** @type {string} */
        this.inputString = document.querySelector('pre').innerText.trim();
        /** @type {Array} */
        this.inputDataArray = this.inputString.split('\n');
    }

    /**
     * @param {Array} wordsArray
     * @returns {Array}
     */
    anagramSort(wordsArray) {
        return wordsArray.map(word => {
            return [...word].sort().join('');
        });
    }

    /**
     * @param {Array} wordsArray
     * @returns {boolean}
     */
    wordsCompare(wordsArray) {
        wordsArray.sort();
        /** @type {number} */
        const len = wordsArray.length;
        for (let wordIndex = 0; wordIndex < len; wordIndex++) {
            if (wordIndex < len && wordsArray[wordIndex] === wordsArray[wordIndex + 1]) {
                return false;
            }
        }
        return true;
    }

    /**
     * @param {function|null} [anagram]
     * @returns {number}
     */
    getNumber(anagram = null) {
        /** @type {number} */
        let found = 0;
        this.inputDataArray.map(wordsRow => {
            /** @type {Array|*} */
            let wordsArray = wordsRow.split(' ');
            if (anagram !== null && typeof anagram === 'function') {
                wordsArray = anagram(wordsArray);
            }
            if (this.wordsCompare(wordsArray)) {
                found++;
            }
        });
        return found;
    }

    /**
     * @returns {number}
     */
    partOne() {
        return this.getNumber();
    }

    /**
     * @returns {number}
     */
    partTwo() {
        return this.getNumber(wordsArray => {
            return this.anagramSort(wordsArray);
        });
    }
}

/** @type {Day4} */
let outputAnswer = new Day4();

document.write(outputAnswer.partOne() + '<br>' + outputAnswer.partTwo());

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());