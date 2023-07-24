import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'

const app = fastify()
const prisma = new PrismaClient()

app.get('/', async () => {
  const users = await prisma.user.findMany()
  return users
})
app.get('/pontos', async () => {
  const pontos = await prisma.pontos.findMany()
  return pontos
})
app.get('/user', async () => {
  const users = await prisma.user.findMany({
    where: { nome: 'persio' },
  })
  return users
})
app.get('/userPontos', async () => {
  const users = await prisma.pontos.findMany({
    where: { userId: '13c6624c-852c-4168-9e1f-27b77914e311' },
  })
  return users
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('listening on localhost:3333')
  })
