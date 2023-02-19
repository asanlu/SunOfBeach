// import store from '@/store'

const baseURL = 'https://api.sunofbeaches.com';

export const request = (url = '', options = {}) => { // options同 uni.request 参数相同

    let head = {
        'content-type': options.requestType == 'form' ? 'application/x-www-form-urlencoded' : 'application/json'
    }
    if (options.header) {
        head = Object.assign(head, options.header);
    }

    return new Promise((resolve, reject) => {
        return uni.request({
            url: baseURL + url,
            method: options.method || 'GET', // 默认get
            data: options.data || {},
            header: head,
            responseType: options.responseType || undefined,
            success: (res) => {
                // l_c_i：图灵验证码校验用
                if (res.header.l_c_i) {
                    // 添加responseType: 'arraybuffer', buffer转base64
                    const arrayBuffer = new Uint8Array(res.data)
                    const base64URL = "data:image/png;base64," + uni.arrayBufferToBase64(arrayBuffer);
                    resolve({
                        l_c_i: res.header.l_c_i,
                        base64URL
                    });
                }
                // token
                // if(res.header.sob_token){
                //     store.commit('login/setSobToken');
                // }

                // console.log('=http data==', res)
                resolve(res.data)
            },
            fail: (err) => {
                console.log('error message', err);
                reject(err)
            }
        })
    })
}
export const requestExtra = (url = '', options = {}) => { // options同 uni.request 参数相同
    // const requestType = options.requestType == 'form' ? 'application/x-www-form-urlencoded' : 'application/json';

    return new Promise((resolve, reject) => {
        return uni.request({
            url: baseURL + url,
            method: options.method || 'GET', // 默认get
            data: options.data || {},
            header: {
                'content-type': 'application/json',
                'Authorization': ''
            },
            success: (res) => {
                // console.log('=http data==', res)
                resolve(res.data)
            },
            fail: (err) => {
                console.log('error message', err);
                reject(err)
            }
        })
    })
}
