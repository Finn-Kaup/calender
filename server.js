const express = require("express");
const app = express();
const cors = require('cors');
const router = require("./routes/routes");
const fs = require("fs");
const https = require('https');

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(router);

const privateKey = fs.readFileSync('example.com.key');
const certificate = fs.readFileSync('example.com.crt');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(3000);