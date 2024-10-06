const express = require("express");
const app = express();
const cors = require('cors');
const router = require("./routes/routes");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(router);

app.listen(3000);