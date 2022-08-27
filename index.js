import express from "express"
import cors from "cors"

const server = express()
server
.use(cors())
.use(express.json())

const DB_USER = []
const DB_TWEETS = []

server.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body
    
    if(!username || !avatar) {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    DB_USER.push({username, avatar})
    res.status(201).send("OK")
    
})

server.post("/tweets", (req, res) => {
    const {tweet} = req.body
    const username = req.headers.user
    if(!username || !tweet) {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    DB_TWEETS.push({username, tweet})
    res.status(201).send("OK")
})

server.get("/tweets", (req, res) => {

    const page = Number(req.query.page)
    const limitTweets = 10
    let firstTweet = DB_TWEETS.length - (page * limitTweets)
    let lastTweet = (page - 1) * limitTweets

    if (DB_TWEETS.length <= limitTweets) {
        firstTweet = 0
    }
    else {
        firstTweet < 0 ? firstTweet = 0 : firstTweet = firstTweet
    }
    if (lastTweet > DB_TWEETS.length) {
        lastTweet = 0
    }
    else {
        firstTweet === 0 ? lastTweet = DB_TWEETS.length - lastTweet : lastTweet = firstTweet + limitTweets
    }

    if (page && (page <= 0 || typeof(page) !== "number")) {
        return res.status(400).send("Informe uma página válida!")
        
    }

    if(DB_TWEETS.length > 0) {
        DB_TWEETS.forEach(tweet => {
            const user = DB_USER.find(value => tweet.username === value.username)
            tweet.avatar = user.avatar
        })
    }
    /*const lastTweets = DB_TWEETS.length >= 10 ?
    DB_TWEETS.slice(firstTweet, lastTweet) :
    DB_TWEETS*/
    console.log(firstTweet, lastTweet)
    res.send(DB_TWEETS.slice(firstTweet, lastTweet))
})

server.get("/tweets/:username", (req, res) => {
    const {username} = req.params
    const filtredTweets = DB_TWEETS.find(value => value.username === username)
    res.send(filtredTweets)
})

server.listen(5000, () => {console.log("Listening on port 5000")})