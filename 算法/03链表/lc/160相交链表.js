var getIntersectionNode = function (headA, headB) {
  let pa = headA,
    pb = headB

  while (pa !== pb) {
    if (pa === null) {
      pa = headB
    } else {
      pa = pa.next
    }

    if (pb === null) {
      pb = headA
    } else {
      pb = pb.next
    }
  }
  return pa
}
