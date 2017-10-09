import './style.css'
import React,{PropTypes} from 'react'
import ReactDOM from 'react-dom'

import AutoComplete from '../../../XUI/AutoComplete'

/*自动补全插件显示*/
const AutoCompleteShow = React.createClass({
   getInitialState: function () {
        return {
          
        }
    },
    componentDidMount:function(){
    
    },
  	render: function() {
    	return (
    		  <div className="autoCompleteShow">
               <h3>自动补全插件</h3>
               <div className="autoCompleteShow_box">
                  <AutoComplete/>
               </div>
          </div>
    );
  }
});

module.exports = AutoCompleteShow;


