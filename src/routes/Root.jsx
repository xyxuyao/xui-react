import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { checkLogin } from '../utils/hook';

import Frame from '../layouts/frame/Frame';

import NotFound from '../components/common/error/notFound/NotFound';
import SystemError from '../components/common/error/systemError/SystemError';

// 分页
import PaginationShow from '../components/paginationShow/PaginationShow';
// 自动补全
import AutoCompleteShow from '../components/autoCompleteShow/AutoCompleteShow';

export default class Root extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Frame}>
                    {/* 添加onEnter={checkLogin}属性, 可进行登录校验 */}
                    <IndexRoute component={PaginationShow} />
                    <Route path="/pagination" component={PaginationShow}/>
                    <Route path="/autoComplete" component={AutoCompleteShow}/>
                    <Route path="*" component={NotFound}/>
                    <Route path="/systemError" component={SystemError}/>
                </Route>  
            </Router>
        );
    }
}

