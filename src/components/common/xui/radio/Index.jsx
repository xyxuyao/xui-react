import './style.scss';
import React,{Component} from 'react';

/*
 * radio
 * */
export default class Radio extends Component{
    static defaultProps = {
        style: {},
        type: 'radio',
        defaultChecked: false
    };
    constructor(props){
        super(props);
        this.state = {
            checked: !!this.props.checked
        };
        this.handleChange=this.handleChange.bind(this);
    }
    componentDidMount(){
        //
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.checked !== this.props.checked){
            this.setState({
                checked: nextProps.checked
            });
        }
    }
    handleChange () {
        let { checked } = this.state;
        const { disabled,onChange,name,value } = this.props;
        if (disabled || checked) {
            return;
        }
        this.setState({
            checked: true
        });

        onChange({
            name,
            value,
            checked: true
        });
    }
    render() {
        let { checked } = this.state;
        const { className='',style={} } = this.props;
        return (
            <span className={'bbdRadio_root '+ (checked?'bbdRadio_checked ':' ')+className} onClick={this.handleChange} style={style}>
                <span className="bbdRadio_input"></span>
                <span className="bbdRadio_text">{this.props.children}</span>
          </span>
        );
    }
}

