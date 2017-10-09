import './style.scss';
import React,{Component,PropTypes} from 'react';
import { render } from 'react-dom';

// 触摸显示小弹窗
class Tipsbox extends Component{
    static defaultProps = {
        index: parseInt(Math.random()*10+1,10)
    };
    constructor(props){
        super(props);
        this.state={
            showTips: 'none',
            left: 0,
            top: -15,
            id: 'tips-box_' + new Date().getTime() + this.props.index
        };
    }
    componentDidMount(){
        let self = this;
        let { id } = this.state;
        let $triggerDom = $(this.triggerDom);
        let div = document.createElement('div');
        this.contanier =div;
        document.body.appendChild(div);
        render(
            <div id={id} className="tips-box" style = {{ display: 'none'}}>
                <span className = "icon-arrow"></span>
                {this.props.content}
            </div>,
            div
        );
    }
    componentWillUnmount() {
        try{
            this.contanier.remove();
        }catch(e){
            this.contanier.removeNode(true);
        }
    }
    mouseoverHandle(e) {
        let $triggerDom = $(this.triggerDom);
        let target = $('#'+this.state.id);
        let top = $triggerDom.offset().top -15;
        let left = $triggerDom.offset().left + $triggerDom.width() + 10;
        target.css({ top: top+'px' ,left: left+'px'}).show();
    }
    mouseoutHandle(e) {
        $('#'+this.state.id).hide();
    }
    render() {
        let { id,top,left } = this.state;
        return (
            <div ref={dom=>{this.triggerDom = dom;}} className="pophover_root" onMouseOver={this.mouseoverHandle.bind(this)} onMouseOut={this.mouseoutHandle.bind(this)}>
                {this.props.children}
            </div>
        );
        /*
         return (
         <div className="tips-box" style = {{top: `${this.state.tipsTop}px`, left: `${this.state.tipsLeft}px`, display: this.state.showTips}}>
         <div className = "title">失败信息</div>
         <p>共执行<strong>454</strong>条数据</p>
         <p>执行成功<strong>454</strong>条</p>
         <p>执行失败<strong>454</strong>条</p>
         <span className = "icon-arrow"></span>
         </div>
         );*/
    }
}

export default Tipsbox;

