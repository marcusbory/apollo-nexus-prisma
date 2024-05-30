// api/context.ts
// import { Db, db } from './api/temp-db'
import { PrismaClient } from "@prisma/client"
import { db } from "./api/db"

export interface Context {
  db: PrismaClient
}

export const context: Context = {
  db
}