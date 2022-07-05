const poolPromise = require("../config/poolPromise");

module.exports = {
  addPost: async (req, res) => {
    let { url, heading, description, comments, likes, replies, userID } =
      req.body;
    let pool = await poolPromise();

    pool
      .request()
      .input("post", url)
      .input("post_heading", heading)
      .input("post_description", description)
      .input("post_comments", comments)
      .input("post_likes", likes)
      .input("post_comments_replies", replies)
      .input("userID", userID)
      .execute(`dbo.add_posts`)
      .then((result) => {
        result.rowsAffected && res.send("post added successfully");
      })
      .then(console.log("Successfully added"))
      .catch((err) => {
        console.log("sdvd"+err);
      });
  },
};
