import { list, nonNull, queryField } from "nexus"
// Types will be replaced by Prisma eventually
import { Post } from "../Types/Post"
import { Context } from "../../../context"

export const DraftQuery = queryField('draftsQuery', {
  type: nonNull(list(Post)),
  args: {},
  resolve: async (_parent, _args, context: Context) => {
    try {
      return context.db.post.findMany({
        where: {
          published: false
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
})