# theSameSong
多人在线听歌
可以随时切歌
跟朋友分享歌曲的正确姿势

歌源来自 QQ 音乐


### 目录
```
├─bin
│    www       // 后端 服务器
│    database  // 后端 数据库
│    socket    // 后端 socket
|    router    // 后端 路由
├─sessions     // 后端 session
├─crawl        // 爬虫
├─build        // 前端 线上目录
├─public       
├─static       // 旧版前端代码
├─routes       // 前端 路由
├─view         // 前端 页面
├─app.js       // 前端 服务器
├─package.json
```

### run

```
git clone https://github.com/lizimeow/theSameSong.git // 克隆项目
cd theSameSong //打开目录
npm i // 安装依赖
npm run build // 编译前端代码
npm run mongod // 开启数据库
npm run start // 开始运行
```

### 功能

- [] 多个房间
- [] 高并发处理
- [√] 在线计数
- [] 样式修改
- [] 获取更多的的数据并分页
测试
