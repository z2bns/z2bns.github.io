---
title: linux下使用selenium模块
date: 2020-11-03 21:54:59
categories:
- Linux
tags:
- 环境配置
- Red Hat
---

###### 前言：

因为要在linux服务器上使用selenium模块实现“自动信息上报”的需求，在把python代码部署到linux服务器上的时候出现了一些环境配置上的问题，在一台服务器上摸索了好久也没成功问题一个接一个，难受😫，然后我就又重新缕清头绪在另一台服务器上重新部署了一下，成功了以后仅此记录一下，其他linux系统以后再摸索摸索吧😛

<!-- more -->

**查看linux版本**

我的系统是Red Hat 4.8.5。

命令：`cat /proc/version`

![image-20201103220335294](linux%E4%B8%8B%E4%BD%BF%E7%94%A8selenium%E6%A8%A1%E5%9D%97/image-20201103220335294.png)

**安装selenium模块**（前提是已经装好了python3环境）

命令：`pip3 install selenium`

**安装chrome**

命令：`yum install https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm`

这个命令是下载安装最新的稳定的chrome版本，不是固定的版本，所以要注意下载chromedriver时要对应版本

我是在本地win10系统又下了一遍，解压可以看到chrome版本是86

![image-20201103221418515](linux%E4%B8%8B%E4%BD%BF%E7%94%A8selenium%E6%A8%A1%E5%9D%97/image-20201103221418515.png)

注：如果运行程序出错：Cannot find Chrome binary，就是没有安装chrome

**安装依赖库**

命令：`yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y`

注：如果没有安装依赖库会报错：error while loading shared libraries: libX11.so.6:

**安装chromedriver**（驱动程序）

下载链接如下：[点我下载](http://chromedriver.storage.googleapis.com/index.html)，一定要找到与上面chrome版本相应的版本，这里下载和上面对应的86版本

![image-20201103221931864](linux%E4%B8%8B%E4%BD%BF%E7%94%A8selenium%E6%A8%A1%E5%9D%97/image-20201103221931864.png)

可以windows下载后然后传到服务器上，也可以直接使用wget命令下载

命令：`wget  http://chromedriver.storage.googleapis.com/index.html?path=86.0.4240.22/`

然后给chromedriver 文件赋予可执行权限

命令：`chmod +x chromedriver` 

然后放到环境变量PATH路径中

命令：`cp chromedriver /usr/bin/`

可以查看chromedriver的版本号

命令：`chromedriver --version`![image-20201103222408841](linux%E4%B8%8B%E4%BD%BF%E7%94%A8selenium%E6%A8%A1%E5%9D%97/image-20201103222408841.png)

**selenium代码测试**

在服务器上新建一个python文件，写入以下代码

```python
#!/usr/bin/python3
#coding:utf-8
from selenium import webdriver
ch_options = webdriver.ChromeOptions()
#为Chrome配置无头模式
ch_options.add_argument("--headless")  
ch_options.add_argument('--no-sandbox')
ch_options.add_argument('--disable-gpu')
ch_options.add_argument('--disable-dev-shm-usage')
# 在启动浏览器时加入配置
dr = webdriver.Chrome(options=ch_options)
#这是测试网站
url = "https://www.baidu.com"
dr.get(url)
#打印源码
print(dr.page_source)
```

然后python执行这个py文件，结果打印出了源码，即selenium模块环境配置成功。

