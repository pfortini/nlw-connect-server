import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getClicks } from '../functions/get-clicks'

export const getClicksRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/subscribers/:id/ranking/clicks',
    {
      schema: {
        summary: 'Get subscriber invite clicks count',
        tags: ['referral'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            clicks: z.number(),
          }),
        },
      },
    },
    async request => {
      const { id } = request.params

      const { clicks } = await getClicks({ id })

      return { clicks }
    }
  )
}
