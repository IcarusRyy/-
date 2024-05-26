// function processTasks(...tasks){
//   let isRunning = false
//   const result = []
//   let i = 0
//   return {
//     start(){
//       return new Promise(async resolve => {
//         if(isRunning){
//           return
//         }
//         isRunning = true
//         // 依次执行任务
//         while(i < tasks.length){
//           const r = await tasks[i]()
//           result[i] = r
//           i++
//           if(!isRunning){
//             return
//           }
//         }
//         isRunning = false
//         resolve(result)
//       })
//     },
//     pause(){
//       isRunning = false
//     }
//   }
// }

function processTasks(...tasks) {
  let isRunning = false
  const result = []
  let i = 0

  return {
    start() {
      return new Promise(async (resolve, reject) => {
        if (isRunning) {
          return reject(new Error("Tasks are already running"))
        }
        isRunning = true

        // 依次执行任务
        while (i < tasks.length) {
          try {
            const r = await tasks[i]()
            result[i] = r
            i++
            if (!isRunning) {
              return
            }
          } catch (error) {
            isRunning = false
            return reject(error)
          }
        }

        isRunning = false
        resolve(result)
      })
    },
    pause() {
      isRunning = false
    },
    reset() {
      isRunning = false
      i = 0
      result.length = 0
    },
  }
}

// 示例任务函数
const task1 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 1 completed"), 1000))
const task2 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 2 completed"), 1000))
const task3 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 3 completed"), 1000))

const taskProcessor = processTasks(task1, task2, task3)

taskProcessor
  .start()
  .then((result) => console.log(result, "1"))
  .catch((err) => console.error(err))

// 停止任务的例子
setTimeout(() => {
  taskProcessor.pause()
  console.log("Tasks paused")
}, 1500)

// 重新开始任务
setTimeout(() => {
  taskProcessor
    .start()
    .then((result) => console.log(result, "2"))
    .catch((err) => console.error(err))
}, 3000)

// const L = [
//   { id: 2, before: 1 },
//   { id: 1, last: true },
//   { id: 3, after: 1 },
//   { id: 5, first: true },
//   { id: 9, last: true },
//   { id: 7, last: true },
//   { id: 8, last: true },
// ]
// function parse(list) {
//   const res = []
//   for (let item of list) {
//     if (item.last) {
//       res.push(item.id)
//     } else if (item.first) {
//       res.unshift(item.id)
//     } else if (item.after !== undefined) {
//       const index = res.indexOf(item.after)
//       if (index !== -1) {
//         res.splice(index + 1, 0, item.id)
//       } else {
//         res.push(item.id)
//       }
//     } else if (item.before !== undefined) {
//       const index = res.indexOf(item.before)
//       if (index !== -1) {
//         res.splice(index, 0, item.id)
//       } else {
//         res.unshift(item.id)
//       }
//     } else {
//       res.push(item.id)
//     }
//   }
//   return res
// }
// console.log(parse(L))
