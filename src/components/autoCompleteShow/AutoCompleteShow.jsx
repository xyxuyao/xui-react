import './autoCompleteShow.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AutoComplete from '../common/xui/autoComplete/AutoComplete';
/* 自动补全插件显示 */
export default class AutoCompleteShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            url: 'autoComplete.json',
            type: 'get'
        };
    }
    componentDidMount(){
       //
    }
  	render() {
    	return (
    		  <div className="autoCompleteShow">
               <h3>自动补全插件</h3>
               <div className="autoCompleteShow_box">
                  <AutoComplete {...this.state}/>
               </div>
          </div>
    );
  }
}
