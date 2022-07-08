const express = require("express");
const router = require("./routes/router");
const cors = require("cors");
const sessions = require("express-session");

const app = express();

const port = process.env.PORT || 3000;
// sessions
app.use(
  sessions({
    secret: "thisismysecrctekey",
    resave: false,
    saveUninitialized: true,
    maxAge: 60000,
  })
);

app.use(express.json());
app.use(cors());
app.use("/", router);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.json({
    status: err.status,
    success: false,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`running port: ${port}`);
});
