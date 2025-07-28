
package main
import "slices"

func minSwaps(input []int) int {
    digitSum := createSortedArrayDigitSum(input)
    visited := make([]bool, len(input))
    var minSwapsToSortByDigitSum = len(input)

    for i := range digitSum {
        if visited[digitSum[i].originalIndex] {
            continue
        }
        markPositionsLinkedInCycle(i, digitSum, visited)
        minSwapsToSortByDigitSum--
    }
    return minSwapsToSortByDigitSum
}

func createSortedArrayDigitSum(input []int) []DigitSum {
    digitSum := make([]DigitSum, len(input))
    for i := range input {
        digitSum[i] = NewDigitSum(calculateDigitSum(input[i]), input[i], i)
    }

    slices.SortFunc(digitSum, func(x DigitSum, y DigitSum) int {
                                   if x.digitSumValue == y.digitSumValue {
                                      return x.originalValue - y.originalValue
                                   }
                                      return x.digitSumValue - y.digitSumValue 
                               })
    return digitSum
}

func calculateDigitSum(value int) int {
    if value == 0 {
        return 1
    }
    digitSum := 0
    for value > 0 {
        digitSum += value % 10
        value /= 10
    }
    return digitSum
}

func markPositionsLinkedInCycle(index int, digitSum []DigitSum, visited []bool) {
    for !visited[digitSum[index].originalIndex] {
        visited[digitSum[index].originalIndex] = true
        index = digitSum[index].originalIndex
    }
}

type DigitSum struct {
    digitSumValue int
    originalValue int
    originalIndex int
}

func NewDigitSum(digitSumValue int, originalValue int, originalIndex int) DigitSum {
    digitSum := DigitSum{
        digitSumValue: digitSumValue,
        originalValue: originalValue,
        originalIndex: originalIndex,
    }
    return digitSum
}
