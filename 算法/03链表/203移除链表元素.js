/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */

var removeElements = function (head, val) {
  let vHead = new ListNode(0, head)
  let cur = vHead

  while (cur.next) {
    // 如果相等 将记录指针指向的这个节点之间指向后面第二个 跳过当前相等的节点
    if (cur.next.val === val) {
      cur.next = cur.next.next
      continue
    }
    // 如果不相等 记录指针向右移动一个
    cur = cur.next
  }
  return vHead.next
}
