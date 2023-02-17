const baseURL = 'https://api.sunofbeaches.com';

export const request = (url = '', options = {}) => { // options同 uni.request 参数相同
    const requestType = options.requestType == 'form' ? 'application/x-www-form-urlencoded' : 'application/json';

    return new Promise((resolve, reject) => {
        return uni.request({
            url: baseURL + url,
            method: options.method || 'GET', // 默认get
            data: options.data || {},
            header: {
                'content-type': requestType,
                'Authorization': ''
            },
            success: (res) => {
                // 返回数据
                // console.log('=http data==', res.data)
                resolve(res.data)
            },
            fail: (err) => {
                console.log('error message', err);
                reject(err)
            }
        })
    })
}
