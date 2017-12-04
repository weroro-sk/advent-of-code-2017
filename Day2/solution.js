class Day2 {

    /**
     *
     */
    constructor() {
        /** @type {string} */
        this.inputString = document.querySelector('pre').innerHTML.trim();
        /** @type {Array} */
        this.rows = this.inputString.split('\n');
    }

    /**
     * @returns {Array}
     */
    partOne() {
        /** @type {Array} */
        const differences = this.rows.map(r => {
            /** @type {Array} */
            const cells = r.split('\t');
            /** @type {number} */
            const smallest = Math.min(...cells);
            /** @type {number} */
            const largest = Math.max(...cells);
            return largest - smallest;
        });
        return differences.reduce((acc, cur) => acc + cur, 0);
    }

    /**
     * @returns {Array}
     */
    partTwo() {
        /** @type {Array} */
        const differences = this.rows.map(r => {
            /** @type {Array} */
            const blocks = r.split('\t');
            /** @type {Array} */
            const cells = blocks.map(b => parseInt(b));
            for (let i = 0; i < cells.length; i++) {
                for (let j = i + 1; j < cells.length; j++) {
                    if (cells[i] % cells[j] === 0 || cells[j] % cells[i] === 0) {
                        return cells[i] > cells[j] ? cells[i] / cells[j] : cells[j] / cells[i];
                    }
                }
            }
        });
        return differences.reduce((acc, cur) => acc + cur, 0);
    }
}

/** @type {Day2} */
let outputAnswer = new Day2();

document.write(outputAnswer.partOne() + '<br>' + outputAnswer.partTwo());

console.log(outputAnswer.partOne());
console.log(outputAnswer.partTwo());