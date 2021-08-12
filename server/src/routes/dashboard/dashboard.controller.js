const {getDashboardData} = require('../../models/dashboard.model');

async function myDashboard(req, res) {
    const data = getDashboardData();
    res.status(200).json(data);
}

module.exports = {
    myDashboard,
}