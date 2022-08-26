import express from "express"
import cors from "cors"

const server = express()
server
.use(cors())
.use(express.json())

const DB_USER = []
const DB_TWEETS = []

server.post("/sign-up", (req, res) => {
    const newUser = req.body
    
    if(newUser.username.length === 0 || newUser.avatar.length === 0) {
        res
        .status(400)
        .send("Todos os campos são obrigatórios!")
    }
    else {
        DB_USER.push(newUser)
        res
        .status(201)
        .send("OK")
    }
})

server.post("/tweets", (req, res) => {
    const newTweet = req.body

    if(newTweet.username.length === 0 || newTweet.tweet.length === 0) {
        res
        .status(400)
        .send("Todos os campos são obrigatórios!")
    }
    else {
        DB_TWEETS.push(newTweet)
        res
        .status(201)
        .send("OK")
    }
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
    res.send(lastTweets)
})

server.listen(5000, () => {console.log("Listening on port 5000")})