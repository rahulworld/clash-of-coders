const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

require('dotenv').config();

const dashboardRouter = require('./routes/dashboard/dashboard.routes');

app.use(helmet());
app.use(cors({
    // origin: 'http://localhost:3000',
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
app.use(express.json());


app.use('/', dashboardRouter);

app.get('/home', (req, res) => {
    return res.send('Hey! Welcom to Clash of coders');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening at  ${process.env.PORT}...`);
});


