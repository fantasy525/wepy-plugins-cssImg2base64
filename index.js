
import path from 'path';
import fs from 'fs';
import mime from 'mime';

export default class {
  constructor(c = {}) {
    this.setting = Object.assign({}, {
      css: true,
      html: false
    }, c);
  }
  apply(op) {
    const { code, file } = op;
    if (code && !/app\.js/.test(file)) {
      if(op.type!=='css'){
        op.next();
      }
      else{
        const reg =  /background:\s*url\(("|')(\S+)("|')\)/gi
        const imgPaths =  [];
        let result
        let fileName
        let imgRelativePath
        while ((result=reg.exec(code))!=null){
          imgPaths.push(result[2]) //获取background:url("../abc/cloun.png")中的"../abc/cloun.png"
        }
        imgPaths.map(imgPath => {
          imgRelativePath=imgPath
          imgPath=imgPath.replace(/(\.\.\/)*/g,'')// 去掉路径中的../ ../../ 等字符
          fileName=imgPath.match(/\/([^\/]+\.(jpg|png|gif|jpeg))/)[1]?imgPath.match(/\/([^\/]+\.(jpg|png|gif|jpeg))/)[1]:''//获取图片的文件名
          const pathFile = path.join(process.cwd(), this.setting.path || '', fileName);// 配合传入的参数获取图片的绝对路径
          try {
            const bData = fs.readFileSync(pathFile);
            const base64Str = bData.toString('base64');
            const mimeType = mime.lookup(pathFile);
            const dataUri = `data:${mimeType};base64,${base64Str}`;
            op.code = op.code.replace(`"${imgRelativePath}"`, `${dataUri}`);
          } catch (e) {
            console.error('读取图片失败:', pathFile);
          }
        });
      }
    }
    op.next();
  }
}
