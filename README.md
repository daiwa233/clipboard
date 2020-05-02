# awesome  upload Image from clipboard

从剪贴板获得图片上传到第三方云存储空间 :cloud:

针对有道云笔记的markdown笔记做一个Chrome插件，简单配置后可以在其中直接粘贴图片，而不需要开会员

目前大致功能已经完成，并且把前端代码打包成可以直接使用的放入了Chrome extension目录

配置项大致完成。

如果可以的话下个目标是对有道云笔记中图片进行缩放

## 使用
clone到本地，然后可以使用Chrome加载已解压的扩展程序，选择client/chrome_extension文件夹。

启动服务端代码
```shell
node index.js
```
然后添加第三方云空间的配置信息即可在有道云笔记网页版的markdown中粘贴并上传图片
