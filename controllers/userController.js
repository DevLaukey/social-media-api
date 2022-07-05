const poolPromise = require("../config/poolPromise");

module.exports = {
  signUp: async (req, res) => {
    let { username, email, password } = req.body;

    let pool = await poolPromise();
    pool
      .request()
      .input("username", username)
      .input("email", email)
      .input("password", password)
      .execute(`dbo.reg_user`)
      .then((result) => {
        result.rowsAffected && res.send("Successfully registered");
      })
      .then(console.log("Successfully registered"))
      .catch((err) => {
        console.log(err);
      });
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    let pool = await poolPromise();
    pool
      .request()
      .input("username", username)
      .execute(`dbo.login_user`)
      .then((result) => {
        try {
          if (result.recordset.length > 0) {
            if (result.recordset[0].password === password) {
              res.json({
                status: 200,
                success: true,
                message: "Successfully logged In",
              });
            } else {
              res.json({
                status: 401,
                success: false,
                message: "Incorrect password",
              });
            }
          } else {
            res.json({
              status: 404,
              success: false,
              message: "User not found",
            });
          }
        } catch (err) {
          console.log(err);
        }
      });
  },
};
