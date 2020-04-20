// 处理popup 页面中的请求脚本
import {
  query,
  showMessage,
  hideMessage,
  publish
} from '../util.js'

let messageFlag = false;
export function QiniuInit() {
  const access = query('#access'),
    secret = query('#secret'),
    scope = query('#scope'),
    zone = query('#zone'),
    domain = query('#domain'),
    type = 'qiniu',
    submit = query('#submit'),
    messageEl = query('#message'),
    formEL = query('#init-post'),
    back = query('#back');


  submit.addEventListener('click', function (e) {
    e.preventDefault();
    if (!(access.value && secret.value && scope.value && zone.value && domain.value)) {
      messageFlag = true;
      showMessage(messageEl, '请完整填写表单');
      return;
    }
    axios.post('http://localhost:3001/initzone', {
      type,
      accessKey: access.value,
      secretKey: secret.value,
      zone: zone.value,
      scope: scope.value,
      domain: domain.value
    }).then(res => {
      const {
        status,
        type
      } = res.data;
      if (status == '302') {
        showMessage(messageEl, '已经实例了一个存储空间')
      } else if (status == '402') {
        showMessage(messageEl, '缺少配置项')
      } else if (status == '200') {
        // 配置成功的话将一些配置项添加到localStorage
        localStorage.setItem('clipboardData', {
          AltText: 'image',
          domain: domain.value,
          iframeID: 'mdEditor'
        });
        publish('toWork', {detail: type})
      } else {
        showMessage(messageEl, '配置项错误')
      }
    }).catch(err => {
      console.log(err)
    })

  })

  formEL.addEventListener('input', function (e) {
    if (messageFlag) {
      hideMessage(messageEl)
    }
  })
  // 通知订阅者改变视图
  back.addEventListener('click', function () {
    publish('backToHome')
  })

}