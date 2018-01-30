# wepy-plugin-cssImgbase64
wepy插件，转换wepy文件中的背景图为base64
### 用法
> 好像wepy的插件的包的文件夹必须是wepy-plugin-xxx的形式，也就是对应着npm包名的形式，但是npm发布时一直提示包名有问题，没办法，叫这个名字吧，npm安装后要去node_modules里面找到手动更改包的文件夹名字。
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

