
using System;

public class Solution
{
    private record DigitSum(int digitSumValue, int originalValue, int originalIndex){}

    public int MinSwaps(int[] input)
    {
        DigitSum[] digitSum = CreateSortedArrayDigitSum(input);
        bool[] visited = new bool[input.Length];
        int minSwapsToSortByDigitSum = input.Length;

        for (int i = 0; i < digitSum.Length; ++i)
        {
            if (visited[digitSum[i].originalIndex])
            {
                continue;
            }
            MarkPositionsLinkedInCycle(i, digitSum, visited);
            --minSwapsToSortByDigitSum;
        }
        return minSwapsToSortByDigitSum;
    }

    private DigitSum[] CreateSortedArrayDigitSum(int[] input)
    {
        DigitSum[] digitSum = new DigitSum[input.Length];
        for (int i = 0; i < input.Length; ++i)
        {
            digitSum[i] = new DigitSum(CalculateDigitSum(input[i]), input[i], i);
        }
        Array.Sort(digitSum, (x, y) => x.digitSumValue == y.digitSumValue
                                     ? x.originalValue - y.originalValue
                                     : x.digitSumValue - y.digitSumValue);

        return digitSum;
    }

    private int CalculateDigitSum(int value)
    {
        int digitSum = 0;
        while (value > 0)
        {
            digitSum += value % 10;
            value /= 10;
        }
        return digitSum != 0 ? digitSum : 1;
    }

    private void MarkPositionsLinkedInCycle(int index, DigitSum[] digitSum, bool[] visited)
    {
        while (!visited[digitSum[index].originalIndex])
        {
            visited[digitSum[index].originalIndex] = true;
            index = digitSum[index].originalIndex;
        }
    }
}
