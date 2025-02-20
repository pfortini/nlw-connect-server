import { fastifyCors } from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { accessLinkRoute } from './routes/access-link-route'
import { getClicksRoute } from './routes/get-clicks-route'
import { getInvitesRoute } from './routes/get-invites-route'
import { getRankingPositionRoute } from './routes/get-ranking-position-route'
import { getRankingRoute } from './routes/get-ranking-route'
import { subscribeRoute } from './routes/subscribe-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.register(fastifyCors)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, { routePrefix: '/docs' })
app.register(subscribeRoute)
app.register(accessLinkRoute)
app.register(getClicksRoute)
app.register(getInvitesRoute)
app.register(getRankingPositionRoute)
app.register(getRankingRoute)

app.listen({ port: env.PORT }).then(() => console.log('Server running at port', env.PORT))
