import { CommentsCollection } from './collections/comments'
import { commentStatuses, validateCommentStatus } from './services/comment-status'
import { adjustReplyByReplyId } from './services/reply'
import comment from './services/comment'
import { noOptOptions } from './collections/methods/comments'

const approvedStatus = commentStatuses.APPROVED

const flatMapReplies = (replies, status, rootFields) => {
  const filteredReplies = replies
    .filter(r => r.status === status)
    .map(r => ({
      ...r,
      ...rootFields,
    }))

  return [
    ...filteredReplies,
    ...filteredReplies.reduce((acc, r) => [
      ...acc,
      ...flatMapReplies((r.replies || []), status, rootFields),
    ], [])
  ]
}

// server only API
Comments.approve = (commentOrReplyId) => {
  check(commentOrReplyId, String)

  const doc = CommentsCollection.findOne(
    comment.commentOrReplySelector(commentOrReplyId),
  )

  if (doc) {
    if (doc._id === commentOrReplyId) {
      return CommentsCollection.update({ _id: doc._id }, { $set: { status: approvedStatus } })
    } else {
      adjustReplyByReplyId(
        doc.replies,
        commentOrReplyId,
        r => r.status = approvedStatus,
      )

      return CommentsCollection.update(
        { _id: doc._id },
        { $set: { replies: doc.replies } },
        noOptOptions,
      )
    }
  }
}

Comments.getAllForStatus = (status, additionalSelector = {}) => {
  check(status, String)
  validateCommentStatus(status)

  const rootComments = CommentsCollection.find(
    {
      ...comment.commentOrReplySelector(status, 'status'),
      ...additionalSelector,
    },
    { sort: { createdAt: -1 } },
  ).fetch()

  return rootComments.reduce((acc, comment) => {
    let rootCommentPending = []

    if (comment.status === status) {
      rootCommentPending = [comment]
    }

    return [
      ...acc,
      ...rootCommentPending,
      ...flatMapReplies((comment.replies || []), status, {
        rootCommentId: comment._id,
        referenceId: comment.referenceId,
      })
    ]
  }, [])
}
