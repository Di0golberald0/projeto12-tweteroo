import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    if(!username || !avatar) {
        res.status(400).send({message: "Todos os campos são obrigatórios!"});
        return;
    };
    users.push({ username, avatar });
    res.send("OK");
});

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    if(!username || !tweet) {
        res.status(400).send({message: "Todos os campos são obrigatórios!"});
        return;
    };
    const { avatar } = users.find((user) => user.username === username);
    tweets.push({ username, avatar, tweet });
    res.send("OK");
});

app.get("/tweets", (req, res) => {
    const displayTweets = tweets.slice(-10);
    res.send(displayTweets);
});

app.listen(5000, () => console.log("listening on port 5000"));