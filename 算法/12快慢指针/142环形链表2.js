/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let slow = head,
    fast = head

  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    // 如果相等 说明是环
    if (slow === fast) {
      // 将乌龟重新放回起点
      slow = head
      // 如果乌龟兔子再次相遇 说明是入环点 因为x = y  就是 乌龟走的路是x  兔子走的是y
      while (slow !== fast) {
        slow = slow.next
        fast = fast.next
      }
      // 最后返回入环点
      return fast
    }
  }
  // 如果不是环 直接返回null
  return null
}
