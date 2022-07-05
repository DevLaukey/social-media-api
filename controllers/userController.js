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
};
