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


// **** AGE VERIFICATION ROUTES ****

// GET verify age
router.get("/", (req, res) => {
  return res.render("verifyAge");
});

// Get strains page
router.get("/strains", (req, res) => {
  return res.render("browse");
})

// POST verify age
router.post("/verifyAge", (req, res) => {
  const { ageGroup } = req.body;
  if (ageGroup === "true") {
    res.render("home");
  } else {
    return res.render("verifyAge");
  }
});

// **** LOGIN ROUTES ****
// POST login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.user_name } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
        // res.redirect('/login')
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
        // res.redirect('/login')
      return;
    }

    res.redirect('/strains')
    // req.session.save(() => {
    //   req.session.user_id = userData.id;
    //   req.session.logged_in = true;
      
    //   res.json({ user: userData, message: 'You are now logged in!' });
    // });

  } catch (err) {
    res.status(400).json(err);
  }
});

// **** SIGNUP ROUTES ****
// GET signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/logout", (req, res) => {
  res.render("verifyAge");
});

//Get login route
router.get("/login", (req, res) => {
  res.render("login");
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
    try{
      const userData = await User.create(req.body);

      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// **** STRAIN ROUTES ****
// GET all strains
router.get("/strains", (req, res) => {
  Strain.findAll({
    attributes: [
      'id',
      'name',
      'type',
      'positive_effects',
      'negative_effects',
      'img'
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

// **** REVIEW ROUTES ****
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
// router.post("/postReview", async (req, res) => {
//   try {
//     const reviewData = await Review.create(req.body);
//     // const { user_id, content, rating, strain_id, title, timestamp } = req.body;
//     res.send(
//       `
//       ${title} 
//       ${rating} 
//       ${strain_id} 
//       ${content}
//       ${user_id}
//       ${timestamp}
//       `
//     );
//     res.status(200).json(reviewData);
//       // res.redirect(allReviews)
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post("/postReview", async (req, res) => {
  try {
    const reviewData = await Review.create(req.body);
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// **** FAVORITE ROUTES ****
// GET all favorites
router.get("/favorites", (req, res) => {
  favorite
    .findAll({})
    .then((favorite) => res.json(favorite))
    .catch((error) => res.status(400).json(error));
});

// GET favorites by ID
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
    // const { id, user_id, strain_id } = req.body;
    res.send(
    `
    ${id}
    ${user_id}
    ${strain_id}
    `
  );
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