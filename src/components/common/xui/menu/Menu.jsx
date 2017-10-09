import './style.scss';
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory} from 'react-router';
import Right from '../../components/common/Right';
/*Menu菜单*/
class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
            // submenuClassName:['open','close'],
            // subClassName:['show','hide']
        };
    }
    componentDidMount () {    
        const $root = $(this._root);
        let $menuHasChildActived = $root.find('.bbdMenu_submenu').filter(function (i) {
            return !$(this).hasClass('noChild');
        }).filter(function(i) {
            return $(this).find('a.active').length > 0;
        });
        $menuHasChildActived.each(function(i) {
            let $menu = $(this);
            $menu.addClass('bbdMenu_submenu-open bbdMenu_submenu-selected');
            $menu.find('.bbdMenu_sub').addClass('bbdMenu_sub-show');
            $menu.find('.bbdMenu_item').addClass('bbdMenu_item-selected');
        });
        this.handleClick();
    }
    handleClick(){
        $('.bbdMenu_root').on('click', 'li > a', function (e) {
            var self=$(this);
            var parent=self.parent(); // 获取父亲节点
            var gf = parent.parent();
            var sub = self.next();
            var parentLg = self.parents('.bbdMenu_root');
            if(parent.hasClass('noChild')){
                parentLg.find('li').removeClass('bbdMenu_submenu-open bbdMenu_item-selected bbdMenu_submenu-selected');
                parent.addClass('bbdMenu_item-selected bbdMenu_submenu-selected');
                parent.siblings('li').find('.bbdMenu_sub').slideUp(200);
                return;
            }

            if(parent.hasClass('bbdMenu_item')){
                parentLg.find('li').removeClass('bbdMenu_submenu-open bbdMenu_item-selected bbdMenu_submenu-selected');
                self.parents('.bbdMenu_submenu').addClass('bbdMenu_submenu-open bbdMenu_item-selected bbdMenu_submenu-selected');
                parent.siblings('li').removeClass('bbdMenu_submenu-open bbdMenu_item-selected bbdMenu_submenu-selected');
                parent.siblings('li').find('.bbdMenu_submenu').removeClass('bbdMenu_submenu-open bbdMenu_item-selected bbdMenu_submenu-selected');
                return;
            }
            
            // 获取当前展开dom下所有的li节点
            // gf.children('li.bbdMenu_submenu-open').find('.bbdMenu_submenuTitle')；

            gf.children('li.bbdMenu_submenu-open').children('a').children('.icon-arrowdown').removeClass('open');
            gf.children('li.bbdMenu_submenu-open').find('.bbdMenu_sub').slideUp(300);
            gf.children('li.bbdMenu_submenu-open').removeClass('bbdMenu_submenu-open');

            if (sub.is(':visible')) {
                parent.removeClass('bbdMenu_submenu-open');
                sub.slideUp(200);
            } else {
                parent.addClass('bbdMenu_submenu-open');
                sub.slideDown(200);
            }
            e.preventDefault();
        });
    }
    render() {
        return (
            <ul className="bbdMenu_root bbdMenu" ref={ele => this._root = ele}>
                <Right white="B_HTGLQX">
                    {/* 这样的写法，是一个惰性求值，在真正有权限的时候，才会计算这个子组件，一个优化写法，这是因为Right组件内部提供了这么一个方法，条件渲染*/}
                    {
                        () => <li key="0" className="bbdMenu_submenu">
                            <a href="javascript:;" className="bbdMenu_submenuTitle">
                                <span>
                                    <i className="iconleft iconfont icon-um"></i>
                                    <span>用户管理</span>
                                    <i className="iconright iconfont icon-arrowdown"></i>
                                </span>
                            </a>
                            <ul className="bbdMenu bbdMenu_sub">
                                <li className="bbdMenu_item"><Link to="/userSet" activeClassName="active">用户列表</Link></li>
                                <li className="bbdMenu_item"><Link to="/addUser" activeClassName="active">新增用户</Link></li>
                            </ul>
                        </li>
                    }
                </Right>
                
                <Right white="B_HTGLQX">
                    {
                        () => <li key="1" className="bbdMenu_submenu">
                            <a href="javascript:;" className="bbdMenu_submenuTitle">
                                <span>
                                    <i className="iconleft iconfont icon-role"></i>
                                    <span>角色管理</span>
                                    <i className="iconright iconfont icon-arrowdown"></i>
                                </span>
                            </a>
                            <ul className="bbdMenu bbdMenu_sub">
                                <li className="bbdMenu_item"><Link to="/roleList" activeClassName="active">角色列表</Link></li>
                                <li className="bbdMenu_item"><Link to="/roleAdd" activeClassName="active">新增角色</Link></li>
                            </ul>
                        </li>
                    }
                </Right>
                <Right white="B_YHRZGL">
                    {
                        () => <li key="2" className="bbdMenu_submenu noChild">
                            <Link to="/logAudit" className="bbdMenu_submenuTitle" activeClassName="active">
                                <span>
                                    <i className="iconleft iconfont icon-log"></i>
                                    <span>日志审计</span>
                                </span>
                            </Link>
                        </li>
                    }
                </Right>
                <Right white="B_DSRW">
                    {
                        () => <li key="3" className="bbdMenu_submenu noChild">
                            <Link to="/taskWatch" className="bbdMenu_submenuTitle" activeClassName="active">
                                <span>
                                    <i className="iconleft iconfont icon-crontab"></i>
                                    <span>定时任务</span>
                                </span>
                            </Link>
                        </li>
                    }
                </Right>
                <Right white="B_QYBHJC">
                    {
                        () => <li key="4" className="bbdMenu_submenu noChild">
                            <Link to="/companyWatch" className="bbdMenu_submenuTitle" activeClassName="active">
                                <span>
                                    <i className="iconleft iconfont icon-monitor"></i>
                                    <span>企业变化检测</span>
                                </span>
                            </Link>
                        </li>
                    }
                </Right>
                <Right white="B_YWSJGL">
                    {
                        () => <li key="5" className="bbdMenu_submenu">
                            <a href="javascript:;" className="bbdMenu_submenuTitle">
                                <span>
                                    <i className="iconleft iconfont icon-dm"></i>
                                    <span>业务数据管理</span>
                                    <i className="iconright iconfont icon-arrowdown"></i>
                                </span>
                            </a>
                            <ul className="bbdMenu bbdMenu_sub">
                                <li key="6" className="bbdMenu_submenu">
                                    <a href="javascript:;" className="bbdMenu_submenuTitle bbdMenu_submenu_sub">
                                        <span>
                                            <span>数据导入</span>
                                            <i className="iconright iconfont icon-arrowdown"></i>
                                        </span>
                                    </a>
                                    <ul className="bbdMenu bbdMenu_sub">
                                        <li className="bbdMenu_item">
                                            <Link to="/companyLeadin" activeClassName="active">企业名单快捷导入</Link>
                                        </li>
                                        <li className="bbdMenu_item">
                                            <Link to="/industryManage" activeClassName="active">行业数据管理</Link>
                                        </li>
                                        <li className="bbdMenu_item">
                                            <Link to="/newsManage" activeClassName="active">舆情数据管理</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li key="7" className="bbdMenu_submenu">
                                    <a href="javascript:;" className="bbdMenu_submenuTitle bbdMenu_submenu_sub">
                                        <span>
                                            <span>数据导出</span>
                                            <i className="iconright iconfont icon-arrowdown"></i>
                                        </span>
                                    </a>
                                    <ul className="bbdMenu bbdMenu_sub">
                                        <li className="bbdMenu_item">
                                            <Link to="/export" activeClassName="active">快捷导出</Link>
                                        </li>
                                        <li className="bbdMenu_item">
                                            <Link to="/publicTrust" activeClassName="active">公信中心数据管理</Link>
                                        </li>
                                        <li className="bbdMenu_item">
                                            <Link to="/naturalSearch" activeClassName="active">自然人检索</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li key="8" className="bbdMenu_submenu">
                                    <a href="javascript:;" className="bbdMenu_submenuTitle bbdMenu_submenu_sub">
                                        <span>
                                            <span>数据修改</span>
                                            <i className="iconright iconfont icon-arrowdown"></i>
                                        </span>
                                    </a>
                                    <ul className="bbdMenu bbdMenu_sub">
                                        <li className="bbdMenu_item">
                                            <Link to="/parkManage" activeClassName="active">园区楼宇管理</Link>
                                        </li>
                                        <li className="bbdMenu_item">
                                            <Link to="/companyChange" activeClassName="active">企业信息变更</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    }
                </Right>
                
            </ul>
        );
    }
}

export default Menu;

