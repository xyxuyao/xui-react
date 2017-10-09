import './sideBar.scss';
import React, {Component} from 'react';
import { Link } from 'react-router';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }
  	render() {
    	return (
        <div className="sidebar_root">
            <ul>
                <li><Link to="/pagination">分页</Link></li>
                <li><Link to="/autoComplete">自动补全</Link></li>
            </ul>
        </div>
    );
  }
}