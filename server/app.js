import cors from 'cors'
import express from 'express'
// import redis from 'redis'

const hostname = 'localhost'
const port = 5000
const app = express();
// const redisClient = redis.createClient()

// links expire after 24 hr (?)

let shortToLong = {}

app.use(cors())
app.use(express.json())

app.listen(port, () =>
    console.log(`Example app listening on port http://${hostname}:${port}`),
)

app.get('*', (req, res) => {
    let shortUrlKey = req.originalUrl.split('/')[1]
    res.redirect( `${shortToLong[shortUrlKey]}`)
})

app.post('/', (req, res) => {
    let generatedExt = ''
    if (req.body.customURL) {
        if (shortToLong[req.body.customURL]) {
            res.status(400)
            res.send('Custom URL already in use! Try another.')
            return
        }
        generatedExt = req.body.customURL
    } else {
        generatedExt = Math.random().toString(36).substring(2,7)
        while (shortToLong[generatedExt]) {
            generatedExt = Math.random().toString(36).substring(2,7)
        }
    }

    let hashedUrl = `http://${hostname}:${port}/${generatedExt}`
    shortToLong[generatedExt] = req.body.url
    res.send(hashedUrl)
})
