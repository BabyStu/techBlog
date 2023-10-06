const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    console.log(postData, 'this is the post data');
    console.log(postData.username, 'this is the username')

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/viewpost/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('viewpost', post);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/homepage', withAuth, async (req, res) => {
  try {
    let userID;

    if (req.session.user_id === undefined) {
      userID = req.user.id;
    } else {
      userID = req.session.user_id;
    }

    const userData = await User.findByPk(userID, {
      attributes: { exclude: ['password'] },
    });
    console.log(userData, 'this is the user data');

    const username = userData.get({ plain: true });
    console.log(username, 'this is the username');

    const postData = await Post.findAll({
      where: { user_id: userID },
      include: [{ model: User, attributes: ['username'] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      ...username,
      posts,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(postId, "this is the item id");
    const postData = await Post.findByPk(postId)
    const post = postData.get({ plain: true });
    console.log(post, "this is the item");

    if (!post) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    res.render('edit',
     post
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post', (req, res) => {

  res.render('post');
});

// router.get('/logout', function (req, res, next) {

//   if (req.session.user_id === undefined) {
//     req.logout(function(err) {
//       if (err) { return next(err); }
//       res.redirect('/');
//     });
       
//   } else {
//     if (req.session.logged_in) {
//       req.session.destroy(() => {
//         res.status(204).end();
//       });
//     } else {
//       res.status(404).end();
//     }
//     return res.redirect('/');
//   }
// });

module.exports = router;
