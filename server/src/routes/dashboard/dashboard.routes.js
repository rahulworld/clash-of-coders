const express = require('express');
const {myDashboard, updatePage} = require('./dashboard.controller');

const dashboardRouter = express.Router();

dashboardRouter.get('/my_dashboard', myDashboard);
dashboardRouter.post('/updateDashboard', updatePage);

module.exports = dashboardRouter;