import cors from 'cors'
import express from 'express'
import {promisify} from 'util'
import redis from 'redis'

const hostname = 'localhost'
const port = 5000
const app = express();

const redisPort = 6379
const redisClient = redis.createClient({
        host: hostname,
        port: redisPort,
})

app.use(cors())
app.use(express.json())

app.listen(port, () =>
    console.log(`Example app listening on port http://${hostname}:${port}`),
)

app.get('*', (req, res) => {
    let shortUrlKey = req.originalUrl.split('/')[1]
    let test = redisClient.get(shortUrlKey, (err, reply) => {
        if (err) throw err
        res.redirect(reply)
    })
})

const checkExist = async (toCheck) => {
    const checkAsync = promisify(redisClient.exists).bind(redisClient)
    let test = await checkAsync(toCheck, (error, exists) => {
        if (error) throw new error
        return exists
    })
    return test
}

app.post('/', async (req, res, next) => {
    let generatedExt = ''
    if (req.body.customURL) {
        if (await checkExist(req.body.customURL)) {
            res.status(400).send({message: "Custom URL already in use! Try another"})
        } else {
            generatedExt = req.body.customURL
        }
    } else {
        generatedExt = Math.random().toString(36).substring(2, 7)
        while (await checkExist(generatedExt)) {
            generatedExt = Math.random().toString(36).substring(2, 7)
        }
    }

    let hashedUrl = `http://${hostname}:${port}/${generatedExt}`
    redisClient.set(generatedExt, req.body.url, (err, reply) => {
        if (err) throw err
    })
    res.send(hashedUrl)
})
