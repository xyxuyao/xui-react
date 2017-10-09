import React from 'react';
import './style.scss';
import Immutable from 'immutable';
/*
* props:
* selected: 与opition全等的值或者空
* options: 数组
      {
          text: '展示的文字'
          value: 任何值，选中后的值
      }
* onSelected: 选择后的回调函数
*/

class Select extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null,
            active: false
        }
    }
    componentDidMount(){
        const {selected, options} = this.props;
        this.setSelectedOption(options, selected);
    }

    componentWillReceiveProps(nextProps) {
        const {selected, options} = nextProps;
        let selectedOption = null;        
        if(selected != this.props.selected || !Immutable.is(selectedOption, this.props.options)){
            this.setSelectedOption(options, selected);
        }
        
    }
    setSelectedOption(options, selected){
        let selectedOption = null; 
        for(let v of options) {
            if(String(v.value) === String(selected)) {
                selectedOption = v;
                break;
            }
        }
        this.setState({
            selectedOption
        });
    }
    select(option) {
        this.setState({
            selectedOption: option,
            active: false
        })
        let name=this.props.name;
        this.props.onSelected(option.value, name, option.text);
    }

    toggleActive = (active) =>{
        if (active === undefined) {
            active = !this.state.active
        }
        
        this.setState({active}, () => {
            if (active) {
                $(this.optionWrapper).scrollTop(0)
            }
        })
    }

    componentDidUpdate() {
        // $(document.body).css({
        //     overflow: this.state.active ? "hidden" : "auto",
        //     paddingRight: this.state.active ? "8px" : "0",
        // })
    }

    render() {
        return (
        <div style={this.props.style} disabled={this.props.disabled} className={'bbdSelect_root' + (this.state.active ? ' selecting' : '') + (this.props.className ? (' ' + this.props.className) : '') } onMouseLeave={e => this.toggleActive(false)}>
            <div className="valuePanel" onClick={(e)=> {!this.props.disabled && this.toggleActive() }}>
                {this.state.selectedOption ? this.state.selectedOption.text : this.props.defaultText || ''}
                <i className="iconfont icon-select"></i>
            </div>
            <div className="optionWrapper"  ref={(optionWrapper) => {this.optionWrapper=optionWrapper}}>
                    {this.props.options.map((v,index)=> {
                        return (this.state.selectedOption === v ?
                            <div key={v.text} className="option active" onClick={()=>{this.select(v)}}>{v.text}</div> :
                            <div key={v.text} className="option" onClick={()=>{this.select(v)}}>{v.text}</div>
                        );
                    })}
            </div>
        </div>
        );
    }
}

export default Select;


Select.defaultProps = {
    onSelected: function(){return;},
    options: []
}

export function valueToText (value, options, defaultText) {
    let option = options.find(o => String(o.value) === String(value));
    if(option) {
        return option.text;
    }
    return defaultText || '——';
}
