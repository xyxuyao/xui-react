import { Tip } from 'mtui/index';
import config from '../config/config';

/**
 * @desc 封装了系统提示消息, 方便做全局配置或全局修改, 默认使用mtui的message组件
 */
export default {
    error: function(msg, durationTime = config.systemMsgDuration){
        Tip.error(msg, durationTime);
    }
};

