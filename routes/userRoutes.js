const express = require('express');
const router = express.Router();
const { login ,logout , registerUser,registerArtist} = require('../controllers/authController');
const { listActiveArtistTypes } = require('../controllers/artistTypeController');
const { listActiveArtistServices } = require('../controllers/artistServiceController');
const { addContactMessage} = require('../controllers/ContactUsController');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate user and generate JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully authenticated and received JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: "your-generated-JWT-token"
 *       '400':
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Validation failed"
 */
router.post('/login', login);
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User logout
 *     description: Perform user logout action
 *     responses:
 *       '200':
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       '400':
 *         description: Logout failed or error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Logout failed"
 */
router.post('/logout', logout);

router.post('/register', registerUser);
router.post('/register-artist', registerArtist);
router.get('/artist-type-list', listActiveArtistTypes);
router.get('/artist-service-list', listActiveArtistServices);

router.post('/contact',addContactMessage);


module.exports = router;