/**
 * @desc 封装了cookie使用
 */
export function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + encodeURI(value);
}

export function getCookie(name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(name + '=');
        if (c_start !== -1) {
            c_start = c_start + name.length + 1;
            var c_end = document.cookie.indexOf(';', c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
}

export function clearCookie(){
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i =  keys.length; i--;) {
            document.cookie = keys[i] + '=0;expires=' + new Date( 0).toUTCString();
        }
    }
}