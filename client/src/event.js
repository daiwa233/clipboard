import { query, generateFName, generateUrl } from '../util.js'


const mainEl = query('textarea');
let focusFlag = false;
let times = 0;
function pasteHandler(e) {
  if (!focusFlag) {
    times++
    if (times > 10) {
      console.log('选取的textarea可能发生改变了')
    }
    return;
  }
  // 不能阻止默认事件，也不能阻止冒泡，只要修改粘贴的图片为字符串，即可
  const { clipboardData: data}  = e,
        { types } = data;
  // 对于不支持获取剪贴板上的数据处理
  if (!(data && data.items)) return console.log('当前环境不支持获取剪贴板上的数据');

  let isImg = types.some(item => item === 'Files'); 
  // 当type中存在files时，一定是图片，系统中的文件在粘贴板上获得不到
  // 如果存在图片,则需要清除粘贴板中的data
  if (isImg) {
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

    types.forEach(item => {
      // 按类型清除
      data.clearData(item)
    })
    console.log(generateUrl(Fname))
    // 添加图片链接
    data.setData('text/plain', generateUrl(Fname))
    console.log(data.items)
  }




  console.log(data)
  console.log(data.types)
  // 获得图片
  for (let i = 0; i < data.items.length; i++) {
    let item = data.items[i];
    
    // getAsString()方法是异步的。。。 坑
    item.getAsString((src) => {
           
     console.log(src)

    })
    
  }
}


export function initEvent() {
  mainEl.addEventListener('focus', function(e) {
    focusFlag = true
  })
  mainEl.addEventListener('blur', function(e) {
    focusFlag = false
  })
  mainEl.addEventListener('paste', pasteHandler)

}


mainEl.addEventListener('paste', function(e) {
  const {clipboardData: data} = e;
  
  console.log(data.types)
  // 清除所有类型数据
  data.clearData()
  

  // 添加图片链接
  data.setData('text/plain', '123123')
  
  for (let i = 0; i < data.items.length; i++) {
    let item = data.items[i];
    console.log(item)
    // getAsString()方法是异步的。。。 坑
    item.getAsString((src) => {
           
     console.log(src)

    })
    
  }
})