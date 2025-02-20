import { inArray } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

export async function getRanking() {
  const usersAndScores = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')
  const usersAndScoresObj: Record<string, number> = {}

  for (let i = 0; i < usersAndScores.length; i += 2) {
    usersAndScoresObj[usersAndScores[i]] = Number.parseInt(usersAndScores[i + 1])
  }

  const ranking = (
    await db
      .select()
      .from(subscriptions)
      .where(inArray(subscriptions.id, Object.keys(usersAndScoresObj)))
  )
    .map(subscriber => ({
      id: subscriber.id,
      name: subscriber.name,
      score: usersAndScoresObj[subscriber.id],
    }))
    .sort((a, b) => b.score - a.score)

  return { ranking }
}
