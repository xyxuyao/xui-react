import './style.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import omit from 'omit.js';

/* input输入框 */
class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        //
    }
    handleChange(e) {
        const { onChange } = this.props;
        this.setState({
            isFocus: true
        });
        if (onChange) {
            onChange(e);
        }
    }
    handleFocus(e) {
        const { onFocus } = this.props;
        this.setState({
            isFocus: true
        });
        if (onFocus) {
            onFocus(e);
        }
    }
    handleBlur(e) {
        const { onBlur } = this.props;
        this.setState({
            isFocus: false
        });
        if (onBlur) {
            onBlur(e);
        }
    }
    handleKeyDown(e) {
        const { onSearch, name } = this.props;
        if (e.keyCode === 13 && onSearch) {
            onSearch(e, name);
        }
    }
    handleSearch(e) {
        const { onSearch, name } = this.props;
        if (onSearch) {
            onSearch(e, name);
        }
    }
    focus() {
        this._input.focus();
    }
    render() {
        let props = this.props;
        const otherProps = omit(this.props, [
            'onPressEnter',
            'prefix',
            'suffix',
            'className'
        ]);

        let bbdInputRootClassName = props.prefix || props.suffix ? 'PreSuffix' : '';

        let iconBox = '';
        let iconBoxClassName = '';
        let iconClassName = '';

        if (props.prefix) {
            iconBoxClassName = 'prefix';
            iconClassName = props.prefix;
        } else if (props.suffix) {
            iconBoxClassName = 'suffix';
            iconClassName = props.suffix;
        }

        if (props.prefix || props.suffix) {
            iconBox = (
                <span
                    className={'bbdInput' + bbdInputRootClassName + '_' + iconBoxClassName}
                    onClick={this.handleSearch}
                >
                    <i className={'iconfont ' + iconClassName}></i>
                </span>
            );
        }

        let prefixIconClassName = props.prefix ? props.prefix : '';
        let inputClassName = props.className;
        let width = this.props.width;
        let bbdInputWidth = width ? (width) + 'px' : '100%';
        // let inputWidth=width?(width-7)+'px':'100%';
        return (
            <div className={'bbdInput' + bbdInputRootClassName + '_root'} style={{ width: bbdInputWidth }}>
                {iconBox}
                <input
                    {...otherProps}
                    className={'bbdInput' + bbdInputRootClassName + '_input ' + iconBoxClassName + ' ' + inputClassName}
                    style={{ ...this.props.style }}
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    ref={e => this._input = e}
                />
            </div>
        );
    }
}

export default Input;

