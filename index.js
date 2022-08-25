import express from "express"
import cors from "cors"

const server = express()
server.use(cors())

const DB_USER = [
    {
        username: "bobesponja",
        avatar: "bobesponja AVATAR"
    },
    {
        username: "patrick",
        avatar: "patrick AVATAR"
    },
    {
        username: "lula",
        avatar: "lula AVATAR"
    },
]
const DB_TWEETS = [
    {
        username: "bobesponja",
        tweet: "1"
    },
    {
        username: "lula",
        tweet: "2"
    },
    {
        username: "bobesponja",
        tweet: "3"
    },
    {
        username: "patrick",
        tweet: "4"
    },
    {
        username: "bobesponja",
        tweet: "5"
    },
    {
        username: "patrick",
        tweet: "6"
    },
    {
        username: "lula",
        tweet: "7"
    },
    {
        username: "bobesponja",
        tweet: "8"
    },
    {
        username: "lula",
        tweet: "9"
    },
    {
        username: "bobesponja",
        tweet: "10"
    },
    {
        username: "bobesponja",
        tweet: "11"
    },
    {
        username: "patrick",
        tweet: "12"
    },

]

server.get("/tweets", (req, res) => {
    DB_TWEETS.forEach(tweet => {
        const user = DB_USER.find(value => tweet.username === value.username)
        if (user) {
            tweet.avatar = user.avatar
        }
    })
    res.send(DB_TWEETS.reverse().slice(0,10))
})

server.listen(5000, () => {console.log("Listen on 5000")})
