二分搜索

使用条件： 1、 数组有序
2、 找到目标值 target

```js

for(let i = 0; i < arr.length; i++>){
  if(arr[i] === target){
    return arr[i]
  }
}

```

拆分 arr 为 leftArr 和 rightArr

如果目标值大于中间值
从一边的数组再拆分

[1,2,3,4,5,6,7]
[1,2,3] 4 [5,6,7]
