---
title: IP地址无效化
date: 2020-11-07 15:35:47
mathjax: true
categories:
- ACM
- LeetCode
tags:
- 算法
- 简单
---

[**题目地址**](https://leetcode-cn.com/problems/defanging-an-ip-address/)

**难度：**⭐

###### **题目描述：**

给你一个有效的 IPv4 地址 `address`，返回这个 IP 地址的无效化版本。

所谓无效化 IP 地址，其实就是用 `"[.]"` 代替了每个~。

<!-- more -->

**示例1：**

```
输入：address = "1.1.1.1"
输出："1[.]1[.]1[.]1"
```

**示例2：**

```
输入：address = "255.100.50.0"
输出："255[.]100[.]50[.]0"
```

**提示：**

- 给出的 `address` 是一个有效的 IPv4 地址



<center>🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️解题过程🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️</center>

###### 解题过程：

**思路：**

方法1：获取每个.之前的部分，转换后拼接到result中，在address中删掉转换后的这部分。

方法2：遍历address，对.元素进行替换处理

**c++代码1：**(执行用时4ms，击败19.17%，内存消耗6.4M，击败5.05%）

```c++
class Solution {
public:
    string defangIPaddr(string address) {
        //.的位置
        int n;
        //存储最后结果
        string result="";
        while((n=address.find('.'))!=string::npos){
            //获取.之前的子串并把.替换为[.]加到result中
            result+=address.substr(0,n+1).replace(n,1,"[.]");
            address.erase(0,n+1);
        }
        //加上最后一个.后的值
        result+=address;
        return result;
    }
};
```

**c++代码2：**（执行用时4ms，击败19.17%，内存消耗6.2M，击败5.33%）

```c++
class Solution {
public:
    string defangIPaddr(string address) {
		//遍历address，对.进行替换
        for(int i=0;i<address.length();++i){
            if(address[i]=='.'){
                address.replace(i,1,"[.]");
                i+=2;
            }
        }
        return address;
    }
};
```



<center>🎓🎓🎓🎓🎓🎓🎓🎓🎓🎓🎓🎓🎓🎓🎓知 识 点🎓🎓🎓🎓🎓🎓🎓🎓🎓🎓🎓🎓🎓🎓🎓</center>

###### 知识点：

优先级：算术运算符 > 关系运算符 > 赋值运算

`while((n=address.find('.'))!=string::npos)`，前面n的复制运算要加上括号。



<center>⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳总 结⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳⏳</center>

###### 总结：

只想着用STL 中string的方法了，其实方法二代码比较清晰简洁，做的时候感觉遍历效率不高，其实还行。
