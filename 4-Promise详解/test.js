const promise = new Promise((resolve, reject) => {
  resolve("初始数据")
})
promise
  .then((result) => {
    console.log(result) // 初始数据
    return "第一个then"
  })
  .then((result) => {
    console.log(result) // 第一个then
  })
