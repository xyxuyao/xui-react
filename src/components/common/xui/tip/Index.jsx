import './style.scss';

let Tip = {};
Tip.init = function(opt){
    let id = 'bbdTip_box_'+new Date().getTime();
    let box = document.createElement('div');
    let p = document.createElement('p');
    let root = document.getElementById('bbdTip_root'); // ÈÝÆ÷
    if(!root){
        root = document.createElement('div');
        root.setAttribute('id','bbdTip_root');
        document.body.appendChild(root);
    }

    box.setAttribute('id',id);
    box.setAttribute('class','bbdTip_box animated fadeInDown');
    p.setAttribute('class','bbdTip_content');
    p.innerHTML = '<i class="iconfont icon-'+opt.type+'"></i>'+opt.msg;
    box.appendChild(p);
    root.appendChild(box);

    // Çå³ý
    setTimeout(function(){
        box.setAttribute('class',box.getAttribute('class').replace(' fadeInDown','')+' fadeOutUp');
        box.style.height = 0;
        box.style.marginTop = 0;
        setTimeout(function(){
            try{
                box.remove();
            }catch(e){
                box.removeNode(true);
            }
            opt.callback && opt.callback(box);
        },800);
    },opt.time || 2000);
};

Tip.warning = function(msg,time,callback){
    this.init({ msg,time,callback,type: 'jinggao' });
};
Tip.success = function(msg,time,callback){
    this.init({ msg,time,callback,type: 'wancheng' });
};
Tip.error = function(msg,time,callback){
    this.init({ msg,time,callback,type: 'icon-yxj-error' });
};
export default Tip;