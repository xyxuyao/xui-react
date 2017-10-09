import { CURRENT_USER, SSO_SESSION_ID } from '../constants/common';
import { getSession } from '../utils/storage';
import { isEmpty, getCookie } from '../utils/util';

/**
 * @desc 用于在Root中添加一些钩子函数: onEnter, onLeave.
 **/
// 登陆校验, 通过cookie判断用户是否登陆, 此处根据实际业务逻辑调整
export function checkLogin(nextState, replace, next) {
    var user = getCookie(SSO_SESSION_ID);

    if(isEmpty(user)) {
        location.href = `/#/login?callback=/#${nextState.location.pathname}`;
    }else{
        next();
    }
}

// 离开页面时校验
export function leaveConfirm(nextLocation) {
    // TODO: 动态传入字符串
    var message = '确认要离开吗？';
    if (!this.state.isSaved){
        return message;
    }
    // 返回 false 会继续停留当前页面，
}
