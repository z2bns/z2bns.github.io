---
title: 返回倒数第k个节点
date: 2020-11-10 21:18:10
mathjax: true
categories:
- ACM
- LeetCode
tags:
- 算法
- 简单
---

**[题目地址](https://leetcode-cn.com/problems/kth-node-from-end-of-list-lcci/submissions/)**

**难度：**⭐

###### **题目描述：**

实现一种算法，找出单向链表中倒数第 k 个节点。返回该节点的值。

**注意：**本题相对原题稍作改动

<!-- more -->

**示例：**

```
输入： 1->2->3->4->5 和 k = 2
输出： 4
```

**说明：**

给定的$k$保证是有效的。



<center>🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️解题过程🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️</center>

###### 解题过程：

**思路：**

和上道题[链表中倒数第k个节点](https://z2bns.github.io/2020/11/10/%E9%93%BE%E8%A1%A8%E4%B8%AD%E5%80%92%E6%95%B0%E7%AC%ACk%E4%B8%AA%E8%8A%82%E7%82%B9/)基本一样，只是把返回的节点改成节点的值而已。

遍历链表，把每个结点指针存到vector容器中，返回倒数第k个节点的值可以直接下标获取。

**c++代码：**(执行用时4ms，击败73.35%，内存消耗10.6M，击败5.61%）

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
    int kthToLast(ListNode* head, int k) {
        //结点指针容器
        vector<ListNode*> tmp;
        while(head){
            tmp.push_back(head);
            head=head->next;
        }
        return tmp[tmp.size()-k]->val;
    }
};
```



<center>⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳总 结⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳</center>

###### 总结：

没有官方题解，轻松加愉快🥱

