# 树

一种分成数据的抽象模型

# 深度优先遍历 和 广度优先遍历

```js
const tree = {
  val: "a",
  children: [
    {
      val: "b",
      children: [
        {
          val: "d",
          children: [],
        },
        {
          val: "e",
          children: [],
        },
      ],
    },
    {
      val: "c",
      children: [
        {
          val: "f",
          children: [],
        },
        {
          val: "g",
          children: [],
        },
      ],
    },
  ],
}
```

![Alt text](image.png)

## 深度优先遍历

纵向 找到最低 再往上

从根节点出发，尽可能深的搜索树的节点

技巧：
1、访问根节点
2、对根节点的 children 挨个进行深度优先遍历

```js
const tree = {
  val: "a",
  children: [
    {
      val: "b",
      children: [
        {
          val: "d",
          children: [],
        },
        {
          val: "e",
          children: [],
        },
      ],
    },
    {
      val: "c",
      children: [
        {
          val: "f",
          children: [],
        },
        {
          val: "g",
          children: [],
        },
      ],
    },
  ],
}

// 深度优先遍历

const fun1 = (root) => {
  console.log(root.val)
  root.children.forEach(fun1)
}

fun1(tree) // a b d e c f g
```

## 广度优先遍历

横向 也就是队列 入队 出队

从根节点出发，优先访问离根节点最近的节点

技巧：
1、新建一个队列，把根节点入队
2、把队头出队 使用 shift 方法
3、把队头的 children 挨个入队
4、重复 2 和 3 步骤，直到队列为空为止

```js
const tree = {
  val: "a",
  children: [
    {
      val: "b",
      children: [
        {
          val: "d",
          children: [],
        },
        {
          val: "e",
          children: [],
        },
      ],
    },
    {
      val: "c",
      children: [
        {
          val: "f",
          children: [],
        },
        {
          val: "g",
          children: [],
        },
      ],
    },
  ],
}

// 广度优先遍历

const fun2 = (root) => {
  const arr = [root]

  while (arr.length > 0) {
    const o = arr.shift()
    console.log(o.val)
    o.children.forEach((item) => {
      arr.push(item)
    })
  }
}

fun2(tree) // a b c d e f g
```

# 二叉树

# 二叉树的前序遍历

# 二叉树的后序遍历
