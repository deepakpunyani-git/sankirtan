

const express = require('express')
const routes = express.Router();
routes.get('/', (req, res) => {
    res.send('Sarkirtan Apis');
})

const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');

routes.use('/', userRoutes);
routes.use('/admin', adminRoutes);


module.exports = routes;
