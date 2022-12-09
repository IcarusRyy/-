# ES模块化规范
- 默认情况下。node中的模块化标准是CommonJS
  - 要想使用ES的模块化，采用下面两种方式
    - 1、使用mjs为扩展名
    - 2、直接修改package.json将模块化规范设置为ES
      - type属性设置为module，当前项目下所有对js文件都默认为es module规范
        - ``{"type":"module"} // 一般都是采用CommonJS规范``
  - 一个模块中，只能有一个默认导出
  - 通过ES模块化，导入的内容都是常量
  - ES模块都是运行在严格模式下