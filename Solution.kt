
class Solution {

    private data class DigitSum(val digitSumValue: Int, val originalValue: Int, val originalIndex: Int){}

    fun minSwaps(input: IntArray): Int {
        val digitSum = createSortedArrayDigitSum(input)
        val visited = BooleanArray(input.size)
        var minSwapsToSortByDigitSum = input.size

        for (i in digitSum.indices) {
            if (visited[digitSum[i]!!.originalIndex]) {
                continue
            }
            markPositionsLinkedInCycle(i, digitSum, visited)
            --minSwapsToSortByDigitSum
        }
        return minSwapsToSortByDigitSum
    }


    private fun createSortedArrayDigitSum(input: IntArray): Array<DigitSum?> {
        val digitSum = arrayOfNulls<DigitSum>(input.size)
        for (i in input.indices) {
            digitSum[i] = DigitSum(calculateDigitSum(input[i]), input[i], i)
        }
        digitSum.sortWith() { x, y -> if (x!!.digitSumValue == y!!.digitSumValue)
                                          x.originalValue - y.originalValue
                                     else x.digitSumValue - y.digitSumValue
        }

        return digitSum
    }

    private fun calculateDigitSum(value: Int): Int {
        var value = value
        var digitSum = 0
        while (value > 0) {
            digitSum += value % 10
            value /= 10
        }
        return if (digitSum != 0) digitSum else 1
    }

    private fun markPositionsLinkedInCycle(index: Int, digitSum: Array<DigitSum?>, visited: BooleanArray) {
        var index = index
        while (!visited[digitSum[index]!!.originalIndex]) {
            visited[digitSum[index]!!.originalIndex] = true
            index = digitSum[index]!!.originalIndex
        }
    }
}
