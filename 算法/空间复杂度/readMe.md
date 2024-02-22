# 空间复杂度

所谓空间复杂度 就是执行当前算法 需要占用多少内存空间

## O(1)

```js
let a = 1
```

## O(n)

```js
let n = 100
let arr = []
for (let i = 0; i < n; i++) {
  arr.push(i)
}
```

## O(n^2)

```js
let n = 100
let arr = []
// O(n)
for (let i = 0; i < n; i++) {
  arr.push([])
  // O(n)
  for (let k = 0; k < n; k++) {
    arr[k].push("a")
  }
}
```
