const poolPromise = require("../config/poolPromise");

module.exports = {
    signUp: async (req, res) => {
        let {  username, email, password } = req.body;
        
    let pool = await poolPromise();
    pool
      .query(
        `INSERT INTO Users Values('${username}', '${email}', '${password}')`
      )
      .then((result) => {
        result.rowsAffected && res.send("Successfully registered");
      })
      .then(console.log("Successfully registered"))
      .catch((err) => {
        console.log(err);
      });
  },
};
