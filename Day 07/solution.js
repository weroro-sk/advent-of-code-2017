// ==UserScript==
// @name         Advent of Code 2017 - Day 7 solution
// @version      1.0.0
// @author       Weroro
// @match        http://adventofcode.com/2017/day/7/input
// @match        https://adventofcode.com/2017/day/7/input
// @grant        none
// ==/UserScript==

class Day7 {

    /**
     * @constructor Day7
     */
    constructor() {
        /** @type {String} */
        this.inputString = document.querySelector('pre').innerText.trim();
        /** @type {Array} */
        this.inputDataArray = this.inputString.split('\n');
    }

    /**
     * @param {Object} disks
     * @returns {String}
     */
    getRoot(disks) {
        /** @type {Set} */
        const keys = new Set(Object.keys(disks));
        for (const key in disks) {
            if (disks.hasOwnProperty(key)) {
                for (const i in disks[key].children) {
                    if (disks[key].children.hasOwnProperty(i)) {
                        keys.delete(disks[key].children[i]);
                    }
                }
            }
        }
        return keys.values().next().value;
    }

    /**
     * @param {String} root
     * @param {Object} tree
     * @returns {Number}
     */
    sumWeights(root, tree) {
        tree[root].total = tree[root].value;
        tree[root].children.map(c => {
            tree[root].total += this.sumWeights(c, tree);
        });
        return tree[root].total;
    }

    /**
     * @param {String} root
     * @param {Object} tree
     * @param {Number} [target]
     * @returns {Number}
     */
    balance(root, tree, target = 0) {
        /** @type {Object} */
        const children = {};
        /** @type {Number} */
        let newTarget = 0;
        tree[root].children.map(c => {
            if (children[tree[c].total] === undefined) {
                children[tree[c].total] = c;
            } else {
                children[tree[c].total] = false;
                newTarget = tree[c].total;
            }
        });
        for (const i in children) {
            if (children.hasOwnProperty(i) && children[i]) {
                return this.balance(children[i], tree, newTarget);
            }
        }
        return tree[root].value + target - tree[root].total;
    }


    /**
     * @returns {String}
     */
    partOne() {
        /** @type {Set} */
        const children = new Set();
        /** @type {Set} */
        const parents = new Set();
        this.inputDataArray.map(row => {
            if (row.indexOf('>') !== -1) {
                /** @type {Array} */
                let rowChildren = row.split('>')[1].trim().split(',').map(x => {
                    return x.trim();
                });
                rowChildren.forEach(child => {
                    children.add(child);
                });
                parents.add(row.split(' ')[0]);
            }
        });
        return [...parents].filter(item => !children.has(item))[0];
    }

    /**
     * @returns {Number}
     */
    partTwo() {
        /** @type {Object} */
        const disks = {};
        this.inputDataArray.map(line => {
            /** @type {Array} */
            const parts = line.split(' -> ');
            /** @type {Array} */
            const disk = parts[0].split(' ');
            /** @type {String} */
            const name = disk[0].trim();
            disks[name] = {
                value: Number(disk[1].substr(1, disk[1].indexOf(')') - 1)),
                children: [],
                total: 0,
            };
            if (parts.length > 1) {
                disks[name].children = parts[1].split(',').map(x => x.trim());
            }
        });
        /** @type {String} */
        const root = this.getRoot(disks);
        this.sumWeights(root, disks);
        return this.balance(root, disks);
    }

}

/** @type {Day7} */
let outputAnswer = new Day7();

document.write(outputAnswer.partOne() + '<br>' + outputAnswer.partTwo());

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());