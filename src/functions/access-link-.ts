import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface AccessLinkParams {
  id: string
}

export async function accessLink({ id }: AccessLinkParams) {
  await redis.hincrby('referral:access-count', id, 1)
}
