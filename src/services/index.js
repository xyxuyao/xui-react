/**
 * @desc 所有后台数据请求都应封装在/services目录中, 目录结构和方法名称应和RAP文档层层对应. 
 * 如RAP文档(http://apidocs.bbdservice.net/workspace/myWorkspace.do?projectId=9#408): 
 *   用户中心
 *      |-联系人
 *          |-增加联系人
 *          |-删除联系人
 *          |-编辑联系人
 *          |-获取联系人
 * 对应/src/services中目录结构为:
 *   /userCenter/                       // 目录
 *      |-contact.js                    // 文件
 *          |>function addContact       // 方法
 *          |>function deleteContact    // 方法
 *          |>function updateContact    // 方法
 *          |>function contactList      // 方法
 */

import { HttpMethod } from '../constants/common';
import HiggsPromise, {higgsUrl} from '../utils/higgsPromise';

/**
 * @desc 房地产中介机构分布情况 地图数据获取
 */
export function getOrgDistribution (data) {
    return HiggsPromise({
        url: '/getmap.do',
        data: data
    });
}

/**
 * @desc 获取本地地图数据
 */
export function getGeoJson (data) {

    let name = encodeURI(data.name);
    return HiggsPromise({
        localData: true,
        url: `/static/data/map/${name}.json`,
        data: {}
    });
}

/**
 * @desc 获取左侧分支机构数据
 */
export function getBranchInfo (data) {
    return HiggsPromise({
        url: '/getrank.do',
        data: data
    });

}

/**
 * @desc 获取房地产中介规模统计分析数据
 */
export function scaleStatistics (data) {
    return HiggsPromise({
        url: '/intermediaryScale.do',
        data: data
    });
}
/**
 * @desc 获取房地产中介机构数量清单
 */
export function findSchedule(data) {
    return HiggsPromise({
        url: '/findSchedule.do',
        type: HttpMethod.POST,
        data: data
    });
}
/**
 * @desc 获取数量变化
 */
export function getNumber (data){
    return HiggsPromise({
        url: '/getchage.do',
        data: data
    });
}

/**
 * @desc 获取注册变化
 */
export function getRegister (data){
    return HiggsPromise({
        url: '/register.do',
        data: data
    });
}
/**
 * @desc 获取失信变化
 */
export function getBreck (data){
    return HiggsPromise({
        url: '/getlow.do',
        data: data
    });
}
/**
 * @desc 首页下载列表接口
 */
export function download(data) {
    location.href = higgsUrl('/download.do', data);
}
/**
 * @desc 首页省市场二级联动接口
 */

export function getprovince(data) {
    return HiggsPromise({
        url: '/getrerion.do',
        data: data
    });
}
