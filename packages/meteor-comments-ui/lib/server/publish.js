import { check, Maybe } from 'meteor/check'

import comment from '../services/comment'
import { verifyUserData } from '../lib/verifyData'

/**
 * Return user ids by the given comment.
 *
 * @param {Object} comment
 *
 * @returns {Array}
 */
function getUserIdsByComment(comment) {
  var ids = []

  ids.push(comment.userId)

  if (comment.replies) {
    _.each(comment.replies, function (reply) {
      ids = _.union(ids, getUserIdsByComment(reply))
    })
  }

  return ids
}

Meteor.publish('comments/anonymous', function (data) {
  check(data, {
    _id: String,
    salt: String
  })

  return AnonymousUserCollection.find(data, {
    fields: { salt: 0, anonIp: 0 }
  })
})

const getCompositeCommentCursor = (rootCursor) => ({
  find: () => rootCursor,
  children: [
    {
      find(comment) {
        const userIds = getUserIdsByComment(comment)

        return Meteor.users.find(
          { _id: { $in: userIds } },
          { fields: Comments.config().publishUserFields }
        )
      }
    },
    {
      find(comment) {
        const userIds = getUserIdsByComment(comment)

        return AnonymousUserCollection.find(
          { _id: { $in: userIds } },
          {
            fields: { salt: 0, email: 0, anonIp: 0 }
          }
        )
      }
    }
  ]
})

const getUserIdForPublication = (referenceId, userId, anonUserData) => verifyUserData(
  userId,
  anonUserData,
  referenceId,
)

Meteor.publishComposite('comments/reference', function (id, anonUserData, sorting, limit, skip = 0) {
  check(id, String)
  check(anonUserData, Match.Maybe(Object))
  check(sorting, String)
  check(limit, Number)
  check(skip, Number)

  const userId = getUserIdForPublication(id, this.userId, anonUserData)
  const canSeePending = Comments.config().canSeePendingComments(id, userId)

  return getCompositeCommentCursor(Comments.getCollection().findForReference(id, userId, {
    limit,
    skip,
    sort: Comments.getSortOption(sorting),
    transform: d => canSeePending ? d : comment.commentTransform(d, userId),
  }))
})

Meteor.publishComposite('comments/single', function (commentOrReplyId, anonUserData) {
  check(commentOrReplyId, String)

  const userId = getUserIdForPublication(null, this.userId, anonUserData)

  const canSeePending = Comments.config()
    .canSeePendingComments(null, userId)

  return getCompositeCommentCursor(
    Comments.getCollection().find({
      $and: ([
        comment.commentOrReplySelector(commentOrReplyId),
        (canSeePending
          ? null
          : comment.commentStatusSelector(userId)),
      ]).filter(selector => !!selector),
    }, {
      transform: d => canSeePending ? d : comment.commentTransform(d, userId),
    })
  )
})
