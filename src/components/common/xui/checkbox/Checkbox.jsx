import './style.scss';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import omit from 'omit.js';

/* 选择框*/
class Checkbox extends Component{
    static defaultProps = {
        style: {},
        type: 'checkbox',
        defaultChecked: false
    };
    constructor(props){
        super(props);
        const checked = 'checked' in props ? props.checked : props.defaultChecked;
        this.state = {
            checked
        };
        this.handleChange=this.handleChange.bind(this);
    }
    componentDidMount(){
        //
    }
    componentWillReceiveProps(nextProps) {
        if ('checked' in nextProps) {
            if(nextProps.checked !== this.props.checked){
                this.setState({
                    checked: nextProps.checked
                });
            }
            
        }
    }
    handleChange (e) {
        let targetCheck=e.target.checked;
        const { props } = this;
        if (props.disabled) {
            return;
        }
        // if(targetCheck){
        //     this.setState({
        //         checked: true
        //     });
        // }else{
        //     this.setState({
        //         checked: false
        //     });
        // }
        this.setState({
            checked: !!targetCheck
        });
        props.onChange({
            target: {
                ...props,
                checked: targetCheck
            }
        });
    }
    render() {
        const {
              className,
              style,
              name,
              type,
              disabled,
              posLeft
        } = this.props;
        let text=this.props.children;
        const { checked } = this.state;
        let bbdCheckboxCls=checked?'bbdCheckbox_checked':'';
        let iconCheckbox=checked?'icon-checkbox':'';
        let left=posLeft?posLeft:'20';
        let bbdCheckboxText=text?(<span className="bbdCheckbox_text" style={{left: left+'px'}}>{text}</span>):'';
        return (
            <span className={'bbdCheckbox_root '+bbdCheckboxCls}>
                <input
                  name={name}
                  type={type}
                  className={'bbdCheckbox_input'}
                  disabled={disabled}
                  checked={!!checked}
                  onChange={this.handleChange}
                />
                <i className={'bbdCheckbox_icon iconfont '+iconCheckbox}></i>
                {bbdCheckboxText}
          </span>
        );
    }
}

export default Checkbox;

