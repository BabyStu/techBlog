const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll();
    ({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(allPosts);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, date_created } = req.body;

    console.log(title, description, "title and description inside of post route");

    const newPost = await Post.create({
      title: title,
      description: description,
      date_created: date_created,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err, "error on errrosss");
  }
});

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

router.put('/edit-post/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

    if (!post) {
      res.status(404).json({ message: 'post not found' });
      return;
    }

    const updatedPost = await Post.update(req.body, {
      where: {
        id: postId,
      },
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
