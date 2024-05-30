function getCamelCase(str) {
  let arr = str.split("-")
  return arr
    .map((item, index) => {
      if (index === 0) {
        return item
      } else {
        return item.charAt(0).toUpperCase() + item.slice(1)
      }
    })
    .join("")
}

function convertKeysToCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item))
  } else if (obj !== null && typeof obj === "object") {
    let newObj = {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const camelCaseKey = getCamelCase(key)
        newObj[camelCaseKey] = convertKeysToCamelCase(obj[key])
      }
    }
    return newObj
  }
  return obj
}

const exampleObj = {
  "first-name": "John",
  "last-name": "Doe",
  address: {
    "street-name": "Main St",
    "postal-code": "12345",
  },
  hobbies: [
    {
      "hobby-name": "reading",
      "hobby-level": "intermediate",
    },
    {
      "hobby-name": "cycling",
      "hobby-level": "advanced",
    },
  ],
}

const camelCaseObj = convertKeysToCamelCase(exampleObj)
console.log(camelCaseObj)

// 不考虑是数组的情况
function getCamelCase(str) {
  let arr = str.split("-")
  return arr
    .map((item, index) => {
      if (index === 0) {
        return item
      } else {
        return item.charAt(0).toUpperCase() + item.slice(1)
      }
    })
    .join("")
}
function convertKeysToCamelCase(obj) {
  let newObj = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelCaseKey = getCamelCase(key)
      if (obj[key] !== null && typeof obj[key] === "object") {
        newObj[camelCaseKey] = convertKeysToCamelCase(obj[key])
      } else {
        newObj[camelCaseKey] = obj[key]
      }
    }
  }
  return newObj
}
