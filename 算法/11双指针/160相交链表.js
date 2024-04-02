var getIntersectionNode = function (headA, headB) {
  let pa = headA,
    pb = headB

  while (pa !== pb) {
    pa === null ? headB : pa.next
    pb === null ? headA : pb.next
  }
  return pa
}
