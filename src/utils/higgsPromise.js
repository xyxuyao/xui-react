import qs from 'qs';
import axios from 'axios';
import emitter from './emitter';
import config from '../config/config';
import info from '../constants/information';
import { HttpMethod, Event } from '../constants/common';
import msger from './messager';
import { isString, isArray, isBlank, isEmpty, isNotEmpty, isNotBlank } from './util';
import {hashHistory} from 'react-router';

/**
 * @desc 使用axios第三方库访问后台服务器, 返回封装过后的Promise对象.
 * @param {string} url 请求的接口地址, 格式: "/xxx..."
 * @param {string} domain 跨域请求的域名地址, 如: http://www.baidu.com
 * @param {string} type HTTP请求方式, 默认GET.
 * @param {object} data 请求的数据, object对象格式
 * @param {function} onUpload 上传文件过程中的回调函数, 接收progressEvent参数.
 * @param {function} onDownload 下载文件过程中的回调函数, 接收progressEvent参数.
 * @param {function} cancel 取消请求的回调函数, 接收cancel参数, 当执行cancel()参数时请求被取消.
 * @param {number} timeout 配置请求超时时间, 为毫秒数, 默认从配置文件读取.
 * @param {boolean} loading 是否开启loading动画, 默认 type 为 POST 的请求显示.
 * @param {boolean} cache 是否开启缓存, 开启后同样的请求(url相同, 参数相同), 第二次请求时会直接返回缓存数据, 不会请求后台数据, 默认false.
 * @param {boolean} handleError 是否自动处理接口报错情况, 默认true.
 * @param {object} messager 配置一个系统提示消息处理器, 封装了系统提示的展示方式, 对象需要有showError(msg)方法, 默认为messager.
 * @return {object} - 返回一个promise的实例对象
 */
export default function HiggsPromise({localData = false,
                                      url = null,
                                      domain = null,
                                      type = HttpMethod.GET,
                                      data = null,
                                      onUpload = null,
                                      onDownload = null,
                                      cancel = null,
                                      timeout = config.timeout,
                                      loading = null,
                                      cache = false,
                                      handleError = true,
                                      messager = msger }) {
    var getData;
    var postData;
    var cancelToken;

    if (isEmpty(url)) {
        return Promise.resolve();
    }

    // type 为 POST 的请求会将参数转化为 formData 传递
    if (type === HttpMethod.POST) {
        if (isNotEmpty(data)) {
            // postData = data;
            postData = qs.stringify(data, {allowDots: true});
        }
    } else {
        getData = data;
    }
   
    if (__DEV__) {
        if(!localData && isNotEmpty(url)){
            url = config.apiDevServerName + url;
        }
    }

    if(!__DEV__){
        if(!localData && isNotEmpty(url)){
            url = config.apiProdServerName + url;
        }
    }

    if(!cache) {
        url += '?t=' + new Date().getTime();
    }
   
    showLoading(type, loading);

    var promise = new Promise(function (resolve, reject) {
//         header('Access-Control-Allow-Origin:*');  
// // 响应类型  
//         header('Access-Control-Allow-Methods:POST');  
// // 响应头设置  
//         header('Access-Control-Allow-Headers:x-requested-with,content-type');  
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        var httpRequest = axios({
            method: type,
            baseURL: domain,
            url: url,
            timeout: timeout,
            params: getData,
            data: postData,
            withCredentials: crossDomain,
            onUploadProgress: onUpload,
            onDownloadProgress: onDownload,
            cancelToken: cancelToken
        }).then(function (response) {
            hideLoading(response.config, loading);
           
            // var responseData = response.data;

            /**
             * 请求成功, 只会返回data中的数据
             */
            if(localData && response.status === 200){
                resolve(response.data);
            }else if(response.data.code === '200'){
                resolve(response.data.data);
            }else if(response.data.code === '-1'){
                hashHistory.push('/login');
            }else{
                reject(response.data);
                if(handleError){
                    var errorMsg = processError(response.data);
                    if(isNotBlank(errorMsg)){
                        messager.error(errorMsg);
                    }
                }
            }
        }).catch(function (error) {
            hideLoading(error.config, loading);
            // 服务端返回的异常
            if (error.response) {
                if(handleError){
                    messager.error(info['SYSTEM_ERROR']);
                }
                console.error(error.response);
                reject(error.response);
            // 浏览器抛出的异常, 不同浏览器可能有不同的行为
            } else {
                if(handleError){
                    setTimeout(() => {
                        messager.error(info['BROWSER_ERROR']);
                    }, 1000);
                }
                console.error(error);
                reject(error);  
            }
        });
    });

    return promise;
}

function showLoading(method, isShow) {
    if (isShow || (isShow === null && method === HttpMethod.POST)) {
        emitter.emit(Event.SHOW_LOADING);
    }
}

function hideLoading(config, isShow) {
    if (isShow || (isShow === null && config.method === HttpMethod.POST)) {
        emitter.emit(Event.HIDE_LOADING);
    }
}
/**
 * 处理异常返回, 根据后端同事返回的code进行相应的处理(code含义需与后端同事约定好, 此处只是浩格后台返回示例, 具体按项目实际情况调整代码).
 */ 
function processError(response) {
    var errorMessage;
    switch (response.code) {
        case 'SESSION_EMPTY':
        case 314:   // 登录信息有误
        case 407:   // 没有登陆
            location.href = `/#/login?callback=${location.href}`;
            break;
        case 500:   // 系统异常
            errorMessage = info[500];
            break;
        case 401:   // 没有权限访问
            // TODO: 预留处理, 走默认处理
        default:    // 未知错误
            errorMessage = response.msg;
    }
    return errorMessage;
}

function log(data, title) {
    /* eslint-disable no-console */
    if (title) {
        console.log(title + ' start');
    }
    console.log(data);
    if (console.table && isArray(data.data)) {
        console.table(data.data);
    }
    if (title) {
        console.log(title + ' end');
    }
    /* eslint-enable no-console */
}

Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected)
        .catch(function (reason) {
            // 抛出一个全局错误
            setTimeout(() => {
                throw reason;
            }, 0);
        });
};

Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback(value)).then(() => value),
        reason => P.resolve(callback(reason)).then(() => {
            throw reason;
        })
    );
};