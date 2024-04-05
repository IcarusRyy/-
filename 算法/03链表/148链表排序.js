/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
//  粗暴解法  先把值放在数组中 然后排序 然后重新创建链表
var sortList = function (head) {
  if (!head) return head
  let arr = []

  // 创建指针
  let cur = head
  while (cur) {
    arr.push(cur.val)
    // 移动指针
    cur = cur.next
  }

  // 创建虚拟头节点
  let vHead = new ListNode(0, head)
  // 将指针重新指向头节点
  cur = vHead

  // 链表排序
  arr.sort((a, b) => a - b)

  arr.forEach((item) => {
    cur.next = new ListNode(item)
    cur = cur.next
  })
  cur.next = null
  return vHead.next
}
