import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let tweets = [];
let usuarios = [];

app.post('/sign-up', (req, res) => {
    usuarios.push({ username: req.body.username, avatar: req.body.avatar })
    res.send(200);
});

app.post('/tweets', (req, res) => {

    console.log(req.body);

    let usuario = -1;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].username == req.body.username) { usuario = i; }
        console.log(usuarios[i].username);
    }

    if (usuario == -1) {
        res.send(401);
    }
    else {
        tweets.push({ username: req.body.username, avatar: usuarios[usuario].avatar, tweet: req.body.tweet });
        res.send(200)
    }
});

app.get("/tweets", (req, res) => {
    let nmrTweets = tweets.length > 10 ? 10 : tweets.length;
    if (nmrTweets == 0) res.send([]);

    let ultimosTweets = [];

    for (let i = 0; i < nmrTweets; i++) {
        ultimosTweets.push(tweets[i]);
    }
    res.send(ultimosTweets);
});

app.listen(5000);