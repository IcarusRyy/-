/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */

// 验证回文链表  不涉及插入和删除 所以不需要虚拟头节点
var isPalindrome = function (head) {
  if (!head || head.next === null) return true

  let s = ""
  let cur = head

  while (cur) {
    s += cur.val
    cur = cur.next
  }

  let i = 0,
    j = s.length - 1

  while (i < j) {
    if (s[i] !== s[j]) {
      return false
    }
    i++
    j--
  }
  return true
}
