import './style.scss';
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import omit from 'omit.js';
import Button from '../button/Button'

/*模态框*/
class Modal extends Component{
    static defaultProps = {
        visible: false
    };
    constructor(props){
        super(props);
        this.state={
            children:this.props.children
        };
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }
    componentDidMount(){
        //
    }
    componentWillReceiveProps(nextProps) {
        let visible=nextProps.visible;
        let children=nextProps.children;
        this.setState({visible:visible,children:children})
    }
    handleOk() {
        const onOk = this.props.onOk;
        if (onOk) {
            onOk();
        }
    }
    handleCancel() {
        const onCancel = this.props.onCancel;
        if (onCancel) {
            onCancel();
        }
    }
    handleClose = () => {
        const onClose = this.props.onClose;
        if (onClose) {
            onClose();
        }
    }
    render() {
        let visible=this.props.visible;
        let displayString='';
        if(visible){
            displayString='block';
        }else{
            displayString='none';
        }
        //确认按钮和取消按钮控制
        let cancelBtn=this.props.cancelText?(<Button className="cancel" onClick={this.handleCancel}>{this.props.cancelText}</Button>):'';
        let okBtn=this.props.okText?(<Button className="ok" onClick={this.handleOk}>{this.props.okText}</Button>):'';

        // 关闭按钮控制
        let iconClose=this.props.onClose?(
            <div className="bbdModal_close" onClick={this.handleClose}><i className="iconfont icon-close"></i></div>
        ):'';

        //标题显示控制
        let title=this.props.title?(
            <div className="bbdModal_header">
                <span className="bbdModal_title">{this.props.title}</span>
            </div>
        ):'';

        let width=this.props.width?this.props.width:'420px';
        
        return (
            <div className="bbdModal_root" style={{display:displayString}}>
                <div className="bbdModal_bg"></div>
                <div className="bbdModal_wrap">
                    <div className="bbdModal_content" style={{width:width}}>
                        {iconClose}
                        {title}
                        <div className="bbdModal_body">{this.state.children}</div>
                        <div className="bbdModal_footer">
                            {cancelBtn}
                            {okBtn}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;

