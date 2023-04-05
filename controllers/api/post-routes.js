const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

/* POST request to create a new blog post.
    - Takes the data from the Post class, takes that data and using the spread
    operator on the req.body we will take that data and respond with it as JSON.
        - This also goes for the req.session.user_id.
    - If there is an error, respond with a 400.
*/
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});
/* PUT request to update a Post.
    - It's going to take the req.body object and spread it using the spread operator.
    - The where clause is indicating the Post ID and the User ID for that Post.
    - If that Post does not exist, then there will be a client error.
        - Note that only authorized users can access this route.
*/
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update({
            ...req.body,
        },
        {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!updatedPost) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

    } catch (err){
        res.status(400).json(err);
    }
});


/* DELETE request to delete a Post associated with a specific user.
    - The Post data must match the parameters inside the where clause.
    - If the post does not exist then return an error.
    - If it does exist then delete it.
    - Otherwise return an error.
*/
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;