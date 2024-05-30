// api/schema.ts
import { makeSchema } from 'nexus'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import * as types from './resolvers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const schema = makeSchema({
  // types: [], // 1
  types,
  outputs: {
    typegen: join(__dirname, '__generated__', 'nexus-typegen.ts'), // 2
    schema: join(__dirname, '__generated__', 'schema.graphql'), // 3
  },
  /**
   * 1/ GraphQL types that will be used to construct your GraphQL schema. It's voluntarily empty for now.
   * 2/ Output path to where nexus should write the generated TypeScript definition types derived from your schema. 
   * This is mandatory to benefit from Nexus' type-safety. We call this system "reflection". More on it later.
   * 3/ Output path to where nexus should write the SDL version of your GraphQL schema. More on it later as well.
   */

  contextType: {                                    // 1
    module: join(__dirname, '../', "./context.ts"),        // 2
    export: "Context",                              // 3
  },

  /**
   * 1/ Option to set the context type
   * 2/ Path to the module where the context type is exported
   * 3/ Name of the export in that module
   */
})

