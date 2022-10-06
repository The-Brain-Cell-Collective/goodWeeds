const { Model } = require('sequelize');
const router = require('express').Router();
const { Strain, Review } = require("../models");
const withAuth = require('../utils/auth')


// GET signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

// GET logout
router.get("/logout", (req, res) => {
  res.render("verifyAge");
});


// GET login route
router.get("/login", (req, res) => {
  res.render("login");
});

// // GET myReviews
// router.get("/myReviews", (req, res) => {
//   res.render("myReviews");
// });

// GET verifyAge
router.get("/", (req, res) => {
  return res.render("verifyAge");
});

// POST verify age
router.post("/verifyAge", (req, res) => {
  const { ageGroup } = req.body;
  if (ageGroup === "true") {
    res.render("login");
  } else {
    return res.render("verifyAge");
  }
});

// GET all strains
router.get("/strains", withAuth, (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    try {
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
        });
     } catch (err) {
      console.log(err);
      res.status(500).json(err);
     }
  }

});

// GET all reviews
//* API/REVIEWS/REVIEWS
router.get("/reviews", withAuth, async (req, res) => {
  const reviewData = await Review.findAll()
  const strainData = await Strain.findAll()

      const strains = strainData.map(strain => strain.get({ plain: true }));
      const reviews = reviewData.map(review => review.get({ plain: true }));
      res.render('allReviews', {
        strains, reviews
      });
    })
   

// POST user review
router.post("/reviews", async(req, res) => {
  console.log("Body info!!!!", req.body);
  console.log("session info", req.session.userId)
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.userId,
      user_name: req.session.userName,
    });
    //spread operator to add the userid to the review in the user Id column
    console.log(newReview);
    const updateReview = newReview.get({ plain: true });
    console.log(updateReview);
    res.status(200).json(updateReview);

  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;