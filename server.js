const express = require("express");
const app = express();
var cors = require('cors')

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const router = require("./routes/routes");

app.use(router);

app.listen(3000);