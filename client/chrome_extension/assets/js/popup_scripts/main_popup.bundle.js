!function(t){function e(e){for(var n,r,i=e[0],c=e[1],u=0,a=[];u<i.length;u++)r=i[u],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&a.push(o[r][0]),o[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);for(d&&d(e);a.length;)a.shift()()}var n={},o={0:0};function r(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var i=new Promise((function(e,r){n=o[t]=[e,r]}));e.push(n[2]=i);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,r.nc&&u.setAttribute("nonce",r.nc),u.src=function(t){return r.p+""+({}[t]||t)+"_popup.bundle.js"}(t);var d=new Error;c=function(e){u.onerror=u.onload=null,clearTimeout(a);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+r+": "+i+")",d.name="ChunkLoadError",d.type=r,d.request=i,n[1](d)}o[t]=void 0}};var a=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(e)},r.m=t,r.c=n,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r.oe=function(t){throw console.error(t),t};var i=window.webpackJsonp=window.webpackJsonp||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var d=c;r(r.s=1)}([function(t,e,n){"use strict";n.d(e,"d",(function(){return o})),n.d(e,"e",(function(){return r})),n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return u}));const o=t=>document.querySelector(t);function r(t,e){t.classList.remove("hidden"),t.innerText=e}function i(t){t.classList.add("hidden"),t.innerText=""}let c={qiniu:"七牛云"};function u(t,e=null){let n=new CustomEvent(t,e);document.body.dispatchEvent(n)}},function(t,e,n){"use strict";n.r(e);var o=n(0);const r=Object(o.d)("#app"),i=Object(o.d)("#home"),c=Object(o.d)("#qiniu-info-view"),u=Object(o.d)("#work-view"),d=Object(o.d)("#config-view"),a=Object(o.d)("#error-view");function l(){n.e(2).then(n.bind(null,2)).then(t=>{t.init()}),r.innerHTML="";let t=document.importNode(i.content,!0);r.appendChild(t)}function s(t){n.e(4).then(n.bind(null,4)).then(t=>{t.init()}),r.innerHTML="",u.content.querySelector("#type").textContent=o.b[t];let e=document.importNode(u.content,!0);r.appendChild(e)}function f(t){r.innerHTML="",a.content.querySelector("#error-view-msg").textContent=t;let e=document.importNode(a.content,!0);r.appendChild(e)}function p(){document.body.addEventListener("chooseType",(function(t){const{detail:e}=t;!async function(t){try{let{data:t}=await axios.get("http://localhost:3001/isInitial");if(t&&t.type)return void Object(o.c)("toWork",{detail:t.type})}catch{return void f("服务器未开启或者其它原因导致请求失败")}let e;"qiniu"===t&&(n.e(3).then(n.bind(null,3)).then(t=>{t.QiniuInit()}),e=document.importNode(c.content,!0)),r.innerHTML="",r.appendChild(e)}(e)}))}function h(){document.body.addEventListener("toConfig",(function(){!function(){n.e(1).then(n.bind(null,5)).then(t=>{t.init()}),r.innerHTML="";let t=document.importNode(d.content,!0);r.appendChild(t)}()}))}axios.defaults.withCredentials=!0,async function(){let t;try{t=await axios.get("http://localhost:3001/isInitial")}catch{return void f("服务器未开启或者其它原因导致请求失败")}const{status:e,type:n}=t.data;"200"==e?s(n):"301"==e&&l(),p(),document.body.addEventListener("backToHome",(function(){l()})),document.body.addEventListener("toWork",(function(t){const{detail:e}=t;s(e)})),h()}()}]);