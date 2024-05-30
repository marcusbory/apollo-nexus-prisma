import { list, nonNull, queryField } from "nexus"
// Types will be replaced by Prisma eventually
import { Post } from "../Types/Post"
import { Context } from "../../../context"

export const DraftQuery = queryField('draftsQuery', {
  type: nonNull(list(Post)),
  args: {},
  resolve: async (_parent, _args, context: Context) => {
    try {
      return context.db.posts.filter(p => !p.published)
    } catch (e) {
      console.error(e)
    }
  }
})