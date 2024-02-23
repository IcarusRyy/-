/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  const stack = []
  const arr = path.split("/")
  for (item of arr) {
    if (item) {
      if (item === "..") {
        stack.pop()
      } else if (item !== ".") {
        stack.pop(item)
      }
    }
  }
  return "/" + stack.join("/")
}
