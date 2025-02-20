import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { accessLink } from '../functions/access-link-'

export const accessLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:id',
    {
      schema: {
        summary: 'Access invite link and redirects user',
        tags: ['referral'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      await accessLink({ id })

      const webUrl = new URL(env.WEB_URL)
      webUrl.searchParams.set('referrer', id)

      return reply.redirect(webUrl.toString(), 302)
    }
  )
}
