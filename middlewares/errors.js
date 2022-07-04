const express = require('express');
const app = express();


module.exports = {
    errorHandler: (req, res, next) => {
         const error = new Error("Not found");
         error.status = 404;
         next(error);
    }
}
