import {commonParams, options} from './config'

export function getRecommend() {//服务器上设置代理，此处只需要加上域名后面的路径即可
  const url = '/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })

    return axios.get(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch((e) => {
        console.log(e)
    })
}

export function getDiscList() {
  const url = '/api/v8/fcg-bin/getmv_by_tag'
    const data = Object.assign({}, commonParams, {
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        cmd: 'shoubo',
        lan: 'all'
    })

    return axios.get(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch((e) => {
        console.log(e)
    })
}
 

