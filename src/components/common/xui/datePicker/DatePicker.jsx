/*
 * @component DateComponent 日期选择组件
 * @author yxc
 *
 * @props { Number } year           年份
 * @props { Number } month          月份
 * @props { Number } day            日
 * @props { Number } showYearNum    显示可选择的多少个年份
 * @props { Function } callback	    回调函数，参数分别代表年月日
 *
 * eg：
 <DateComponent
    year={this.state.year}
    month={this.state.month}
    day={this.state.day}
    showYearNum={9}
    callback={(y, m, d)=>{
        this.setState({
            year: y,
            month: m,
            day: d
            });
        console.log(y + "," + m + "," +d)
 }}
 />
 * */

import './DateComponent.scss';
import React, { Component } from 'react';

class DateComponent extends Component {
    static defaultProps = {
        showYearNum: 9
    }
    state = {
        data: [],
        showCalender: false
    }

    // 一年 每月的天数列表
    monthsDayNum = [
        31, 28, 31, 30,
        31, 30, 31, 31,
        30, 31, 30, 31
    ]

    // 月份列表
    monthsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    // 识别点击的是年或月或日
    // 以便调整对应的样式
    clickType = 'day'

    /*
    * @method fixLt10AddPreZero 针对小于10的数据添加前导0
    * */
    fixLt10AddPreZero(val){
        return +val < 10 ? `0${val}` : val;
    }

    /*
    * @method fixMonthsDayNum 根据年份修正2月的天数
    * */
    fixMonthsDayNum(year){

        // if((year % 4 && year % 100 != 0) || (year % 100 && year % 400 == 0)){
        //     this.monthsDayNum[1] = 29;
        //
        // }else {
        //     this.monthsDayNum[1] = 28;
        // }

        if( (this.year % 4 === 0 && this.year % 100 !== 0) || (this.year % 100 === 0 && this.year % 400 === 0) ) {
            this.monthsDayNum[1] = 29;
        }else {
            this.monthsDayNum[1] = 28;
        }
    }

    /*
    * @method fixDay 切换月份时，注意判断是否超出该月的最大天数
    * */
    fixDay(month, day){

        let monthMaxDay = this.monthsDayNum[month - 1];
        return day > monthMaxDay ? monthMaxDay : day;
    }
    
    /*
    * @method showCalender 显示日历
    * */
    showCalender(year, month){
        let {panel = 'day'} = this.props;
        switch(panel) {
        case 'year': 
            this.getYearList();
            break;
        case 'month':
            this.getMonthList();
            break;
        default: 
            this.getDaysList(year, month);
            break;
        }
        
        this.setState({
            showCalender: true
        });
    }

    /*
    * @method prevClick 点击选择上一个或年或月或日
    * */
    prevClick(year, month, day){

        let {callback} = this.props;

        switch (this.clickType) {

        case 'day':
            day --;

            if(day <= 0) {
                month --;

                if(month > 0){
                    day = this.fixDay(month, 31);

                }else {
                    day = 31;
                    month = 12;
                    year --;
                }

                this.getDaysList(year, month);
            }
            break;

        case 'month':
            month --;

            if(month <= 0) {
                month = 12;
                year --;
            }

            day = this.fixDay(month, day);
            break;

        case 'year':
            year--;

            this.fixMonthsDayNum(year);
            day = this.fixDay(month, day);

            if(year < this.state.data[0]){
                this.getYearList(year);
            }
            break;
        }

        callback(year, month, day);
    }

    /*
    * @method nextClick 点击选择下一个或年或月或日
    * */
    nextClick(year, month, day){

        let {callback} = this.props;

        switch (this.clickType) {

        case 'day':
            day ++;

            if(day > this.monthsDayNum[month-1]){
                month ++;

                if(month > 12){
                    month = 1;
                    year ++;
                    // year = year == this.currentYear ? year : ++year;
                }

                day = 1;
                this.getDaysList(year, month);
            }
            break;

        case 'month':
            month ++;

            if(month > 12){
                month = 1;
                year ++;
            }

            day = this.fixDay(month, day);
            break;

        case 'year':
            year ++;

            this.fixMonthsDayNum(year);
            day = this.fixDay(month, day);

            if(year > this.state.data[this.state.data.length - 1]){
                this.getYearList(year);
            }
            break;
        }

        callback(year, month, day);
    }

    /*
    * @method clearDate 清除日期
    * */
    clearDate(){
        let {callback} = this.props;
        this.setState({ showCalender: false });
        callback(null, null, null);
    }

    /*
    * @method itemClick 数据列表项的点击事件
    * */
    itemClick(year, month, day, val){

        let {callback} = this.props;

        switch (this.clickType){

        case 'day':
            callback(year, month, val); break;

        case 'month':
                // 选择月份时，注意判断并调整day
            callback(year, val, this.fixDay(val, day)); break;

        case 'year':
                // 选择年份时，注意判断并调整day
            this.fixMonthsDayNum(val);
            callback(val, month, this.fixDay(month, day)); break;

        default:
            break;
        }

        this.setState({
            showCalender: false
        });
    }

