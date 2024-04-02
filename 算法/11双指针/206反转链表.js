var reverseList = function (head) {
  let prev = null
  let cure = head

  while (cure) {
    let next = cure.next
    cure.next = prev
    prev = cure
    cure = next
  }
  return prev
}
