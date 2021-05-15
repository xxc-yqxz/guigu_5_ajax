'use strict';

var _module = require('./module1');

var module1 = _interopRequireWildcard(_module);

var _module2 = require('./module2');

var _module3 = require('./module3');

var _module4 = require('./module4');

var _module5 = _interopRequireDefault(_module4);

var _module6 = require('./module5');

var _module7 = _interopRequireDefault(_module6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//引入【统一暴露】的模块（统一暴露和分别暴露，最后引入的方式都是一样的）（和上面三种引入方式同理）
// 此处并非解构赋值，只是ES6中规定的导入写法。

//引入【分别暴露】的模块+重命名
console.log(_module5.default); //{name: "wc", age: 5}
// import { name, age } from './module4' // undefined undefined 如果这么写，import 会查找文件中是否有分别暴露name和age。

//引入多种暴露方式的模块


//引入【默认暴露】的模块


//引入【分别暴露】的模块+打包引入
//引入【分别暴露】的模块

console.log(_module7.default);
console.log(_module6.teacher1);
console.log(_module6.teacher2);
console.log(_module6.stu1);
console.log(_module6.stu2);