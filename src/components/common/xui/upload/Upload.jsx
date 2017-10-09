import React, { Component } from 'react';
import Tip from '../tip/Index';
import './Upload.scss';

class Upload extends Component {
    static defaultProps = {
        accept: '*', // 支持上传文件类型
        multiple: true, // 是否支持多选
        isImmediate: false // 是否立即上传
    }

    constructor () {
        super ();
        this.allFiles = {}; // 被选择上传的所有文件

        // 是否是IE9
        this.isIE9Version = (() => {
            // 这个组件只针对 IE9+ 所以 若是IE浏览器时，版本默认就是9 或 9+
            const navigator = window.navigator;
            const appName = navigator.appName;
            const appVersion  = navigator.appVersion;
            // return true;
            return appName === 'Microsoft Internet Explorer' && /MSIE9\.0/.test(appVersion);
        })();

        /*
        * 选择文件回调
        * @params e { Obj } 事件对象
        * */
        this.selectFile = (e) => {
            const { change, isImmediate } = this.props;
            let files = [...e.target.files]; // 将类数组转成数组
            let file = files[0];
            let flag = this.checkfileType(file);
            if(flag){
                // files.map(item => this.allFiles[item.name] = item); // 去重处理
                // let allFiles = this.allFiles;
                change(files, file);
                if (isImmediate) {
                    // 用户选择文件 立即上传
                    this.allFiles = {};
                    files.map(item => this.allFiles[item.name] = item); // 去重处理
                    this.submits();
                }
            }else{
                Tip.warning('请选择正确的文件类型');
            }
            e.target.value = '';
        };
        this.submits = this.submits.bind(this);
    }
    componentDidMount () {
        // 针对IE9上传完毕后回调
        const complete = this.props.complete;
        if(complete){
            this.iframeDom.onload = function() {
                complete(this.contentWindow.document.body.innerHTML);
            };
        }  
    }
    checkfileType(file){
        let filename = file.name;
        var index = filename.lastIndexOf('.');
        var ext = filename.substr(index + 1);
        let arr = this.props.fileType;
        let flag = arr.indexOf(ext) < 0 ? false : true;
        return flag;
    }
    submits(){
        if (this.isIE9Version) {
            return () => this.formDom.submit();
        }
        const files = this.allFiles;
        if(this.props.submit){
            this.props.submit(files);
        }
    }
    render () {
        const {
            accept,
            multiple,
            serverUrl,
            isImmediate,
            submitText
        } = this.props;
        let icon = this.props.icon ? <i className={'iconfont '+this.props.icon}></i>:'';
        return (
            <div className= "upload_root">
                <iframe
                    name="upload_iframe"
                    className="upload_iframe"
                    ref={iframe => this.iframeDom = iframe}
                > </iframe>

                <form
                    method="post"
                    action={serverUrl}
                    target="upload_iframe"
                    className="upload_form"
                    encType="multipart/form-data"
                    ref={form => this.formDom = form}
                >
                    <label
                        className="upload_label"
                        htmlFor="upload_input"
                    >  
                        {icon}
                        <span className="upload_name">{this.props.uploadName}</span>
                        <input
                            type="file"
                            name="file"
                            id="upload_input"
                            accept={accept}
                            multiple={multiple}
                            className="upload_input"
                            onChange={this.selectFile}
                        />
                    </label>
                </form>
                {
                    isImmediate ? null :  <button className="upload_submit btn bbdBtn_root" onClick={this.submits}>{submitText}</button>
                }
            </div>
        );
    }
}

export default Upload;