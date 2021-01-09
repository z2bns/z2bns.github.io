---
title: 按奇偶排序数组II
date: 2020-11-24 09:00:12
mathjax: true
categories:
- ACM
- LeetCode
tags:
- 算法
- 简单
---

**[题目地址](https://leetcode-cn.com/problems/sort-array-by-parity-ii/)**

**难度：**⭐

###### **题目描述：**

给定一个非负整数数组 `A`， `A` 中一半整数是奇数，一半整数是偶数。

对数组进行排序，以便当 `A[i]` 为奇数时，`i` 也是奇数；当 `A[i]` 为偶数时， `i` 也是偶数。

你可以返回任何满足上述条件的数组作为答案。

<!-- more -->

**示例：**

```
输入：[4,2,5,7]
输出：[4,5,2,7]
解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。
```

**提示：**

1. `2 <= A.length <= 20000`
2. `A.length % 2 == 0`
3. `0 <= A[i] <= 1000`

 

<center>🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️解题过程🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️</center>

###### 解题过程：

**思路：**

再定义一个vector数组result存储排序后的序列，遍历数组A，根据元素的奇偶性存储到result相应的索引位置上，然后索引值加2指向下一个奇/偶位置。

**c++代码：**(执行用时48ms，击败50.89%，内存消耗20.5M，击败46.55%）

```c++
class Solution {
public:
    vector<int> sortArrayByParityII(vector<int>& A) {
        int n=A.size();
        vector<int> result(n,0);
        int even=0;
        int odd=1;
        for(int i=0;i<n;++i){
            if(A[i]%2==0){
                result[even]=A[i];
                even+=2;
            }else{
                result[odd]=A[i];
                odd+=2;
            }
        }
        return result;
    }
};
```



<center>💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎官 方 题 解💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎</center>

###### [官方题解](https://leetcode-cn.com/problems/sort-array-by-parity-ii/solution/an-qi-ou-pai-xu-shu-zu-ii-by-leetcode-solution/):

**方法一： 两次遍历**

**思路和算法**

遍历一遍数组把所有的偶数放进 `ans[0]`，`ans[2]`，`ans[4]`，依次类推。

再遍历一遍数组把所有的奇数依次放进 `ans[1]`，`ans[3]`，`ans[5]`，依次类推。

**c++代码：**(执行用时60ms，击败15.13%，内存消耗20.5M，击败40.97%）

```c++
class Solution {
public:
    vector<int> sortArrayByParityII(vector<int>& A) {
        int n = A.size();
        vector<int> ans(n);

        int i = 0;
        for (int x: A) {
            if (x % 2 == 0) {
                ans[i] = x;
                i += 2;
            }
        }
        i = 1;
        for (int x: A) {
            if (x % 2 == 1) {
                ans[i] = x;
                i += 2;
            }
        }
        return ans;
    }
};
```

**复杂度分析**

- 时间复杂度：$O(N)$，其中 N是数组 `A` 的长度。
- 空间复杂度：$O(1)$。注意在这里我们不考虑输出数组的空间占用。

**方法二： 双指针**

**思路与算法**

如果原数组可以修改，则可以使用就地算法求解。

为数组的偶数下标部分和奇数下标部分分别维护指针 $i, j$。随后，在每一步中，如果 $A[i]$为奇数，则不断地向前移动 $j$（每次移动两个单位），直到遇见下一个偶数。此时，可以直接将 $A[i]$ 与 $A[j]$交换。我们不断进行这样的过程，最终能够将所有的整数放在正确的位置上。

**c++代码：**(执行用时44ms，击败72.18%，内存消耗20.4M，击败72.28%）

```c++
class Solution {
public:
    vector<int> sortArrayByParityII(vector<int>& A) {
        int n = A.size();
        int j = 1;
        for (int i = 0; i < n; i += 2) {
            if (A[i] % 2 == 1) {
                while (A[j] % 2 == 1) {
                    j += 2;
                }
                swap(A[i], A[j]);
            }
        }   
        return A;
    }
};
```

**复杂度分析**

- 时间复杂度：$O(N)$，其中 N是数组 `A` 的长度。
- 空间复杂度：$O(1)$。



<center>⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳总 结⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳</center>

###### 总结：

官方题解第一个方法其实两次遍历可以优化成我这样一次遍历，第二种方法双指针也比较好，理解起来也不难，两种方法效率都差不多，可能双指针在原数组上进行修改空间上会好一些。