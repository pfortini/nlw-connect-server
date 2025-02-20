import { redis } from '../redis/client'

interface GetInvitesParams {
  id: string
}

export async function getInvites({ id }: GetInvitesParams) {
  const invites = await redis.zscore('referral:ranking', id)

  return {
    invites: invites ? Number.parseInt(invites) : 0,
  }
}
