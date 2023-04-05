const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");


// GET all of the comments
router.get("/", async (req, res) => {
  try {
    const findComments = await Comment.findAll();

    res.status(200).json(findComments);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Add comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment: req.body.comment,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});
