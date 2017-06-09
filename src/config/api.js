/**
 * Created by zjl on 2017/6/7.
 */

//API port address
let root = "http://iface.qiyi.com/openapi/realtime/";

let axios = require('axios');

//common parameters
const defaultParam = {
  version: 7.5,
  app_k: 'f0f6c3ee5709615310c0f053dc9c65f2',
  app_v: 8.4,
  app_t: 0,
  platform_id: 12,
  dev_os: '10.3.1',
  dev_ua: 'iPhone9,3',
  dev_hw: '{"cpu":0,"gpu":"","mem":"50.4MB"}',
  net_sts: 1,
  scrn_sts: 1,
  scrn_res: '1334*750',
  scrn_dpi: 153600,
  qyid: '87390BD2-DACE-497B-9CD4-2FD14354B2A4',
  secure_v: 1,
  secure_p: 'iPhone',
  core: 1,
  req_sn: 1493946331320,
  req_times: 1
};

//determine the type of obj
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// filter the parameters
function filterNull (o) {
  for (let key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}


function apiAxios (method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  console.log(Object.assign(params, defaultParam));
  axios({
    method: method,
    url: url,
    params: Object.assign(params, defaultParam),
    baseURL: root,
    withCredentials: false
  })
    .then(function (res) {
      console.log(res);
      if (res.data.code === 100000 || res.data.code === 0) {
        if (success) {
          success(res.data);
        }
      } else {
        if (failure) {
          failure(res.data.errorReason)
        } else {
          window.alert('error: ' + JSON.stringify(res.data.errorReason))
        }
      }
    })
    .catch(function (err) {
      let res = err.response;
      if (err) {
        window.alert('api error, HTTP CODE: ' + res);
      }
    })
}

// return the API
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}
