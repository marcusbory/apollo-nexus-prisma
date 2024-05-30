import { CreateDraftMutation } from "./Mutation/CreateDraftMutation"
import { DraftQuery } from "./Query/DraftQuery"
import { Post } from "./Types/Post"

export const types = [
  Post
]

export const queries = [
  DraftQuery
]

export const mutations = [
  CreateDraftMutation
]