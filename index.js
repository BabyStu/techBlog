router.get('/item/:id', async (req, res) => {
  try {
    const itemData = await Item.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
    });

    const item = itemData.get({ plain: true });

    res.render('item', {
      ...item,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});