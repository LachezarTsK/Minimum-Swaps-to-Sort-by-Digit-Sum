
function minSwaps(input: number[]): number {
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

function createSortedArrayDigitSum(input: number[]): DigitSum[] {
    const digitSum = new Array(input.length);
    for (let i = 0; i < input.length; ++i) {
        digitSum[i] = new DigitSum(calculateDigitSum(input[i]), input[i], i);
    }
    digitSum.sort((x, y) => x.digitSumValue === y.digitSumValue
        ? x.originalValue - y.originalValue
        : x.digitSumValue - y.digitSumValue);

    return digitSum;
}

function calculateDigitSum(value: number): number {
    let digitSum = 0;
    while (value > 0) {
        digitSum += value % 10;
        value = Math.floor(value / 10);
    }
    return digitSum !== 0 ? digitSum : 1;
}

function markPositionsLinkedInCycle(index: number, digitSum: DigitSum[], visited: boolean[]): void {
    while (!visited[digitSum[index].originalIndex]) {
        visited[digitSum[index].originalIndex] = true;
        index = digitSum[index].originalIndex;
    }
}

class DigitSum {

    digitSumValue: number;
    originalValue: number;
    originalIndex: number;

    constructor(digitSumValue: number, originalValue: number, originalIndex: number) {
        this.digitSumValue = digitSumValue;
        this.originalValue = originalValue;
        this.originalIndex = originalIndex;
    }
}
