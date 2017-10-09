// storage保存用户信息的key
export const CURRENT_USER = 'CURRENT_USER';
// cookie
export const SSO_SESSION_ID = 'SSO-SESSION-ID';
// 日期格式
export const DATE_FORMAT = 'YYYY-MM-DD';
// 时间格式
export const TIME_FORMAT = 'HH:mm';
// 日期+时间格式
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
// http协议method
export const HttpMethod = {
    GET: 'get',
    POST: 'post'
};
export const Event = {
    SHOW_LOADING: 'SHOW_LOADING',
    HIDE_LOADING: 'HIDE_LOADING'
};
/**
 * 类型或状态封装示例.
 * 后端返回类型或状态字段时一般为, 数字或字符串, 如: 0, 1 或 'BUSY', 'FREE'
 * 前端应封装为对象使用(如: ReportType.USER), 这样代码清晰, 便于维护.
 */
export const ReportType = { // 对象大写开头, 驼峰标识
    USER: 1, // 属性全大写 + 下划线
    COMPANY: 2
};
export const UserLevel = {
    NORMAL: 0,
    VIP: 1,
    VIP_TRIAL: 2
};
