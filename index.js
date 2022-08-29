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
    if(DB_USER.find(value => value.username === username)) {
        return res.status(409).send("Já existe um usuário com esse nome")
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
    console.log(DB_TWEETS)
    res.status(201).send("OK")
})

server.get("/tweets", (req, res) => {

    if(DB_TWEETS.length > 0) {
        DB_TWEETS.forEach(tweet => {
            const user = DB_USER.find(value => tweet.username === value.username)
            tweet.avatar = user.avatar
        })
    }

    const lastTweets = DB_TWEETS.length >= 10 ?
    DB_TWEETS.slice(DB_TWEETS.length-10, DB_TWEETS.length) :
    DB_TWEETS

    lastTweets.reverse()
    res.send(lastTweets)
    lastTweets.reverse()
})

server.get("/tweets/:username", (req, res) => {
    const {username} = req.params
    const filtredTweets = DB_TWEETS.find(value => value.username === username)

    res.send(filtredTweets)
})

server.listen(5000, () => {console.log("Listening on port 5000")})