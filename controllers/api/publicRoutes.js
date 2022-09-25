const express = require("express");
const router = new express.Router();
const strain = require("../../models/strain");
// const review = require("../../models/review");
const favorite = require("../../models/favorites");
const Favorites = require("../../models/favorites");

const reviewData = require("../../seeds/reviewData.json");
const { User, Strain, Review } = require("../../models");


const { reset } = require("nodemon");
const strainData = require("../../seeds/strainData.json");
const db = require('../../config/connection');


//* AGE VERIFICATION ROUTES

// GET verify age
router.get("/", (req, res) => {
  return res.render("verifyAge");
});
// POST verify age
router.post("/verifyAge", (req, res) => {
  const { ageGroup } = req.body;
  if (ageGroup === "true") {
    res.render("home");
  } else {
    return res.render("verifyAge");
  }
});
//* LOGIN ROUTES
// POST login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.redirect('/strains');
});

//* SIGNUP ROUTES
// GET signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/myReviews", (req, res) => {
  res.render("myReviews");
});
// POST signup
// router.post("/signup", (req, res) => {
//   const { fname, lname, username, password } = req.body;
//   res.send(
//     `First name : ${fname} 
//       Last name : ${lname} 
//       Username : ${username} 
//       Password : ${password}`
//   );
// });
  router.post('/signup', async (req, res) => {
    try {
      const newUserData = await user.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
  
      });
      res.status(200).json(newUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
//* STRAIN ROUTES
// GET all strains

router.get("/strains", (req, res) => {
 


    Strain.findAll({
      attributes: [
        'id',
        'name',
        'type',
        'positive_effects',
        'negative_effects'
        // 'img',
      ],
    })
      .then(strainData => {
        const strains = strainData.map(strain => strain.get({ plain: true }));
        res.render('browse', {
          strains
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
// });

// GET strain by id
router.get("/api/strain/:id", (req, res) => {
  strain
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((strain) => res.json(strain))
    .catch((error) => res.status(400).json(error));
});
//* REVIEW ROUTES
// GET all reviews
router.get("/reviews", async (req, res) => {
  Review.findAll({
    attributes: [
      'id',
      'title',
      'rating',
      'strain_id',
      'content',
      'user_id',
      'timestamp'
    ],
  })
    .then(reviewData => {
      const reviews = reviewData.map(review => review.get({ plain: true }));
      res.render('allReviews', {
        reviews
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET review by ID
router.get("api/review/:id", (req, res) => {
  review
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((review) => res.json(review))
    .catch((error) => res.status(400).json(error));
});
// POST review
// todo debug
router.post("/post-review", (req, res) => {
  try {
    const { user_id, content, rating, strain_id, title, timestamp } = req.body;
    res.send(`
      ${title} 
      ${rating} 
      ${strain_id} 
      ${content}
      ${user_id}
      ${timestamp}`);
  } catch (err) {
    res.status(400).json(err);
  }
});
//* FAVORITE ROUTES
// TODO: Create dummy data for favorites to illustrate and test routes
// GET all favorites
router.get("/favorites", (req, res) => {
  favorite
    .findAll({})
    .then((favorite) => res.json(favorite))
    .catch((error) => res.status(400).json(error));
});
// GET favorites by ID
// TODO: Debug
router.get("api/favorite/:id", (req, res) => {
  favorite
    .findByPk({
      where: {
        id: req.params.id,
      },
    })
    .then((favorite) => res.json(favorite))
    .catch((error) => res.status(400).json(error));
});
// POST favorite
router.post("/post-favorite", async (req, res) => {
  try {
  const newFav =  await Favorites.create(req.body);
  //  { strain_id, name, positive_effects, negative_effects, type } = req.body;
    // res.send(
    // `${strain_id}
    // ${name}
    // ${positive_effects}
    // ${negative_effects}
    // ${type}`
  // );
  res.status(200).json(newFav);
  } catch (err) {
    res.status(400).json(err);
  }
});
// DELETE favorite
router.delete('/delete-fav/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const  deletFav = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Invalid' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
