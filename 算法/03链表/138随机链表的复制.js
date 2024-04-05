/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
// 使用迭代链表 和 拼凑的方式 完成本题目
var copyRandomList = function (head) {
  // 在原有链表的基础上 创建一个新节点 同时拼接
  if (!head) return head
  let cur = head
  while (cur) {
    let newNode = new Node(cur.val)
    // 拼接链表
    newNode.next = cur.next
    cur.next = newNode
    // 移动指针到下一个老节点
    cur = newNode.next
  }

  let curr = head // 定义一个新指针

  // 需要依据老节点的random 指针 找到新节点
  while (curr && curr.next) {
    if (curr.random) {
      curr.next.random = curr.random.next
    } else {
      curr.next.random = null
    }
    // 移动指针,将指针指向到下一个新节点
    curr = curr.next.next
  }
  // 现在已经完成了新老节点的next random指向
  // 接下来要拆分链表
  let oldNode = head
  let newNode = head.next

  let result = newNode

  while (oldNode && oldNode.next) {
    // 拆分链表
    oldNode.next = oldNode.next.next
    newNode.next = newNode.next.next

    // 移动指针
    oldNode = oldNode.next
    newNode = newNode.next
  }
  // 将老链表的最后一个节点的指针 重新指向为null
  oldNode.next = null

  return result
}
