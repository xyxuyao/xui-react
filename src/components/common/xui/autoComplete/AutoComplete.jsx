import './autoComplete.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input from '../input/Input';
/* 自动补全组件 */
class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.hanldeSelectItem = this.hanldeSelectItem.bind(this);
        this.state = {
            target: '',
            val: '',
            oldValue: '',
            newValue: '',
            timer: null,
            data: [],
            show: 'none'
        };
    }
    componentDidMount() {
        //
    }
    componentWillReceiveProps(nextProps) {
        //
    }
    handleChange(e) {
        var val = e.target.value;
        this.setState({ val: val });
        this.autoWatch(e);
    }
    autoWatch(e) {
        let self = this;
        let target = $(e.target);
        this.setState({ target: target });

        target.on('input propertychange', function () {
            var oldValue = $(this).data('oldValue');
            var newValue = $(this).val();
            if (oldValue === newValue) {
                self.show();
            } else {
                self.delayRequest(newValue, 0);
            }
            return false;
        });
    }
    delayRequest(newValue, i) { // 延时请求处理
        let timer = this.state.timer;
        var j = 10;
        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval( () => {
            ++i;
            if (i === j) {
                this.requestData(newValue);
                clearInterval(timer);
            }
        }, 100);
    }
    requestData(newValue) {
        var self = this;
        const { type, url, data } = this.props;

        $.ajax({
            type: type,
            url: url,
            data: data,
            dataType: 'json',
            success: function (data) {
                self.setState({ data: data.data });
                self.show();
            }
        });

    }
    show() {
        this.setState({ show: 'block' });
    }
    hide() {
        this.setState({ show: 'none' });
    }
    hanldeSelectItem(e) {
        let target = $(e.target);
        let text = target.text();
        this.setState({ val: text });
        this.hide();
    }
    render() {
        let data = this.state.data ? this.state.data : [];
        let length = data.length;
        let show = this.state.show;
        return (
            <div className="autoComplete">
                <Input type="text"
                    ref={(autoComplete) =>{ return this.autoComplete = autoComplete;}}
                    value={this.state.val}
                    suffix="icon-search"
                    onChange={this.handleChange}
                    placeholder="输入用户名查找"
                    width="268"
                />
                <div className="autoComplete_list" style={{ display: show }}>
                    <ul onClick={this.hanldeSelectItem}>
                        {
                            data.map(function (item, index) {
                                return (<li key={item.id}>{item.name}</li>);
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default AutoComplete;

