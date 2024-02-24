/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let slow = head,
    fast = head
  while (fast !== null && fast.next !== null) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) return true
  }
  return false
}

/**
 * 快慢指针法原理
初始化：你创建了两个指针，slow 和 fast，它们都从链表的头节点 head 开始。
移动：在每一次循环中，slow 指针向前移动一步，而 fast 指针向前移动两步。
判断：
如果链表中没有环，fast 指针将首先到达链表的末尾（即 fast 或 fast.next 为 null），循环结束，函数返回 false。
如果链表中有环，fast 指针最终将绕环而行并“追上” slow 指针（即 slow 和 fast 指针相遇），函数在这种情况下返回 true。
执行过程
假设我们有一个链表：A -> B -> C -> D -> E -> C（C 到 E 之后又回到了 C，形成了一个环）。

开始：slow = A, fast = A
第一次循环：
slow 移动到 B
fast 移动到 C
第二次循环：
slow 移动到 C
fast 移动到 E（因为它每次移动两步）
第三次循环：
slow 移动到 D
fast 移动到 C（因为链表中有环）
第四次循环：
slow 移动到 E
fast 也在 E（因为 fast 从 C 移动两步回到 E）
此时，slow 和 fast 相遇，说明链表中有环。

理解关键点
快指针移动速度是慢指针的两倍：这样设计是为了如果链表中有环，快指针一定可以追上慢指针。
环的存在意味着快指针永远不会到达链表的末尾：因为它们会一直在环中循环。
相遇即环存在：快慢指针相遇是检测到环存在的直接证据。
这种方法的精妙之处在于它使用了两个不同速度的指针来检测环，而不需要额外的存储空间，因此空间复杂度为 O(1)。希望这样解释能帮助你更好地理解快慢指针法的执行过程。
 */
