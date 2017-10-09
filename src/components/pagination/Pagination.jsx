import './style.css'
import React,{PropTypes} from 'react'
import ReactDOM from 'react-dom'

import Pagination from '../../../XUI/Pagination'

/*分页插件显示*/
const PaginationShow = React.createClass({
   getInitialState: function () {
        return {
            currentPage: 1,//当前页
            totalCount:100,//数据总条数
            pageSize:10,//每页显示条数
            showPage:5//显示多少个页码 最好为奇数
        }
    },
    componentDidMount:function(){
    
    },
    pageCallBack:function(){//分页回调函数

    },
    pageCallBack:function(currentPage){
      console.log(currentPage,'当前页码');
    },
  	render: function() {
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
});

module.exports = PaginationShow;


