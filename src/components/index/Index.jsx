/**
 * @desc 首页
 * @author xuyao
 */
import './style.scss';
import React, {Component} from 'react';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }
  	render() {
    	return (
    		<div className="index_root">
               <div className="index_main">
               		react 组件库
               </div>
            </div>
    );
  }
}