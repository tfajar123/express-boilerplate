import express, { type Express } from 'express'
import rootRouter from '../routes/rootRouter'
import '../services/storageServices/minioServices'
import morgan from 'morgan'
import chalk from 'chalk'


const app: Express = express()

app.set('json spaces', 2)

app.use(express.json())
app.use(morgan((tokens, req, res) => {
  const method = tokens?.method?.(req, res) || ''
  const status = tokens?.status?.(req, res)
  const url = tokens?.url?.(req, res)
  const responseTime = tokens?.['response-time']?.(req, res)

  const methodColor = {
    GET: chalk.bgGreen.bold(method),
    POST: chalk.bgYellow.bold(method),
    PUT: chalk.bgBlue.bold(method),
    DELETE: chalk.bgRed.bold(method),
    PATCH: chalk.bgMagenta.bold(method),
  }[method] || chalk.white(method)

  const statusCode = Number(status)
  const statusColor =
    statusCode >= 400 ? chalk.red.bold(status) :
    statusCode >= 300 ? chalk.cyan.bold(status) :
    chalk.green.bold(status)

  return [
    methodColor,
    statusColor,
    chalk.white(url),
    '-',
    chalk.gray(`${responseTime} ms`)
  ].join(' ')
}))
app.use(rootRouter)

export default app

