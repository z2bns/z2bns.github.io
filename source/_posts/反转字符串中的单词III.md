---
title: 反转字符串中的单词III
date: 2020-11-18 11:28:42
mathjax: true
categories:
- ACM
- LeetCode
tags:
- 算法
- 简单
---

**[题目地址](https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/)**

**难度：**⭐

###### **题目描述：**

给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

<!-- more -->

**示例：**

```
输入："Let's take LeetCode contest"
输出："s'teL ekat edoCteeL tsetnoc"
```

**提示：**

- 在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。



<center>🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️解题过程🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️</center>

###### 解题过程：

**思路：**

遍历字符串，根据空格获取每一个单词，然后对单词进行反转结果存到result字符串中，注意最后一个单词的处理。

**c++代码：**(执行用时16ms，击败95.81%，内存消耗13.5M，击败16.30%）

```c++
class Solution {
public:
    string reverseWords(string s) {
        string word="";
        string result="";
        int n=s.length();
        int len;
        for(int i=0;i<n;++i){
            if(s[i]==' ' || i==n-1){
                //单词的长度
                len=word.length();
                //反转每个单词的字符顺序
                for(int j=0;j<len/2;++j){
                    swap(word[j],word[len-j-1]);
                }
                //将反转后的单词和空格存到结果中
                //不是最后一个单词，后面才加空格,最后一个单词的最后一个字母没有拼接到注意处理
                result+=(i==n-1)?(s[i]+word):(word+" ");
                //清空单词变量进行下个单词的反转
                word="";
            }else{
                //拼接单词
                word+=s[i];
            }
        }
        return result;
    }
};
```



<center>💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎官 方 题 解💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎</center>

###### [官方题解](https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/solution/fan-zhuan-zi-fu-chuan-zhong-de-dan-ci-iii-by-lee-2/):

**方法一： 模拟**

我们可以不使用额外的（非常数）空间来完成翻转和反转操作。对于 `A[i][j]​`，我们将它和 `A[i][c - j - 1]​` 进行交换（即翻转），其中 `c` 是数组 `A` 的列数。在交换的同时，我们可以将这两个数进行反转。

**c++代码：**(执行用时12ms，击败99.05%，内存消耗10.9M，击败31.29%）

```c++
class Solution {
public:
    string reverseWords(string s) {
        string ret;
        int length = s.length();
        int i = 0;
        while (i < length) {
            int start = i;
            while (i < length && s[i] != ' ') {
                i++;
            }
            for (int p = start; p < i; p++) {
                ret.push_back(s[start + i - 1 - p]);
            }
            while (i < length && s[i] == ' ') {
                i++;
                ret.push_back(' ');
            }
        }
        return ret;
    }
};
```

**复杂度分析**

- 时间复杂度：$O(N)$，其中 $N$ 为字符串的长度。原字符串中的每个字符都会在 $O(1)$的时间内放入新字符串中。

- 空间复杂度：$O(N)$。我们开辟了与原字符串等大的空间。


**方法二：原地解法**

**思路与算法**

此题也可以直接在原字符串上进行操作，避免额外的空间开销。当找到一个单词的时候，我们交换字符串第一个字符与倒数第一个字符，随后交换第二个字符与倒数第二个字符…… 如此反复，就可以在原空间上翻转单词。

需要注意的是，原地算法在某些语言（比如 Java，JavaScript）中不适用，因为在这些语言中 String 类型是一个不可变的类型。

**c++代码：**(执行用时12ms，击败99.05%，内存消耗9.6M，击败57.14%）

```c++
class Solution {
public: 
    string reverseWords(string s) {
        int length = s.length();
        int i = 0;
        while (i < length) {
            int start = i;
            while (i < length && s[i] != ' ') {
                i++;
            }

            int left = start, right = i - 1;
            while (left < right) {
                swap(s[left], s[right]);
                left++;
                right--;
            }
            while (i < length && s[i] == ' ') {
                i++;
            }
        }
        return s;
    }
};
```

**复杂度分析**

- 时间复杂度：$O(N)$。字符串中的每个字符要么在 $O(1)$ 的时间内被交换到相应的位置，要么因为是空格而保持不动。

- 空间复杂度：$O(1)$。因为不需要开辟额外的数组。




<center>⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳总 结⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳</center>

###### 总结：

题目比较灵活，代码有多种写法，我写的还是有点麻烦，其实可以利用好每个单词的起止位置，也挺好做的。