/**
 * @desc 项目配置文件
 */
export default {
    timeout: 10000,                         // API接口请求超时时间, 默认10秒
    systemMsgDuration: 3,                   // 系统提示信息显示时间, 默认3秒
    apiServer: 'http://10.10.20.204',      // API接口服务器地址, 默认配置的mock服务器, 调试时需要启动mock服务器
    apiDevServerName: 'rock-web',     // 针对服务器端名字变动设置的配置 开发环境请求配置
    apiProdServerName: 'rock-web',     // 针对服务器端名字变动设置的配置  上线环境请求配置
    mockServer: 'http://localhost:8000',  // mock数据服务器地址
    mockDataFirst: true
};