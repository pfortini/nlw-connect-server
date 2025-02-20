import { redis } from '../redis/client'

interface GetRankingParams {
  id: string
}

export async function getRankingPosition({ id }: GetRankingParams) {
  const rank = await redis.zrevrank('referral:ranking', id)

  if (rank == null) return { rank: null }

  return { rank: rank + 1 }
}
