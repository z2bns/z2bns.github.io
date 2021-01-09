---
title: 最长特殊序列I
date: 2020-11-26 13:08:53
mathjax: true
categories:
- ACM
- LeetCode
tags:
- 算法
- 简单
---

**[题目地址](https://leetcode-cn.com/problems/longest-uncommon-subsequence-i/)**

**难度：**⭐

###### **题目描述：**

给你两个字符串，请你从这两个字符串中找出最长的特殊序列。

「最长特殊序列」定义如下：该序列为某字符串独有的最长子序列（即不能是其他字符串的子序列）。

**子序列** 可以通过删去字符串中的某些字符实现，但不能改变剩余字符的相对顺序。空序列为所有字符串的子序列，任何字符串为其自身的子序列。

输入为两个字符串，输出最长特殊序列的长度。如果不存在，则返回 -1。

<!-- more -->

**示例1：**

```
输入: "aba", "cdc"
输出: 3
解释: 最长特殊序列可为 "aba" (或 "cdc")，两者均为自身的子序列且不是对方的子序列。
```

**示例2：**

```
输入：a = "aaa", b = "bbb"
输出：3
```

**示例3：**

```
输入：a = "aaa", b = "aaa"
输出：-1
```

**提示：**

1. 两个字符串长度均处于区间 `[1 - 100]` 。
2. 字符串中的字符仅含有 `'a'~'z'` 。



<center>🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️解题过程🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️</center>

###### 解题过程：

**思路：**

求两个最长特殊序列的长度，乍一看好像有点难。其实仔细分析一下也挺简单的：

两个字符串长度分别为la,lb

- 若la\==lb,再判断字符串a是否等于b，若a\==b不存在特殊序列返回-1；若a!=b则两个字符串自身就是特殊序列，返回la。
- 若la!=lb，则长度最大的那个字符串本身就是特殊序列且长度最长，返回max(la,lb)。

**c++代码：**(执行用时0ms，击败100.00%，内存消耗6.4M，击败17.49%）

```c++
class Solution {
public:
    int findLUSlength(string a, string b) {
        int la=a.length(),lb=b.length();
        if(la==lb){
            return a==b?-1:la;
        }else{
            return la>lb?la:lb;
        }
    }
};
```



<center>💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎官 方 题 解💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎</center>

###### [官方题解](https://leetcode-cn.com/problems/longest-uncommon-subsequence-i/solution/zui-chang-te-shu-xu-lie-i-by-leetcode/):

**方法一：暴力解法 【超出时间限制】**
暴力解法中，生成两个字符串所有的子序列共 $2^n$ 个，将其存储在 hashmap 中，并记录每个子序列出现的次数。然后找出出现次数为 $1$ 的最长子序列。如果不存在这样的子序列，返回 $-1$

**Java代码：**

```java
public class Solution {
    public int findLUSlength(String a, String b) {
        HashMap < String, Integer > map = new HashMap < > ();
        for (String s: new String[] {a, b}) {
            for (int i = 0; i < (1 << s.length()); i++) {
                String t = "";
                for (int j = 0; j < s.length(); j++) {
                    if (((i >> j) & 1) != 0)
                        t += s.charAt(j);
                }
                if (map.containsKey(t))
                    map.put(t, map.get(t) + 1);
                else
                    map.put(t, 1);
            }
        }
        int res = -1;
        for (String s: map.keySet()) {
            if (map.get(s) == 1)
                res = Math.max(res, s.length());
        }
        return res;
    }
}
```

**复杂度分析**

- 时间复杂度：$O(2^x+2^y)$，其中 x和 y 是字符串 a 和 b 的长度，子序列的数量为 $2^x+2^y$ 。

- 空间复杂度：$O(2^x+2^y)$，共生成 $2^x+2^y$个子序列。



**方法二：简单解法 【通过】**

**算法**

字符串 $a$ 和 $b$ 共有 3 种情况：

- $a=b$。如果两个字符串相同，则没有特殊子序列，返回 -1。

- $length(a)=length(b)$且 $a \ne b$。例如：$abc$ 和 $abd$。这种情况下，一个字符串一定不会是另外一个字符串的子序列，因此可以将任意一个字符串看作是特殊子序列，返回 $length(a)$ 或 $length(b)$。

- $length(a) \ne length(b)$。例如：$abcd$ 和 $abc$。这种情况下，长的字符串一定不会是短字符串的子序列，因此可以将长字符串看作是特殊子序列，返回 $max(length(a),length(b))$。

**Java代码：**

```java
public class Solution {
    public int findLUSlength(String a, String b) {
        if (a.equals(b))
            return -1;
        return Math.max(a.length(), b.length());
    }
}
```

**复杂度分析**

- 时间复杂度：$O(min(x,y))$，其中 $x$ 和 $y$ 是字符串 a 和 b 的长度。方法 equals 的时间复杂度为 min(x,y)。

- 空间复杂度：O(1)，无需额外空间。




<center>⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳总 结⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳</center>

###### 总结：

官方题解方法二和我的思路一样，方法一暴力求解没戏。题目也比较简单，只是注意要考虑好所有的情况。