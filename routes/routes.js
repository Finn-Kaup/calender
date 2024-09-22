const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://finnjoshuakaup:Zo3eBFKw2J9SvA7R@listcluster.vqluu.mongodb.net/?retryWrites=true&w=majority&appName=listCluster";


router.get("/get", async (req, res) => {
  let data = await collection("find");
  res.send(data);
})

router.post("/post", async (req, res) => {
  let data = await collection("insertOne", req.body);
  res.send(data);
  console.log(data);
})


async function collection(operation, data) {
    const client = new MongoClient(uri);
    try {
        if(operation === "find") {
            const content = await client.db("calender").collection("calender")[operation](data).sort({start: 1}).toArray();
            return content;
        } else {
            const content = await client.db("calender").collection("calender")[operation](data);
            return content;
        }
    } finally {await client.close();}
}

/*async function db() {
    const client = new MongoClient(uri);
    try {
        const content = await client.db("calender").listCollections().toArray();
        let data = []
        for(let i = 0; i < content.length; i++) {
          data.push(content[i].name); 
        }
        return data;
      } finally {await client.close();}
}*/

module.exports = router;