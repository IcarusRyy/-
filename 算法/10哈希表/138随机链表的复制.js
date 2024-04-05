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
// 使用迭代链表 和 哈希表map的方式 完成本题目
var copyRandomList = function (head) {
  if (!head) return head

  let cur = head
  let newHead = new Node()
  // 创建新节点的指针
  let newCur = newHead
  // 创建map
  let map = new Map()
  while (cur) {
    // 根据老节点 将新节点的next 串联  以及复制val
    newCur.val = cur.val
    // 如果老节点next指向 存在 就创建一个新节点 将新节点的next指向 再新创建的节点
    newCur.next = cur.next ? new Node() : null

    // 保存到map中
    map.set(cur, newCur)
    // 移动指针
    cur = cur.next
    newCur = newCur.next
  }

  // 将新节点指针 重新移动到新节点的头节点
  newCur = newHead
  cur = head
  // 根据老节点 给新节点设定random
  while (cur) {
    newCur.random = cur.random ? map.get(cur.random) : null
    // 移动指针
    cur = cur.next
    newCur = newCur.next
  }
  return newHead
}
