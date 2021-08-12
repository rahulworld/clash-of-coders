const http = require('http');

const express = require('express');

const app = express();

require('dotenv').config();

const dashboardRouter = require('./routes/dashboard/dashboard.routes');

app.use(express.json());

app.use('/', dashboardRouter);

app.get('/home', (req, res) => {
    return res.send('Hey! Welcom to Clash of coders');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening at  ${process.env.PORT}...`);
});


