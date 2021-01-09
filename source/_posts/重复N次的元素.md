---
title: 重复N次的元素
date: 2020-12-23 13:27:59
mathjax: true
categories:
- ACM
- LeetCode
tags:
- 算法
- 简单
---

**[题目地址](https://leetcode-cn.com/problems/n-repeated-element-in-size-2n-array/)**

**难度：**⭐

###### **题目描述：**

在大小为 `2N` 的数组 `A` 中有 `N+1` 个不同的元素，其中有一个元素重复了 `N` 次。

返回重复了 `N` 次的那个元素。

<!-- more -->

**示例1：**

```
输入：[1,2,3,3]
输出：3
```

**示例2：**

```
输入：[2,1,2,5,3,2]
输出：2
```

**示例3：**

```
输入：[5,1,5,2,5,3,5,4]
输出：5
```

**提示：**

1. `4 <= A.length <= 10000`
2. `0 <= A[i] < 10000`
3. `A.length` 为偶数

<center>🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️解题过程🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️</center>

###### 解题过程：

**思路：**

遍历数组A，统计不同元素出现的次数，返回次数大于1的元素。

**c++代码：**(执行用时72ms，击败78.39%，内存消耗24.7M，击败29.69%）

```c++
class Solution {
public:
    int repeatedNTimes(vector<int>& A) {
        unordered_map<int,int> m;
        for(int i:A){
            ++m[i];
            if(m[i]>1){
                return i;
            }
        }
        return 0;
    }
};
```



<center>💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎官 方 题 解💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎</center>

###### [官方题解](https://leetcode-cn.com/problems/n-repeated-element-in-size-2n-array/solution/zhong-fu-n-ci-de-yuan-su-by-leetcode/):

#### 方法 1：计数

**想法和算法**

直接计数元素的个数。利用 `HashMap` 或者数组，这里使用 `HashMap`。

然后，元素数量超过 1 的就是答案。

**Java代码：**

```java
class Solution {
    public int repeatedNTimes(int[] A) {
        Map<Integer, Integer> count = new HashMap();
        for (int x: A) {
            count.put(x, count.getOrDefault(x, 0) + 1);
        }

        for (int k: count.keySet())
            if (count.get(k) > 1)
                return k;

        throw null;
    }
}
```

**复杂度分析**

- 时间复杂度：$O(N)$，其中 $N$是 `A` 的长度。
- 空间复杂度：$O(N)$。

**方法 2：比较**

**想法和算法**

一旦找到一个重复元素，那么一定就是答案。我们称这个答案为主要元素。

考虑所有长度为 4 的子序列，在子序列中一定至少含有两个主要元素。

这是因为：

长度为 2 的子序列中都是主要元素，或者；
每个长度为 2 的子序列都恰好含有 1 个主要元素，这意味着长度为 4 的子序列一定含有 2 个主要元素。
因此，只需要比较所有距离为 1，2 或者 3 的邻居元素即可。

**Java代码：**

```java
class Solution {
    public int repeatedNTimes(int[] A) {
        for (int k = 1; k <= 3; ++k)
            for (int i = 0; i < A.length - k; ++i)
                if (A[i] == A[i+k])
                    return A[i];

        throw null;
    }
}
```

**复杂度分析**

- 时间复杂度：$O(N)$，其中 $N$ 是 `A` 的长度。
- 空间复杂度：$O(1)$。



<center>⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳总 结⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳</center>

###### 总结：

计数法算是效率还不错的了，最近做的好多题都是用计数法做的。

