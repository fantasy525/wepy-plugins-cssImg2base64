# wepy-plugins-cssImg2base64
wepy插件，转换wepy文件中的背景图为base64
### 用法
> 工作忙，没时间上传到npm上去了，现在只能手动来了，主要是上传那玩意有点麻烦
1.  git克隆项目，然后把整个文件夹放到wepy项目的node_modules中去
2.  wepy.config.js中配置一下
```javascript
 plugins: {
    'cssImgbase64': {//此处key为克隆下来的文件夹名字,cssImg2base64
      path: 'src/assets'// 此处是你放背景图的地方，建议放在src下面
    }
  },
```
3. 然后就可以 ```npm run dev ```
