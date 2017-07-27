const queries = require('../db/queries');
const express = require('express');
const valid = require('./validate');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/auth/login', (req,res,next) => {
	if(valid.user(req.body)){
		queries.getUserByEmail(req.body.email).then(user => {
			if(user) {
				bcrypt.compare(req.body.password, user.password).then(result => {
					if(result) {
            res.json(user);
					} else {
						next(new Error('Invalid Email/Password'));
					}
				});
			} else {
				next(new Error('Invalid Email/Password'));
			}
		});
	} else {
		next(new Error('Invalid Email/Password'));
	}
});

router.post('/auth/signup', (req,res,next) => {
	if(valid.user(req.body)) {
		queries.getUserByEmail(req.body.email).then(user => {
			if(!user) {
				bcrypt.hash(req.body.password, 10)
					.then((hash) => {
						let user = {
							email: req.body.email,
							password: hash
						};
						queries.createUser(user).then(user => {
							res.json({
								message: "Success",
								user
							});
						});
				});
			} else {
				next(new Error("Email in use"));
			}
		});
	} else {
		next(new Error("Invalid Password"));
	}
});

router.get('/reviews', (req,res)=> {
	queries.getAllSnackReviews().then(reviews => {
		res.json(reviews);
	});
});

router.get('/reviews/:id', (req,res) => {
	queries.getSnackReviewById(req.params.id).then(review => {
		res.json(review);
	});
});

router.get('/users/:id', (req,res) => {
	queries.getUserById(req.params.id).then(user => {
		res.json(user);
	});
});

router.post('/reviews', (req, res, next) => {
  if (valid.review(req.body)) {

		queries.getUserById(req.body.users_id).then(user => {
			if(user){
				let review = {
					title: req.body.title,
					description: req.body.description,
					users_id: req.body.users_id
				};

				queries.createSnackReview(review).then(result => {
					res.json(result);
				});
			} else {
				next(new Error('User does not exist'));
			}
		});

  } else {
    next(new Error('Title/Description cannot be empty'));
  }
});

router.delete('/reviews/:id', function(req, res) {
  queries.deleteSnackReviewById(req.params.id).then(response => {
  res.json(response);
  });
});

router.put('/reviews/:id', (req, res, next) => {
	if (valid.review(req.body)) {

		queries.getUserById(req.body.users_id).then(user => {
			if(user){
				let review = {
					title: req.body.title,
					description: req.body.description,
					users_id: req.body.users_id
				};

				queries.updateSnackReview(req.params.id, review).then(response => {
					res.json(response);
				});
			} else {
				next(new Error('User does not exist'));
			}
		});

  } else {
    next(new Error('Title/Description cannot be empty'));
  }

});

module.exports = router;
