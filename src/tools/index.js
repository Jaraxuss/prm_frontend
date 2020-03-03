import '../config/config';
import {
  DEV_SERVER, ECHART_TEST_SERVER,
  INQUIRY_DEV_SERVER,
  INQUIRY_PRODUCTION_SERVER,
  INQUIRY_TEST_SERVER,
  LOCAL_DEV_SERVER,
  PRODUCTION_SERVER,
  TEST_SERVER,
} from '../config/config';
import { store } from '../index';
import { handleControlLoading } from '../features/home/redux/actions';
import Global from '../common/global';


export const HTTP_REQUEST_QUEUE = [];

export function getUrlRelativePath() {
  const url = document.location.toString();
  const arrUrl = url.split('//');

  const start = arrUrl[1].indexOf('/');
  let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

  if (relUrl.indexOf('?') !== -1) {
    relUrl = relUrl.split('?')[0];
  }
  return relUrl;
}


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.status);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

function showLoading() {
  store.dispatch(handleControlLoading(true));
}

function hideLoading(response) {
  store.dispatch(handleControlLoading(false));
  return response;
}

function isPassCheckSystemParam() {
  // return (localStorage.getItem('appId') && localStorage.getItem('userId'));
  return true;
}

function formatURL(url, requestTo = Global.HTTP_REQUEST_TO_YSB) {

  if (requestTo === Global.HTTP_REQUEST_TO_YSB) {

    let prefix = '';
    if (process.env.NODE_ENV === 'dev') {
      prefix = DEV_SERVER;
    } else if (process.env.NODE_ENV === 'test') {
      prefix = TEST_SERVER;
    } else {
      prefix = PRODUCTION_SERVER;
    }
    return prefix + url;

  } else if (requestTo === Global.HTTP_REQUEST_TO_INQUIRY) {

    let prefix = '';
    if (process.env.NODE_ENV === 'dev') {
      prefix = INQUIRY_DEV_SERVER;
    } else if (process.env.NODE_ENV === 'test') {
      prefix = INQUIRY_TEST_SERVER;
    } else {
      prefix = INQUIRY_PRODUCTION_SERVER;
    }
    return prefix + url;

  } else if (requestTo === Global.HTTP_REQUEST_TO_LOCAL) {
    let prefix = '';
    if (process.env.NODE_ENV === 'dev') {
      prefix = LOCAL_DEV_SERVER;
    } else if (process.env.NODE_ENV === 'test') {
      prefix = ECHART_TEST_SERVER;
    } else {
      prefix = ECHART_TEST_SERVER;
    }
    // return ECHART_TEST_SERVER + url;
    return prefix + url;
  }
}

export function requestWithQueue(url, options = {}, callback) {
  if (isPassCheckSystemParam()) {
    const httpRequestObj = {
      url: url,
      param: { credentials: 'include', ...options },
      callback: callback,
    };

    HTTP_REQUEST_QUEUE.push(httpRequestObj);
    document.dispatchEvent(new Event('putHttpRequest'));
  }
}

export function checkRefreshToken(currResp, preUrl, preOptions) {
  if (false) {
    const refreshTokenUrl = localStorage.getItem('getTokenUrl');
    return window.fetch(refreshTokenUrl, {
      credentials: 'include',
      method: 'post',
      body: JSON.stringify({
        'accessToken': localStorage.getItem('accessToken'),
        'userId': localStorage.getItem('userId'),
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(checkStatus)
      .then(parseJSON)
      .then((subResp) => {
        localStorage.setItem('accessToken', subResp.accessToken);
        return subResp;
      })
      .then((subResp) => {
        return window.fetch(preUrl, {
          ...preOptions,
          accessToken: subResp.accessToken,
          timestamp: new Date().getTime() / 1000,
        }).then(checkStatus)
          .then(parseJSON);
      })
      .catch((err) => {
        hideLoading(err);
        console.error('request err: ', err);
        return Promise.reject(err);
      });
  } else {
    return currResp;
  }
}

export function request(url, options = {}, requestTo = Global.HTTP_REQUEST_TO_YSB) {
  if (isPassCheckSystemParam()) {
    // url = 'https://ysbang.maizicare.com/api/' + url;
    // showLoading();
    return fetch(formatURL(url, requestTo), { credentials: 'include', ...options })
      .then(checkStatus)
      .then(parseJSON)
      .then((resp) => {
        if (requestTo === Global.HTTP_REQUEST_TO_YSB) {
          return checkRefreshToken(resp, formatURL(url), options);
        } else {
          return resp;
        }
      })
      .then((resp) => {
        if (url.indexOf('intelligentDrugRecommend') === -1) {
          // hideLoading(resp);
        }
        return resp;
      })
      .then((data) => {
        if (requestTo === Global.HTTP_REQUEST_TO_YSB) {
          return data.data;
        } else if (requestTo === Global.HTTP_REQUEST_TO_INQUIRY) {
          return data;
        } else if (requestTo === Global.HTTP_REQUEST_TO_LOCAL) {
          return data.data;
        }
      })
      .catch((err) => {
        hideLoading(err);
        console.error('request err: ', err);
        return Promise.reject(err);
      });
  } else {
    return '';
  }
}

export function deleteItemInArray(array, item) {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

export function deepCloneArray(array) {
  return Array.from(JSON.stringify(array));
}

export function getQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return undefined;
}

export function PageScrollToTop() {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

export function parseSetListToArray(arr) {
  return Array.from(new Set(arr));
}

let canRunWindowOnScrollFn = true;

export function allowRunWindowOnScrollFn() {
  canRunWindowOnScrollFn = true;
}

export function listenWindowToBottom(fn) {
  window.onscroll = function() {
    //变量scrollTop是滚动条滚动时，距离顶部的距离
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //变量windowHeight是可视区的高度
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //变量scrollHeight是滚动条的总高度
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    //滚动条到底部的条件
    // if (canRunWindowOnScrollFn) {
    //   canRunWindowOnScrollFn = false;
    //   setTimeout(() => {
    //     canRunWindowOnScrollFn = true;
    //   }, 100);
    if (canRunWindowOnScrollFn && (scrollTop + windowHeight > scrollHeight - 600)) {
      canRunWindowOnScrollFn = false;
      //写后台加载数据的函数
      new Promise((resolve, reject) => {
        resolve(fn());
      }).then((e) => {
        // clearTimeout();
      }).catch((e) => {
        // clearTimeout();
      });
      // }
    }
  };
}

export function clearWindowOnScroll() {
  window.onscroll = function() {
  };
}

/**
 * @TODO 判断字符串是否含有中文
 * @param str
 * @return {boolean}
 */
export function hasChinese(str) {
  return escape(str).indexOf('%u') > -1;
}

export function printLogOnlyDev(msg) {

  if (process.env.NODE_ENV === 'dev') {
    console.log(msg);
  }

}

// export function deepCopyArray (obj) {
//   var newobj = obj.constructor === Array ? [] : {};
//   if(typeof obj !== 'object'){
//     return;
//   }
//   for(var i in obj){
//     newobj[i] = typeof obj[i] === 'object' ? deepCopyArray(obj[i]) : obj[i];
//   }
//   return newobj
// }

export function deepCopyArray(array) {
  return JSON.parse(JSON.stringify(array));
}