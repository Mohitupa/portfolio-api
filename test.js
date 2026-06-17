const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(5001, () => {
  console.log("running on 5001");
});
