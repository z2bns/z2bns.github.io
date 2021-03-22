---
title: 天池Docker练习场
date: 2021-03-15 09:36:42
mathjax: true
categories:
- 其他
tags:
- 天池
---

[比赛地址](https://tianchi.aliyun.com/competition/entrance/231759/information)

##### 任务描述

参与者可**分阶段**提交容器镜像完成以下3个任务（分数依次占 30/30/40），根据评分系统的分数返回验证任务的完成情况。

1. 输出`Hello world`
2. 计算 `/tcdata/num_list.csv`中一列数字的总和。
3. 在`/tcdata/num_list.csv`文件中寻找最大的10个数，从大到小生成一个List.

<!-- more -->

`num_list.csv`文件中只有一列不为负的整数，其中存在重复值，示例如下：

> 102
> 6
> 11
> 11

生成入口脚本`run.sh`，放置于镜像工作目录。运行后生成结果`result.json`放置于工作目录（与`run.sh`同目录），评分系统将根据`result.json`进行打分。json文件如下所示：

```
{  
    "Q1":"Hello world", 
    "Q2":sum值, 
    "Q3":[top10_list] 
}
```

##### 解题过程

在VMWare 虚拟机中打开Ubuntu，新建一个tianchi_submit_demo目录，在其中编辑如下四个文件

![image-20210315094851351](%E5%A4%A9%E6%B1%A0Docker%E7%BB%83%E4%B9%A0%E5%9C%BA/image-20210315094851351.png)

**hello_world.py**

```python
#!/usr/bin/env python
# coding: utf-8
import pandas as pd
import numpy as np
import json
#data=np.random.randint(1,100,200)
#data=pd.DataFrame(data)
#data.to_csv("./tcdata/num_list.csv",index=False,header=False)
data=pd.read_csv("/tcdata/num_list.csv",header=None)#天池python镜像默认包含此文件，自己测试用如下指令
#data=pd.read_csv("./tcdata/num_list.csv",header=None)

#第一题
result_1="Hello world"
#第二题
result_2=0
for i,num in enumerate(data[0]):
    result_2+=num
#第三题
data.sort_values(by=0,ascending=False,inplace=True)
result_3=data[0][:10]
result_3=list(result_3)

result={"Q1":result_1,
        "Q2":result_2,
        "Q3":result_3
       }
with open('result.json', 'w', encoding='utf-8') as f:
json.dump(result, f)
```

**Dockerfile**

```
# Base Images
## 从天池基础镜像构建
FROM registry.cn-shanghai.aliyuncs.com/tcc-public/python:3

## 把当前文件夹里的文件构建到镜像的根目录下（.后面有空格，不能直接跟/）
ADD . /

## 指定默认工作目录为根目录（需要把run.sh和生成的结果文件都放在该文件夹下，提交后才能运行）
WORKDIR /

## Install Requirements（requirements.txt包含python包的版本）
## 这里使用清华镜像加速安装
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt

## 镜像启动后统一执行 sh run.sh
CMD ["sh", "run.sh"]
```

**run.sh**

```sh
python hello_world.py
```

**requirements.txt**

```
pandas==0.25.1
numpy==1.19.4
```

###### **构建镜像**

参考[手把手教程](https://tianchi.aliyun.com/competition/entrance/231759/tab/226)

![image-20210315095416743](%E5%A4%A9%E6%B1%A0Docker%E7%BB%83%E4%B9%A0%E5%9C%BA/image-20210315095416743.png)

###### **推送到镜像仓库**

![image-20210315095541391](%E5%A4%A9%E6%B1%A0Docker%E7%BB%83%E4%B9%A0%E5%9C%BA/image-20210315095541391.png)

###### **提交验证运行结果**

![image-20210315095708687](%E5%A4%A9%E6%B1%A0Docker%E7%BB%83%E4%B9%A0%E5%9C%BA/image-20210315095708687.png)

**运行成功**

![image-20210315101638481](%E5%A4%A9%E6%B1%A0Docker%E7%BB%83%E4%B9%A0%E5%9C%BA/image-20210315101638481.png)





###### **更多学习资料：**

第一口docker的感觉——基本知识
https://yq.aliyun.com/articles/734130
第二口docker的感觉 —— Dockerfile
https://yq.aliyun.com/articles/735190
容器镜像服务快速入门
https://help.aliyun.com/document_detail/60743.html
Docker学习路线图
https://developer.aliyun.com/article/40494
Docker完全自学手册
https://edu.aliyun.com/course/496
阿里云容器服务使用教程
https://edu.aliyun.com/course/129
云原生技术公开课
https://edu.aliyun.com/roadmap/cloudnative?#all
云原生圈子
https://developer.aliyun.com/group/cloudnative#/?_k=7qpile

