import { query, publish } from '../util.js'

// 像我之前写的那样，这个模块单纯的只是添加事件监听，
// 那么在这个页面被去除时，垃圾回收机制会清理掉事件监听器，
// 而且由于import方法第二次加载不执行代码，导致出现问题
// 因为节点不存在了，所以要导出一个init方法，在引入包之后调用

export function init() {
  const zoneGroup = query('#zone-group');

zoneGroup.addEventListener('click', function(e) {
  const { target } = e;
  let type = target.getAttribute('data-type');
  
  // 发布事件， 通知另一个模块改变视图
  publish('chooseType', {detail: type});
})
}
