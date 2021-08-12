const dashboard = require('./hack.json');
const pages = require('./pages.mongo');


async function writeDefultPages() {
    // const {pageName = 'dashboard', widgetList = []} = pageDetail;
    // console.log('widget list', dashboard['data']);
    const pageDetail = {pageName: 'dashboard', widgetList: dashboard};
    const page = await pages
        .findOne({pageName: pageDetail.pageName});
    if(!page) {
        try {
            await pages.findOneAndUpdate(
                {pageName: pageDetail.pageName},
                pageDetail,
                {upsert: true});
        } catch(err) {
            console.error(`Could not save launch ${err}`);
        }
    }
}

async function getDashboardData(pageName = 'dashboard') {
    // return dashboard;
    const page = await pages.findOne({pageName});
    if(page) {
        return page;
    }
    return null;
}

async function updateDashboardData(pageDetail) {
    const {pageName = 'dashboard'} = pageDetail;
    // return dashboard;
    // const page = await pages.findOne({pageName});
    // const pageDetail = {pageName: 'dashboard', widgetList: dashboard};
    const page = await pages.findOne({pageName: pageName});
    console.log('updateDashboardData', page);
    if(page) {
        try {
            await pages.findOneAndUpdate(
                {pageName: pageDetail.pageName},
                pageDetail,
                {upsert: true});
        } catch(err) {
            console.error(`Could not save launch ${err}`);
        }
        return true;
    }
    return false;
}

module.exports = {
    getDashboardData,
    writeDefultPages,
    updateDashboardData,
}