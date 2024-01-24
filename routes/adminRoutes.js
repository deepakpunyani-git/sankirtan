const express = require('express');
const router = express.Router();
const { createUser, deactivateUser, listUsers,getUserById,createArtist} = require('../controllers/userController');

const { isAuthenticated, checkUserType } = require('../middlewares/authentication');
const { addArtistType, activateArtistType, deactivateArtistType, updateArtistType , listArtistTypes } = require('../controllers/artistTypeController');
const {
  addArtistService,
  activateArtistService,
  deactivateArtistService,
  updateArtistService,
  listArtistServices
} = require('../controllers/artistServiceController');

const { listContactMessages, changeStatus } = require('../controllers/ContactUsController');


router.route('/create-user')
  .post(isAuthenticated, checkUserType(2), createUser);

router.route('/create-artist')
  .post(isAuthenticated, checkUserType(2), createArtist);

router.route('/deactivate-user/:userId')
  .put(isAuthenticated, checkUserType(2), deactivateUser);


router.route('/add-artist-type')
  .post(isAuthenticated, checkUserType(2), addArtistType);

router.route('/activate-artist-type/:artistTypeId')
  .put(isAuthenticated, checkUserType(2), activateArtistType);


router.route('/deactivate-artist-type/:artistTypeId')
  .put(isAuthenticated, checkUserType(2), deactivateArtistType);

router.route('/update-artist-type/:artistTypeId')
  .put(isAuthenticated, checkUserType(2), updateArtistType);
  
router.route('/artist-type-list').get(isAuthenticated, checkUserType(2), updateArtistType);

router.route('/add-artist-service')
  .post(isAuthenticated, checkUserType(2), addArtistService);

router.route('/activate-artist-service/:artistServiceId')
  .put(isAuthenticated, checkUserType(2), activateArtistService);

router.route('/deactivate-artist-service/:artistServiceId')
  .put(isAuthenticated, checkUserType(2), deactivateArtistService);

router.route('/update-artist-service/:artistServiceId')
  .put(isAuthenticated, checkUserType(2), updateArtistService);

router.route('/artist-service-list')
  .get(isAuthenticated, checkUserType(2), listArtistServices);

router.route('/users')
  .get(isAuthenticated, checkUserType(2), listUsers);

router.route('/users/:userId')
  .get(isAuthenticated, checkUserType(2), getUserById);

router.route('/contact/')
  .get(isAuthenticated, checkUserType(2), listContactMessages );

  router.route('/contact/change-status')
  .post(isAuthenticated, checkUserType(2), changeStatus);

module.exports = router;