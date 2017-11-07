import './paginationShow.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Pagination from '../common/xui/pagination/Pagination';

export default class PaginationShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1, // 当前页
            totalCount: 100, // 数据总条数
            pageSize: 10, // 每页显示条数
            showPage: 5 // 显示多少个页码 最好为奇数
        };
    }
    componentDidMount(){
        //
    }
    pageCallBack(){ // 分页回调函数
        //
    }
    pageCallBack(currentPage){
        console.log(currentPage, '当前页码');
    }
  	render() {
    	return (
    		  <div className="paginationShow">
               <h3>分页插件</h3>
               <div className="paginationShow_box">
                    <Pagination 
                      totalCount={this.state.totalCount} 
                      pageSize={this.state.pageSize} 
                      showPage={this.state.showPage} 
                      currentPage={this.state.currentPage} 
                      callBack={this.pageCallBack}/>
               </div>
          </div>
    );
  }
}
