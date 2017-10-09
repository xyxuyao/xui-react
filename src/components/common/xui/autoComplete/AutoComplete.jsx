import './autoComplete.scss'
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom'
import Input from '../input/Input'
import util from '../../utils/util'
/**
 * props 的值
 * {
 *  field: 给服务器进行搜索时的字段名
 *  url: 请求的url地址
 *  type: 请求的方法
 *  onChoose 选了以后的回调函数
 * }
 */
var timer; //所有组件实例公用这一个 变量来储存请求“线程”。因为如果放到实例的state上，会引起同步问题，但是这个组件，用户不可能会同时使用不同的 组件实例

/*自动补全组件*/
class AutoComplete extends Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.hanldeSelectItem=this.hanldeSelectItem.bind(this);
        this.state={
            val: '', //input的value回显
            data:[], //服务器返回的待选列表
            show:'none',
            lastRequestValue: '' //上一次往服务器请求的值，防止重复搜索
        };
        this.hide = this.hide.bind(this)
    }
    componentDidMount(){
        //
    }
    handleChange(e){
        let val = e.target.value
        this.setState({
            val
        })
        this.delayRequest(val)
    }
    delayRequest(value){//延时请求处理
        var self=this;

        clearTimeout(timer)
        timer = setTimeout(function(){
            self.requestData(value);
        }, 200);
    }
    requestData(value){
        var self=this;
        const {type,url,field, param = {}}=this.props;
        value = $.trim(value)
        if(value === '' || value === this.state.lastRequestValue) {
            return 
        }
        let data = {
            ...param,
            [field]: value
        }
        util.ajax({
            type:type,
            url:url,
            data,
            dataType:'json',
            success:function(data){
                if(data.success) {
                    self.setState({data:data.content})
                }
                self.show();
            }
        });

        this.setState({
            lastRequestValue: value
        })

    }
    show(){
        this.setState({show:'block'})
    }
    hide(){
        this.setState({show:'none'})
    }
    hanldeSelectItem(item){
        this.props.onChoose(item)
        this.setState({
            val: item.loginName
        })
        this.hide();
    }
    componentDidMount() {
        document.addEventListener('click', this.hide)
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.hide)
    }
    render() {
        let data=this.state.data?this.state.data:[];
        let length=data.length;
        let show=this.state.show;
        return (   
            // react 事件包装方式：http://www.cnblogs.com/libin-1/p/6298326.html 
                <div className="autoComplete" style={this.props.style} ref={(e)=> this._root = e} onClick={(e)=>{e.nativeEvent.stopImmediatePropagation()}}>
                    <Input disabled = {this.props.disabled} type="text"
                        suffix="icon-search"
                        onChange={this.handleChange}
                        placeholder={this.props.placeholder || ''}
                        value= {this.state.val}
                        onFocus={()=>{this.state.data.length > 0 && this.show()}}
                    />
                    <div className="autoComplete_list" style={{display:show}}>
                        <ul>
                            {
                                data.map((user,index) => {  
                                    return (<li key={index} onClick={(e)=> {this.hanldeSelectItem(user)}}>{user.loginName}</li>)
                                }) 
                            }
                        </ul>
                    </div>
                </div>
        );
    }
}

export default AutoComplete;

