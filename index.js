import express from "express";
import fetch from "node-fetch";

import NodeCache from "node-cache";

const myCache = new NodeCache({ stdTTL: 10});

const app = express();
const port =3000;

const todosUrl = "https://jsonplaceholder.typicode.com/todos";

app.get("/cache/server", (req, res) => {
    if(myCache.has("cache")){
        console.log("receiving cached data");
        return res.send(myCache.get("cache"));
    }else{
        console.log("receving fresh data");
        fetch(todosUrl)
        .then((response) => response.json())
        .then((json) => {
            myCache.set("cache", json);
            res.send(json);
        });
    }
});

app.get("/stats", (req, res) => {
    res.send(myCache.getStats());
})

app.listen(port, ()=> {
    console.log(`Listening at port ${port}`);
});