# 时间复杂度

## O(1)

消耗的时间不会随着变量的递增或者递减而影响
除了循环或者递归 基本上都是 O(1)

```js
const a = 1
const b = 2

function fun(num) {
  return num++
}
fun(6)
```

## O(n)

消耗的时间受到变量 n 的影响， 比如下面这种情况，for 循环里面的代码就会执行 n 次，也就是打印 100 次 i，所以时间复杂度为 O(n)

```js
let n = 100

for (let i = 0; i < n; i++) {
  console.log(i)
}
```

demo

```js
function fun(n) {
  // O(1)
  let i = 1
  i += 2
  // O(n)
  for (var k = 0; k < n; k++) {
    console.log(k)
  }
}
fun(10)

// O(1) + O(n) = O(n)
// 所以这段代码的时间复杂度是O(n)
```

## O(n^2)

双重循环就是 O(n^2)

```js
function fun(n) {
  let arr = []
  // O(n)
  for (let i = 0; i < n; i++) {
    arr.push([])
    // O(n)
    for (let k = 0; k < n; k++) {
      arr[k].push("a")
    }
  }
}
fun(10)
```

## O(logN)

```js
let i = 1
const n = 6
while (i < n) {
  i = i * 2
}
```
