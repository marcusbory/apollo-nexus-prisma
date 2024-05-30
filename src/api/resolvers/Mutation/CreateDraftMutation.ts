import { mutationField, nonNull, stringArg } from "nexus"
import { Post } from "../Types/Post"
import { Context } from "../../../context"


export const CreateDraftMutation = mutationField('createDraftMutation', {
  type: Post,
  args: {
    title: nonNull(stringArg()),
    body: nonNull(stringArg())
  },
  resolve: async (_parent, _args, context: Context) => {
    try {
      const draft = {
        id: context.db.posts.length + 1,
        title: _args.title,
        body: _args.body,
        published: false,
      }
      context.db.posts.push(draft)
      return draft
    } catch (e) {
      console.log(e)
    }
  }
})