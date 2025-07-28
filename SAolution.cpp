
#include <span>
#include <vector>
#include <ranges>
using namespace std;

class Solution {

    struct DigitSum {
        int digitSumValue{};
        int originalValue{};
        int originalIndex{};

        DigitSum(int digitSumValue, int originalValue, int originalIndex) :
            digitSumValue{ digitSumValue }, originalValue{ originalValue }, originalIndex{ originalIndex }{}
    };

public:
    int minSwaps(vector<int>& input) const {
        vector<DigitSum> digitSum = createSortedVectorDigitSum(input);
        vector<bool> visited(input.size());
        int minSwapsToSortByDigitSum = input.size();

        for (int i = 0; i < digitSum.size(); ++i) {
            if (visited[digitSum[i].originalIndex]) {
                continue;
            }
            markPositionsLinkedInCycle(i, digitSum, visited);
            --minSwapsToSortByDigitSum;
        }
        return minSwapsToSortByDigitSum;
    }

private:
    vector<DigitSum> createSortedVectorDigitSum(const span<int> input) const {
        vector<DigitSum> digitSum;
        digitSum.reserve(input.size());

        for (int i = 0; i < input.size(); ++i) {
            digitSum.emplace_back(calculateDigitSum(input[i]), input[i], i);
        }
        ranges::sort(digitSum, [](const DigitSum& x, const DigitSum& y) {
                               return x.digitSumValue == y.digitSumValue
                                    ? x.originalValue < y.originalValue
                                    : x.digitSumValue < y.digitSumValue; });

        return digitSum;
    }

    int calculateDigitSum(int value) const {
        int digitSum = 0;
        while (value > 0) {
            digitSum += value % 10;
            value /= 10;
        }
        return digitSum != 0 ? digitSum : 1;
    }

    void markPositionsLinkedInCycle(int index, span<DigitSum> digitSum, vector<bool>& visited) const {
        while (!visited[digitSum[index].originalIndex]) {
            visited[digitSum[index].originalIndex] = true;
            index = digitSum[index].originalIndex;
        }
    }
};