    /*
     * @method getDaysList 根据指定的年和月获取该月的天数列表
     * */
    getDaysList(year, month){

        let tmpDaysList = ['日', '一', '二', '三', '四', '五', '六'];
        let curYearMonthFirstDay = new Date(`${year}/${month}/01`); // 指定年月的第一天
        let curYearMonthFirstDayWeekday = curYearMonthFirstDay.getDay(); // 指定年月的第一天的星期数
        let tmpArr = new Array(curYearMonthFirstDayWeekday).fill(''); // 填充空元素给数组
        tmpDaysList = tmpDaysList.concat(tmpArr);

        this.fixMonthsDayNum(year); // 判断是否闰年
        let curMonthDays = this.monthsDayNum[month-1]; // 获取指定月份的天数

        for(let i=1; i<=curMonthDays; i++){
            tmpDaysList.push(i);
        }

        this.clickType = 'day';
        this.setState({
            data: tmpDaysList
        });
    }

    /*
    * @method getMonthListByYear 获取月份列表
    * */
    getMonthList(){
        this.clickType = 'month';
        this.setState({
            data: this.monthsList
        });
    }

    /*
    * @method getYearListByYear 根据指定的年份获取年份列表
    * */
    getYearList(year){
        
        let yearArr = [];
        let curYear = this.currentYear;

        let {showYearNum} = this.props;
        let rightyearNum = Math.ceil((showYearNum -1) / 2);

        rightyearNum = year + rightyearNum > curYear ? curYear - year : rightyearNum;
        for(let i=1;  i<=rightyearNum; i++){
            yearArr.push(year + i);
        }

        yearArr.unshift(year);

        let leftYearNum = showYearNum - yearArr.length;
        for(let i=1; i<=leftYearNum; i++){
            yearArr.unshift(year - i);
        }
        this.clickType = 'year';
        this.setState({
            data: yearArr
        });
    }

    componentWillMount(){

        // 获取当前的年月日 避免重复获取
        let curDate = new Date();
        this.currentYear = curDate.getFullYear();
        this.currentMonth = curDate.getMonth() + 1;
        this.currentDay = curDate.getDate();
    }
    canShowDay() {
        let panel = this.props.panel;
        if(panel === 'year' || panel === 'month') {
            return false;
        } 
        return true;
        
    }
    canShowMonth() {
        let panel = this.props.panel;
        if(panel === 'year') {
            return false;
        } 
        return true;
        
    }

    render(){

        let defaultShowDate = true;
        let {year, month, day} = this.props;

        if(!(year && month && day)){
            year = this.currentYear;
            month = this.currentMonth;
            day = this.currentDay;
            defaultShowDate = false;
        }

        let itemClassName = `date__item--${this.clickType} `;

        return (
            <div className="date__root" ref="date__root">

                {/* 显示日期 */}
                <div
                    className="date__showDate"
                    onClick={() => this.showCalender(year, month)}
                >{defaultShowDate ? `${year}${this.canShowMonth() ? '/' + this.fixLt10AddPreZero(month) : ''}${this.canShowDay() ? '/' + this.fixLt10AddPreZero(day) : ''}` : this.props.placeholder}</div>

                {/* 显示可选择的年份 或月份 或天 */}
                <div className="date__calender" style={{display: this.state.showCalender ? 'block' : 'none'}}>

                    <div className="date__handleWrap">
                        <div
                            className="date__prev"
                            onClick={() => this.prevClick(year, month, day)}
                        >&lt;</div>

                        <div className="date__YMD">

                            <div
                                className="date__year"
                                onClick={() => this.getYearList(year)}
                            >{year}</div>
                            {
                                this.canShowMonth() && 
                                <div
                                    className="date__month"
                                    onClick={() => this.getMonthList()}
                                >/ {this.fixLt10AddPreZero(month)}</div>
                            } 
                            {
                                this.canShowDay() &&
                                <div
                                    className="date__day"
                                    onClick={() => this.getDaysList(year, month)}
                                >/ {this.fixLt10AddPreZero(day)}</div>
                            }
                        </div>

                        <div
                            className="date__next"
                            onClick={() => this.nextClick(year, month, day)}
                        >&gt;</div>

                        <div
                            className="date__clear"
                            onClick={() => this.clearDate()}
                        >清除</div>
                    </div>

                    <ul className="date__list">
                        {
                            this.state.data.map((item, index) => {

                                let text = item; // 文本显示内容
                                let className = itemClassName;

                                switch (true){

                                case text == '':
                                    return (
                                            <li key={index} className="date__item--space">{text}</li>
                                        );

                                case /[日一二三四五六]/.test(text):
                                    return (
                                            <li key={index} className="date__item--week">{text}</li>
                                        );

                                case this.clickType == 'day' && day == text:
                                    className += 'date__item--active'; break;

                                case this.clickType == 'month':
                                    month == text && (className += 'date__item--active');
                                    text += '月';
                                    break;

                                case this.clickType == 'year':
                                    year == text && (className += 'date__item--active');
                                    text += '年';
                                    break;

                                default:
                                    break;
                                }

                                return (
                                    <li
                                        key={index}
                                        className={className}
                                        onClick={() => this.itemClick(year, month, day, item)}
                                    >{text}</li>
                                );
                            })
                        }
                    </ul>

                </div>

            </div>
        );
    }

    componentDidMount(){

        // 点击其他区域关闭日历
        let isInnerDateDom = false;
        let dateDom = this.refs['date__root'];

        dateDom.onclick = () => {
            isInnerDateDom = true;
        };

        this._outterClickClosePanel = () => {
            if(isInnerDateDom){
                isInnerDateDom = false;
            }else {
                this.setState({
                    showCalender: false
                });
            }
        };
        document.body.addEventListener('click', this._outterClickClosePanel);
    }
    componentWillUnmount() {
        document.body.removeEventListener('click', this._outterClickClosePanel);
    }
}

export default DateComponent;