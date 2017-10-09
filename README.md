## React 通用项目开发框架

### 开发环境
node: v6.9.5
webpack: v2.2.1
eslint: v3.17.1
react: v15.4.2
react-router: v3.0.2
mtui: 2.4.5

### 目录结构
```
bin                             // 可执行命令目录
|-build.bat                     // 将src目录中的源码通过 webpack.config.dev.babel.js 编译到build目录
|-eslint.bat                    // 执行eslint生产环境代码校验
|-package.bat                   // 将src目录中的源码通过 webpack.config.prod.babel.js 编译到build目录
|-production.bat                // 将代码发布到生产环境, 供运维同事发布上线.
|-release-all.bat               // 将代码发布到开发和测试服务器
|-release-dev.bat               // 将代码发布到开发服务器
|-release-test.bat              // 将代码发布到测试服务器
|-server.bat                    // 启动开发服务器
|-server-mock.bat               // 启动mock服务器
build                           // 代码编译后生成的临时目录
dist                            // 代码打包后生成的临时目录
doc                             // 项目文档目录
mockServer                     // mock数据服务器
test                            // 测试代码目录
soft                            // 开发工具
src                             // 项目源码目录
|-components                    // 功能组件目录
    |-component1
        |-Component1.jsx        // 组件文件, 采用JSX + ES6风格编码, 驼峰标识, 首字母大写
        |-component1.scss       // 组件对应样式文件, 驼峰标识, 首字母小写
    ...
|-config                        // 项目配置文件
    |-config.js                 // 项目通用配置文件
|-constants                     // 常量目录
    |-common.js                 // 存放一些通用常量
    |-information.js            // 存放页面提示信息, 包括错误信息提示
    |-keyword.js                // 存放状态或类型相关的键值对常量, 如后台返回的type为1, status为2等
|-css                           // 通用样式目录
    |-main.css                  // 全局css文件
|-data                          // 静态数据目录
|-images                        // 公共图片存放目录
|-layouts                       // 布局组件存放目录, 如Header, Footer, Frame
|-routes                        // 路由配置文件
|-services                      // 后台接口服务目录, 所有服务端数据请求都封装在这里, 统一从这里请求后台接口, 方便数据封装, 接口重用.
    |-demo                      // 接口目录, 需对应RAP文档的模块名, 如诚信网 > 个人中心模块.
        |-demo.js               // 接口文件, 需对应RAP文档模块下的页面名, 如诚信网 > 个人中心模块 > 认证页面.
|-utils                         // 常用工具
    |-emitter.js                // 全局事件处理器.
    |-formatter.js              // 一些数据格式转换工具, 如日期格式转换.
    |-higgsPromise.js           // 封装了后台数据请求, 统一从此接口调用后台数据, 返回一个Promise. 该对象应在services目录的文件中使用(具体参考demo.js), 不应直接在页面上调用.
    |-hook.js                   // React router的钩子函数, 用于onEnter, onLeave
    |-messager.js               // 封装了系统提示信息, 页面所有系统提示的消息统一使用该对象.
    |-storage.js                // 封装了 localStorage 和 sessionStorage
    |-util.js                   // 一些常用方法
    |-validator.js              // 存放一些通用验证方法
|-index.jsx                     // 入口jsx文件
|-index.html                    // 应用入口页面
.babelrc                        // babel配置文件
.eslintignore                   // eslint忽略校验配置文件.
.eslintrc.json                  // eslint开发环境代码校验配置文件. 
.eslintrc.prod.json             // eslint生产环境代码校验配置文件, 比开发环境更加严格, 发版和提交代码时会自动执行此配置校验代码.
.gitignore                      // git忽略提交配置文件
node_modules.zip                // node插件包
package.json                    // npm配置文件, webpack-dev-server服务器IP和端口可以在config参数中配置.
README.md                       // 项目开发文档
webpack.config.base.js          // webpack开发, 生产环境公用部分
webpack.config.dev.babel.js     // webpack开发环境配置文件
webpack.config.prod.babel.js    // webpack生产环境配置文件
```

### 环境配置
1. 为了统一开发环境, 卸载现有node环境, 统一安装/soft/node-v6.9.5-x64.msi, 如是32位系统需自行下载相同版本.
2. 安装全局依赖包:
```
npm uninstall -g webpack webpack-dev-server eslint babel-core
npm i -g webpack@2.3.2 webpack-dev-server@2.3.0 eslint@3.17.1 babel-core@6.22.1
```
3. 安装项目依赖包:
```
1.直接解压 node_modules.zip
2.执行 npm i      // 如果执行此步骤报错, 再执行 cnpm i 即可.
```
注意: 不要直接用 cnpm install 安装所有模块, 启动服务时可能有些模块会找不到.

### 本地调试
1. 本地开发服务器配置
    运行 /bin/server.bat
    浏览器访问 localhost:8080 即可, 可在package.json文件config属性中配置启动服务器的IP和端口.

2. 本地mock接口服务器配置(如需调试本地接口)
    在/mockServer中配置mock数据, 文件中的初始内容为示例数据, 可清除掉.
    在/src/config/config.js中 修改mockDataFirst为true
    运行 /bin/server-mock.bat

### 代码提交
1.提交代码时会自动执行eslint严格校验(eslintrc.prod.json), 如果出现错误, git会提交失败. 
2.如果提交代码时未执行eslint校验, 可能是因为在window下pre-commit npm，由于权限问题，导致无法在hooks文件下生成文件。
  解决方法是以管理员打开cmd，执行node ./node_modules/pre-commit/install.js就可以了。

### 发布流程
1. 开发服务器单独发版:
    运行 /bin/release-dev.bat   // 脚本会将源码编译到build目录, 然后将build目录中编译好的文件打包到/dist目录, 生成对应文件夹, 发送到dev服务器.
2. 测试服务器单独发版:
    运行 /bin/release-test.bat  // 脚本会将源码编译到build目录, 然后将build目录中编译好的文件打包到/dist目录, 生成对应文件夹, 再压缩成zip文件发送到test服务器(比发布到dev脚本多一步文件压缩).
3. 开发和测试服务器同时发版:
    运行 /bin/release-all.bat   // 脚本会将代码同时发布到dev和test服务器.    
4. 线上发版:
    运行 /bin/production.bat    // 执行完后告诉运维的同事, 如: 代码已经发布到10.10.20.111服务器/home/zhaoyuan/release目录中了.