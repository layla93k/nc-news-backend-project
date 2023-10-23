const express = require("express");
const data = require("./db/data/test-data/index.js");
const {
  handleCustomErrors,
  handleSQLErrors,
} = require("./Error handling/error-handling.js");

//routers
const articleRouter = require("./routes/article-router.js");
const commentsRouter = require("./routes/comments-router.js");
const topicsRouter = require("./routes/topics-router.js");
const usersRouter = require("./routes/users-router.js");

const app = express();
app.use(express.json());

app.use("/api", articleRouter);
app.use("/api", commentsRouter);
app.use("/api", topicsRouter);
app.use("/api", usersRouter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//error handling
app.use(handleCustomErrors);
app.use(handleSQLErrors);
app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});
module.exports = app;
