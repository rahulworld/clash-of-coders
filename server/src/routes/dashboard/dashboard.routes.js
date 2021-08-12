const express = require('express');
const {myDashboard} = require('./dashboard.controller');

const dashboardRouter = express.Router();

dashboardRouter.get('/my_dashboard', myDashboard);

module.exports = dashboardRouter;