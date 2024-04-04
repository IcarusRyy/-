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
  // 验证环形链表 使用快慢指针
  let slow = head,
    fast = head // 乌龟和兔子 在同一起点出发
  // 必须使用同一个指针作为循环条件，因为有可能为null，为null之后 就没有next属性了
  while (fast && fast.next) {
    slow = slow.next // 乌龟走一步
    fast = fast.next.next // 兔子走两步
    if (fast === slow) {
      // 兔子追上乌龟（套圈） 说明有环
      return true
    }
  }
  return false // 兔子跑到了终点 也就是链表末尾 说明无环
}
