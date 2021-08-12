require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {connectMongoDB} = require('./services/mongo');
const {writeDefultPages} = require('./models/dashboard.model');


const app = express();


const dashboardRouter = require('./routes/dashboard/dashboard.routes');

app.use(helmet());
app.use(cors({
    // origin: 'http://localhost:3000',
    origin: "*",
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // preflightContinue: false,
    // optionsSuccessStatus: 204
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));


app.use('/', dashboardRouter);

// app.get('/home', (req, res) => {
//     return res.send('Hey! Welcom to Clash of coders');
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
})

async function startServer() {
    await connectMongoDB();
    await writeDefultPages();
    app.listen(process.env.PORT, () => {
        console.log(`Server is listening at  ${process.env.PORT}...`);
    });
}

startServer();


