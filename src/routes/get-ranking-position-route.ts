import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getRankingPosition } from '../functions/get-ranking-position'

export const getRankingPositionRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/subscribers/:id/ranking/position',
    {
      schema: {
        summary: 'Get subscriber invite rank position',
        tags: ['referral'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            rank: z.number().nullable(),
          }),
        },
      },
    },
    async request => {
      const { id } = request.params

      const { rank } = await getRankingPosition({ id })

      return { rank }
    }
  )
}
