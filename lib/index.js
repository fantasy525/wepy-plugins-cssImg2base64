'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, _class);

    this.setting = Object.assign({}, {
      css: true,
      html: false
    }, c);
  }

  _createClass(_class, [{
    key: 'apply',
    value: function apply(op) {
      var _this = this;

      var code = op.code,
          file = op.file;

      if (code && !/app\.js/.test(file)) {
        if (op.type !== 'css') {
          op.next();
        } else {
          var reg = /background:\s*url\(("|')(\S+)("|')\)/gi;
          var imgPaths = [];
          var result = void 0;
          var fileName = void 0;
          var imgRelativePath = void 0;
          while ((result = reg.exec(code)) != null) {
            imgPaths.push(result[2]); //获取background:url("../abc/cloun.png")中的"../abc/cloun.png"
          }
          imgPaths.map(function (imgPath) {
            imgRelativePath = imgPath;
            imgPath = imgPath.replace(/(\.\.\/)*/g, ''); // 去掉路径中的../ ../../ 等字符
            fileName = imgPath.match(/\/([^\/]+\.(jpg|png|gif|jpeg))/)[1] ? imgPath.match(/\/([^\/]+\.(jpg|png|gif|jpeg))/)[1] : ''; //获取图片的文件名
            var pathFile = _path2.default.join(process.cwd(), _this.setting.path || '', fileName); // 配合传入的参数获取图片的绝对路径
            try {
              var bData = _fs2.default.readFileSync(pathFile);
              var base64Str = bData.toString('base64');
              var mimeType = _mime2.default.lookup(pathFile);
              var dataUri = 'data:' + mimeType + ';base64,' + base64Str;
              op.code = op.code.replace('"' + imgRelativePath + '"', '' + dataUri);
            } catch (e) {
              console.error('读取图片失败:', pathFile);
            }
          });
        }
      }
      op.next();
    }
  }]);

  return _class;
}();

exports.default = _class;