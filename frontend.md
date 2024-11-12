### 一些前端常用指令笔记

#### npm常用指令
```bash
#设置npm代理服务器http
npm config set proxy http://<username>:<password>@<proxy-server-url>:<port>

#设置npm代理服务器https
npm config set https-proxy http://<username>:<password>@<proxy-server-url>:<port>

#查看当前npm设置
npm config list

#npm 默认官方仓库地址
https://registry.npmjs.org

#临时设置npm 镜像仓库
npm --registry http://registry.npmmirror.com

#永久设置镜像仓库
npm config set registry http://registry.npmmirror.com

#Node官网
https://nodejs.org/zh-cn

#创建一个新的node项目
npm init -y 

#node模块如果是目录结构的模块，默认目录结构中需要有一个index.js，如果不想用index.js作为模块入口文件，需在pakcage.json中的main:键值对设置文件名

#javaScript中的模块
# TODO

#javaScript中字符串类型的方法
# TODO join()方法 splite()方法
```