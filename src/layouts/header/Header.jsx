/**
 * @desc 头部
 * @author xuyao
 */
import './header.scss';
import React, { Component } from 'react';
import {Link } from 'react-router';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }
    componentDidMount(){
       //
    }
    render() {
        return (
            <div className="header_root">
                <div className="header_logo">
                    <a href="/">XUI</a>
                </div>
                <ul className="header_nav">
                    <li><Link activeClassName="active" to="/">组件库</Link></li>
                </ul>
            </div>
        );
    }
}