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
      .input("post_likes", likes)
      .input("userID", userID)
      .execute(`dbo.add_posts`)
      .then((result) => {
        result.rowsAffected && res.send("post added successfully");
      })
      .then(console.log("Successfully added"))
      .catch((err) => {
        console.log(err);
      });
  },
  addComment: async function (req, res) {
    let { comment, userID, postID } = req.body;
    let { id } = req.params;
    let pool = await poolPromise();
    if (id == postID) {
      pool
        .request()
        .input("comment", comment)
        .input("userID", userID)
        .input("postID", postID)
        .execute(`dbo.add_comments`)
        .then((result) => {
          result.rowsAffected &&
            res.json({
              status: 200,
              success: true,
              message: "comment added successfully",
              results: result.recordset,
            });
        })
        .then(console.log("Successfully added"))
        .catch((err) => {
          console.log(err);
        });
    } else {
       res.json({
         status: 401,
         success: false,
         message: "unauthorized",
         results: {},
       });
    }
  },
  viewPosts: async function (req, res) {
    let pool = await poolPromise();
    pool.query(`SELECT * FROM Posts`).then((results) => {
      results.recordset.length
        ? res.json({
            status: 200,
            success: true,
            message: "success",
            results: results.recordset,
          })
        : res.json({
            status: 200,
            success: false,
            message: "no records found",
          });
    });
  },
  viewComments: async function (req, res) {
    let pool = await poolPromise();
    const id = req.params.postId;
    pool
      .query(`SELECT * FROM comments WHERE postID ='${1}'`)
      .then((results) => {
        results.recordset.length
          ? res.json({
              status: 200,
              success: true,
              message: "success",
              results: results.recordset,
            })
          : res.json({
              status: 200,
              success: false,
              message: "no records found",
            });
      });
    },
    addReply: async function (req, res) {
        let pool = await poolPromise();
        let { reply, userID, commentID } = req.body;    
         if (userID) {
           pool
             .request()
             .input("reply", reply)
             .input("commentID", commentID)
             .execute(`dbo.add_reply`)
             .then((result) => {
               result.rowsAffected &&
                 res.json({
                   status: 200,
                   success: true,
                   message: "reply added successfully",
                   results: result.recordset,
                 });
             })
             .then(console.log(" reply added successfully"))
             .catch((err) => {
               console.log(err);
             });
         } else {
           res.json({
             status: 401,
             success: false,
             message: "unauthorized",
             results: {},
           });
         }
  }
};
