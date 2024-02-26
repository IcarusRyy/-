# 字典 (map)

字典： 是键值对的存储，类似于 JS 的对象

```js
{
  a: 1
}
```

区别：
对象存在的问题： key 都是字符串类型或者会转换成字符串类型

```js
var a = {}
var b = {
  key: "a",
}

var c = {
  key: "c",
}

a[b] = "123"
a[c] = "456"

//  a[ [object Object] ] = '123'
//  a[ [object Object] ] = '456'
console.log(a[b]) // 456
```

字典以 map 来表示 ， map 对象的键不会转换类型

```js
const mapObj = new Map()

mapObj.set("a", 1)
mapObj.set("b", 2)
console.log(mapObj)
console.log(mapObj.get("b"))
console.log(mapObj.has("b"))

mapObj.delete("b")
mapObj.clear("b") // 没有返回值
mapObj.size()
```

# 哈希表 又被称为 散列表

JS 中没有哈希表, 哈希表是字典的一种实现

以数组的形式进行存储， 下标是哈希值

哈希表与 map 的区别：
如果找 key 对应的 value 则需要遍历 key，那么想要省去遍历的过程，用哈希表来表示
排列顺序不同，map 根据添加的顺序进行排列，哈希表不是根据添加顺序排列，下标小的会在数组前面

```js

class HahTable{
  constructor(){
    this.table = []
  }

  hashCode(key){
    let hash = 0
    for(let i = 0; i < key.length; i++>){
      hash += key.chartCodeAt(i)
    }
  }

  put(key, value){
    let hashKey =  this.hashCode(key)
    this.table[ hashKey] = value
  }
  get(key){
    let hashKey =  this.hashCode(key)
    return this.table[hashKey]
  }
}


let hashTable = new HahTable()

hashTable.put('person', '张三')
console.log(hashTable.get('person'))
```
