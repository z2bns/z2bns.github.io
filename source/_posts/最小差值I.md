---
title: 最小差值I
date: 2020-11-28 13:39:06
mathjax: true
categories:
- ACM
- LeetCode
tags:
- 算法
- 简单
---

**[题目地址](https://leetcode-cn.com/problems/smallest-range-i/)**

**难度：**⭐

###### **题目描述：**

给你一个整数数组 A，请你给数组中的每个元素 A[i] 都加上一个任意数字 x （-K <= x <= K），从而得到一个新数组 B 。

返回数组 B 的最大值和最小值之间可能存在的最小差值。

<!-- more -->

**示例1：**

```
输入：A = [1], K = 0
输出：0
解释：B = [1]
```

**示例2：**

```
输入：A = [0,10], K = 2
输出：6
解释：B = [2,8]
```

**示例3：**

```
输入：A = [1,3,6], K = 3
输出：0
解释：B = [3,3,3] 或 B = [4,4,4]
```

**提示：**

1. `1 <= A.length <= 10000`
2. `0 <= A[i] <= 10000`
3. `0 <= K <= 10000`



<center>🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️解题过程🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️</center>

###### 解题过程：

**思路：**

分析题目，可以得出数组B的最大值maxB最小值minB一定是可以由数组A中的最大值maxA和最小值minA变化而来，所以只需要求出maxA+x，minA+x（-K<=x<=K）两者之间可能存在的最小差值，两者之间差值的取值范围是[maxA-minA-2K,maxA-minA+2K],注意如果maxA-minA-2K<0的话差值要取0，因为差值是最大值减去最小值必然是非负数且二者之差在2K之内存在两个数使得二者变化后差为0。

**c++代码：**(执行用时40ms，击败48.28%，内存消耗14.9M，击败10.64%）

```c++
class Solution {
public:
    int smallestRangeI(vector<int>& A, int K) {
        int maxA=*max_element(A.begin(),A.end());
        int minA=*min_element(A.begin(),A.end());
        return 2*K>(maxA-minA)?0:abs(maxA-minA-2*K);
    }
};
```



<center>💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎官 方 题 解💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎</center>

###### [官方题解](https://leetcode-cn.com/problems/smallest-range-i/solution/zui-xiao-chai-zhi-i-by-leetcode/):

**方法 1：数学**

**想法和算法**

假设 `A` 是原始数组，`B` 是修改后的数组，我们需要最小化 `max(B) - min(B)`，也就是分别最小化 `max(B)` 和最大化 `min(B)`。

`max(B)` 最小可能为 `max(A) - K`，因为 `max(A)` 不可能再变得更小。同样，`min(B)` 最大可能为 `min(A) + K`。所以结果 `max(B) - min(B)` 至少为 `ans = (max(A) - K) - (min(A) + K)`。

我们可以用一下修改方式获得结果（如果 `ans >= 0`）：

- 如果 $A[i] \leq \min(A) + K$，那么 $B[i] = \min(A) + K$
- 如果 $A[i] \geq \max(A) - K$，那么 $B[i] = \max(A) - K$
- 否则 $B[i] = A[i]$。

如果 `ans < 0`，最终结果会有 `ans = 0`，同样利用上面的修改方式。

**Java代码：**

```java
class Solution {
    public int smallestRangeI(int[] A, int K) {
        int min = A[0], max = A[0];
        for (int x: A) {
            min = Math.min(min, x);
            max = Math.max(max, x);
        }
        return Math.max(0, max - min - 2*K);
    }
}
```

**复杂度分析**

- 时间复杂度：$O(N)$，其中 $N$ 是`A` 的长度。
- 空间复杂度：$O(1)$。



<center>⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳总 结⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳</center>

###### 总结：

官方题解和我的思路叙述不同，但是代码实现方式还是一样的，我是使用了封装好的库\<algorithm>求数组中的最大值和最小值，官方题解是遍历了数组A求出最大值max和最小值min，区别不大。