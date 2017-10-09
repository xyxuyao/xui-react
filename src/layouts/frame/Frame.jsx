/**
 * @desc 页面整体框架组件
 */
import './frame.scss';
import React, { Component } from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import SideBar from '../sideBar/SideBar';
// import Loading from '../../components/common/loading/Loading';

export default class Frame extends Component {
    render() {
        return (
            <div className="frame_root">
                <div className="frame_header">
                    <Header/>
                </div>
                <div className="frame_sideBar"> 
                    <SideBar/>
                </div>
                <div className="frame_container clearfix">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

