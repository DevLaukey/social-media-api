const express = require('express');
const router = require('./routes/router');
const errorHandler = require('./middlewares/errors');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/", router);

app.use(errorHandler());

app.listen(port, () => {
    console.log(`running port: ${port}`);
})