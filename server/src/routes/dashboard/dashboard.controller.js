const {getDashboardData, updateDashboardData} = require('../../models/dashboard.model');

async function myDashboard(req, res) {
    const data = await getDashboardData();
    if(data) {
        return res.status(200).json(data);
    }
    return res.status(404).json({error: 'page not found'});
}

async function updatePage(req, res) {
    const updatedJsonData = req.body;
    const data = await updateDashboardData({pageName: 'dashboard', widgetList: updatedJsonData});
    if(data) {
        return res.status(200).json({message: 'updated'});
    }
    return res.status(404).json({error: 'page not found'});
}

module.exports = {
    myDashboard,
    updatePage,
}