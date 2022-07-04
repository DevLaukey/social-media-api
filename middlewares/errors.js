const express = require('express');
const app = express();


module.exports = {
    errorHandler: (err, req, res, next) => {
        console.log(err);
        const error = new Error("Not found");
        res.json({
          status: err.status,
          success: false,
          message: err.message,
        });
        next(error);
    }
}
