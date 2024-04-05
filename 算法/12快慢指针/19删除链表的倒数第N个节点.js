/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let vHead = new ListNode(0, head)
  let slow = vHead,
    fast = vHead

  // 先让快指针走n+1步
  for (let i = 0; i < n + 1 && fast; i++) {
    fast = fast.next
  }
  // 然后再同时移动快慢指针
  while (fast) {
    fast = fast.next
    slow = slow.next
  }
  // 如果走n+1步 已经到头了 或者  同时移动完 那么slow指向就是倒数第n个节点，也就是slow位于倒数第n+1个节点
  slow.next = slow.next.next
  return vHead.next
}
