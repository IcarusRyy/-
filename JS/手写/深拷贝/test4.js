// function deepCopy(obj, map = new WeakMap()) {
//   if (obj === null || typeof obj !== "object") return obj
//   if (map.has(obj)) return map.get(obj)

//   let result = Array.isArray(obj) ? [] : {}

//   map.set(obj, result)
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       result[key] = deepCopy(obj[key], obj)
//     }
//   }
//   return result
// }

const test = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(1)
    }, 1000)
  })
}

async function runtime() {
  try {
    const res = await test()
    console.log(res, "res")
  } catch (err) {
    console.log(err, "err")
  }
}

runtime()
