import './pagination.scss';
import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

/* 分页组件*/
class Pagination extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.
            handleChange.
            bind(this);
        this.changePageToFirst = this.
            changePageToFirst.
            bind(this);
        this.changePageToPre = this.
            changePageToPre.
            bind(this);
        this.changePageToNext = this.
            changePageToNext.
            bind(this);
        this.changePageToLast = this.
            changePageToLast.
            bind(this);
        this.goNum = this.
            goNum.
            bind(this);
        this.handleKeyDown = this.
            handleKeyDown.
            bind(this);

        this.state = {
            num: '',
            numTip: '',
            pageList: '', // 分页列表
            currentPage: this.props.currentPage, // 当前页
            totalCount: this.props.totalCount, // 数据总条数
            pageSize: this.props.pageSize, // 每页显示条数
            showPage: this.props.showPage, // 显示多少个页码
            totalPage: Math.ceil(this.props.totalCount / this.props.pageSize), // 总页数
            pWidth: '', // 分页列表的容器宽度
            callBack: this.props.callBack,
            preStatusClass: '',
            firstStatusClass: '',
            nextStatusClass: 'disabled',
            lastStatusClass: ''
        };
    }
    componentDidMount() {
        //
    }
    componentWillReceiveProps(nextProps) {
        let self = this;
        let currentPage = nextProps.currentPage;
        let totalCount = nextProps.totalCount;
        let showPage = this.state.showPage;
        let totalPage = Math.ceil(nextProps.totalCount / this.props.pageSize);
        if (totalPage < 5) {
            this.setState({showPage: totalPage});
        } else {
            this.setState({showPage: 5});
        }
        let totalCountFlag = totalCount === self.props.totalCount;
        let currentPageFlag = currentPage === self.props.currentPage;

        if(!currentPageFlag) { // 清空跳转值
            this.setState({num: '', numTip: ''});
        }

        this.setState({
            totalCount: totalCount,
            totalPage: totalPage,
            currentPage: currentPage
        }, function () {
            if (currentPageFlag || totalCountFlag) { // 页码变化render一次分页
                self.renderList(currentPage);
            }
        });
    }
    changePageToFirst() { // 点击首页
        this.setCurrentPage(1);
    }
    changePageToLast() { // 点击尾页
        var totalPage = this.state.totalPage;
        this.setCurrentPage(totalPage);
    }
    changePageToPre() { // 点击上一页
        var currentPage = this.state.currentPage;
        var cpage = 0;
        if (currentPage > 1) {
            cpage = currentPage - 1;
        } else {
            cpage = currentPage;
        }

        this.setCurrentPage(cpage);
    }
    changePageToNext() { // 点击下一页
        var currentPage = this.state.currentPage;
        var totalPage = this.state.totalPage;
        var cpage = 0;
        if (currentPage < totalPage) {
            cpage = currentPage + 1;
        } else {
            cpage = currentPage;
        }
        this.setCurrentPage(cpage);
    }
    goNum() {
        let num = this.state.num;
        var reg = /^\+?[1-9][0-9]*$/; // 正整数
        let f = reg.test(num);
        if (f) {
            num = parseInt(num, 10);
            this.setCurrentPage(num);
            this.setState({numTip: ''});
        } else {
            this.setState({numTip: '输入正整数'});
        }
    }
    nowPage(curpage) {
        this.setCurrentPage(curpage);
    }
    setCurrentPage(curpage) { // 设置当前页
        let totalPage = this.state.totalPage;
        if (curpage > totalPage) {
            curpage = totalPage;
        } else if (curpage < 1) {
            curpage = 1;
        }
        this.
            state.
            callBack(curpage); // 调用回调函数 传回当前页码

        this.setState({currentPage: curpage});

        this.renderList(curpage); // 每次改变页码都要重新渲染一次
    }
    renderList(curpage) {
        var totalPage = this.state.totalPage;
        var showPage = this.state.showPage;
        var currentPage = curpage;
        var pageListArr = [];
        var fPage,
            lPage;

        var middlePage = Math.ceil(showPage / 2); // 取得前半段 3
        var backHalf = totalPage - middlePage + 1; // 判断后半段  8

        if (showPage === totalPage) { // 当总页数等于展示页数
            fPage = 0;
            lPage = showPage;
        } else { // 当总页数大于显示页数
            if (currentPage < middlePage + 1) {
                fPage = 0;
                lPage = showPage;
            } else if (currentPage > middlePage && currentPage < backHalf + 1) {
                fPage = currentPage - middlePage; // 显示的第一个页码节点
                lPage = currentPage + middlePage - 1; // 显示的最后一个页码
            } else {
                fPage = totalPage - showPage;
                lPage = totalPage;
            }
        }
        for (var i = fPage; i < lPage; i++) { // 渲染显示的页数
            if (i + 1 === currentPage) {

                pageListArr.push(
                    <li
                        key={i}
                        className="btn curpage"
                        onClick={this.
                        nowPage.
                        bind(this, i + 1)}>
                        <a href="javascript:;">{i + 1}</a>
                    </li>
                );
            } else {
                pageListArr.push(
                    <li
                        key={i}
                        className="btn"
                        onClick={this.
                        nowPage.
                        bind(this, i + 1)}>
                        <a href="javascript:;">{i + 1}</a>
                    </li>
                );
            }
        }
        this.
            setState({
                pageList: pageListArr
            }, function () {
                this.setPaginationConWidth(); // 调用设置分页容器宽度的方法
                this.pageListStyle(curpage);
            });
    }
    setPaginationConWidth() { // 设置分页容器的宽度
        var totalPage = this.state.totalPage;
        var showPage = this.state.showPage;
        var liWidth = $(this.paginationList).
            find('li').
            outerWidth(true); // 每个分页数字按钮的宽度包括 外边距
        var pWidth = liWidth * (showPage + 1); // 分页列表的容器宽度
        var pConWidth = showPage * liWidth;
        this.setState({
            pConWidth: pConWidth,
            pWidth: pWidth + 'px'
        });
    }
    pageListStyle(nowNum) { // 根据条件设置设置按钮样式
        var totalPage = this.state.totalPage;
        let classStatus = {preStatusClass: '', firstStatusClass: '', nextStatusClass: '', lastStatusClass: ''};
        if (nowNum === 1) {
            Object.assign(classStatus, {
                preStatusClass: 'disabled',
                firstStatusClass: 'disabled'
            });
        }
        if (nowNum === totalPage) {
            Object.assign(classStatus, {
                nextStatusClass: 'disabled', 
                lastStatusClass: 'disabled'
            });
        }
        this.setState(classStatus);
    }
    handleChange(e) {
        let num = e.target.value;
        let self = this;
        this.setState({num: num});
    }
    handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.goNum();
        }
    }
    render() {
        let totalCount = this.state.totalCount === 0
            ? false
            : true;
        return (totalCount
            ? (
                <div className="pagination">
                    <a
                        href="javascript:;"
                        className={'btn first ' + this.state.firstStatusClass}
                        onClick={this.changePageToFirst}>首页</a>
                    <a
                        href="javascript:;"
                        className={'btn pre ' + this.state.preStatusClass}
                        onClick={this.changePageToPre}>上一页</a>
                    <div
                        className="pagination_content"
                        style={{
                            width: this.state.pConWidth
                        }}>
                        <ul
                            className="pagination_list"
                            style={{
                                width: this.state.pWidth
                            }}
                            ref={(page) => {
                                this.paginationList = page;
                            }}>
                            {this.state.pageList}
                        </ul>
                    </div>
                    <a
                        href="javascript:;"
                        className={'btn next ' + this.state.nextStatusClass}
                        onClick={this.changePageToNext}>下一页</a>
                    <a
                        href="javascript:;"
                        className={'btn last ' + this.state.lastStatusClass}
                        onClick={this.changePageToLast}>尾页</a>
                    <div className="pagination_total">
                        <div className="pagination_number">
                            共<span>{this.state.totalPage}</span>页
                        </div>
                        <div className="pagination_goPage">
                            第<input
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.num}
                                onKeyDown={this.handleKeyDown}/>
                            页
                            <span className="pagination_numTip">{this.state.numTip}</span>
                        </div>
                        <a href="javascript:;" className="btn pagination_go" onClick={this.goNum}>跳转</a>
                    </div>
                </div>
            )
            : null);
    }
}

export default Pagination;
