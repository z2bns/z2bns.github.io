---
title: 链表中倒数第k个节点
date: 2020-11-10 21:11:24
mathjax: true
categories:
- ACM
- LeetCode
tags:
- 算法
- 简单
---

**[题目地址](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/submissions/)**

**难度：**⭐

###### **题目描述：**

输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。例如，一个链表有6个节点，从头节点开始，它们的值依次是1、2、3、4、5、6。这个链表的倒数第3个节点是值为4的节点。

<!-- more -->

**示例：**

```
给定一个链表: 1->2->3->4->5, 和 k = 2.

返回链表 4->5.
```



<center>🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️解题过程🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️</center>

###### 解题过程：

**思路：**

遍历链表，把每个结点指针存到vector容器中，返回倒数第k个节点可以直接下标获取。

**c++代码：**(执行用时8ms，击败54.44%，内存消耗10.9M，击败5.06%）

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* getKthFromEnd(ListNode* head, int k) {
        //结点指针容器
        vector<ListNode*> tmp;
        while(head){
            tmp.push_back(head);
            head=head->next;
        }
        return tmp[tmp.size()-k];
    }
};
```



<center>⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳总 结⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳</center>

###### 总结：

没有官方题解，也比较简单，没啥可说的。

