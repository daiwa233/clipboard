import { query, generateFName, generateMDUrl, pasteEvent } from './util.js'
import { iframeID, uploadImpl } from './config.js'


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
  // 如果存在图片,则需要清除粘贴板中的data或者阻止事件冒泡
  // MDN中关于clearData方法表示不能清除文件，所以只能阻止冒泡，阻止向上传播
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
    pasteEvent(mainEl, generateMDUrl(Fname))

    const uploadFile = new FormData();
    uploadFile.append('ImgBlob', file);
    uploadFile.append('Fname', Fname)
    // 上传图片
    axios
    .post(`${uploadImpl}/upload`,uploadFile)
    .then(res => {
      const { data } = res;
      if (data.status !== 200) {
        // 应该调用popup，弹出上传失败的原因
        // todo 
        console.log('在上传过程中出现问题')
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}


export function initEvent() {
  const iframeEl = query(`#${iframeID}`).contentWindow;
  if (iframeEl) {
    mainEl = iframeEl.document.querySelector('textarea');
  }
  if (mainEl) {
    mainEl.addEventListener('focus', function(e) {
      focusFlag = true;
    });
    mainEl.addEventListener('blur', function(e) {
      focusFlag = false;
    });
    mainEl.addEventListener('paste', pasteHandler);
  } else {
    // 其实在请求接口上报就更好了 hh
    console.log('没能找到粘贴事件的textarea');
  }

}





