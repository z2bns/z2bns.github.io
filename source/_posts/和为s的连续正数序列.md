---
title: 和为s的连续正数序列
date: 2020-11-27 13:10:58
mathjax: true
categories:
- ACM
- LeetCode
tags:
- 算法
- 简单
---

**[题目地址](https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/)**

**难度：**⭐

###### **题目描述：**

输入一个正整数 `target` ，输出所有和为 `target` 的连续正整数序列（至少含有两个数）。

序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

<!-- more -->

**示例1：**

```
输入：target = 9
输出：[[2,3,4],[4,5]]
```

**示例2：**

```
输入：target = 15
输出：[[1,2,3,4,5],[4,5,6],[7,8]]
```

**限制：**

- `1 <= target <= 10^5`

 

<center>🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️解题过程🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️</center>

###### 解题过程：

**思路：**

遍历所有可能的首个数字i，首数字范围是$[1，\frac{target}{2}]$,对每个首数字开始的连续正整数序列累加判断能否找到和为target的。如果存在则形成以数字i开始的和为target的连续正整数序列并存到结果集中。

**c++代码：**(执行用时4ms，击败66.56%，内存消耗7M，击败23.15%）

```c++
class Solution {
public:
    vector<vector<int>> findContinuousSequence(int target) {
        vector<vector<int>> result;
        vector<int> tmp;
        //遍历所有可能的首个数字
        for(int i=1;i<=target/2;++i){
            int j=i;
            int sum=0;
            while(sum<target){
                sum+=j;
                j++;
            }
            if(sum==target){
                tmp.clear();
                //形成和为target的连续正整数序列
                for(int k=i;k<j;++k){
                    tmp.emplace_back(k);
                }
                //放入结果集中
                result.emplace_back(tmp);
            }
        }
        return result;
    }
};
```



<center>💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎官 方 题 解💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎</center>

###### [官方题解](https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/solution/mian-shi-ti-57-ii-he-wei-sde-lian-xu-zheng-shu-x-2/):

**方法一：枚举 + 暴力**
枚举每个正整数为起点，判断以它为起点的序列和 $\textit{sum}$ 是否等于 $\textit{target}$即可，由于题目要求序列长度至少大于 $2$，所以枚举的上界为 $\lfloor\frac{\textit{target}}{2}\rfloor$。

**c++代码：**(执行用时8ms，击败27.15%，内存消耗6.9M，击败35.41%）

```c++
class Solution {
public:
    vector<vector<int>> findContinuousSequence(int target) {
        vector<vector<int>> vec;
        vector<int> res;
        int sum = 0, limit = (target - 1) / 2; // (target - 1) / 2 等效于 target / 2 下取整
        for (int i = 1; i <= limit; ++i) {
            for (int j = i;; ++j) {
                sum += j;
                if (sum > target) {
                    sum = 0;
                    break;
                } else if (sum == target) {
                    res.clear();
                    for (int k = i; k <= j; ++k) {
                        res.emplace_back(k);
                    }
                    vec.emplace_back(res);
                    sum = 0;
                    break;
                }
            }
        }
        return vec;
    }
};
```



**复杂度分析**

- 时间复杂度：外层需要枚举 $\lfloor\frac{\textit{target}}{2}\rfloor$次，内层判断最多不会超过 $O(\sqrt{\textit{target}})$ 的时间复杂度，因为我们考虑从 $1$ 开始累加到 $\sqrt{\textit{target}}$ ，由求和公式可以得


$$
\frac{(1+\sqrt{\textit{target}})*(\sqrt{\textit{target}})}{2}=\textit{target}+\frac{\sqrt{\textit{target}}}{2}> \textit{target}
$$

​       而如果累加到 $\sqrt{\textit{target}}-1$ ，由求和公式可以得

$$
\frac{(1+\sqrt{\textit{target}}-1)*(\sqrt{\textit{target}}-1)}{2}=\textit{target}-\frac{\sqrt{\textit{target}}}{2}< \textit{target}
$$


​       所以最多累加到 $\sqrt{\textit{target}}$ ，而以后从 $2,3,\cdots$ 开始的数累加的长度必然也不会超过 $O(\sqrt{\textit{target}})$的       时间复杂度。最后总时间复杂度为内外层循环复杂度相      	   乘，即 $O(\textit{target}\sqrt{\textit{target}})$

- 空间复杂度：$O(1)$ ，除了答案数组只需要常数的空间存放若干变量。



**方法二：枚举 + 数学优化**
方法一在枚举每个正整数为起点判断的时候是暴力从起点开始累加 $\textit{sum}$ 和判断是否等于 $\textit{target}$。但注意到，如果我们知道起点 $x$ 和终点 $y$ ，那么 $x$ 累加到 $y$ 的和由求和公式可以知道是 $\frac{(x+y)*(y-x+1)}{2}$  ，那么问题就转化为了是否存在一个正整数 $y(y>x)$ ，满足等式
$$
\frac{(x+y)*(y-x+1)}{2}=\textit{target}
$$
转化一下变成

$$
y^2+y-x^2+x-2*\textit{target}=0
$$
这是一个关于 $y$ 的一元二次方程，其中 $a=1,b=1,c=-x^2+x-2*\textit{target}$直接套用求根公式即可 $O(1)$解得 $y$ ，判断是否整数解需要满足两个条件：

- 判别式 $b^2-4ac$ 开根需要为整数
- 最后的求根公式的分子需要为偶数，因为分母为 $2$
  

**c++代码：**(执行用时4ms，击败66.56%，内存消耗7M，击败23.15%）

```c++
class Solution {
public:
    vector<vector<int>> findContinuousSequence(int target) {
        vector<vector<int>> vec;
        vector<int> res;
        int sum = 0, limit = (target - 1) / 2; // (target - 1) / 2 等效于 target / 2 下取整
        for (int x = 1; x <= limit; ++x) {
            long long delta = 1 - 4 * (x - 1ll * x * x - 2 * target);
            if (delta < 0) {
                continue;
            }
            int delta_sqrt = (int)sqrt(delta + 0.5);
            if (1ll * delta_sqrt * delta_sqrt == delta && (delta_sqrt - 1) % 2 == 0) {
                int y = (-1 + delta_sqrt) / 2; // 另一个解(-1-delta_sqrt)/2必然小于0，不用考虑
                if (x < y) {
                    res.clear();
                    for (int i = x; i <= y; ++i) {
                        res.emplace_back(i);
                    }
                    vec.emplace_back(res);
                }
            }
        }
        return vec;
    }
};
```

**复杂度分析**

- 时间复杂度：由于枚举以后只需要 $O(1)$ 的时间判断，所以时间复杂度为枚举起点的复杂度$O(\textit{target})$ 。

- 空间复杂度：$O(1)$ ，除了答案数组只需要常数的空间存放若干变量。




**方法三：双指针**
我们用两个指针 $l$ 和 $r$ 表示当前枚举到的以 $l$为起点到 $r$ 的区间，$\textit{sum}$ 表示 $[l,r]$ 的区间和，由求和公式可 $O(1)$求得为 $\textit{sum}=\frac{(l+r)*(r-l+1)}{2}$，起始 $l=1,r=2$。

一共有三种情况：

- 如果 $\textit{sum}<\textit{target}$ 则说明指针 $r$ 还可以向右拓展使得 $sum$ 增大，此时指针 $r$ 向右移动，即 `r+=1`
- 如果 $sum>target$则说明以 $l$ 为起点不存在一个 $r$使得 $sum=target$ ，此时要枚举下一个起点，指针 $l$ 向右移动，即`l+=1`
- 如果 $\textit{sum}==\textit{target}$ 则说明我们找到了以 $l$为起点得合法解 $[l,r]$ ，我们需要将 $[l,r]$ 的序列放进答案数组，且我们知道以 ll 为起点的合法解最多只有一个，所以需要枚举下一个起点，指针 $l$ 向右移动，即 `l+=1`

终止条件即为 $l>=r$的时候，这种情况的发生指针 $r$ 移动到了$\lfloor\frac{\textit{target}}{2}\rfloor+1$的位置，导致 $l<r$ 的时候区间和始终大于 $target$ 。

此方法其实是对方法一的优化，因为方法一是没有考虑区间与区间的信息可以复用，只是单纯的枚举起点，然后从起点开始累加，而该方法就是考虑到了如果已知 $[l,r]$ 的区间和等于 $\textit{target}$ ，那么枚举下一个起点的时候，区间 $[l+1,r]$ 的和必然小于 $\textit{target}$，我们就不需要再从 $l+1$再开始重复枚举，而是从 $r+1$开始枚举，充分的利用了已知的信息来优化时间复杂度。

**c++代码：**(执行用时0ms，击败100.00%，内存消耗7M，击败16.98%）

```c++
class Solution {
public:
    vector<vector<int>> findContinuousSequence(int target) {
        vector<vector<int>>vec;
        vector<int> res;
        for (int l = 1, r = 2; l < r;){
            int sum = (l + r) * (r - l + 1) / 2;
            if (sum == target) {
                res.clear();
                for (int i = l; i <= r; ++i) {
                    res.emplace_back(i);
                }
                vec.emplace_back(res);
                l++;
            } else if (sum < target) {
                r++;
            } else {
                l++;
            }
        }
        return vec;
    }
};
```

**复杂度分析**

- 时间复杂度：由于两个指针移动均单调不减，且最多移动 $\lfloor\frac{\textit{target}}{2}\rfloor$次，即方法一提到的枚举的上界，所以时间复杂度为 $O(\textit{target})$。

- 空间复杂度：$O(1)$ ，除了答案数组只需要常数的空间存放若干变量。




<center>⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳总 结⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳</center>

###### 总结：

官方题解提供了多种解法，我用的是方法一枚举加暴力解法，方法三用双指针表示区间这个方法比较巧妙，值得学习。