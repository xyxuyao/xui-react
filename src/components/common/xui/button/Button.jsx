import './style.scss';
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import omit from 'omit.js';

/*button按钮*/
class Button extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown=this.handleKeyDown.bind(this);
    }
    componentDidMount(){
        //
    }
    handleClick(e) {
        const onClick = this.props.onClick;
        if (onClick) {
            onClick(e);
        }
    }
    handleKeyDown(e){
        const onClick = this.props.onClick;
        if (onClick) {
            onClick(e);
        }
    }
    render() {
        let className=this.props.className;
        let children=this.props.children;
        let textClassName='';
        let icon=this.props.icon?<i className={'iconfont '+this.props.icon}></i>:'';

        if(icon){
            textClassName='-icon';
        }
        return (
            <button
                type="button"
                className={'bbdBtn_root '+className}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
                style={this.props.style}
            >
            {icon}
            <span className={'bbdBtn_text'+textClassName}>{children}</span>
            </button>
        );
    }
}

export default Button;

