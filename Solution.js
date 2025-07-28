
/**
 * @param {number[]} input
 * @return {number}
 */
var minSwaps = function (input) {
    const digitSum = createSortedArrayDigitSum(input);
    const visited = new Array(input.length).fill(false);
    let minSwapsToSortByDigitSum = input.length;

    for (let i = 0; i < digitSum.length; ++i) {
        if (visited[digitSum[i].originalIndex]) {
            continue;
        }
        markPositionsLinkedInCycle(i, digitSum, visited);
        --minSwapsToSortByDigitSum;
    }
    return minSwapsToSortByDigitSum;
};

/**
 * @param {number[]} input
 * @return {DigitSum[]}
 */
function  createSortedArrayDigitSum(input) {
    const digitSum = new Array(input.length);
    for (let i = 0; i < input.length; ++i) {
        digitSum[i] = new DigitSum(calculateDigitSum(input[i]), input[i], i);
    }
    digitSum.sort((x, y) => x.digitSumValue === y.digitSumValue
                          ? x.originalValue - y.originalValue
                          : x.digitSumValue - y.digitSumValue);

    return digitSum;
}

/**
 * @param {number} value
 * @return {number}
 */
function calculateDigitSum(value) {
    let digitSum = 0;
    while (value > 0) {
        digitSum += value % 10;
        value = Math.floor(value / 10);
    }
    return digitSum !== 0 ? digitSum : 1;
}

/**
 * @param {number} index
 * @param {DigitSum[]} digitSum
 * @param {boolean[]} visited
 * @return {void}
 */
function markPositionsLinkedInCycle(index, digitSum, visited) {
    while (!visited[digitSum[index].originalIndex]) {
        visited[digitSum[index].originalIndex] = true;
        index = digitSum[index].originalIndex;
    }
}

class DigitSum {

    /**
     * @param {number} digitSumValue
     * @param {number} originalValue
     * @param {number} originalIndex
     */
    constructor(digitSumValue, originalValue, originalIndex) {
        this.digitSumValue = digitSumValue;
        this.originalValue = originalValue;
        this.originalIndex = originalIndex;
    }
}
