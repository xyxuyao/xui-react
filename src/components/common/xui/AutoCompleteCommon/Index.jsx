import './autoComplete.scss';
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom'
import Input from '../input/Input'

/**
 * props 的值
 * {
 *  request: 发起请求的方法
 *  onChoose 选了以后的回调函数
 * }
 */
var timer; // 所有组件实例公用这一个 变量来储存请求“线程”。因为如果放到实例的state上，会引起同步问题，但是这个组件，用户不可能会同时使用不同的 组件实例

/* 自动补全组件*/
class AutoComplete extends Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.hanldeSelectItem=this.hanldeSelectItem.bind(this);
        this.state={
            textValue: '', // input的value回显
            data: [], // 服务器返回的待选列表
            show: 'none',
            lastRequestValue: '', // 上一次往服务器请求的值，防止重复搜索
            selected: '' // 是否选中
        };
        this.hide = this.hide.bind(this);
        this.requestKey = '';
    }

    componentWillReceiveProps(nextProps) {
        /*if(nextProps.value !== this.props.value){
            let state = { textValue: nextProps.value};
            if($.trim(nextProps.value) === ''){
                state = {
                    ...state,
                    textValue: '',
                    lastRequestValue: '',
                    selected: '',
                    data: []
                };
            }
            this.setState( state );
        }*/
        this.state.textValue = nextProps.value;
    }

    handleChange(e){
        let textValue = e.target.value;
        this.requestKey = textValue; // 存储关键字
        this.setState({
            textValue,
            selected: ''
        });
        let onChange = this.props.onChange;

        typeof onChange === 'function' && onChange(textValue,e);
        this.delayRequest(textValue);
    }
    delayRequestForce() { // 暴露给外部强制重新请求的方法
        clearTimeout(timer);
        timer = setTimeout(()=> {
            let value = $.trim(this.state.textValue);
            if(value === '') {
                this.setState({ data: [],lastRequestValue: '' });
                return;
            }
            this.props.request(value).then(data => {
                if(value === $.trim(this.state.textValue)) { // 确保是最后一次的请求
                    this.setState({
                        data,
                        lastRequestValue: value
                    });
                }
            });
        }, 800);
    }
    delayRequest(value){// 延时请求处理
        var self=this;

        clearTimeout(timer);
        timer = setTimeout(function(){
            self.requestData(value);
        }, 500);
    }
    requestData(value){
        value = $.trim(value);
        if(value === '' || value === this.state.lastRequestValue) {
            if( value === '' ){ this.setState({ data: [],lastRequestValue: '' }); }
            return;
        }
        this.props.request(value).then(data => {
            if(value === $.trim(this.state.textValue)) { // 确保是最后一次的请求
                this.setState({
                    data,
                    lastRequestValue: value
                });
                this.show();
            }
        });

    }
    show(){
        this.setState({show: 'block'});
    }
    hide(){
        this.setState({show: 'none'});
    }
    hanldeSelectItem(item){
        this.setState({ selected: 'selected',textValue: item.text},()=>{
            this.props.onChoose(item);
            this.hide();
        });
    }
    componentDidMount() {
        document.addEventListener('click', this.hide);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.hide);
    }
    render() {
        let data = this.state.data ? this.state.data : [];
        let length = data.length;
        let show = this.state.show;
        return (
            // react 事件包装方式：http://www.cnblogs.com/libin-1/p/6298326.html
            <div className="autoCompleteCommon" data-selected={this.state.selected} style={this.props.style} ref={(e)=> this._root = e} onClick={(e)=>{e.nativeEvent.stopImmediatePropagation();}}>
                <Input disabled = {this.props.disabled} type="text"
                       suffix={this.props.suffix}
                       name={this.props.name}
                       onChange={this.handleChange}
                       placeholder={this.props.placeholder}
                       value= {this.state.textValue}
                       onFocus={()=>{this.state.data.length > 0 && this.show();}}
                       onSearch = {this.props.onSearch}
                    />
                <div className="autoComplete_list" style={{display: show}}>
                    <ul>
                        {
                            data.map((item,index) => {
                                return (<li key={index} onClick={(e)=> {this.hanldeSelectItem(item);}}>{item.text}</li>);
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default AutoComplete;

