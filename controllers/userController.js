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
      .catch((err) => {
        res.status(502).send(err.message);
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
              (req.session.isAuthenticated = true),
                console.log(req.session.isAuthenticated);
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
            res.status(404).json({
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
