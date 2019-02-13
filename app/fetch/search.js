import { commonParams, options } from './config'

export function getHotKey() {
  const url = '/api/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
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

export function search(query, page, zhida) {
  const url = '/api/soso/fcgi-bin/search_for_qq_cp'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: utf - 8,
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    p: page,
    remoteplace: 'txt.mqq.all'
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