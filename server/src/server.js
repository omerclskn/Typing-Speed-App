const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { json } = require("body-parser");
const serverless = require("serverless-http");
const { turkishWords, englishWords } = require("./words");

dotenv.config({ path: "./config.env" });

const app = express();

const router = express.Router();

app.use(cors());
app.use(json());

router.get("/getWords/:language", (req, res) => {
  const { language } = req.params;
  const words = language === "tr" ? turkishWords : englishWords;
  const random = words.sort(() => 0.5 - Math.random()).slice(0, 150);
  res.send(random);
});

app.use("/.netlify/functions/server", router);

module.exports.handler = serverless(app);
