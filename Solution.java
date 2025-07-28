
import java.util.Arrays;

public class Solution {

    private record DigitSum(int digitSumValue, int originalValue, int originalIndex){}

    public int minSwaps(int[] input) {
        DigitSum[] digitSum = createSortedArrayDigitSum(input);
        boolean[] visited = new boolean[input.length];
        int minSwapsToSortByDigitSum = input.length;

        for (int i = 0; i < digitSum.length; ++i) {
            if (visited[digitSum[i].originalIndex]) {
                continue;
            }
            markPositionsLinkedInCycle(i, digitSum, visited);
            --minSwapsToSortByDigitSum;
        }
        return minSwapsToSortByDigitSum;
    }

    private DigitSum[] createSortedArrayDigitSum(int[] input) {
        DigitSum[] digitSum = new DigitSum[input.length];
        for (int i = 0; i < input.length; ++i) {
            digitSum[i] = new DigitSum(calculateDigitSum(input[i]), input[i], i);
        }
        Arrays.sort(digitSum, (x, y) -> x.digitSumValue == y.digitSumValue
                                      ? x.originalValue - y.originalValue
                                      : x.digitSumValue - y.digitSumValue);

        return digitSum;
    }

    private int calculateDigitSum(int value) {
        int digitSum = 0;
        while (value > 0) {
            digitSum += value % 10;
            value /= 10;
        }
        return digitSum != 0 ? digitSum : 1;
    }

    private void markPositionsLinkedInCycle(int index, DigitSum[] digitSum, boolean[] visited) {
        while (!visited[digitSum[index].originalIndex]) {
            visited[digitSum[index].originalIndex] = true;
            index = digitSum[index].originalIndex;
        }
    }
}
