import { query, generateFName, generateUrl, pasteEvent } from './util.js'
import { iframeID } from './config.js'


let mainEl;

let focusFlag = false;
function pasteHandler(e) {
  if (!focusFlag) {
    return;
  }
  // 不能阻止默认事件，也不能阻止冒泡，只要修改粘贴的图片为字符串，即可
  // 该方法不可行，因为clearData这个方法不能清除文件。。失败
  // 当粘贴板中的内容是图片时，取消冒泡 来阻止有道云的让开会员的弹窗。
  // 文字时，不作任何改变。
  const { clipboardData: data}  = e,
        { types } = data;
  // 对于不支持获取剪贴板上的数据处理
  if (!(data && data.items)) return console.log('当前环境不支持获取剪贴板上的数据');

  let isImg = types.some(item => item === 'Files'); 
  // 当type中存在files时，一定是图片，系统中的文件在粘贴板上获得不到
  // 如果存在图片,则需要清除粘贴板中的data
  if (isImg) {
    // 取消冒泡
    e.stopPropagation();
    let Fname = generateFName(),
        file = null;
    // 获得图片
    for (let i = 0; i < data.items.length; i++) {
      let item = data.items[i];
      
      if (item.type.includes("image")) {
        Fname = Fname + '.'+item.type.split('/')[1]; // 添加类型
        file = item.getAsFile();
        break;
      }
      
    }
    // 构造paste事件
    pasteEvent(mainEl, generateUrl(Fname))
    const uploadFile = new FormData();
    uploadFile.append('ImgBlob', file);
    uploadFile.append('Fname', Fname)
    // 上传图片
    axios
    .post('http://localhost:3001/upload',uploadFile)
    .then(res => {
      const { data } = res;
      if (data.status !== 200) {
        console.log('在上传过程中出现问题')
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  // 不是图片就是文字，让其冒泡以便被有道云笔记中的脚本捕获的事件
}


export function initEvent() {
  const iframeEl = query(`#${iframeID}`).contentWindow
  mainEl = iframeEl.document.querySelector('textarea');

  mainEl.addEventListener('focus', function(e) {
    focusFlag = true
  })
  mainEl.addEventListener('blur', function(e) {
    focusFlag = false
  })
  mainEl.addEventListener('paste', pasteHandler)

}





