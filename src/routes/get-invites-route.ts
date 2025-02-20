import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getInvites } from '../functions/get-invites'

export const getInvitesRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/subscribers/:id/ranking/invites',
    {
      schema: {
        summary: 'Get subscriber invite count',
        tags: ['referral'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            invites: z.number(),
          }),
        },
      },
    },
    async request => {
      const { id } = request.params

      const { invites } = await getInvites({ id })

      return { invites }
    }
  )
}
