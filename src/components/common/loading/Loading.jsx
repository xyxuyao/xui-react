import './loading.scss';
import loading from '../../images/loading.gif';
import React, {Component} from 'react';
import classNames from 'classnames';
import {Event} from '../../constants/common';
import emitter from '../../utils/emitter';

export default class Loading extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            hide: false
        };        
        this.showLoading = this.showLoading.bind(this);
        this.hideLoading = this.hideLoading.bind(this);
    }

    componentWillMount(){
        let vis = this.props.hide;
        this.setState({hide: vis});
        emitter.on(Event.SHOW_LOADING, this.showLoading);
        emitter.on(Event.HIDE_LOADING, this.hideLoading);
    }

    componentWillUnmount() {
        emitter.removeListener(Event.SHOW_LOADING, this.showLoading);
        emitter.removeListener(Event.HIDE_LOADING, this.hideLoading);
        this.showLoading = null;
        this.hideLoading = null;
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.hide !== this.state.hide){
            this.setState({hide: nextProps.hide});
        }
        
    }
    showLoading(){
        if(this.state.hide){
            this.setState({
                hide: false
            });
        }
    }
    hideLoading(){
        if(!this.state.hide){
            this.setState({
                hide: true
            });
        }
    }

    render(){
        return (
            <div className={classNames({loading: true, otherhide: this.state.hide})}>
                <div className="loading-dialog">
                    <img src={loading} />
                </div>
            </div>
        );
    }
}