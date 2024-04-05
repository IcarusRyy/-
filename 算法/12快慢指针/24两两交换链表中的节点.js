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
var swapPairs = function (head) {
  let vHead = new ListNode(0, head)
  let cur = vHead

  while (cur.next && cur.next.next) {
    let slow = cur.next
    let fast = cur.next.next

    slow.next = fast.next
    fast.next = slow
    cur.next = fast

    cur = slow
  }

  return vHead.next
}
