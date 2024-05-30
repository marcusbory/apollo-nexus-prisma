// api/context.ts
import { Db, db } from './api/temp-db'

export interface Context {
  db: Db
}

export const context = {
  db
}