const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://finnjoshuakaup:Zo3eBFKw2J9SvA7R@listcluster.vqluu.mongodb.net/?retryWrites=true&w=majority&appName=listCluster";


router.get("/:collection/get", async (req, res) => {
  const date = new Date()
  const today = date.toISOString().substring(0, 10);
  let data;
  switch (req.params.collection) {
    case "calender":
      data = await db(req.params.collection, "find", { start: { $gte: today } }, {start: 1});
      break;
    case "events":
      break;
    case "birthdays":
      const currentMonth = date.getMonth() + 1;
      const currentDay = date.getDate();
      const data1 = await db(req.params.collection, "find", {month: {$gte: currentMonth}, day: {$gte: currentDay}}, {month: 1, day: 1});
      const data2 = await db(req.params.collection, "find", {month: {$lt: currentMonth }}, {month: 1, day: 1});
      const data3 = await db(req.params.collection, "find", {month: {$eq: currentMonth }, day: {$lt: currentDay}}, {month: 1, day: 1});
      data = data1.concat(data2).concat(data3);
      break;
  }
  res.send(data);
});

router.post("/:collection/post", async (req, res) => {
  let data = await db(req.params.collection, "insertOne", req.body);
  res.send(data);
});

router.patch("/:collection/patch", async (req, res) => {
  let data = await db(req.params.collection, "updateOne", req.body[0], { $set: req.body[1]});
  res.send(data);
});

router.delete("/:collection/delete", async (req, res) => {
  let data = await db(req.params.collection, "deleteOne", req.body);
  res.send(data);
});


async function db(collection, operation, data, updateSort) {
  const client = new MongoClient(uri);
  try {
    if(operation === "find") {
      const content = await client.db("calender").collection(collection)[operation](data).sort(updateSort).toArray();
      return content;
    } else if(operation === "updateOne") {
      const content = await client.db("calender").collection(collection)[operation](data, updateSort);
      return content;
    } else {
      const content = await client.db("calender").collection(collection)[operation](data);
      return content;
    }
  } finally {await client.close();}
}

module.exports = router;