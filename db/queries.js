const knex = require('./knex');

module.exports = {

  getUserById(id) {
    return knex('users').where('id', id).first();
  },

  getUserByEmail(email) {
    return knex('users').where('email', email).first();
  },

  getAllSnackReviews(){
    return knex('snack_reviews');
  },

  getSnackReviewById(id){
    return knex('snack_reviews').where('id', id);
  },

  createUser(user) {
    return knex('users').insert(user, '*');
  },

  createSnackReview(review) {
    return knex('snack_reviews').insert(review, '*');
  },

  deleteSnackReviewById(id) {
  return knex('snack_reviews').where('id', id).del();
  },

  updateSnackReview(id, review){
  return knex('snack_reviews').where('id', id).update(review, '*');
  }

};
