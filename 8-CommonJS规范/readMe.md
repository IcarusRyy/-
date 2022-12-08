# CommonJS规范
## 模块化
**什么是模块化？**
模块简单理解就是一个代码片段，按照不同的功能拆分为一个个代码片段，这个代码片段就是每一个模块。 
**CommonJS是社区定义的JS模块化规范，同时也是Node.js中默认使用的模块化标准。**
在CommonJS中，一个JS文件就是一个模块。
CommonJS实际上就是闭包
- 引入模块
  - 使用require("模块路径(相对路径)")函数引入模块
    - **require()是同步的，会造成阻塞**
- 在定义模块时，模块中的内容默认是不能被外部看到的
  - 通过exports来设置要向外部暴露的内容
    - 访问exports的方式有两种
        - exports
        - module.exports
    - 当我们在其他模块中引入当前模块时，require函数返回的就是exports暴露的信息
  - 扩展名可以省略
- 默认情况下，Node.js会将以下内容视为CommonJS模块：
  - 使用.cjs为扩展名的文件
  - 当前的package.json属性为commonjs时，扩展名为.js文件
  - 当前的package.json不包含type属性的时候，扩展名为.js文件
  - 文件的扩展名为mjs、cjs、json、node、js以外的值时（type不是module时）
- require是同步加载模块的方法，所以无法用来加载ES6的模块，当我们需要在CommonJS中加载ES6模块时，需要通过import()方法来加载
- 文件夹作为模块
  - 默认引入的是该文件夹下面的index.js文件
- 所有的模块中的全局变量、函数，均不会产生污染
## CommonJS执行原理
```
module
exports
require
```
**所有的CommonJS的模块都会被包装到一个函数中**
``
function(exports, require, module, __filename, __dirname){ 模块代码 }
``
```
// 所有的实参都被放在arguments里面，所以查看arguments
```