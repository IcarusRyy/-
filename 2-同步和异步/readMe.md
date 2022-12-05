# 同步和异步
  ## 进程
  进程：程序的运行环境 比如网易云和微信就是两个进程
  ## 线程
  线程：实际进行运算的东西 一个执行单元
  ## 同步
  同步：
  - 自上而下依次执行
  - 前面的代码不执行后面的代码也不会执行
  - 同步的代码会出现阻塞

  ```

    console.log('同步1');

    console.log('同步2');

    console.log('同步3');
  ```
  解决同步问题
  - java python 通过多线程解决
  - node.js 通过异步接近
  ```
    function sum(a,b){
      const begin = Date.now()
      while(Date.now() - begin){}
      return a + b
    }
    console.log('1')
    const res = sum(1,2)
    console.log(res)
    console.log('2')
    // 1 , 3,  2
  ```
## 异步
一段代码的执行不会影响其他代码执行，不会造成阻塞
- 异步的代码无法通过return返回
- 特点
  - 不会阻塞其他代码的执行
  - 需要通过回调函数返回执行结果 
- 基于回调函数的异步带来的问题
  - 造成地狱回调，可读性差
  - 可调试性差
- 解决方式：
  - 通过Promise 解决地狱回调的问题， Promise用来存储异步调用的返回数据
 ```
    function sum(a,b){
      // const begin = Date.now()
      // while(Date.now() - begin){}
      // return a + b
      setTimeout(()=>{
        return a + b
      }, 10000)
    }
    console.log('1')
    const res = sum(1,2)
    console.log(res)
    console.log('2')
    // 1 , undefined  2
  ```
  ```
  function sum(a,b, cb){
      setTimeout(()=>{
        cb(a + b)
      }, 10000)
    }
    console.log('1')
    const res = sum(1,2, (res) => console.log(res, 'res'))
    console.log(res)
    console.log('2')
    // 1 , undefined,  2, 3 res
  ```