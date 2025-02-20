import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface SubscribeParams {
  name: string
  email: string
  referrerId?: string | null
}

export async function subscribe({ name, email, referrerId }: SubscribeParams) {
  const existingSub = (await db.select().from(subscriptions).where(eq(subscriptions.email, email)))[0]

  if (existingSub) return { id: existingSub.id }

  const sub = (await db.insert(subscriptions).values({ name, email }).returning())[0]

  if (referrerId) await redis.zincrby('referral:ranking', 1, referrerId)

  return { id: sub.id }
}
