import { AltText, domain } from './config.js'

const query = (str) => document.querySelector(str);

// 生成图片的url
const generateUrl = (Fname) => `![${AltText}](${domain}/${Fname})`;

// 生成图片name
const  generateFName = () => window.btoa(Date.now()) + Math.random().toString(36).substr(2);// 再加上时间戳base64转码

// 构造并触发一个paste事件。
// 根据规范，构造的paste事件不会改变文档内容，即默认事件不会被触发
// 有道云网页版只是利用了paste事件中的内容，利用这点可以完成任务
const pasteEvent = (el, str) => {
  // 只需要实现Chrome中的即可，有道云笔记最新版不支持ff
  let event = new ClipboardEvent('paste', {
    clipboardData: new DataTransfer()
  })
  event.clipboardData.items.add(str, 'text/plain');
  el.dispatchEvent(event);
}

export { query, generateFName, generateUrl, pasteEvent }


// // 构造paste事件
// // 规范
// let pasteEvent = new ClipboardEvent('paste')
// pasteEvent.clipboardData.items.add('My string', 'text/plain'); // 第一个参数是内容，第二个参数是mime type类型
// document.dispatchEvent(pasteEvent);

// // ff 按照规范实现

// // chrome 没有按照规范实现,但是可以按以下做

// let pasteEvent = new ClipboardEvent('paste', {
//   clipboardData: new DataTransfer()
// }) // 不初始化的话pasteEvent.cliboardData 为null，且只读

// pasteEvent.clipboardData.items.add('My string', 'text/plain');