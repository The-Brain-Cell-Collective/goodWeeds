//! Leaving this code in to leverage for future versions of this project


// GET review by ID **May not need**
// router.get("/api/review/:id", (req, res) => {
//   review
//     .findOne({
//       where: {
//         id: req.params.id,
//       },
//     })
//     .then((review) => res.json(review))
//     .catch((error) => res.status(400).json(error));
// });

//! **** FAVORITE ROUTES ****

// GET all favorites
// router.get("/favorites", (req, res) => {
//   favorite
//     .findAll({})
//     .then((favorite) => res.json(favorite))
//     .catch((error) => res.status(400).json(error));
// });

// TODO: GET favorites by ID **REFACTOR**
// router.get("api/favorite/:id", (req, res) => {
//   favorite
//     .findByPk({
//       where: {
//         id: req.params.id,
//       },
//     })
//     .then((favorite) => res.json(favorite))
//     .catch((error) => res.status(400).json(error));
// });

// POST favorite
// router.post("/post-favorite", async (req, res) => {
//   try {
//   const newFav =  await Favorites.create(req.body);

//   res.status(200).json(newFav);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// TODO DELETE favorite **REFACTOR**
// router.delete('/delete-fav/:id', async (req, res) => {
//   // delete a category by its `id` value
//   try {
//     const  deletFav = await Favorites.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!deletFav) {
//       res.status(404).json({ message: 'Invalid' });
//       return;
//     }
//     res.status(200).json(deletFav);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;