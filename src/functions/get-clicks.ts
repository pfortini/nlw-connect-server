import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface GetClicksParams {
  id: string
}

export async function getClicks({ id }: GetClicksParams) {
  const clicks = await redis.hget('referral:access-count', id)

  return {
    clicks: clicks ? Number.parseInt(clicks) : 0,
  }
}
